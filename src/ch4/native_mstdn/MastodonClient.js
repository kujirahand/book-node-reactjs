// 利用するコンポーネントを列挙する
import {
  StyleSheet, Text, TextInput, View, Image,
  Button, WebView, FlatList
} from 'react-native'
import React, { Component } from 'react'

// マストドンの設定を以下に記述(トークンは書き換えてください) --- (※1)
const mstdnToken = 'f65e1d0182f57b7b06d05fa5e91...42c24f5'
const apiUrl = 'https://pawoo.net/api/v1/'

// マストドンのAPIを利用する関数を定義 --- (※2)
function callAPI (uri, options, callback) {
  options.headers = {
    'Authorization': 'Bearer ' + mstdnToken,
    'Content-Type': 'application/json'
  }
  console.log(options)
  fetch(apiUrl + uri, options)
    .then((response) => response.json())
    .then(data => {
      console.log(data)
      callback(data)
    })
    .catch((error) => {
      console.error(error)
    })
}

// マストドンのクライアントアプリのメインコンポーネント --- (※3)
export default class MastodonClient extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: mstdnToken,
      timelines: [],
      tootdata: ''
    }
    this.loadTimelines()
  }
  // APIを呼びだしてタイムラインを読む --- (※4)
  loadTimelines () {
    callAPI('timelines/home', {method: 'GET'}, e => {
      this.setState({timelines: e})
    })
  }
  // メイン画面を描画 --- (※5)
  render () {
    return (
      <View style={styles.container}>
        {this.renderEditor()}
        <FlatList
          keyExtractor={item => item.id}
          data={this.state.timelines}
          renderItem={e => this.renderTimelines(e)}
          />
      </View>
    )
  }
  // エディタ部分 --- (※6)
  renderEditor () {
    return (
      <View style={styles.inputview}>
        <TextInput
          style={styles.input}
          value={this.state.tootdata}
          onChangeText={e =>
            this.setState({tootdata: e})}
          placeholder='今、何してる？'
          />
        <Button title='トゥート'
          style={styles.tootButton}
          onPress={e => this.toot(e)} />
      </View>
    )
  }
  // タイムラインの各アイテムを描画 --- (※7)
  renderTimelines (item) {
    const e = item.item
    const src = {uri: e.account.avatar}
    // 表示名の確認 --- (※8)
    let name = e.account.display_name
    if (!name) name = e.account.acct
    return (
      <View style={styles.item} key={e.id}>
        <View style={styles.avatar}>
          <Image source={src}
            style={styles.avatarImage} />
        </View>
        <View style={styles.itemText}>
          <Text style={styles.name}>{name}</Text>
          <WebView style={styles.body}
            automaticallyAdjustContentInsets={false}
            source={{html: e.content}}
          />
        </View>
      </View>
    )
  }
  // 発言処理 --- (※9)
  toot (e) {
    const options = {
      'method': 'POST',
      'body': JSON.stringify({
        'status': String(this.state.tootdata)
      })
    }
    callAPI('statuses', options, e => {
      console.log(e)
      this.loadTimelines()
      this.setState({'tootdata': ''})
    })
  }
}

// スタイルの指定 --- (※10)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  inputview: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    margin: 8,
    padding: 8,
    backgroundColor: '#fff0f0'
  },
  input: {
    width: 330,
    height: 40,
    backgroundColor: '#f0f0f0'
  },
  tootButton: {
    color: '#841584',
    padding: 4,
    margin: 4
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    marginBottom: 8
  },
  avatar: {
    height: 120,
    width: 100
  },
  itemText: {
    flexDirection: 'column',
    width: 250
  },
  avatarImage: {
    width: 100,
    height: 100
  },
  name: {
    padding: 4,
    margin: 4,
    fontSize: 14,
    backgroundColor: '#f0ffff'
  },
  body: {
    padding: 4,
    margin: 4,
    backgroundColor: 'transparent'
  }
})
