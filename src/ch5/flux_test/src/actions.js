import {appDispatcher} from './appDispatcher.js'

// 今回利用するActionを準備
export const ActionType = {
  CHANGE_NAME: 'CHANGE_NAME',
  SUBMIT_NAME: 'SUBMIT_NAME'
}

// Actionの生成 ... Dispatcherに情報を投げる
export const Actions = {
  changeName: (name) => {
    if (name === null) return
    appDispatcher.dispatch({
      actionType: ActionType.CHANGE_NAME,
      value: name})
  },
  submitName: () => {
    appDispatcher.dispatch({
      actionType: ActionType.SUBMIT_NAME})
  }
}
