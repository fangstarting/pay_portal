<!-- PaySystems -->
<template>
  <div>
    <div class="header">
      <el-divider>
        <h2>系统配置</h2>
      </el-divider>
    </div>
    <div class="content">
      <div class="table">
        <el-table :data="list"
                  border>
          <el-table-column type="index"
                           align="center"
                           label="序号">
          </el-table-column>
          <el-table-column prop="sysTitle"
                           label="标签"
                           align="center">
          </el-table-column>
          <el-table-column prop="sysKey"
                           label="系统配置key"
                           align="center">
          </el-table-column>
          <el-table-column prop="sysValueNumber"
                           label="数值"
                           width="200"
                           align="center">
            <template slot-scope="scope">
              <el-tag type="info"
                      effect="plain"
                      v-if="scope.row.sysValueNumber===null"
                      size="medium">暂无</el-tag>
              <el-tag v-else
                      effect="plain"
                      size="medium">{{ scope.row.sysValueNumber }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sysValueString"
                           label="字符值"
                           width="300"
                           align="center">
            <template slot-scope="scope">
              <el-tag type="info"
                      effect="plain"
                      v-if="scope.row.sysValueString===null"
                      size="medium">暂无</el-tag>
              <el-tag v-else
                      effect="plain"
                      size="medium">{{ scope.row.sysValueString }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime"
                           label="更新时间"
                           width="180"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           header-align="center"
                           align="center">
            <el-button-group slot-scope="scope">
              <el-tooltip content="配置"
                          placement="top"
                          :open-delay="1000">
                <el-button @click="show(scope.row)"
                           type="primary"
                           size="mini"
                           icon="el-icon-s-tools"></el-button>
              </el-tooltip>
            </el-button-group>
          </el-table-column>
        </el-table>
      </div>
      <div class="show">
        <el-dialog title="修改系统配置项"
                   :visible.sync="showVisible"
                   width="500px"
                   top="8vh"
                   center="">
          <el-form :model="sysConfigsData"
                   status-icon
                   ref="refData"
                   label-width="80px"
                   class="demo-ruleForm">
            <el-form-item label="Key"
                          prop="sysKey">
              <el-input type="text"
                        v-model="sysConfigsData.sysKey"
                        disabled
                        autocomplete="off"
                        prefix-icon="el-icon-key"></el-input>
            </el-form-item>
            <el-form-item label="标签"
                          prop="sysTitle">
              <el-input type="text"
                        v-model="sysConfigsData.sysTitle"
                        autocomplete="off"
                        prefix-icon="el-icon-discount"></el-input>
            </el-form-item>
            <el-form-item label="数值"
                          prop="sysValueNumber">
              <el-input type="text"
                        oninput="value=value.replace(/[^0-9.]/g,'')"
                        v-model="sysConfigsData.sysValueNumber"
                        autocomplete="off"
                        prefix-icon="el-icon-link"></el-input>
            </el-form-item>
            <el-form-item label="字符值"
                          prop="sysValueString">
              <el-input type="textarea"
                        rows="4"
                        v-model="sysConfigsData.sysValueString"
                        autocomplete="off"
                        prefix-icon="el-icon-connection"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button type="primary"
                       @click="update()">修 改</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaySystems',
  data() {
    return {
      list: [],
      sysConfigsData: {},
      showVisible: false,
    }
  },
  methods: {
    init() {
      this.getList()
    },
    getList() {
      this.$axios.get('sysConfigs/list').then((e) => {
        if (e.data.error === 1) {
          this.list = e.data.data
        } else {
          this.$message({
            type: 'error',
            message: e.data.message,
          })
        }
      })
    },
    show(e) {
      this.sysConfigsData = JSON.parse(JSON.stringify(e))
      this.showVisible = true
    },
    update() {
      this.$message({
        type: 'warning',
        message: '没有获取到系统修改权限！',
      })
      this.showVisible = false
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
.content {
  text-align: center;
}
</style>
