import {
  SET_SEQUENCE_LIST,
  SET_PLAYLIST,
  SET_CURRENT_INDEX,
  SET_FULL_SCREEN,
  SET_PLAYING_STATE
} from './mutation-types'

export const selectPlay = function (
  { commit, state }, { list, index }) {
  commit(SET_SEQUENCE_LIST, list)
  commit(SET_PLAYLIST, list)
  commit(SET_CURRENT_INDEX, index)
  commit(SET_FULL_SCREEN, true)
  commit(SET_PLAYING_STATE, true)
}
