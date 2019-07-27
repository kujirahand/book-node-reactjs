import React from 'react'
import ReactDOM from 'react-dom'
import styles from './styles.js'

// Socket.IOでWebSocketサーバに接続する --- (※1)
import socketio from 'socket.io-client'
const socket = socketio.connect('http://localhost:3001')

// 書き込みフォームのコンポーネント --- (※2)
class ChatForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { name: '', message: '' }
  }
  nameChanged (e) {
    this.setState({name: e.target.value})
  }
  messageChanged (e) {
    this.setState({message: e.target.value})
  }
  // サーバに名前とメッセージを送信 --- (※3)
  send () {
    socket.emit('chat-msg', {
      name: this.state.name,
      message: this.state.message
    })
    this.setState({message: ''}) // フィールドをクリア
  }
  render () {
    return (
      <div style={styles.form}>
        名前:<br />
        <input value={this.state.name}
          onChange={e => this.nameChanged(e)} /><br />
        メッセージ:<br />
        <input value={this.state.message}
          onChange={e => this.messageChanged(e)} /><br />
        <button onClick={e => this.send()}>送信</button>
      </div>
    )
  }
}

// チャットアプリのメインコンポーネント定義 --- (※4)
class ChatApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      logs: []
    }
  }
  // コンポーネントがマウントされたとき --- (※5)
  componentDidMount () {
    // リアルタイムにログを受信するように設定
    socket.on('chat-msg', (obj) => {
      const logs2 = this.state.logs
      obj.key = 'key_' + (this.state.logs.length + 1)
      console.log(obj)
      logs2.unshift(obj) // 既存ログに追加
      this.setState({logs: logs2})
    })
  }
  render () {
    // ログ一つずつの描画内容を生成 --- (※6)
    const messages = this.state.logs.map(e => (
      <div key={e.key} style={styles.log}>
        <span style={styles.name}>{e.name}</span>
        <span style={styles.msg}>: {e.message}</span>
        <p style={{clear: 'both'}} />
      </div>
    ))
    return (
      <div>
        <h1 style={styles.h1}>リアルタイムチャット</h1>
        <ChatForm />
        <div>{messages}</div>
      </div>
    )
  }
}

// DOMにメインコンポーネントを書き込む
ReactDOM.render(
  <ChatApp />,
  document.getElementById('root'))
