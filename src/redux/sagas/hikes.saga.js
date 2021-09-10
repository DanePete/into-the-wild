import axios from "axios";
import {call, put, takeLatest } from "redux-saga/effects";
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from '../../graphql/mutations'
import { listTodos } from '../../graphql/queries'

function* fetchHikesList() {
  console.log('listTODO', listTodos);
  try {
    const result = yield call([API, 'graphql'], graphqlOperation(listTodos, { limit: 100 }))

    // const todoData =  API.graphql(graphqlOperation(listTodos))
    // const todos = todoData.data.listTodos.items
    console.log('saga todos', result);
    yield put({
      type: 'SET_HIKE_LIST',
      payload: result
    })
  } catch (err) { console.log('error fetching todos', err) }
}

function* hikesSaga() {
  yield takeLatest('FETCH_HIKES_LIST', fetchHikesList);
}

export default hikesSaga;