// 加密字符串模块
const crypto = require('crypto')
const encryptStr = 'wupeng is a handsome man' //  签名字符串

module.exports = (password, key = encryptStr) => {
  const hmac = crypto.createHash("sha256", key)
  hmac.update(password)
  const passwordHmac = hmac.digest("hex")
  return passwordHmac
}
