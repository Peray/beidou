

// 手机号验证
export function isvalidPhone(str) {
  const reg = /^1[34578]\d{9}$/
  return reg.test(str)
}

//邮箱
export function isvalidEmail(str) {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(str)
}

//字母+数字不6-18位密码
export function isvalidPassword(str) {
  const reg = /^[a-zA-Z]\w{5,17}$/
  return reg.test(str)
}

//8位数字验证
export function isvalidNumber(str) {
  const reg = /^\d{8}$/
  return reg.test(str)
}
  