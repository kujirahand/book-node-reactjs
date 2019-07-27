import React, {Component} from 'react'

// 数字入力コンポーネント
export default class NumberForm extends Component {
  constructor (props) {
    super(props)
    this.state = { value: '' }
  }
  // 値が変更されたとき --- (※1)
  doChange (e) {
    const curValue = e.target.value
    // 数字以外は削除
    const newValue = curValue.replace(/[^0-9]/g, '')
    this.setState({value: newValue})
  }
  // 送信ボタンが押されたとき
  doSubmit (e) {
    window.alert('値を送信: ' + this.state.value)
    e.preventDefault()
  }
  // 画面の描画 --- (※4)
  render () {
    // イベントをメソッドにバインド
    const doSubmit = (e) => this.doSubmit(e)
    const doChange = (e) => this.doChange(e)
    return (
      <form onSubmit={doSubmit}>
        <input type='text'
          value={this.state.value}
          onChange={doChange} />
        <input type='submit' value='送信' />
      </form>
    )
  }
}
