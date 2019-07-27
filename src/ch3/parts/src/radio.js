import React from 'react'
import ReactDOM from 'react-dom'

class RadioForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: props.items,
      value: ''
    }
  }
  render () {
    // ラジオの選択肢を生成
    const radiolist = this.state.items.map(i => {
      return (<div key={i}>
        <label>
          <input type='radio'
            name='items' value={i}
            checked={this.state.value === i}
            onChange={e => this.doChange(e)} /> {i}
        </label>
      </div>)
    })
    // フォームにラジオ一覧を指定
    return (<div>
      <form onSubmit={e => this.doSubmit(e)}>
        {radiolist}
        <input type='submit' />
      </form>
    </div>)
  }
  // ラジオボックスを変更したとき
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
  <RadioForm items={['チョコ', '梅干し', 'ラムネ']} />,
  document.getElementById('root'))
