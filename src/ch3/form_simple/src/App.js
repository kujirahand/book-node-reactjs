import React, { Component } from 'react'
import { SimpleForm } from './SimpleForm'
import './App.css'
// メイン画面のコンポーネント
export default class App extends Component {
  render () {
    return (
      <div className='App'>
        <SimpleForm />
      </div>
    )
  }
}
