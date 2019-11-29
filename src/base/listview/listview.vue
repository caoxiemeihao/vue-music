<template>
  <scroll class="listview" :data="list" ref="listview">
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
          :index="idx">
          {{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@base/scroll/scroll'
import { getData } from '@common/js/dom'

const ANCHOR_HEIGHT = 18

export default {
  created() {
    this.touch = {}
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Scroll
  },
  computed: {
    shortcutList() {
      return this.list.map(group => group.title.charAt(0))
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
    _scrollTo(index) {
      this.$refs.listview.scrollToElement(this.$refs.listgroup[index], 0)
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
