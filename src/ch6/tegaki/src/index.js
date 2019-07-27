import React from 'react'
import ReactDOM from 'react-dom'
import request from 'superagent'
import styles from './styles'

// 定数の定義
const numRows = 28
const numCols = 28
const numPixels = numRows * numCols
const sizeRow = 10
const sizeCol = 10

// 文字認識クライアントのメインコンポーネント
class TegakiApp extends React.Component {
  constructor (props) {
    super(props)
    this.canvas = this.ctx = null
    this.state = {
      isDown: false, // マウスが押されているか
      pixels: null, // 画像データ
      label: '?' // 予測結果
    }
  }
  componentDidMount () {
    this.clearPixels()
  }
  // 画像データをクリア --- (※1)
  clearPixels () {
    const p = []
    for (let i = 0; i < numPixels; i++) p.push(0)
    this.setState({
      pixels: p,
      label: '?'
    })
  }
  // コンポーネントが描画された後の処理 --- (※2)
  componentDidUpdate () {
    this.drawCanvas()
  }
  // canvasの描画処理 --- (※3)
  drawCanvas () {
    if (!this.canvas) return
    if (!this.ctx) this.ctx = this.canvas.getContext('2d')
    this.ctx.clearRect(0, 0, 280, 280)
    // 補助線を描画
    this.ctx.strokeStyle = 'silver'
    this.ctx.moveTo(140, 0)
    this.ctx.lineTo(140, 280)
    this.ctx.moveTo(0, 140)
    this.ctx.lineTo(280, 140)
    this.ctx.stroke()
    // ドットを描画 --- (※4)
    this.ctx.fillStyle = 'blue'
    for (let y = 0; y < 28; y++) {
      for (let x = 0; x < 28; x++) {
        const p = this.state.pixels[y * numRows + x]
        if (p === 0) continue
        const xx = x * sizeCol
        const yy = y * sizeRow
        this.ctx.fillRect(xx, yy, sizeCol, sizeRow)
      }
    }
  }
  // マウス処理 --- (※5)
  doMouseDown (e) {
    e.preventDefault()
    this.setState({isDown: true})
  }
  doMouseUp (e) {
    e.preventDefault()
    this.setState({isDown: false})
    this.predictLabel()
  }
  doMouseMove (e) {
    e.preventDefault()
    if (!this.state.isDown) return
    const eve = e.nativeEvent
    const b = e.target.getBoundingClientRect()
    const rx = eve.clientX - b.left
    const ry = eve.clientY - b.top
    const x = Math.floor(rx / sizeCol)
    const y = Math.floor(ry / sizeRow)
    const pixels = this.state.pixels
    pixels[y * numRows + x] = 0xF
    this.setState({pixels})
  }
  // 文字認識APIを呼ぶ --- (※6)
  predictLabel () {
    const px = this.state.pixels.map(
      v => v.toString(16)).join('')
    request
      .get('/api/predict')
      .query({px})
      .end((err, res) => {
        if (err) return
        if (res.body.status) {
          this.setState({label: res.body.label})
        }
      })
  }
  // 描画処理 --- (※7)
  render () {
    return (
      <div style={styles.app}>
        <canvas ref={(e) => { this.canvas = e }}
          width={280} height={280} style={styles.canvas}
          onMouseDown={e => this.doMouseDown(e)}
          onMouseMove={e => this.doMouseMove(e)}
          onMouseUp={e => this.doMouseUp(e)}
          onMouseOut={e => this.doMouseUp(e)} />
        <p style={styles.predict}>予測: {this.state.label}</p>
        <button onClick={e => this.clearPixels()}>
        クリア</button>
      </div>
    )
  }
}

// DOMにメインコンポーネントを書き込む
ReactDOM.render(
  <TegakiApp />,
  document.getElementById('root'))
