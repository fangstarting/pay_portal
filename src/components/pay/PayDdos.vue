<!-- demo -->
<template>
  <div>
    <div class="header">
      <el-divider>
        ☢️☢️☢️☢️☢️☢️☢️☢️☢️☢️☢️
        <h2>核弹攻击</h2>
        ☢️☢️☢️☢️☢️☢️☢️☢️☢️☢️☢️
      </el-divider>
    </div>
    <div class="d1">
      <el-form :model="ddosParam"
               status-icon
               :rules="ruleDdosParam"
               ref="ddosParamFrom"
               label-width="80px"
               class="demo-ruleForm">
        <el-form-item label="接口地址"
                      prop="api">
          <el-input type="text"
                    v-model="ddosParam.api"
                    autocomplete="off"
                    prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="请求类型"
                      prop="type">
          <el-radio-group v-model="ddosParam.type">
            <el-radio label="GET"></el-radio>
            <el-radio label="POST"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="攻击频率"
                      prop="interval">
          <el-input type="text"
                    oninput="value=value.replace(/\D/g,'')"
                    v-model="ddosParam.interval"
                    autocomplete="off"
                    prefix-icon="el-icon-user">
            <template slot="append">
              <span style="display: inline-block;width: 50px"> 次/秒 </span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="并发数量"
                      prop="concurrent">
          <el-input type="text"
                    oninput="value=value.replace(/\D/g,'')"
                    v-model="ddosParam.concurrent"
                    autocomplete="off"
                    prefix-icon="el-icon-user">
            <template slot="append">
              <span style="display: inline-block;width: 50px"> 线程 </span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="攻击时长"
                      prop="duration">
          <el-input type="text"
                    oninput="value=value.replace(/\D/g,'')"
                    v-model="ddosParam.duration"
                    autocomplete="off"
                    prefix-icon="el-icon-user">
            <template slot="append">
              <span style="display: inline-block;width: 50px"> 秒 </span>
            </template>
          </el-input>
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="primary"
                     @click="stop">Stop</el-button>
          <el-button type="primary"
                     @click="start">Start</el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
import { pass, compileStr, unCompileStr } from '@/utils/pass.js'
export default {
  name: 'PayDdos',
  data() {
    return {
      ddosToken: '',
      ddosParam: {
        api: '',
        type: undefined,
        interval: undefined,
        duration: undefined,
        concurrent: undefined,
      },
      ruleDdosParam: {},
    }
  },
  methods: {
    start() {
      if (this.ddosParam.api === '') {
        this.$notify({
          title: '警告',
          message: '☢️>参数有误<☢️',
          type: 'warning',
        })
        return
      }
      this.$notify({
        title: '成功',
        message: '☢️>启动成功<☢️',
        type: 'success',
        // duration: 0,
      })
      this.$axios.post('ddos/start', this.ddosParam).then((e) => {
        if (e.data.error === 1) {
          this.$notify({
            title: '完成',
            message: '☢️>攻击完毕<☢️' + e.data.message,
            type: 'success',
            // duration: 0,
          })
        } else if (e.data.error === 2) {
          this.$notify({
            title: '警告',
            message: e.data.message,
            type: 'warning',
          })
        } else {
          this.$notify({
            title: '错误',
            message: e.data.message,
            type: 'error',
          })
        }
      })
    },
    stop() {
      this.$axios.get('ddos/stop').then((e) => {
        if (e.data.error === 1) {
          this.$notify({
            title: '停止',
            message: '☢️>停止攻击<☢️' + e.data.message,
            type: 'success',
            // duration: 0,
          })
        } else if (e.data.error === 2) {
          this.$notify({
            title: '警告',
            message: e.data.message,
            type: 'warning',
          })
        } else {
          this.$notify({
            title: '错误',
            message: e.data.message,
            type: 'error',
          })
        }
      })
    },
    quit() {
      this.$router.push('/pay/home')
    },
    verify() {
      const t = sessionStorage.getItem('ddosToken')
      if (t === '' || t === null || t === undefined) this.quit()
      if (unCompileStr(t) !== pass.ddosPass) this.quit()
      // this.ddosToken = t
      console.log(this.ddosToken, 'verify')
    },
  },
  created() {},
  mounted() {
    this.verify()
  },
}
</script>

<style scoped>
.header {
  height: 25px;
  margin-top: 10px;
}
.el-divider .el-divider__text {
  background-color: rgb(243, 243, 243);
}
.d1 {
  text-align: left;
}
.demo-ruleForm {
  padding: 100px 60px 50px 20px;
  width: 700px;
  margin: 0 auto;
}
</style>