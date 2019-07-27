import React, {Component} from 'react'

// 複数テキストの入力コンポーネント
export default class MultiForm extends Component {
  constructor (props) {
    super(props)
    // フォームの初期値を設定する--- (※1)
    this.state = {
      name: 'クジラ',
      age: 22,
      hobby: '読書'
    }
  }
  // 値が変更されたとき --- (※2)
  doChange (e) {
    const userValue = e.target.value
    const key = e.target.name
    this.setState({[key]: userValue})
  }
  // 送信ボタンが押されたとき
  doSubmit (e) {
    e.preventDefault()
    const j = JSON.stringify(this.state)
    window.alert(j)
  }
  // 画面の描画 --- (※3)
  render () {
    // イベントをメソッドにバインド
    const doSubmit = (e) => this.doSubmit(e)
    const doChange = (e) => this.doChange(e)
    return (
      <form onSubmit={doSubmit}>
        <div><label>
          名前: <br />
          <input name='name'
            type='text'
            value={this.state.name}
            onChange={doChange} />
        </label></div>
        <div><label>
          年齢: <br />
          <input name='age'
            type='number'
            value={this.state.age}
            onChange={doChange} />
        </label></div>
        <div><label>
          趣味: <br />
          <input name='hobby'
            type='text'
            value={this.state.hobby}
            onChange={doChange} />
        </label></div>
        <input type='submit' value='送信' />
      </form>
    )
  }
}
