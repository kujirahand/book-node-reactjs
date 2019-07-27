import React, {Component} from 'react'
import PropTypes from 'prop-types'

// 汎用的な入力コンポーネント
export default class FormInput extends Component {
  // 状態を初期化 --- (※1)
  constructor (props) {
    super(props)
    const v = this.props.value
    this.state = {
      value: v,
      isOK: this.checkValue(v)
    }
  }
  // パターンに合致するかチェック --- (※2)
  checkValue (s) {
    if (this.props.pattern === null) {
      return true
    }
    return this.props.pattern.test(s)
  }
  // 値がユーザーにより変更されたとき --- (※3)
  handleChange (e) {
    const v = e.target.value
    // フィルタが指定されていればフィルタを適用
    const filter = this.props.filter
    let newValue = v
    if (filter !== null) {
      newValue = newValue.replace(filter, '')
    }
    const newIsOK = this.checkValue(newValue)
    this.setState({ // 状態を更新
      value: newValue,
      isOK: newIsOK
    })
    // イベントを実行する --- (※4)
    if (this.props.onChange) {
      this.props.onChange({
        target: this,
        value: newValue,
        isOK: newIsOK,
        name: this.props.name
      })
    }
  }
  // プロパティが変更されたとき
  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.value,
      isOK: this.checkValue(nextProps.value)
    })
  }
  // 描画 --- (※5)
  render () {
    const msg = this.renderStatusMessage()
    return (<div>
      <label>{this.props.label}: <br />
        <input type='text'
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={e => this.handleChange(e)} />
        {msg}
      </label>
    </div>)
  }
  renderStatusMessage () {
    const so = {
      margin: '8px',
      padding: '8px',
      color: 'white'
    }
    let msg = null
    if (this.state.isOK) {
      // OKのとき
      so.backgroundColor = 'green'
      msg = <span style={so}>OK</span>
    } else {
      // NGのとき (ただし空白の時は非表示)
      if (this.state.value !== '') {
        so.backgroundColor = 'red'
        msg = <span style={so}>NG</span>
      }
    }
    return msg
  }
}

// プロパティの型を定義 --- (※6)
FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  filter: PropTypes.object,
  pattern: PropTypes.object,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

// プロパティの初期値を定義 --- (※7)
FormInput.defaultProps = {
  filter: null,
  pattern: null,
  value: '',
  placeholder: '',
  onChange: null
}
