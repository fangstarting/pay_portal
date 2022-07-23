<!-- demo -->
<template>
  <div>
    <div class="header">
      <el-divider>
        <h2>日志记录</h2>
      </el-divider>
    </div>
    <div class="page">
      <el-pagination @size-change="pageSizechange"
                     :page-sizes="[10, 20, 50,100]"
                     :page-size="getListParam.pageSize"
                     @current-change="pageNumchange"
                     :current-page="getListParam.pageNum"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
    <div class="table">
      <el-table :data="lists"
                border>
        <el-table-column type="index"
                         align="center"
                         label="序号">
        </el-table-column>
        <el-table-column prop="updatetime"
                         label="创建时间"
                         width="200">
        </el-table-column>
        <el-table-column prop="realname"
                         label="操作者"
                         width="200">
        </el-table-column>
        <el-table-column prop="notes"
                         label="日志记录信息"
                         align="">
        </el-table-column>
        <el-table-column label="操作"
                         header-align="center"
                         align="center"
                         width="200">
          <el-button-group slot-scope="scope">
            <el-tooltip content="删除"
                        placement="top"
                        :open-delay="1000">
              <el-button @click="del(scope.row.auditId)"
                         type="primary"
                         icon="el-icon-delete"></el-button>
            </el-tooltip>
          </el-button-group>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayLogger',
  data() {
    return {
      lists: [],
      getListParam: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
    }
  },
  methods: {
    init() {
      this.getList()
    },
    getList() {
      this.$axios.post('auditlog/logs', this.getListParam).then((e) => {
        this.lists = e.data.data.records
        this.total = e.data.data.total
      })
    },
    //页码改变事件
    pageSizechange(e) {
      // console.log('页码改变事件>>' + e)
      this.getListParam.pageSize = e
      this.getList()
    },
    pageNumchange(e) {
      // console.log(">>触发页面改变事件");
      // console.log('页面改变事件>>' + e)
      this.getListParam.pageNum = e
      this.getList()
    },
    del(id) {
      this.$axios.get('auditlog/remove?id=' + id).then((e) => {
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
.page {
  margin: 10px 0;
}
</style>