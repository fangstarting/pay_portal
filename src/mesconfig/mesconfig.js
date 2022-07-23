const obj = {
  educations: [{ name: '专科' }, { name: '本科' }, { name: '研究生' }],
  messStatus: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '未读',
      value: 0
    },
    {
      label: '已读',
      value: 1
    }
  ],
  T0001: 'T0001'
}
//Loading 组件属性
const options = {
  fullscreen: true,
  lock: false,//lock的修改符--默认是false
  text: 'Loading',//显示在加载图标下方的加载文案
  spinner: 'el-icon-loading',//自定义加载图标类名
  background: 'rgba(0, 0, 0, 0.7)',//遮罩层颜色
  // target: document.querySelector('#table')//loadin覆盖的
}

const message = {
  M0001: 'test测试'
}

export { obj, message, options }