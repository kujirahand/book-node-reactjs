import React from 'react'
import ReactDOM from 'react-dom'

class CBoxForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { check: true }
  }
  render () {
    // フォームにチェックボックスを指定
    return (<div>
      <form onSubmit={e => this.doSubmit(e)}>
        <label>
          <input type='checkbox'
            onChange={e => this.doChange(e)}
            checked={this.state.check}
            />食べる
        </label><br />
        <input type='submit' value='決定' />
      </form>
    </div>)
  }
  // チェックボックスをクリックしたとき
  doChange (e) {
    this.setState({ check: !this.state.check })
  }
  // フォームを送信したとき
  doSubmit (e) {
    e.preventDefault()
    window.alert(this.state.check ? '食べる' : '食べない')
  }
}

ReactDOM.render(
  <CBoxForm />,
  document.getElementById('root')
)
