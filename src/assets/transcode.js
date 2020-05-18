const iconvLite = require('iconv-lite');
const axios = require('axios');
module.exports = {
  $request(path) {
    let url = "https://www.qqxs.cc/";
    path ? url += path : url + "";
    return new Promise((resulve, reject) => {
      axios({
        method: 'get',
        url,
        responseType: 'stream'
      })
        .then(result => {
          resulve(result.data)
        })
        .catch(err => {
          reject(null)
        })
    });
  },
  async $transcode(path) {
    let _stream = []
    let responseStream = await this.$request(path)
    let html = null
    if (responseStream !== null) {
      html = await this.bufferString(_stream, responseStream)
      return html;
    } else {
      return null
    }
  },
  bufferString(_stream, responseStream) {
    return new Promise((resulve, reject) => {
      responseStream.on('data', data => {
        _stream.push(data)
      })
      responseStream.on('error', err => {
        reject(err)
      })
      responseStream.on('end', () => {
        let buffer = Buffer.concat(_stream);
        html = iconvLite.decode(buffer, 'gbk');
        resulve(html)
        console.log('gbk_html转码成功')
      })
    })
  },
};