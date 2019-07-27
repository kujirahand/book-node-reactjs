import React from 'react'
import ReactDOM from 'react-dom'

class SelectForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: props.items,
      value: props.value
    }
  }
  render () {
    // セレクトボックスの選択肢を生成
    const options = this.state.items.map(i => {
      return (<option key={i}
        value={i}> {i}
      </option>)
    })
    // フォームにセレクトボックスを指定
    return (<div>
      <form onSubmit={e => this.doSubmit(e)}>
        <select
          value={this.state.value}
          onChange={e => this.doChange(e)}>
          {options}
        </select><br />
        <input type='submit' />
      </form>
    </div>)
  }
  // セレクトボックスを変更したとき
  doChange (e) {
    this.setState({ value: e.target.value })
  }
  // フォームを送信したとき
  doSubmit (e) {
    e.preventDefault()
    window.alert(this.state.value)
  }
}

ReactDOM.render(
  <SelectForm
    items={['チョコ', '梅干し', 'ラムネ']}
    value='ラムネ' />,
  document.getElementById('root')
)
