<template>
  <div class="singer" ref="singer">
    <list-view :list="singers" @select="selectSinger" ref="list" />
    <router-view />
  </div>
</template>

<script>
import { getSingerList } from '@api/singer'
import { ERR_OK } from '@api/config'
import Singer from '@common/js/singer'
import ListView from '@base/listview/listview'
import { mapMutations } from 'vuex'
import { playlistMixin } from '@common/js/mixin'

const HOT_NAME = '热门'
const HOT_SINGER_SIZE = 10

export default {
  mixins: [playlistMixin],
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  components: {
    ListView
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    async _getSingerList() {
      const [err, res] = await getSingerList()
      if (!err && res.code === ERR_OK) {
        this.singers = this._normalizeSinger(res.data.list)
      }
    },
    _normalizeSinger(list) {
      const map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, idx) => {
        if (idx < HOT_SINGER_SIZE) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // map 排序
      const hot = []
      const ret = []
      for (const [, val] of Object.entries(map)) {
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return [...hot, ...ret]
    },
    handlePlaylist(playlist) {
      const bottom = playlist.lenght > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
  }
}
</script>

<style lang="stylus" scoped>
.singer
  position fixed
  top 88px
  bottom 0
  width 100%
</style>
