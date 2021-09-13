import {call, put, takeLatest } from "redux-saga/effects";
import { API, graphqlOperation } from 'aws-amplify'
import { listHikes } from '../../graphql/queries'

function* fetchHikesList() {
  console.log('listTODO', listHikes);
  try {
    const result = yield call([API, 'graphql'], graphqlOperation(listHikes, { limit: 100 }))
    yield put({
      type: 'SET_HIKE_LIST',
      payload: result.data.listHikes.items
    })
  } catch (err) { console.log('error fetching todos', err) }
}

function* hikesSaga() {
  yield takeLatest('FETCH_HIKES_LIST', fetchHikesList);
}

export default hikesSaga;