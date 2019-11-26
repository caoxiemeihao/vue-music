<template>
  <div class="singer">
    
  </div>
</template>

<script>
import { getSingerList } from '@api/singer'
import { ERR_OK } from '@api/config'
import Singer from '@common/js/singer'

const HOT_NAME = '热门'
const HOT_SINGER_SIZE = 10

export default {
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    async _getSingerList() {
      const [err, res] = await getSingerList()
      if (!err && res.code === ERR_OK) {
        this.singers = res.data.list
        console.log(this._normalizeSinger(this.singers))
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
      for (const [key, val] of Object.entries(map)) {
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
    }
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
