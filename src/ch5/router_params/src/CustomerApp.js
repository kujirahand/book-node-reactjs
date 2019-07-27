import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

// ユーザーの情報
const users = [
  {id: 1, name: '山田太郎', info: 'Web制作課 係長'},
  {id: 2, name: '佐々木次郎', info: 'Web制作課 部長'},
  {id: 3, name: '吉田三郎', info: 'Web制作課 デザイナー'}
]

// メインコンポーネントの定義 --- (※1)
const CustomerApp = () => (
  <Router>
    <div style={{margin: 20}}>
      <div>
        <Switch>
          <Route path='/user/:id' component={UserCard} />
          <Route component={UserList} />
        </Switch>
      </div>
    </div>
  </Router>
)

// ユーザー一覧を表示するコンポーネント --- (※2)
class UserList extends React.Component {
  render () {
    const ulist = users.map(e => (
      <li key={e.id}>
        <Link to={'/user/' + e.id}>{e.name}</Link>
      </li>
    ))
    return (<ul>{ulist}</ul>)
  }
}

// ユーザーの詳細を表示するコンポーネント --- (※3)
class UserCard extends React.Component {
  render () {
    const {params} = this.props.match
    const id = parseInt(params.id, 10)
    const user = users.filter(e => e.id === id)[0]
    return (
      <div>
        <div>{id}: {user.name} - {user.info}</div>
        <div><Link to='/'>→戻る</Link></div>
      </div>
    )
  }
}

export default CustomerApp
