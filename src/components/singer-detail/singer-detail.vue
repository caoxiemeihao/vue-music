<template>
  <transition name="slide">
    <music-list
      :songs="songs"
      :bg-image="bgImage"
      :title="title"
    />
  </transition>  
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '@api/singer'
import { ERR_OK } from '@api/config'
import { createSong } from '@common/js/song'
import MusicList from '@comps/music-list/music-list'

export default {
  created() {
    this._getDetail()
  },
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    }
  },
  components: {
    MusicList
  },
  methods: {
    async _getDetail() {
      if (!this.singer.id) {
        this.$router.replace('/singer')
      }
      const [err, res] = await getSingerDetail(this.singer.id)
      if (!err && res.code === ERR_OK) {
        this.songs = this._normalizeSongs(res.data.list)
        console.log(this.songs)
      }
    },
    _normalizeSongs(list) {
      return list.map(({ musicData }) => {
        let song = null
        if (musicData.songid && musicData.albummid) {
          song = createSong(musicData) 
        }
        return song
      }).filter(_ => _)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/variable";

.slide-enter-active, .slide-leave-active
  transition 300ms
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
