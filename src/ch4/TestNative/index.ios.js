// 必要なモジュールの宣言
import React, { Component } from 'react'
import {
  AppRegistry, StyleSheet, Text, View
} from 'react-native'

// メインコンポーネントの宣言 --- (※1)
export default class TestNative extends Component {
  render () {
    // 配列データを定義 --- (※2)
    const lines = [
      '生まれるのに時あり', '死ぬのに時がある', '---',
      '泣くのに時があり', '笑うのに時がある', '---',
      '黙っているのに時があり', '話すのに時がある'
    ]
    // 配列データを元に複数のコンポーネントを生成 --- (※3)
    const textLines = lines.map((e, i) => {
      return <Text
        style={styles.line}
        key={e + i} children={e} />
    })
    return (
      <View style={styles.container}>
        {textLines}
      </View>
    )
  }
}

// スタイルシートを宣言
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  line: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
})

// メインコンポーネントを登録 --- (※4)
AppRegistry.registerComponent('TestNative', () => TestNative)
