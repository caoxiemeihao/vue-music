import { mapGetters } from 'vuex'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    // 组件中如果实现了 handlePlaylist, 下面的方法会被覆盖
    handlePlaylist() {
      throw new Error('Component must be implement handlePlaylist method')
    }
  }
}