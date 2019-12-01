import {
  SET_SINGER
} from './mutation-types'

const mutations = {
  [SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default mutations
