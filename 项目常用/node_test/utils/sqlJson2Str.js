module.exports = (jsonData) => {
  let str = ""
  for (let key in jsonData) {
    str += `${key}='${jsonData[key]}',`
  }
  return str.substring(0, str.length - 1)
}