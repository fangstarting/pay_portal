<!-- PayPosition -->
<template>
  <div>
    <div class="header">
      <el-divider>
        <h2>岗位信息</h2>
      </el-divider>
    </div>
    <div class="top">
      <el-button type="primary"
                 @click="addPositionVisible=true"
                 plain>添加职位</el-button>
    </div>
    <el-dialog title="添加职位"
               :visible.sync="addPositionVisible"
               width="500px"
               top="8vh"
               center="">
      <div class="add">
        <el-form :model="positionData"
                 status-icon
                 ref="positionAddData"
                 :rules="positionRules"
                 label-width="80px"
                 class="demo-ruleForm">
          <el-form-item label="隶属部门"
                        prop="deptId">
            <el-select v-model="positionData.deptId"
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
          <el-form-item label="职位名称"
                        prop="pname">
            <el-input type="text"
                      v-model="positionData.pname"
                      autocomplete="off"
                      prefix-icon="el-icon-mobile-phone"></el-input>
          </el-form-item>
          <el-form-item label="职位描述"
                        prop="notes">
            <el-input type="textarea"
                      rows="3"
                      v-model="positionData.notes"
                      autocomplete="off"
                      prefix-icon="el-icon-mobile-phone"></el-input>
          </el-form-item>
          <el-form-item label="职位状态">
            <el-tooltip :content="'状态: ' + statusText"
                        placement="top">
              <el-switch v-model="statusText"
                         active-color="#13ce66"
                         inactive-color="#7c7c7d"
                         @change="statusChange()"
                         active-value="启用"
                         inactive-value="禁用">
              </el-switch>
            </el-tooltip>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer"
             style="text-align:center;">
          <el-button type="primary"
                     @click="addPosition('positionAddData')">添 加</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="修改职位"
               :visible.sync="upPositionVisible"
               width="500px"
               top="8vh"
               center="">
      <div class="up">
        <el-form :model="positionUpData"
                 status-icon
                 ref="positionUpFrom"
                 :rules="positionRules"
                 label-width="80px"
                 class="demo-ruleForm">
          <el-form-item label="隶属部门"
                        prop="deptId">
            <el-select v-model="positionUpData.deptId"
                       placeholder="选择部门"
                       size="medium"
                       disabled
                       style="width: 120px;">
              <el-option v-for="item in depts"
                         :key="item.deptId"
                         :label="item.dname"
                         :value="item.deptId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位名称"
                        prop="pname">
            <el-input type="text"
                      v-model="positionUpData.pname"
                      autocomplete="off"
                      prefix-icon="el-icon-mobile-phone"></el-input>
          </el-form-item>
          <el-form-item label="职位描述"
                        prop="notes">
            <el-input type="textarea"
                      rows="3"
                      v-model="positionUpData.notes"
                      autocomplete="off"
                      prefix-icon="el-icon-mobile-phone"></el-input>
          </el-form-item>
          <el-form-item label="职位状态">
            <el-tooltip :content="'状态: ' + upStatusText"
                        placement="top">
              <el-switch v-model="upStatusText"
                         active-color="#13ce66"
                         inactive-color="#7c7c7d"
                         @change="upStatusChange()"
                         active-value="启用"
                         inactive-value="禁用">
              </el-switch>
            </el-tooltip>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer"
             style="text-align:center;">
          <el-button type="primary"
                     @click="upPosition('positionUpFrom')">修 改</el-button>
        </div>
      </div>
    </el-dialog>
    <div class="auditList">
      <div class="table">
        <el-table :data="positions"
                  border>
          <el-table-column type="index"
                           align="center"
                           label="序号"
                           width="50">
          </el-table-column>
          <el-table-column prop="pname"
                           label="岗位名称"
                           align="center"
                           width="">
          </el-table-column>
          <el-table-column prop="deptId"
                           label="所属部门"
                           align="center"
                           width="">
            <template slot-scope="scope">
              {{getDeptName(scope.row.deptId)}}
            </template>
          </el-table-column>
          <el-table-column prop="notes"
                           label="描述"
                           align="center"
                           width="">
          </el-table-column>
          <el-table-column prop="status"
                           label="状态"
                           align="center"
                           width="">
            <template slot-scope="scope">
              <span v-if="scope.row.status==0">禁用</span>
              <span v-if="scope.row.status==1">启用</span>
            </template>
          </el-table-column>
          <el-table-column prop="updatetime"
                           label="更新时间"
                           align="center"
                           width="">
          </el-table-column>
          <el-table-column label="操作"
                           header-align="center"
                           align="center"
                           width="">
            <el-button-group slot-scope="scope">
              <el-tooltip content="修改"
                          placement="top"
                          :open-delay="1000">
                <el-button @click="showPositionInfo(scope.row)"
                           type="primary"
                           size="mini"
                           icon="el-icon-edit"></el-button>
              </el-tooltip>
              <el-tooltip content="删除"
                          placement="top"
                          :open-delay="1000">
                <el-popconfirm @confirm="delPosition(scope.row.positionId)"
                               title="确定删除当前职位吗？">
                  <el-button slot="reference"
                             type="primary"
                             size="mini"
                             icon="el-icon-delete"></el-button>
                </el-popconfirm>
              </el-tooltip>
            </el-button-group>
          </el-table-column>
        </el-table>
      </div>

      <div class="page">
        <el-pagination @size-change="pageSizechange"
                       @current-change="pageNumchange"
                       :page-size="positionParams.pageSize"
                       :current-page="positionParams.pageNum"
                       :page-sizes="[5, 10, 50]"
                       layout="total , sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayPosition',
  data() {
    return {
      positionParams: {
        pageNum: 1,
        pageSize: 10,
        deptId: '',
        status: '',
      },
      total: 0,
      positions: [],
      depts: [],

      addPositionVisible: false,
      positionData: {
        deptId: '',
        pname: '',
        notes: '',
        status: '0',
      },
      statusText: '禁用',
      positionRules: {
        deptId: [
          { required: true, message: '请选择隶属部门', trigger: 'change' },
        ],
        pname: [{ required: true, message: '请输入职位名称', trigger: 'blur' }],
        notes: [{ required: true, message: '请输入职位描述', trigger: 'blur' }],
      },
      upPositionVisible: false,
      positionUpData: {},
      upStatusText: '',
      tdata: '',
    }
  },
  methods: {
    init() {
      // this.getPositions();
    },
    initCreate() {
      this.getDepts()
    },
    getDepts() {
      this.$axios.get('dept/getdepts').then((e) => {
        this.depts = e.data.depts
        this.getPositions()
      })
    },
    getPositions() {
      this.$axios
        .post('position/findpositions', this.positionParams)
        .then((e) => {
          this.positions = e.data.page.records
          this.total = e.data.page.total
        })
        .catch()
    },
    showPositionInfo(position) {
      this.positionUpData = JSON.parse(JSON.stringify(position))
      if (this.positionUpData.status == 1) {
        this.upStatusText = '启用'
      } else if (this.positionUpData.status == 0) {
        this.upStatusText = '禁用'
      }
      this.upPositionVisible = true
    },
    upStatusChange() {
      if (this.upStatusText == '启用') {
        this.positionUpData.status = 1
      }
      if (this.upStatusText == '禁用') {
        this.positionUpData.status = 0
      }
    },
    upPosition(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          this.$axios
            .post('position/update', this.positionUpData)
            .then((e) => {
              if (e.data.error === 1) {
                this.$message({
                  type: 'success',
                  message: '职位信息修改成功！',
                })
                this.upPositionVisible = false
                this.resetForm(formName)
                this.getPositions()
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
    delPosition(id) {
      this.$axios.get('position/remove?id=' + id).then((e) => {
        if (e.data.error === 1) {
          this.$message({
            type: 'success',
            message: '职位信息删除成功！',
          })
          this.getPositions()
        } else {
          this.$message({
            type: 'error',
            message: e.data.message,
          })
        }
      })
    },
    getDeptName(deptId) {
      const dept = this.depts.find((e) => e.deptId == deptId)
      return dept.dname
    },
    addPosition(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          this.$axios
            .post('position/add', this.positionData)
            .then((e) => {
              if (e.data.error === 1) {
                this.$message({
                  type: 'success',
                  message: '职位信息添加成功！',
                })
                this.addPositionVisible = false
                this.resetForm(formName)
                this.getPositions()
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
    statusChange() {
      if (this.statusText == '启用') {
        this.positionData.status = 1
      }
      if (this.statusText == '禁用') {
        this.positionData.status = 0
      }
    },
    //页码改变事件
    pageSizechange(e) {
      this.positionParams.pageSize = e
      this.getPositions()
    },
    pageNumchange(e) {
      // console.log(">>触发页面改变事件");
      this.positionParams.pageNum = e
      this.getPositions()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    endm() {},
  },
  created() {
    this.initCreate()
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
