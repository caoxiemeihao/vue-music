import {
  SET_SEQUENCE_LIST,
  SET_PLAYLIST,
  SET_CURRENT_INDEX,
  SET_FULL_SCREEN,
  SET_PLAYING_STATE,
  SET_PLAY_MODE
} from './mutation-types'
import { PLAY_MODE } from '@common/js/config'
import { shuffle } from '@common/js/utils'

function findIndex(list, song) {
  return list.findIndex(_ => _.id === song.id)
}

export const selectPlay = function (
  // eslint-disable-next-line
  { commit, state }, { list, index }) {
  commit(SET_SEQUENCE_LIST, list)
  if (state.mode === PLAY_MODE.random) {
    const randomList = shuffle(list)
    commit(SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(SET_PLAYLIST, list)
  }
  commit(SET_CURRENT_INDEX, index)
  commit(SET_FULL_SCREEN, true)
  commit(SET_PLAYING_STATE, true)
}

export const randomPlay = function({ commit }, { list }) {
  commit(SET_PLAY_MODE, PLAY_MODE.random)
  commit(SET_SEQUENCE_LIST, list)
  commit(SET_PLAYLIST, shuffle(list))
  commit(SET_CURRENT_INDEX, 0)
  commit(SET_FULL_SCREEN, true)
  commit(SET_PLAYING_STATE, true)
}
