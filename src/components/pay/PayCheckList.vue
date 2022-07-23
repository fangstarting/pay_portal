<!-- demo -->
<template>
  <div>

    <div class="header">
      <el-divider>
        <h2>考勤列表</h2>
      </el-divider>
    </div>
    <div class="topOperate">
      <el-button @click="getCheckList"
                 icon="el-icon-search"
                 circle></el-button>
      <el-input placeholder="员工工号"
                maxlength="11"
                clearable
                oninput="value=value.replace(/\D/g,'')"
                style="width: 150px;"
                v-model="getDataParam.userId">
      </el-input>
      <el-date-picker v-model="getDataParam.date"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions">
      </el-date-picker>
      <el-select clearable
                 v-model="getDataParam.status"
                 placeholder="考勤状态"
                 style="width: 150px;">
        <el-option label="正常"
                   value="0"></el-option>
        <el-option label="异常"
                   value="1"></el-option>
      </el-select>
      <el-button icon="el-icon-refresh"
                 @click="emptyQuery"
                 circle></el-button>
      <el-button type="primary"
                 :disabled="disButton"
                 @click="batchOption"
                 plain>导出打记录</el-button>
    </div>
    <div class="page">
      <el-pagination @size-change="pageSizechange"
                     :page-sizes="[10, 20, 50,100]"
                     :page-size="getDataParam.pageSize"
                     @current-change="pageNumchange"
                     :current-page="getDataParam.pageNum"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
    <div class="table">
      <el-table :data="dataList"
                border
                @selection-change="tableSelectionChange"
                @row-click="opShow">
        <el-table-column type="selection"
                         width="">
        </el-table-column>
        <el-table-column type="index"
                         align="center"
                         label="序号">
        </el-table-column>
        <el-table-column prop="userId"
                         label="工号"
                         sortable
                         width="75"
                         align="center">
        </el-table-column>
        <el-table-column prop="realname"
                         label="姓名"
                         width="100"
                         align="center">
        </el-table-column>
        <el-table-column prop="date"
                         label="考勤日期"
                         sortable
                         align="center">
          <template slot-scope="scope">
            <el-tag effect="plain">{{scope.row.date}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="earlytime"
                         label="上班打卡时间"
                         sortable
                         align="center">
          <template slot-scope="scope">
            <el-tag type="warning"
                    effect="plain"
                    v-if="scope.row.earlytime===null">{{isNull(scope.row.earlytime)}}</el-tag>
            <span v-else>{{isNull(scope.row.earlytime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="latetime"
                         label="下班打卡时间"
                         sortable
                         align="center">
          <template slot-scope="scope">
            <el-tag type="warning"
                    effect="plain"
                    v-if="scope.row.latetime===null">{{isNull(scope.row.latetime)}}</el-tag>
            <span v-else>{{isNull(scope.row.latetime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="late"
                         label="迟到"
                         align="center">
          <template slot-scope="scope">
            <el-tag type="warning"
                    effect="plain"
                    v-if="scope.row.late===null">{{isTableText(scope.row.late)}}</el-tag>
            <span v-else>{{isTableText(scope.row.late)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="early"
                         label="早退"
                         align="center">
          <template slot-scope="scope">
            <el-tag type="warning"
                    effect="plain"
                    v-if="scope.row.early===null">{{isTableText(scope.row.early)}}</el-tag>
            <span v-else>{{isTableText(scope.row.early)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="hostIp"
                         label="打卡地址"
                         sortable
                         align="center">
          <template slot-scope="scope">
            <el-tag type="warning"
                    effect="plain"
                    v-if="scope.row.hostIp===null">{{isNull(scope.row.hostIp)}}</el-tag>
            <span v-else>{{isNull(scope.row.hostIp)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status"
                         label="考勤状态"
                         align="center"
                         width="">
          <template slot-scope="scope">
            <el-tag type="success"
                    v-if="scope.row.status===0">正常</el-tag>
            <el-tag v-else
                    type="danger">缺勤</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="abtypeName"
                         label="缺勤类型"
                         align="center">
        </el-table-column>
        <el-table-column prop="updatetime"
                         label="更新时间"
                         sortable
                         width="102"
                         align="center">
        </el-table-column>

      </el-table>

    </div>

  </div>
</template>

<script>
export default {
  name: 'PayCheckList',
  data() {
    return {
      getDataParam: {
        pageNum: 1,
        pageSize: 10,
        userId: '',
        date: undefined,
        status: '',
      },
      total: 0,
      dataList: [],
      disButton: true,
      batchIds: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
    }
  },
  methods: {
    getCheckList() {
      this.$axios.post('check/lists', this.getDataParam).then((e) => {
        if (e.data.error === 1) {
          this.dataList = e.data.data.records
          this.total = e.data.data.total
        } else {
          this.$message({
            type: 'error',
            message: e.data.message,
          })
        }
      })
    },
    emptyQuery() {
      this.getDataParam.pageNum = 1
      this.getDataParam.pageSize = 10
      this.getDataParam.date = undefined
      this.getDataParam.userId = ''
      this.getDataParam.status = ''
      this.getCheckList()
    },
    pageSizechange(e) {
      this.getDataParam.pageSize = e
      this.getCheckList()
    },
    pageNumchange(e) {
      this.getDataParam.pageNum = e
      this.getCheckList()
    },
    tableSelectionChange(e) {
      if (e.length > 0) {
        this.disButton = false
      } else {
        this.disButton = true
      }
      let ids = []
      e.forEach((item) => ids.push(item.checkId))
      this.batchIds = ids
    },
    opShow(e) {},
    getStatusText(status) {
      //考勤状态(0正常 1缺勤)
      if (status === 0) {
        return '正常'
      } else if (status === 1) {
        return '缺勤'
      } else {
        return status
      }
    },
    isNull(e) {
      return e === null ? '未记录' : e
    },
    isTableText(e) {
      if (e === 1) return '有'
      else if (e === 0) return '无'
      else return '未记录'
    },
    batchOption() {
      this.$confirm('是否确认导出已选的考勤信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          let loadingInstance = this.$loading.service({
            text: '正在导出数据中...',
          })
          this.$axios({
            method: 'post',
            url: 'check/exportExcel',
            data: JSON.stringify(this.batchIds),
            responseType: 'blob',
          })
            .then((e) => {
              if (e.data.type === 'application/json') return
              const { headers, data } = e
              // 从响应头中获取文件名，*如果network中能看到content-disposition，代码无法获取，需后端配置
              let filename = decodeURI(headers['content-disposition']).split(
                'filename='
              )[1]
              filename = filename.substring(1, filename.length - 1)
              let blob = new Blob([data], { type: headers['content-type'] })
              this.saveAs(blob, filename)
            })
            .catch((e) => {})
            .then(() => loadingInstance.close())
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消数据导出',
          })
        })
    },
    saveAs(blob, filename) {
      if ('download' in document.createElement('a')) {
        const eleA = document.createElement('a')
        eleA.download = filename
        eleA.style.display = 'none'
        eleA.href = URL.createObjectURL(blob)
        document.body.appendChild(eleA)
        eleA.click()
        URL.revokeObjectURL(eleA.href) //释放URL对象
        document.body.removeChild(eleA)
      } else {
        // IE下载
        console.log('IE下载')
        navigator.msSaveOrOpenBlob(blob, filename)
      }
    },
  },
  mounted() {
    this.getCheckList()
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
.page {
  margin: 10px 0;
}
</style>