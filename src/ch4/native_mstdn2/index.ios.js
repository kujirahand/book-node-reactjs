import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Button,
  WebView,
  FlatList
} from 'react-native'

// マストドンの設定を以下に記述
const apiUrl = 'https://pawoo.net/api/v1/'
const mstdnToken = 'f65e1d0182f57b7b06d05fa5e91881674706e4498727f65adb0c52b9f42c24f5'

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

export default class NativeMstdnCli extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: mstdnToken,
      timelines: [],
      tootdata: ''
    }
    this.loadTimelines()
  }
  loadTimelines () {
    callAPI('timelines/home', {method: 'GET'}, e => {
      this.setState({timelines: e})
    })
  }
  render () {
    return (
      <View style={styles.container}>
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
        <FlatList
          keyExtractor={item => item.id}
          data={this.state.timelines}
          renderItem={e => this.renderTimelines(e)}
          />
      </View>
    )
  }
  renderTimelines (item) {
    const e = item.item
    const src = {uri: e.account.avatar}
    let name = e.account.display_name
    if (!name) name = e.account.acct
    return (
      <View style={styles.row} key={e.id}>
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
  row: {
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

AppRegistry.registerComponent('NativeMstdnCli', () => NativeMstdnCli)
