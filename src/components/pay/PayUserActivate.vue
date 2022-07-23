<!-- PayUserActivate -->
<template>
  <div>
    <!-- 用户激活 -->
    <div class="activate">
      <el-dialog title="用户激活"
                 :visible.sync="activateVisible"
                 width="500px"
                 top="8vh"
                 center="">
        <el-form :model="userData"
                 status-icon
                 :rules="rulesUser"
                 ref="userData"
                 label-width="80px"
                 class="demo-ruleForm">
          <el-form-item label="角色"
                        prop="roleId">
            <el-select v-model="userData.roleId"
                       placeholder="选择角色"
                       size="medium"
                       style="width: 120px;">
              <el-option v-for="item in roles"
                         :key="item.roleId"
                         :label="item.rname"
                         :value="item.roleId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门"
                        prop="deptId">
            <el-select v-model="userData.deptId"
                       @change="getPositions(userData.deptId)"
                       placeholder="选择部门"
                       size="medium"
                       style="width: 120px;">
              <el-option v-for="item in depts"
                         :key="item.deptId"
                         :label="item.dname"
                         :value="item.deptId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位"
                        prop="positionId">
            <el-select v-model="userData.positionId"
                       placeholder="选择职位"
                       size="medium"
                       style="width: 120px;">
              <el-option v-for="item in positions"
                         :key="item.positionId"
                         :label="item.pname"
                         :value="item.positionId"
                         :disabled="item.status==0">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职称"
                        prop="jobgradeId">
            <el-select v-model="userData.jobgradeId"
                       placeholder="选择职称"
                       size="medium"
                       style="width: 120px;">
              <el-option v-for="item in jobgrades"
                         :key="item.jobgradeId"
                         :label="item.jobtitle"
                         :value="item.jobgradeId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="真实姓名"
                        prop="realname">
            <el-input type="text"
                      v-model="userData.realname"
                      autocomplete="off"
                      prefix-icon="el-icon-s-custom"></el-input>
          </el-form-item>
          <el-form-item label="性别"
                        prop="sex">
            <el-radio v-model="userData.sex"
                      label="男">男</el-radio>
            <el-radio v-model="userData.sex"
                      label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="学历"
                        prop="name">
            <el-select v-model="userData.education"
                       placeholder="选择学历"
                       size="medium"
                       style="width: 120px;">
              <el-option v-for="item in educations"
                         :key="item.name"
                         :label="item.name"
                         :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话"
                        prop="phone">
            <el-input type="text"
                      v-model="userData.phone"
                      autocomplete="off"
                      prefix-icon="el-icon-mobile-phone"
                      maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="生日"
                        prop="birthday">
            <el-date-picker v-model="userData.birthday"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="入职日期"
                        prop="hiredate">
            <el-date-picker v-model="userData.hiredate"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="resetForm('userData')">重 置</el-button>
          <el-button type="primary"
                     @click="submitActivate('userData')">激 活</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayUserActivate',
  data() {
    return {
      userData: {
        roleId: '', //角色Id
        deptId: '', //部门Id
        positionId: '', //职位Id
        jobgradeId: '', //职级Id
        realname: '', //真实姓名
        sex: '', //性别
        education: '', //学历
        phone: '', //电话
        birthday: '', //生日
        hiredate: '', //入职日期
      },
      roles: [], //{roleId,rname}
      depts: [], //{deptId,dname}
      positions: [], //{positionId,pname}
      jobgrades: [], //{jobgradeId,jobtitle}
      educations: [{ name: '专科' }, { name: '本科' }, { name: '研究生' }],

      activateVisible: true,
      rulesUser: {},

      dataTest: 'null',
    }
  },
  methods: {
    init() {
      this.getRoles()
      this.getDepts()
      this.getJobgrades()
      this.getUserInfo()
    },
    getRoles() {
      this.$axios
        .get('role/getroles')
        .then((e) => {
          this.roles = e.data.roles
        })
        .catch()
    },
    getDepts() {
      this.$axios
        .get('dept/getdepts')
        .then((e) => {
          this.depts = e.data.depts
        })
        .catch()
    },
    getPositions(deptId) {
      this.$axios
        .get('position/getinbydeptid', { params: { deptId } })
        .then((e) => {
          this.positions = e.data.positions
        })
        .catch()
    },
    getJobgrades() {
      this.$axios
        .get('jobgrade/getjobgradesofit')
        .then((e) => {
          this.jobgrades = e.data.jobgrades
        })
        .catch()
    },
    getUserInfo() {
      //获取用户已存在信息
      this.$axios.get('user/getuserinfobyid').then((e) => {
        this.userData = e.data.user
        console.log(e)
      })
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitActivate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          this.$axios
            .post('user/activate', this.userData)
            .then((e) => {
              // console.log(e);
              if (e.data.errorcode == 100) {
                this.$message({
                  type: 'success',
                  message: '激活信息已提交，等待人事审批中...',
                })
                // this.registerVisible=false; //隐藏模态框
                // this.resetForm('userData'); //重置表单
              } else {
                this.$message({
                  type: 'error',
                  message: '失败!',
                })
              }
            })
            .catch()
        } else {
          //表单验证失败
          console.log('error submit!!')
          return false
        }
      })
    },
  },
  mounted() {
    this.init()
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
</style>
