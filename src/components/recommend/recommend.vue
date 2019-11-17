<template>
  <div class="recommend" :data="discList">
    <scroll ref="scroll" class="recommend-content">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="(item, idx) of recommends" :key="idx">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, idx) of discList" :key="idx" class="item">
              <div class="icon">
                <img @load="loadImage" :src="item.imgurl" width="60" height="60" alt="">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@base/scroll/scroll'
import Slider from '@base/slider/slider'
import { getRecommend, getDiscList } from '@api/recommend'
import { ERR_OK } from '@api/config'

export default {
  name: 'recommend',
  data() {
    return {
      recommends: [],
      discList: [],
    }
  },
  components: {
    Slider,
    Scroll,
  },
  created() {
    this._getRedommend()
    this._getDiscList()
  },
  methods: {
    async _getRedommend() {
      const [err, res] = await getRecommend()
      if (!err && res.code === ERR_OK) {
        this.recommends = res.data.slider
      }
    },
    async _getDiscList() {
      const [err, res] = await getDiscList()
      if (!err && res.code === ERR_OK) {
        this.discList = res.data.list
      }
    },
    loadImage() {
      if (!this.checkLoaded) {
        this.$refs.Scroll.refresh()
        this.checkLoaded = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/variable"

.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .recommend-content
    height: 100%
    overflow: hidden
    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>