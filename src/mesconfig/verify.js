import idNumber from '@/assets/json/idNumber.js'

export const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error())
  } else {
    // if (this.reg.passwordVerify !== '') {
    // this.$refs.regData.validateField('passwordVerify')
    // }
    callback()
  }
}

export const validatePass2 = (rule, value1, value2, callback) => {
  if (value1 === '') {
    callback(new Error())
  } else if (value1 !== value2) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
export const phoenTest = (rule, value, callback) => {
  let reg = /^1[345789]\d{9}$/ //手机正则
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的手机号码!'))
    } else {
      callback()
    }
  }
}
export const rulesIdCard = (rule, value, callback) => {
  if (idNumber.cnid(value) === false) {
    callback('身份证信息错误')
  } else {
    callback()
  }
}
