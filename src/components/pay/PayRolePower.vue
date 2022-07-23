<!-- demo -->
<template>
  <div>
    <div class="header">
      <el-divider>
        <h2>角色权限</h2>
      </el-divider>
    </div>
    <div class="content">
      <template>
        <el-tabs type="border-card"
                 style="min-height:600px"
                 @tab-click="handleClick">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-grape"></i>角色配置</span>
            <div>
              <div class="top">
                <el-button type="primary"
                           @click="addRoleVisible=true"
                           plain>添加角色</el-button>
              </div>
              <div class="table">
                <el-table :data="roles"
                          @row-click="showPower"
                          border>
                  <el-table-column type="index"
                                   align="center"
                                   label="序号">
                  </el-table-column>
                  <el-table-column prop="role.rname"
                                   label="角色名称"
                                   align="center">
                  </el-table-column>
                  <el-table-column prop="role.notes"
                                   label="角色描述"
                                   align="center">
                  </el-table-column>
                  <el-table-column prop="role.updatetime"
                                   label="更新时间"
                                   align="center">
                  </el-table-column>
                  <el-table-column label="操作"
                                   header-align="center"
                                   width="200"
                                   align="center">
                    <el-button-group slot-scope="scope">
                      <el-tooltip content="修改"
                                  placement="top"
                                  :open-delay="1000">
                        <el-button @click.stop="show(scope.row)"
                                   type="primary"
                                   size="mini"
                                   icon="el-icon-edit"></el-button>
                      </el-tooltip>
                      <el-tooltip content="删除"
                                  placement="top"
                                  :open-delay="1000">
                        <el-button @click.stop="del(scope.row.role)"
                                   type="primary"
                                   size="mini"
                                   icon="el-icon-delete"></el-button>
                      </el-tooltip>
                    </el-button-group>
                  </el-table-column>
                </el-table>
              </div>
              <div class="show">
                <el-dialog title="权限信息"
                           :visible.sync="showVisible">
                  <el-table :data="rowPowers">
                    <el-table-column type="index"
                                     align="center"
                                     label="序号">
                    </el-table-column>
                    <el-table-column prop="pname"
                                     label="权限名称"
                                     align="center">
                    </el-table-column>
                    <el-table-column prop="path"
                                     label="权限路径"
                                     align="center">
                    </el-table-column>
                    <el-table-column prop="notes"
                                     label="权限描述"
                                     align="center">
                    </el-table-column>

                  </el-table>
                </el-dialog>
              </div>

              <div class="add">
                <el-dialog title="添加角色"
                           :visible.sync="addRoleVisible"
                           width="700px"
                           top="15vh"
                           center="">
                  <el-form :model="roleAddData"
                           status-icon
                           :rules="rulesRoleAddData"
                           ref="refRoleAddData"
                           label-width="80px"
                           class="demo-ruleForm">
                    <el-form-item label="角色名称"
                                  prop="role.rname">
                      <el-input type="text"
                                v-model="roleAddData.role.rname"
                                maxlength="10"
                                show-word-limit
                                clearable
                                autocomplete="off"
                                prefix-icon="el-icon-star-off"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述"
                                  prop="role.notes">
                      <el-input type="text"
                                v-model="roleAddData.role.notes"
                                maxlength="30"
                                clearable
                                show-word-limit
                                autocomplete="off"
                                prefix-icon="el-icon-chat-line-square"></el-input>
                    </el-form-item>
                    <template>
                      <el-transfer v-model="roleAddData.powerIds"
                                   :titles="['权限库', '分配库']"
                                   filterable
                                   style="width:590px"
                                   :data="powersOption"></el-transfer>
                    </template>
                  </el-form>
                  <div slot="footer"
                       class="dialog-footer">
                    <el-button type="primary"
                               @click="addRole('refRoleAddData')">添 加</el-button>
                  </div>
                </el-dialog>
              </div>

              <div class="update">
                <el-dialog title="修改角色"
                           :visible.sync="upRoleVisible"
                           width="700px"
                           top="15vh"
                           center="">
                  <el-form :model="roleUpData"
                           status-icon
                           :rules="rulesRoleAddData"
                           ref="refRoleUpData"
                           label-width="80px"
                           class="demo-ruleForm">
                    <el-form-item label="角色名称"
                                  prop="role.rname">
                      <el-input type="text"
                                v-model="roleUpData.role.rname"
                                maxlength="10"
                                show-word-limit
                                clearable
                                autocomplete="off"
                                prefix-icon="el-icon-star-off"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述"
                                  prop="role.notes">
                      <el-input type="text"
                                v-model="roleUpData.role.notes"
                                maxlength="30"
                                clearable
                                show-word-limit
                                autocomplete="off"
                                prefix-icon="el-icon-chat-line-square"></el-input>
                    </el-form-item>
                    <template>
                      <el-transfer v-model="roleUpData.powerIds"
                                   :titles="['权限库', '分配库']"
                                   filterable
                                   style="width:590px"
                                   :data="powersOption"></el-transfer>
                    </template>
                  </el-form>
                  <div slot="footer"
                       class="dialog-footer">
                    <el-button type="primary"
                               @click="upRole('refRoleUpData')">修 改</el-button>
                  </div>
                </el-dialog>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-apple"></i>权限配置</span>
            <div>
              <div class="table">
                <el-table :data="powers"
                          border>
                  <el-table-column type="index"
                                   align="center"
                                   label="序号">
                  </el-table-column>
                  <el-table-column prop="pname"
                                   label="权限名称"
                                   align="center">
                  </el-table-column>
                  <el-table-column prop="path"
                                   label="权限路径"
                                   align="center">
                  </el-table-column>
                  <el-table-column prop="notes"
                                   label="权限描述"
                                   align="center">
                  </el-table-column>
                  <el-table-column prop="updatetime"
                                   label="跟新时间"
                                   align="center">
                  </el-table-column>
                </el-table>
              </div>

            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayRolePower',
  data() {
    return {
      roles: [],
      powers: [],
      powersOption: [],
      rowPowers: [],
      showVisible: false,
      addRoleVisible: false,
      roleAddData: {
        role: {
          rname: '', //角色名称
          notes: '', //描述
        },
        powerIds: [],
      },
      rulesRoleAddData: {
        'role.rname': [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
        'role.notes': [
          { required: true, message: '请输入角色描述信息', trigger: 'blur' },
        ],
      },
      upRoleVisible: false,
      roleUpData: {
        role: {},
        powerIds: [],
      },
    }
  },
  methods: {
    //数据修改成功，更新表格数据
    /**
     * @param row 当前行对象
     * @param updata 修改完毕的对象
     */
    upRowData(row, update) {
      //遍历赋值给row当前行数据，可以避免一次请求。赋值对象会改变引用地址，导致表格数据无法同步，因此使用遍历赋值；
      for (let key in row) {
        // console.log(this.upTypeData[key])
        if (update[key] != null) {
          row[key] = update[key]
        }
      }
    },
    init() {
      this.getRoleList()
      this.getPowerPowers()
    },
    handleClick(tab, event) {
      // console.log(tab.paneName, event)
      // if (tab.paneName === '1') {
      // }
    },
    getRoleList() {
      this.$axios.get('role/list').then((e) => {
        if (e.data.error === 1) {
          this.roles = e.data.data
        } else {
          this.$message({
            type: 'error',
            message: e.data.message,
          })
        }
      })
    },
    getPowerPowers() {
      this.$axios.get('power/powers').then((e) => {
        if (e.data.error === 1) {
          this.powers = e.data.data
          this.powers.forEach((e) => {
            let option = {
              key: e.powerId,
              label: e.pname,
            }
            this.powersOption.push(option)
          })
        } else {
          this.$message({
            type: 'error',
            message: e.data.message,
          })
        }
      })
    },
    showPower(row) {
      this.rowPowers = []
      const ids = row.powerIds
      if (ids === null) return (this.showVisible = true)
      const powers = this.powers
      ids.forEach((id) => {
        this.rowPowers.push(powers.find((e) => e.powerId === id))
      })
      this.showVisible = true
    },
    addRole(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          this.$axios.post('role/add', this.roleAddData).then((e) => {
            if (e.data.error === 1) {
              this.$message({
                type: 'success',
                message: '添加角色成功！',
              })
              this.getRoleList()
              this.resetForm(formName)
              this.addRoleVisible = false
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
    show(row) {
      //修改
      this.roleUpData = JSON.parse(JSON.stringify(row))
      if (this.roleUpData.powerIds === null) this.roleUpData.powerIds = []
      this.upRoleVisible = true
    },
    upRole() {
      const data = this.roleUpData
      this.$axios.post('role/update', data).then((e) => {
        if (e.data.error === 1) {
          this.$message({
            type: 'success',
            message: '修改角色成功！',
          })
          let obj = this.roles.find((e) => e.role.roleId === data.role.roleId)
          this.upRowData(obj, data)
          this.upRoleVisible = false
        } else {
          this.$message({
            type: 'error',
            message: e.data.message,
          })
        }
      })
    },
    del(role) {
      this.$confirm('是否确删除当前部门信息', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          const id = role.roleId
          this.$axios.get('role/remove?id=' + id).then((e) => {
            if (e.data.error === 1) {
              this.$message({
                type: 'success',
                message: '删除角色成功！',
              })
              this.getRoleList()
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
.top {
  text-align: left;
}
.top button {
  margin: 0px 0px 10px 10px;
}

.el-transfer {
  margin: 0 auto;
}
</style>