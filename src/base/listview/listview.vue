<template>
  <scroll
    class="listview"
    :data="list"
    :listenScroll="listenScroll"
    ref="listview"
    :probeType="probeType"
    @scroll="scroll">
    <ul>
      <li v-for="(group, idx1) of list" class="list-group" :key="idx1" ref="listgroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="(item, idx2) of group.items" :key="`${idx1}-${idx2}`">
            <img v-lazy="item.avatar" class="avatar" alt="" />
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>

    <div class="list-shortcut" @touchstart="onShortcut" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li
          v-for="(item, idx) of shortcutList"
          class="item"
          :key="idx"
          :index="idx"
          :class="{current: currentIndex===idx}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h2 class="fixed-title">
        {{fixedTitle}}
      </h2>
    </div>
    <div v-show="!list.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@base/scroll/scroll'
import Loading from '@base/loading/loading'
import { getData } from '@common/js/dom'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30

export default {
  created() {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  components: {
    Scroll,
    Loading
  },
  computed: {
    shortcutList() {
      return this.list.map(group => group.title.charAt(0))
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return '';
      }
      return this.list[this.currentIndex] ? this.list[this.currentIndex].title : ''
    }
  },
  methods: {
    onShortcut(ev) {
      const el = ev.target;
      const index = +getData(el, 'index')
      this.touch.y1 = ev.touches[0].pageY
      this.touch.anchorIndex = index
      this._scrollTo(index)
    },
    onShortcutTouchMove(ev) {
      this.touch.y2 = ev.touches[0].pageY
      const delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      const anchorIndex = this.touch.anchorIndex + delta
      this._scrollTo(anchorIndex)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        // 上下边界处理
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listgroup[index], 0)
    },
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listgroup
      let height = 0
      this.listHeight.push(height)
      Array.from(list).forEach((item) => {
        height += item.clientHeight
        this.listHeight.push(height)
      })
    }
  },
  watch: {
    list() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) {
      if (newY > 0) {
        // 顶部边界
        this.currentIndex = 0
        return
      }
      for (let i = 0; i < this.listHeight.length - 1; i++) {
        const height1 = this.listHeight[i]
        const height2 = this.listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      // 底部边界
      this.currentIndex = this.listHeight.length - 2
    },
    diff(newVal) {
      const fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT)
        ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable"

.listview
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  background: $color-background
  .list-group
    padding-bottom: 30px
    .list-group-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
    .list-group-item
      display: flex
      align-items: center
      padding: 20px 0 0 30px
      .avatar
        width: 50px
        height: 50px
        border-radius: 50%
      .name
        margin-left: 20px
        color: $color-text-l
        font-size: $font-size-medium
  .list-shortcut
    position: absolute
    z-index: 30
    right: 0
    top: 50%
    transform: translateY(-50%)
    width: 20px
    padding: 20px 0
    border-radius: 10px
    text-align: center
    background: $color-background-d
    font-family: Helvetica
    .item
      padding: 3px
      line-height: 1
      color: $color-text-l
      font-size: $font-size-small
      &.current
        color: $color-theme
  .list-fixed
    position: absolute
    top: 0
    left: 0
    width: 100%
    .fixed-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
