<template>
  <transition name="slide">
    <div class="singer-detail"></div>
  </transition>  
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '@api/singer'
import { ERR_OK } from '@api/config'

export default {
  created() {
    this._getDetail()
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  methods: {
    async _getDetail() {
      if (!this.singer.id) {
        this.$router.replace('/singer')
      }
      const [err, res] = await getSingerDetail(this.singer.id)
      if (!err && res.code === ERR_OK) {
        console.log(res.data.list)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/variable";

.singer-detail
  position fixed
  z-index 100
  top 0
  right 0
  bottom 0
  left 0
  background $color-background

.slide-enter-active, .slide-leave-active
  transition 300ms
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
