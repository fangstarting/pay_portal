<!-- demo -->
<template>
  <div>
    <div class="header">
      <el-divider>
        <h2>职称信息</h2>
      </el-divider>
    </div>
    <div class="top">
      <el-button type="primary"
                 @click="addVisible=true"
                 plain>添加职称</el-button>
    </div>
    <div class="list">
      <div class="table">
        <el-table :data="list"
                  border>
          <el-table-column type="index"
                           align="center"
                           label="序号">
          </el-table-column>
          <el-table-column prop="jobtitle"
                           label="职称"
                           align="center">
          </el-table-column>
          <el-table-column prop="jobbonus"
                           label="职称奖金"
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
                <el-button @click="show(scope.row)"
                           type="primary"
                           style="width:50px"
                           size="mini"
                           icon="el-icon-edit"></el-button>
              </el-tooltip>
              <el-tooltip content="删除"
                          placement="top"
                          :open-delay="1000">
                <el-popconfirm @confirm="del(scope.row.jobgradeId)"
                               title="确定删除当前职称吗？">
                  <el-button slot="reference"
                             type="primary"
                             style="width:50px"
                             size="mini"
                             icon="el-icon-delete"></el-button>
                </el-popconfirm>
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

    <div id="jobgrade">
      <div class="add">
        <el-dialog title="添加职称"
                   :visible.sync="addVisible"
                   width="400px"
                   top="18vh"
                   center="">
          <el-form :model="jobgradeData"
                   status-icon
                   :rules="jobRules"
                   ref="jobgradeDataFrom"
                   label-width="80px"
                   class="demo-ruleForm">
            <el-form-item label="职称标签"
                          prop="jobtitle">

              <el-autocomplete class="inline-input"
                               v-model="jobgradeData.jobtitle"
                               :fetch-suggestions="querySearch"
                               style="width: 210px;"
                               clearable
                               placeholder="请选择或输入标签"
                               @select="handleSelect"></el-autocomplete>
              <!-- <el-select v-model="jobgradeData.jobtitle"
                         placeholder="选择职称"
                         size="medium"
                         style="width: 120px;">
                <el-option v-for="item in jobtitles"
                           :key="item.name"
                           :label="item.name"
                           :value="item.name">
                </el-option>
              </el-select> -->
            </el-form-item>
            <el-form-item label="职称奖金"
                          prop="jobbonus">
              <el-input type="text"
                        oninput="value=value.replace(/\D/g,'')"
                        maxlength=""
                        style="width: 210px"
                        v-model="jobgradeData.jobbonus"
                        autocomplete="off"
                        prefix-icon="el-icon-mobile-phone">
                <template slot="append">￥</template>
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button type="primary"
                       @click="addJobgrade('jobgradeDataFrom')">添 加</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="update">
        <el-dialog title="修改职称"
                   :visible.sync="upVisible"
                   width="400px"
                   top="18vh"
                   center="">
          <el-form :model="jobgradeUpData"
                   status-icon
                   :rules="jobRules"
                   ref="jobgradeUpdateFrom"
                   label-width="80px"
                   class="demo-ruleForm">
            <el-form-item label="职称标签"
                          prop="jobtitle">
              <el-select v-model="jobgradeUpData.jobtitle"
                         disabled
                         style="width: 210px;"
                         placeholder="选择职称"
                         size="medium">
                <el-option v-for="item in jobtitles"
                           :key="item.name"
                           :label="item.name"
                           :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职称奖金"
                          prop="jobbonus">
              <el-input type="text"
                        oninput="value=value.replace(/\D/g,'')"
                        maxlength=""
                        style="width: 210px"
                        v-model="jobgradeUpData.jobbonus"
                        autocomplete="off"
                        prefix-icon="el-icon-mobile-phone">
                <template slot="append">￥</template>
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button type="primary"
                       @click="updateJobgrade('jobgradeUpdateFrom')">修 改</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayJobgrade',
  data() {
    return {
      list: [],
      addVisible: false,
      jobgradeData: {
        jobtitle: '',
        jobbonus: '',
      },
      jobtitles: [
        { name: '见习' },
        { name: '初级' },
        { name: '中级' },
        { name: '高级' },
        { name: '大师' },
      ],
      jobRules: {
        jobtitle: [
          { required: true, message: '请输入职称标签', trigger: 'change' },
        ],
        jobbonus: [
          { required: true, message: '请输入职称奖金', trigger: 'blur' },
        ],
      },
      upVisible: false,
      jobgradeUpData: {},
      restaurants: [
        { value: '见习' },
        { value: '初级' },
        { value: '中级' },
        { value: '高级' },
        { value: '大师' },
      ],
    }
  },
  methods: {
    init() {
      this.getList()
    },
    getList() {
      this.$axios.get('jobgrade/list').then((e) => {
        if (e.data.error === 1) {
          this.list = e.data.data
        }
      })
    },
    del(id) {
      this.$axios.get('jobgrade/remove', { params: { id } }).then((e) => {
        if (e.data.error === 1) {
          this.$message({
            type: 'success',
            message: '删除成功！',
          })
          this.getList()
        } else {
          this.$message({
            type: 'error',
            message: e.data.message,
          })
        }
      })
    },
    addJobgrade(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          this.$axios
            .post('jobgrade/add', this.jobgradeData)
            .then((e) => {
              if (e.data.error === 1) {
                this.$message({
                  type: 'success',
                  message: '添加成功！',
                })
                this.addVisible = false
                this.resetForm(formName)
                this.getList()
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
    show(e) {
      this.jobgradeUpData = JSON.parse(JSON.stringify(e))
      this.upVisible = true
    },
    updateJobgrade(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          this.$axios
            .post('jobgrade/update', this.jobgradeUpData)
            .then((e) => {
              if (e.data.error === 1) {
                this.$message({
                  type: 'success',
                  message: '修改成功！',
                })
                this.upVisible = false
                this.resetForm(formName)
                this.getList()
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    handleSelect(item) {
      console.log(item)
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