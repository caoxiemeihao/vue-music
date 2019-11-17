import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.includes('?') ? '&' : '?') + paramProcessor(data)
  return new Promise(resolve => {
    originJSONP(url, option, (err, data) => {
      if (err) {
        resolve([null, data])
      } else {
        resolve([err, null])
      }
    })
  })
}

function paramProcessor(data) {
  let url = ''
  Object.keys(data).forEach(k => {
    const val = data[k] || ''
    url += `&${k}=${encodeURIComponent(val)}`
  })
  return url ? url.substring(1) : ''
}
