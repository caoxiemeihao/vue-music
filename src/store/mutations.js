import {
  SET_SINGER,
  SET_PLAYING_STATE,
  SET_FULL_SCREEN,
  SET_PLAYLIST,
  SET_SEQUENCE_LIST,
  SET_PLAY_MODE,
  SET_CURRENT_INDEX,
} from './mutation-types'

const mutations = {
  [SET_SINGER](state, singer) {
    state.singer = singer
  },
  [SET_PLAYING_STATE](state, bool) {
    state.playing = bool
  },
  [SET_FULL_SCREEN](state, bool) {
    state.fullScreen = bool
  },
  [SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  }
}

export default mutations
