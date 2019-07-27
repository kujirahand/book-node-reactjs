// 必要なモジュールを読み込む --- (※1)
import React, { Component } from 'react'
import {
  AppRegistry, StyleSheet, Text, View
} from 'react-native'

// メインコンポーネントの定義 --- (※2)
export default class TestNative extends Component {
  render() {
    const msg =
      '石を捨てるのに時があり\n' +
      '石を集めるのに時がある'
    return (
      <View style={styles.base}>
        <Text style={styles.title}>{msg}</Text>
      </View>
    )
  }
}

// スタイルの設定 --- (※3)
const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0FF'
  },
  title: {
    fontSize: 46
  }
})

// アプリにコンポーネントを登録 --- (※4)
AppRegistry.registerComponent('TestNative', () => TestNative)
