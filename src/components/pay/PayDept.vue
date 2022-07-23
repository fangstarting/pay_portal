<!-- PayDept -->
<template>
  <div>
    <div class="header">
      <el-divider>
        <h2>部门信息</h2>
      </el-divider>
    </div>
    <div class="top">
      <el-button type="primary"
                 @click="addDeptVisible=true"
                 plain>添加部门</el-button>
    </div>
    <div class="auditList">
      <div class="table">
        <el-table :data="depts"
                  border>
          <el-table-column type="index"
                           align="center"
                           label="序号">
          </el-table-column>
          <el-table-column label="名称"
                           align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover"
                          placement="top">
                <p>名称: {{ scope.row.dname }}</p>
                <p>描述: {{ scope.row.notes }}</p>
                <div slot="reference"
                     class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.dname }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="loc"
                           label="地址"
                           align="center">
          </el-table-column>
          <el-table-column prop="headName"
                           label="领导"
                           align="center">
          </el-table-column>
          <el-table-column prop="notes"
                           label="描述"
                           width="250"
                           align="center">
          </el-table-column>
          <el-table-column prop="updatetime"
                           label="更新时间"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           header-align="center"
                           align="center">
            <el-button-group slot-scope="scope">
              <el-tooltip content="修改"
                          placement="top"
                          :open-delay="1000">
                <el-button @click="showDeptInfo(scope.row)"
                           type="primary"
                           size="mini"
                           icon="el-icon-edit"></el-button>
              </el-tooltip>
              <el-tooltip content="删除"
                          placement="top"
                          :open-delay="1000">
                <el-button @click="delDept(scope.row.deptId)"
                           type="primary"
                           size="mini"
                           icon="el-icon-delete"></el-button>
              </el-tooltip>
            </el-button-group>
          </el-table-column>
        </el-table>
      </div>

      <!-- <div class="page">
        <el-pagination
                @size-change="pageSizechange"
                @current-change="pageNumchange"
                :page-size="auditParmas.pageSize"
                :current-page="auditParmas.pageNum"
                :page-sizes="[5, 10, 50]"
                layout="total , sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
      </div> -->
    </div>

    <div class="add">
      <el-dialog title="添加部门"
                 :visible.sync="addDeptVisible"
                 width="500px"
                 top="8vh"
                 center="">
        <el-form :model="deptData"
                 status-icon
                 :rules="rulesAddDept"
                 ref="deptData"
                 label-width="80px"
                 class="demo-ruleForm">
          <el-form-item label="部门名称"
                        prop="dname">
            <el-input type="text"
                      v-model="deptData.dname"
                      autocomplete="off"
                      prefix-icon="el-icon-mobile-phone"></el-input>
          </el-form-item>
          <el-form-item label="部门地址"
                        prop="loc">
            <el-input type="text"
                      v-model="deptData.loc"
                      autocomplete="off"
                      prefix-icon="el-icon-mobile-phone"></el-input>
          </el-form-item>
          <el-form-item label="部门领导"
                        prop="headuserId">
            <el-select v-model="deptData.headuserId"
                       placeholder="选择派遣的主管"
                       size="medium"
                       style="width: 180px;">
              <el-option v-for="item in managers"
                         :key="item.userId"
                         :label="item.realname"
                         :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注描述"
                        prop="notes">
            <el-input type="textarea"
                      rows="4"
                      v-model="deptData.notes"
                      autocomplete="off"
                      prefix-icon="el-icon-mobile-phone"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     @click="addDept('deptData')">添 加</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="update">
      <el-dialog title="修改部门信息"
                 :visible.sync="upDeptVisible"
                 width="500px"
                 top="8vh"
                 center="">
        <el-form :model="upDeptData"
                 status-icon
                 ref="refUpdeptData"
                 :rules="rulesUpDept"
                 label-width="80px"
                 class="demo-ruleForm">
          <el-form-item label="部门名称"
                        prop="dname">
            <el-input type="text"
                      v-model="upDeptData.dname"
                      autocomplete="off"
                      prefix-icon="el-icon-mobile-phone"></el-input>
          </el-form-item>
          <el-form-item label="部门地址"
                        prop="loc">
            <el-input type="text"
                      v-model="upDeptData.loc"
                      autocomplete="off"
                      prefix-icon="el-icon-mobile-phone"></el-input>
          </el-form-item>
          <el-form-item label="部门领导"
                        prop="headuserId">
            <el-select v-model="upDeptData.headuserId"
                       placeholder="选择派遣的主管"
                       size="medium"
                       style="width: 180px;">
              <el-option v-for="item in managers"
                         :key="item.userId"
                         :label="item.realname"
                         :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注描述"
                        prop="notes">
            <el-input type="textarea"
                      rows="4"
                      v-model="upDeptData.notes"
                      autocomplete="off"
                      prefix-icon="el-icon-mobile-phone"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     @click="upDept('refUpdeptData')">修 改</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PayDept',
  data() {
    return {
      managers: [],
      deptParams: {
        deptId: '',
        dname: '',
        loc: '',
      },
      depts: [],
      addDeptVisible: false,
      deptData: {
        dname: '',
        loc: '',
        headuserId: '',
        notes: '',
      },
      upDeptData: {},
      upDeptVisible: false,
      rulesAddDept: {
        dname: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
        loc: [{ required: true, message: '请输入部门地址', trigger: 'blur' }],
        headuserId: [
          { required: true, message: '请选择部门领导', trigger: 'change' },
        ],
        notes: [{ required: true, message: '请填写备注描述', trigger: 'blur' }],
      },
      rulesUpDept: {
        dname: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
        loc: [{ required: true, message: '请输入部门地址', trigger: 'blur' }],
        headuserId: [
          { required: true, message: '请选择部门领导', trigger: 'change' },
        ],
        notes: [{ required: true, message: '请填写备注描述', trigger: 'blur' }],
      },
      t1: '',
    }
  },
  methods: {
    init() {
      this.getDepts()
      this.getManagers()
    },
    upDept(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          this.$axios.post('dept/update', this.upDeptData).then((e) => {
            if (e.data.error === 1) {
              this.$message({
                type: 'success',
                message: '修改成功！',
              })
              this.upDeptVisible = false
              this.resetForm(formName)
              this.getDepts()
            } else {
              this.$message({
                type: 'error',
                message: e.data.message,
              })
            }
          })
        } else {
          //表单验证失败
          return false
        }
      })
    },
    getManagers() {
      this.$axios.get('dept/managers').then((e) => {
        this.managers = e.data.data
      })
    },
    getDepts() {
      this.$axios
        .post('dept/getdeptinfos', this.deptParams)
        .then((e) => {
          this.depts = e.data.deptInfos
        })
        .catch()
    },
    showDeptInfo(dept) {
      this.upDeptData = JSON.parse(JSON.stringify(dept))
      this.upDeptVisible = true
    },
    addDept(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          this.$axios
            .post('dept/add', this.deptData)
            .then((e) => {
              if (e.data.error === 1) {
                this.$message({
                  type: 'success',
                  message: '添加成功!',
                })
                this.addDeptVisible = false
                this.resetForm(formName)
                this.getDepts()
              } else {
                this.$message({
                  type: 'error',
                  message: e.data.message,
                })
              }
            })
            .catch()
        } else {
          //表单验证失败
          return false
        }
      })
    },
    delDept(deptId) {
      this.$confirm('是否确删除当前部门信息', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          this.$axios.get('dept/remove?id=' + deptId).then((e) => {
            if (e.data.error === 1) {
              this.$message({
                type: 'success',
                message: '删除成功！',
              })
              this.getDepts()
            } else {
              this.$message({
                type: 'error',
                message: e.data.message,
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除操作',
          })
        })
    },
    //页码改变事件
    pageSizechange(e) {
      console.log(e)
    },
    pageNumchange(e) {
      // console.log(">>触发页面改变事件");
      this.auditParmas.pageNum = e
      console.log(e)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    endm() {},
  },
  created() {},
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
.top {
  text-align: left;
}
.top button {
  margin: 0px 0px 10px 10px;
}
.el-divider .el-divider__text {
  background-color: rgb(243, 243, 243);
}
</style>
