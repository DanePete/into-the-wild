import {call, put, takeLatest } from "redux-saga/effects";
import { API, graphqlOperation } from 'aws-amplify'
import { listHikes } from '../../graphql/queries'
import { getHikes } from '../../graphql/queries'

function* fetchHikesList() {
  try {
    const result = yield call([API, 'graphql'], graphqlOperation(listHikes, { limit: 100 }))
    yield put({
      type: 'SET_HIKE_LIST',
      payload: result.data.listHikes.items
    })
  } catch (err) { console.log('error fetching todos', err) }
}

function* fetchHikeDetails(action) {
  console.log('action.payload yo', action.payload);
  try {
    const result = yield call([API, 'graphql'], graphqlOperation(getHikes, { id: action.payload.id }))
    console.log('result', result.data.getHikes);
    yield put({
      type: 'SET_HIKE_DETAILS',
      payload: result.data.getHikes
    })
  } catch (err) { console.log('error fetching todos', err) }
}

function* hikesSaga() {
  yield takeLatest('FETCH_HIKES_LIST', fetchHikesList);
  yield takeLatest('FETCH_HIKE_DETAILS', fetchHikeDetails);
}

export default hikesSaga;