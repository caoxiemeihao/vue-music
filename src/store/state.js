import { PLAY_MODE } from '@common/js/config'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: PLAY_MODE.sequence,
  currentIndex: -1,
}

export default state
