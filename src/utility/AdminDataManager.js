// 本地保存管理员信息
function saveUserData (user, userType) {
  window.localStorage.setItem('userId', user.id)
  window.localStorage.setItem('nickname', user.nickname)
  window.localStorage.setItem('avatarUrl', user.avatarUrl)
  window.localStorage.setItem('mobile', user.mobile)
  window.localStorage.setItem('token', user.token)
  window.localStorage.setItem('qiniuToken', user.qiniuToken)
  window.localStorage.setItem('userType', userType)
  window.localStorage.setItem('wechatBindStatus', user.wechatBindStatus)
}

// 本地清除管理员信息
function clearUserData () {
  window.localStorage.setItem('userId', '')
  window.localStorage.setItem('nickname', '')
  window.localStorage.setItem('avatarUrl', '')
  window.localStorage.setItem('mobile', '')
  window.localStorage.setItem('token', '')
  window.localStorage.setItem('qiniuToken', '')
  window.localStorage.clear()
}

module.exports = {
  methods: {
    saveUserData: saveUserData,
    clearUserData: clearUserData
  }
}
