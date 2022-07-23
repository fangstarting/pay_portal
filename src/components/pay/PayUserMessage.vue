<!-- 消息通知 -->
<template>
  <div>
    <div class="header">
      <el-divider>
        <h2>消息通知</h2>
      </el-divider>
    </div>
    <div class="content">
      <!-- <div class="optionr">
        <el-tooltip content="写信"
                    placement="bottom"
                    effect="light">
          <el-button type="warning"
                     icon="el-icon-message"
                     circle></el-button>
        </el-tooltip>
      </div> -->
      <el-badge :value="unread.myUnreadCount"
                :max="9"
                class="item_mess">
      </el-badge>
      <el-badge :value="unread.sysUnreadCount"
                :max="9"
                type="warning"
                class="item_sys">
      </el-badge>
      <el-tabs type="border-card"
               class="my_tabs"
               @tab-click="tabClick">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-message"></i>
            消息中心
          </span>
          <div class="operate">
            <span class="s1">选择状态</span>
            <el-select v-model="getMessDataParam.status"
                       size="small"
                       style="width: 130px"
                       @change="getMyMessData()"
                       placeholder="选择状态">
              <el-option v-for="item in messStatus"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="page">
            <el-pagination @size-change="pageSizechange"
                           :page-sizes="[8, 15, 30]"
                           :page-size="getMessDataParam.pageSize"
                           @current-change="pageNumchange"
                           :current-page="getMessDataParam.pageNum"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
          </div>
          <div>
            <el-button type="danger"
                       :disabled="disBtnMy"
                       @click="batchRemove"
                       plain>批量删除</el-button>
          </div>
          <template>
            <el-table :data="myMessData"
                      ref="table"
                      style="width: 100%"
                      @selection-change="myMessSelectionChange"
                      :row-class-name="tableRowClassName">
              <el-table-column type="selection"
                               width="55">
              </el-table-column>
              <el-table-column prop="updatetime"
                               label="时间"
                               width="180">
              </el-table-column>
              <el-table-column prop="title"
                               label="标题"
                               width="300">
              </el-table-column>
              <el-table-column prop="status"
                               label="状态">
                <template slot-scope="scope">{{getMessStatusText(scope.row.status)}}</template>
              </el-table-column>
              <el-table-column label="操作"
                               header-align="center"
                               align="center"
                               width="155">
                <el-button-group slot-scope="scope">
                  <el-tooltip content="查看"
                              placement="top"
                              :open-delay="1000">
                    <el-button @click="showMess(scope.row)"
                               type="warning"
                               size="mini"
                               icon="el-icon-message"></el-button>
                  </el-tooltip>
                  <el-tooltip content="删除"
                              placement="top"
                              :open-delay="1000">
                    <el-button @click="delMess(scope.row.messId)"
                               type="danger"
                               size="mini"
                               icon="el-icon-delete"></el-button>
                  </el-tooltip>
                </el-button-group>
              </el-table-column>
              <!-- <el-table-column fixed="right"
                               label="操作"
                               width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)"
                             type="text"
                             size="small">查看</el-button>
                  <el-button type="text"
                             size="small">删除</el-button>
                </template>
              </el-table-column> -->
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-edit"></i>发送消息</span>

          <el-form ref="messFrom"
                   class="messFrom"
                   :model="addMessData"
                   :rules="ruleMess"
                   label-width="120px"
                   style="padding: 25px 50px">
            <el-form-item label="收件人工号"
                          prop="userId">
              <el-input type="text"
                        oninput="value=value.replace(/\D/g,'')"
                        style="width: 200px"
                        v-model="addMessData.userId"></el-input>
            </el-form-item>
            <el-form-item label="信件标题"
                          prop="title">

              <el-input type="text"
                        style="width: 500px"
                        placeholder="请输入标题"
                        v-model="addMessData.title"
                        maxlength="30"
                        show-word-limit>
              </el-input>
            </el-form-item>
            <el-form-item label="信件内容"
                          prop="matter">
              <el-input type="textarea"
                        style="width: 500px"
                        placeholder="请输入内容"
                        maxlength=""
                        :rows="10"
                        show-word-limit
                        v-model="addMessData.matter"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type=""
                         @click="dialogVisible=true">富文本编辑</el-button>
              <el-button type="primary"
                         @click="submitMess('messFrom')">发 送</el-button>
              <el-button @click="resetForm('messFrom')">重 置</el-button>
            </el-form-item>
          </el-form>

        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-bell"></i>
            系统通知
          </span>
          <div class="operate">
            <span class="s1">选择状态</span>
            <el-select v-model="getSysMessDataParam.status"
                       size="small"
                       style="width: 130px"
                       @change="getMySysMessList()"
                       placeholder="选择状态">
              <el-option v-for="item in messStatus"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="page">
            <el-pagination @size-change="pageSizechange1"
                           :page-sizes="[8, 15, 30]"
                           :page-size="getSysMessDataParam.pageSize"
                           @current-change="pageNumchange1"
                           :current-page="getSysMessDataParam.pageNum"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="totalSys">
            </el-pagination>
          </div>
          <div>
            <el-button type="danger"
                       :disabled="disBtnMy"
                       @click="batchRemove"
                       plain>批量删除</el-button>
          </div>

          <template>
            <el-table :data="sysMessData"
                      ref="table"
                      style="width: 100%"
                      @selection-change="myMessSelectionChange"
                      :row-class-name="tableRowClassName">
              <el-table-column type="selection"
                               width="55">
              </el-table-column>
              <el-table-column prop="updatetime"
                               label="时间"
                               width="180">
              </el-table-column>
              <el-table-column prop="title"
                               label="标题"
                               width="300">
              </el-table-column>
              <el-table-column prop="status"
                               label="状态">
                <template slot-scope="scope">{{getMessStatusText(scope.row.status)}}</template>
              </el-table-column>
              <el-table-column label="操作"
                               header-align="center"
                               align="center"
                               width="155">
                <el-button-group slot-scope="scope">
                  <el-tooltip content="查看"
                              placement="top"
                              :open-delay="1000">
                    <el-button @click="showMess(scope.row)"
                               type="warning"
                               size="mini"
                               icon="el-icon-message"></el-button>
                  </el-tooltip>
                  <el-tooltip content="删除"
                              placement="top"
                              :open-delay="1000">
                    <el-button @click="delMess(scope.row.messId)"
                               type="danger"
                               size="mini"
                               icon="el-icon-delete"></el-button>
                  </el-tooltip>
                </el-button-group>
              </el-table-column>
              <!-- <el-table-column fixed="right"
                               label="操作"
                               width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)"
                             type="text"
                             size="small">查看</el-button>
                  <el-button type="text"
                             size="small">删除</el-button>
                </template>
              </el-table-column> -->
            </el-table>
          </template>
        </el-tab-pane>
      </el-tabs>
      <div class="matter_conten">
        <el-drawer :title="title"
                   :visible.sync="drawer"
                   direction="rtl"
                   :before-close="handleClose">
          <div class="matterText"
               v-html="matter">
            <!-- <span>
              {{matter}}
            </span> -->
          </div>
        </el-drawer>
      </div>

      <!-- <div class="mess_1">Echart</div>
      <div class="mess_2">Listaaaaaaaaaaaaaaa</div> -->
    </div>
    <div>
      <el-dialog :close-on-click-modal="false"
                 top="8vh"
                 title="内容编辑"
                 :visible.sync="dialogVisible"
                 width="1200px">
        <!-- <Quill1 ref="quill1"
                :text="addMessData.matter"
                style="height: 400px;margin-bottom: 70px;"></Quill1> -->
        <Quill1 ref="quill1"
                style="height:400px"
                :text="addMessData.matter" />

        <div style="text-align: center;margin-top: 70px">
          <el-button @click="btnSave"
                     type="primary">确定</el-button>
          <el-button @click="btnOff">取消</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { obj } from '@/mesconfig/mesconfig.js'
import Quill1 from '@/components/zhujian/Quill1'
export default {
  name: 'PayUserMessage',
  components: { Quill1 },
  data() {
    return {
      dialogVisible: false,
      addMessData: {
        userId: '',
        title: '',
        matter: '',
      },
      ruleMess: {
        userId: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
      },
      getMessDataParam: {
        pageNum: 1,
        pageSize: 8,
        status: '',
      },
      total: 0,
      myMessData: [],
      messStatus: obj.messStatus,
      //系统通知DATA
      sysMessData: [],
      getSysMessDataParam: {
        pageNum: 1,
        pageSize: 8,
        status: '',
      },
      totalSys: 0,
      //弹框
      drawer: false,
      title: '',
      matter: '',
      //未读数
      unread: {
        myUnreadCount: 0,
        sysUnreadCount: 0,
      },
      removeIds: [],
      disBtnMy: true,
      currPane: '',
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getMyMessData()
      this.getUnreadCount()
    },
    getMyMessData() {
      this.$axios.post('mess/mylist', this.getMessDataParam).then((e) => {
        if (e.data.error === 1) {
          this.myMessData = e.data.data.records
          this.total = e.data.data.total
        }
      })
    },
    getMessStatusText(status) {
      if (status === 0) {
        return '未读'
      } else if (status === 1) {
        return '已读'
      }
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitMess(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          this.$axios
            .post('mess/add', this.addMessData)
            .then((e) => {
              if (e.data.error === 1 && e.data.sign) {
                this.$message({
                  type: 'success',
                  message: '发送信件成功！',
                })
                this.resetForm(formName)
                this.getUnreadCount()
              } else {
                this.$message({
                  type: 'error',
                  message: '发送信息失败，收件人工号不存在!',
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
    tableRowClassName({ row, rowIndex }) {
      // console.log(row)
      // console.log(rowIndex)\
      // if (rowIndex === 1) {
      //   // console.log('warning-row')
      //   return 'warm-row'
      // } else if (rowIndex === 3) {
      //   // console.log('success-row')
      //   return 'warm-row'
      // }
      if (row.status === 0) {
        return 'warm-row'
      }
      return ''
    },
    //页码改变事件
    pageSizechange(e) {
      // console.log('页码改变事件>>' + e)
      this.getMessDataParam.pageSize = e
      this.getMyMessData()
    },
    pageNumchange(e) {
      // console.log(">>触发页面改变事件");
      // console.log('页面改变事件>>' + e)
      this.getMessDataParam.pageNum = e
      this.getMyMessData()
    },
    pageSizechange1(e) {
      // console.log('页码改变事件>>' + e)
      this.getSysMessDataParam.pageSize = e
      this.getMySysMessList()
    },
    pageNumchange1(e) {
      // console.log(">>触发页面改变事件");
      // console.log('页面改变事件>>' + e)
      this.getSysMessDataParam.pageNum = e
      this.getMySysMessList()
    },
    //系统通知模块
    getMySysMessList() {
      this.$axios.post('mess/mysyslist', this.getSysMessDataParam).then((e) => {
        if (e.data.error === 1) {
          this.sysMessData = e.data.data.records
          this.totalSys = e.data.data.total
        }
      })
    },
    showMess(e) {
      this.drawer = true
      this.title = e.title
      this.matter = e.matter
      this.upStatus(e)
    },
    upStatus(mess) {
      const messId = mess.messId
      this.$axios.get('mess/upstatus', { params: { messId } }).then((e) => {
        if (e.data.error === 1 && e.data.sign) {
          this.getUnreadCount()
          const status = mess.status
          if (status === 0) {
            mess.status = 1
          }
        }
      })
    },
    delMess(messId) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          this.$axios.get('mess/remove', { params: { messId } }).then((e) => {
            if (e.data.error === 1 && e.data.sign) {
              this.$message({
                type: 'success',
                message: '消息删除成功！',
              })
              const indexMy = this.myMessData.findIndex(
                (e) => e.messId === messId
              )
              if (indexMy !== -1) {
                this.myMessData.splice(indexMy, 1)
              }
              const indexSys = this.sysMessData.findIndex(
                (e) => e.messId === messId
              )
              if (indexSys !== -1) {
                this.sysMessData.splice(indexSys, 1)
              }
              this.getUnreadCount()
            } else {
              this.$message({
                type: 'error',
                message: '消息删除失败！!',
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    getUnreadCount() {
      this.$axios.get('mess/unread').then((e) => {
        if (e.data.error === 1) {
          this.unread = e.data.data
        }
      })
    },
    myMessSelectionChange(e) {
      if (e.length > 0) {
        this.disBtnMy = false
      } else {
        this.disBtnMy = true
      }
      let ids = []
      e.forEach((item) => ids.push(item.messId))
      this.batchRemoveByIds = ids
    },
    batchRemove() {
      this.$confirm('是否确认删除已选信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          let loadingInstance = this.$loading.service({
            text: '批量删除消息中...',
          })
          this.$axios
            .post('mess/batchremove', this.batchRemoveByIds)
            .then((e) => {
              setTimeout(() => {
                loadingInstance.close()
                if (e.data.error === 1 && e.data.sign) {
                  this.$message({
                    type: 'success',
                    message: '批量删除消息成功！',
                  })
                  if (this.currPane === '0') this.getMyMessData()
                  else if (this.currPane === '2') this.getMySysMessList()
                } else {
                  this.$message({
                    type: 'error',
                    message: '批量删除消息失败！!',
                  })
                }
              }, 1500)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    tabClick(e) {
      this.$refs.table.clearSelection()
      if (e.paneName === '0') {
        this.currPane = '0'
        this.getMyMessData()
      } else if (e.paneName === '2') {
        this.currPane = '2'
        this.getMySysMessList()
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    btnSave() {
      this.addMessData.matter = this.$refs.quill1.save()
      const a = this.addMessData.matter
      if (a === '' || a === null || a === undefined)
        return (this.dialogVisible = false)
      let loading = this.$loading.service({
        text: '文本数据正在处理中...',
      })
      this.dialogVisible = false
      setTimeout(() => {
        loading.close()
      }, 2000)
    },
    btnOff() {
      this.dialogVisible = false
    },
  },
}
</script>

<style scoped>
/* .header {
  height: 50px;
  margin-top: 10px;
  border: 1px dashed #ffffff;
} */
.header {
  height: 25px;
  margin-top: 10px;
}
.el-divider .el-divider__text {
  background-color: rgb(243, 243, 243);
}
.content {
  /* border: 1px dashed #000; */
  /* height: 600px; */
  position: relative;
}
.content .mess_1 {
  border: 1px dashed #000;
  width: 49.5%;
  /* height: 100%; */
  float: left;
}
.content .mess_2 {
  border: 1px dashed #000;
  width: 49.5%;
  /* height: 100%; */
  float: right;
}
.messFrom {
  text-align: left;
}
.el-table >>> .warm-row {
  background: rgba(195, 248, 110, 0.6);
  /* color: white; */
}
.page {
  width: 500px;
  float: left;
}
.operate {
  float: left;
  width: 300px;
}
.operate .s1 {
  font-size: 14px;
}
.matter_conten {
  line-height: 30px;
}
.matterText {
  /* border: 1px solid #000000; */
  line-height: 30px;
  /* text-align: center; */
  text-align: justify;
  text-indent: 2em;
  width: 85%;
  height: 100%;
  color: rgb(252, 150, 103);
  display: inline-block;
}
.item_mess {
  position: absolute;
  top: -8px;
  left: 100px;
  z-index: 100;
}
.item_sys {
  position: absolute;
  top: -8px;
  left: 327px;
  z-index: 100;
}
.my_tabs {
  min-height: 600px;
}
</style>