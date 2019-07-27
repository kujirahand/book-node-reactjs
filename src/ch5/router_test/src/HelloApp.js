import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// React Routerを使ったメインコンポーネントの定義 --- (※1)
const HelloApp = () => (
  <Router>
    <div style={{margin: 20}}>
      <Route exact path='/' component={Home} />
      <Route path='/ja' component={HelloJapanese} />
      <Route path='/en' component={HelloEnglish} />
      <Route path='/cn' component={HelloChinese} />
    </div>
  </Router>
)

// ホーム画面を表すコンポーネントを定義 --- (※2)
const Home = () => (
  <div>
    <h1>Hello App</h1>
    <p>言語を選択してください</p>
    <ul>
      <li><a href='/ja'>日本語</a></li>
      <li><a href='/en'>英語</a></li>
      <li><a href='/cn'>中国語</a></li>
    </ul>
  </div>
)

// 日本語画面を表すコンポーネントを定義 --- (※3)
const HelloJapanese = () => (
  <div>
    <h1>こんにちは</h1>
    <p><a href='/'>戻る</a></p>
  </div>
)

// 英語画面を表すコンポーネントを定義 --- (※4)
const HelloEnglish = () => (
  <div>
    <h1>Hello</h1>
    <p><a href='/'>Back</a></p>
  </div>
)

// 中国語画面を表すコンポーネントを定義 --- (※5)
const HelloChinese = () => (
  <div>
    <h1>你好</h1>
    <p><a href='/'>返回</a></p>
  </div>
)

export default HelloApp
