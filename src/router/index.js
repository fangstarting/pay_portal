import Vue from 'vue'
import Router from 'vue-router'

//pay
import Pay from '@/components/Pay'
import PayLogin from '@/components/pay/PayLogin'
import PayUserActivate from '@/components/pay/PayUserActivate'
import PaySystems from '@/components/pay/PaySystems'
import PayAudit from '@/components/pay/PayAudit'
import PayUserList from '@/components/pay/PayUserList'
import PayDept from '@/components/pay/PayDept'
import PayPosition from '@/components/pay/PayPosition'
import PayUserInfo from '@/components/pay/PayUserInfo'
import PayCheckInfo from '@/components/pay/PayCheckInfo'
import PayClockIn from '@/components/pay/PayClockIn'
import PayHome from '@/components/pay/PayHome'
import PayConfig from '@/components/pay/PayConfig'
import PayUserMessage from '@/components/pay/PayUserMessage'
import PayEchartsCheck from '@/components/pay/PayEchartsCheck'
import PayEchartsSalary from '@/components/pay/PayEchartsSalary'
import PayEchartsStaff from '@/components/pay/PayEchartsStaff'
import PayJobgrade from '@/components/pay/PayJobgrade'
import PayAccounting from '@/components/pay/PayAccounting'
import PayCheckList from '@/components/pay/PayCheckList'
import PayCheckConfig from '@/components/pay/PayCheckConfig'
import PayAuditCenter from '@/components/pay/PayAuditCenter'
import PaySalaryCenter from '@/components/pay/PaySalaryCenter'
import PayLogger from '@/components/pay/PayLogger'
import PayRolePower from '@/components/pay/PayRolePower'
import PayDdos from '@/components/pay/PayDdos'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    //pay
    //pay登录路由
    {
      path: '/login',
      name: 'PayLogin',
      component: PayLogin
    },
    //pay主路由部署
    {
      path: '/pay',
      name: 'Pay',
      component: Pay,
      children: [
        {
          path: '/pay/home',
          name: 'PayHome',
          component: PayHome
        },
        {
          path: '/pay/activate',
          name: 'PayUserActivate',
          component: PayUserActivate
        },
        {
          path: '/pay/systems',
          name: 'PaySystems',
          component: PaySystems
        },
        {
          path: '/pay/audit',
          name: 'PayAudit',
          component: PayAudit
        },
        {
          path: '/pay/userlist',
          name: 'PayUserList',
          component: PayUserList
        },
        {
          path: '/pay/dept',
          name: 'PayDept',
          component: PayDept
        },
        {
          path: '/pay/position',
          name: 'PayPosition',
          component: PayPosition
        },
        {
          path: '/pay/userinfo',
          name: 'PayUserInfo',
          component: PayUserInfo
        },
        {
          path: '/pay/checkinfo',
          name: 'PayCheckInfo',
          component: PayCheckInfo
        },
        {
          path: '/pay/clickin',
          name: 'PayClockIn',
          component: PayClockIn
        },
        {
          path: '/pay/config',
          name: 'PayConfig',
          component: PayConfig
        },
        {
          path: '/pay/message',
          name: 'PayUserMessage',
          component: PayUserMessage
        },
        {
          path: '/pay/echartscheck',
          name: 'PayEchartsCheck',
          component: PayEchartsCheck
        },
        {
          path: '/pay/echartssalary',
          name: 'PayEchartsSalary',
          component: PayEchartsSalary
        },
        {
          path: '/pay/echartsstaff',
          name: 'PayEchartsStaff',
          component: PayEchartsStaff
        },
        {
          path: '/pay/jobgrade',
          name: 'PayJobgrade',
          component: PayJobgrade
        },
        {
          path: '/pay/accounting',
          name: 'PayAccounting',
          component: PayAccounting
        },
        {
          path: '/pay/checklist',
          name: 'PayCheckList',
          component: PayCheckList
        },
        {
          path: '/pay/checkconfig',
          name: 'PayCheckConfig',
          component: PayCheckConfig
        },
        {
          path: '/pay/auditcenter',
          name: 'PayAuditCenter',
          component: PayAuditCenter
        },
        {
          path: '/pay/salarycenter',
          name: 'PaySalaryCenter',
          component: PaySalaryCenter
        },
        {
          path: '/pay/rolepower',
          name: 'PayRolePower',
          component: PayRolePower
        },
        {
          path: '/pay/logger',
          name: 'PayLogger',
          component: PayLogger
        },
        {
          path: '/pay/ddos',
          name: 'PayDdos',
          component: PayDdos
        },
        {
          path: '/pay/test',
          name: 'Test',
          component: Pay
        }
      ]
    },
  ]
})
