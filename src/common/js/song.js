import { getLyric } from '@api/song'
import { ERR_OK } from '@api/config'
import { Base64 } from 'js-base64'

export default class Song {
  constructor({
    id,
    mid,
    singer,
    name,
    album,
    duration,
    image,
    url
  }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  async getLyric() {
    if (this.lyric) {
      return [null, this.lyric]
    }
    const res = await getLyric(this.mid)
    if (res.retcode === ERR_OK) {
      this.lyric = Base64.decode(res.lyric)
      // eslint-disable-next-line
      console.log(this.lyric)
      return [null, this.lyric]
    } else {
      return [res]
    }
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    duration: musicData.interval,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}

function filterSinger(singer) {
  if (!singer) {
    return ''
  }
  return singer.map(s => s.name).join('/')
}
