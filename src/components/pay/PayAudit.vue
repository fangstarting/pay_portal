<!-- PayAudit -->
<template>
  <div>
    <div id="audit">
      <div class="header">
        <el-divider>
          <h2>审批列表</h2>
        </el-divider>
      </div>
      <div class="topOperate">

        <el-button @click="getAudits"
                   icon="el-icon-search"
                   circle></el-button>
        <el-select v-model="auditParmas.audtypeId"
                   clearable
                   style="width: 150px"
                   placeholder="选择类型">
          <el-option v-for="item in audtypes"
                     :key="item.audtypeId"
                     :label="item.name"
                     :value="item.audtypeId">
          </el-option>
        </el-select>

        <el-select v-model="auditParmas.status"
                   clearable
                   style="width: 150px"
                   placeholder="选择状态">
          <el-option v-for="item in auditStatus"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>

        <el-button icon="el-icon-refresh"
                   @click="emptyQuery"
                   circle></el-button>
      </div>
      <div class="page">
        <el-pagination @size-change="pageSizechange"
                       @current-change="pageNumchange"
                       :page-size="auditParmas.pageSize"
                       :current-page="auditParmas.pageNum"
                       :page-sizes="[10, 20, 50]"
                       layout="total , sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
      <div class="auditList">
        <div class="table">
          <el-table :data="audits"
                    border
                    style="width: 100%">
            <el-table-column type="index"
                             align="center"
                             label="序号"
                             style="width: 10%">
            </el-table-column>
            <el-table-column prop="audtype.name"
                             label="审批类型"
                             align="center"
                             style="width: 20%">
            </el-table-column>
            <el-table-column prop="submituser.realname"
                             label="提交人"
                             align="center"
                             style="width: 20%">
            </el-table-column>
            <el-table-column prop="submituser.position.pname"
                             label="职位"
                             align="center"
                             style="width: 10%">
            </el-table-column>
            <el-table-column prop="status"
                             label="状态"
                             align="center"
                             style="width: 10%">
              <template slot-scope="scope">
                <span v-if="scope.row.status==0">
                  <el-tag>未处理</el-tag>
                </span>
                <span v-if="scope.row.status==1">
                  <el-tag type="info">已处理</el-tag>
                </span>
                <span v-if="scope.row.status==2">
                  <el-tag type="warning">已搁置</el-tag>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="updatetime"
                             label="更新时间"
                             align="center"
                             style="width: 10%">
            </el-table-column>
            <el-table-column label="操作"
                             header-align="center"
                             align="center"
                             style="width: 10%">
              <el-button-group slot-scope="scope">
                <el-tooltip content="审核"
                            placement="top"
                            :open-delay="1000">
                  <el-button @click="showAuditInfo(scope.row)"
                             type="primary"
                             size="mini"
                             icon="el-icon-view"></el-button>
                </el-tooltip>
                <el-tooltip content="删除"
                            placement="top"
                            :open-delay="1000">
                  <el-button @click="delAudit(scope.row.auditId)"
                             type="primary"
                             size="mini"
                             icon="el-icon-delete"></el-button>
                </el-tooltip>
              </el-button-group>
            </el-table-column>
          </el-table>
        </div>

      </div>

      <div class="info">

        <div class="user">

          <el-dialog title="激活审批"
                     :visible.sync="userVisible"
                     width="800px"
                     top="8vh"
                     center="">
            <el-form :model="userData"
                     status-icon
                     :disabled="formDisabled"
                     :rules="rulesUser"
                     style="padding: 0 30px 0 0"
                     ref="userData"
                     label-width="80px"
                     class="demo-ruleForm">
              <el-row :gutter="10">
                <el-col :span="24">
                  <el-form-item label="描述"
                                prop="realname">
                    <span class="title_span">&nbsp;{{userData.notes}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="角色"
                                prop="roleId">
                    <el-select v-model="userData.roleId"
                               placeholder="选择角色"
                               size="medium"
                               style="width: ;">
                      <el-option v-for="item in roles"
                                 :key="item.roleId"
                                 :label="item.rname"
                                 :value="item.roleId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="部门"
                                prop="deptId">
                    <el-select v-model="userData.deptId"
                               @change="getPositions(userData.deptId)"
                               placeholder="选择部门"
                               size="medium"
                               style="width: ;">

                      <el-option v-for="item in depts"
                                 :key="item.deptId"
                                 :label="item.dname"
                                 :value="item.deptId">
                        <div @click="clearPosition"> {{item.dname}} </div>
                      </el-option>

                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="职位"
                                prop="positionId">
                    <el-select v-model="userData.positionId"
                               placeholder="选择职位"
                               size="medium"
                               style="width: ;">
                      <el-option v-for="item in positions"
                                 :key="item.positionId"
                                 :label="item.pname"
                                 :value="item.positionId"
                                 :disabled="item.status==0">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="职称"
                                prop="jobgradeId">
                    <el-select v-model="userData.jobgradeId"
                               placeholder="选择职称"
                               size="medium"
                               style="width: ;">
                      <el-option v-for="item in jobgrades"
                                 :key="item.jobgradeId"
                                 :label="item.jobtitle"
                                 :value="item.jobgradeId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="真实姓名"
                                prop="realname">
                    <el-input type="text"
                              v-model="userData.realname"
                              autocomplete="off"
                              prefix-icon="el-icon-s-custom"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="性别"
                                prop="sex">
                    <el-input type="text"
                              v-model="userData.sex"
                              autocomplete="off"
                              prefix-icon="el-icon-s-custom"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="学历"
                                prop="name">
                    <el-select v-model="userData.education"
                               placeholder="选择学历"
                               size="medium"
                               style="width: 120px;"
                               disabled>
                      <el-option v-for="item in educations"
                                 :key="item.name"
                                 :label="item.name"
                                 :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="电话"
                                prop="phone">
                    <el-input type="text"
                              v-model="userData.phone"
                              autocomplete="off"
                              prefix-icon="el-icon-mobile-phone"
                              maxlength="11"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="生日"
                                prop="birthday">
                    <el-date-picker v-model="userData.birthday"
                                    align="right"
                                    disabled
                                    type="date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="入职日期"
                            prop="hiredate">
                <el-date-picker v-model="userData.hiredate"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="基本工资"
                            prop="basepay">
                <el-input type="number"
                          v-model="userData.basepay"
                          autocomplete="off"
                          prefix-icon="el-icon-mobile-phone"></el-input>
              </el-form-item>
              <el-form-item label="用户状态"
                            prop="status">
                <el-tooltip :content="'状态: ' + userStatusText"
                            placement="top">
                  <el-switch v-model="userStatusText"
                             active-color="#13ce66"
                             inactive-color="#7c7c7d"
                             @change="userStatusChange()"
                             active-value="启用"
                             inactive-value="禁用">
                  </el-switch>
                </el-tooltip>
              </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button :disabled="formDisabled"
                         @click="shelve(opAudit)">搁 置</el-button>
              <el-button type="primary"
                         :disabled="formDisabled"
                         @click="dispose(opAudit)">{{btnText}}</el-button>
            </div>
          </el-dialog>

        </div>

        <div class="leave">

          <el-dialog title="请假审批"
                     :visible.sync="leaveVisible"
                     width="700px"
                     top="8vh"
                     center="">
            <el-form :model="leaveData"
                     status-icon
                     style="padding: 0 50px 0 20px"
                     :disabled="formDisabled"
                     :rules="rulesLeave"
                     ref="leaveData"
                     label-width="80px"
                     class="demo-ruleForm">
              <el-row :gutter="10">
                <el-col :span="24">
                  <el-form-item label="描述"
                                prop="realname">
                    <span class="title_span">&nbsp;{{leaveAudit.notes}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="工号"
                                prop="">
                    <el-input type="text"
                              v-model="leaveData.userId"
                              autocomplete="off"
                              prefix-icon="el-icon-s-custom"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="姓名"
                                prop="">
                    <el-input type="text"
                              v-model="userInfo.realname"
                              autocomplete="off"
                              prefix-icon="el-icon-s-custom"
                              disabled></el-input>
                  </el-form-item>

                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="部门"
                                prop="">
                    <el-input type="text"
                              v-model="leaveUserInfo.dname"
                              autocomplete="off"
                              prefix-icon="el-icon-s-custom"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="职位"
                                prop="">
                    <el-input type="text"
                              v-model="leaveUserInfo.pname"
                              autocomplete="off"
                              prefix-icon="el-icon-s-custom"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="请假类型"
                                prop="">
                    <el-input type="text"
                              v-model="leaveUserInfo.typeText"
                              autocomplete="off"
                              prefix-icon="el-icon-s-custom"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="原因"
                            prop="">
                <el-input type="textarea"
                          v-model="leaveData.notes"
                          autocomplete="off"
                          prefix-icon="el-icon-s-custom"
                          disabled></el-input>
              </el-form-item>
              <el-form-item label="请假日期"
                            prop="">
                <span>{{leaveUserInfo.sdate}} 至 {{leaveUserInfo.edate}}</span>
              </el-form-item>
              <el-form-item label="审批意见"
                            prop="name">
                <el-input type="textarea"
                          v-model="leaveData.opinion"
                          autocomplete="off"
                          prefix-icon="el-icon-s-custom"
                          :autosize="{ minRows: 2, maxRows: 4}"></el-input>
              </el-form-item>
              <el-form-item label="批准"
                            prop="status">
                <el-tooltip :content="'状态: ' + leaveStatusText"
                            placement="top">
                  <el-switch v-model="leaveStatusText"
                             active-color="#13ce66"
                             inactive-color="#ff4949"
                             @change="leaveStatusChange()"
                             active-value="通过"
                             inactive-value="否决">
                  </el-switch>
                </el-tooltip>
              </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button :disabled="formDisabled"
                         @click="shelve(opAudit)">搁 置</el-button>
              <el-button type="primary"
                         :disabled="formDisabled"
                         @click="dispose(opAudit)">{{btnText}}</el-button>
            </div>
          </el-dialog>

        </div>
        <div class="extrawork">
          <el-dialog title="加班审批"
                     :visible.sync="extraworkVisible"
                     width="700px"
                     top="8vh"
                     center="">
            <el-form :model="extraworkData"
                     status-icon
                     :disabled="formDisabled"
                     style="padding: 0 50px"
                     :rules="ruleExtrawork"
                     ref="extraworkData"
                     label-width="80px"
                     class="demo-ruleForm">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="描述"
                                prop="">

                    <span class="title_span">&nbsp;{{extraworkData.notes}}</span>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="工号"
                                prop="">
                    <el-input type="text"
                              v-model="extraworkData.userId"
                              autocomplete="off"
                              prefix-icon="el-icon-s-custom"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="姓名"
                                prop="">
                    <el-input type="text"
                              v-model="extraworkData.realname"
                              autocomplete="off"
                              prefix-icon="el-icon-s-custom"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="部门"
                                prop="">
                    <el-input type="text"
                              v-model="extraworkData.dname"
                              autocomplete="off"
                              prefix-icon="el-icon-s-custom"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="职位"
                                prop="">
                    <el-input type="text"
                              v-model="extraworkData.pname"
                              autocomplete="off"
                              prefix-icon="el-icon-s-custom"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="加班类型"
                                prop="">
                    <el-input type="text"
                              v-model="extraworkData.typeName"
                              autocomplete="off"
                              prefix-icon="el-icon-s-custom"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="加班时长"
                                prop="">
                    <span>{{extraworkData.duration}}小时</span>

                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="加班日期"
                                prop="">
                    <el-date-picker v-model="extraworkData.date"
                                    style="width: 190px"
                                    type="date"
                                    disabled
                                    placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12"></el-col>
              </el-row>

              <el-form-item label="审批意见"
                            prop="name">
                <el-input type="textarea"
                          v-model="extraworkData.opinion"
                          autocomplete="off"
                          prefix-icon="el-icon-s-custom"
                          :autosize="{ minRows: 2, maxRows: 4}"></el-input>
              </el-form-item>
              <el-form-item label="批准"
                            prop="status">
                <el-tooltip :content="'状态: ' + exStatusText"
                            placement="top">
                  <el-switch v-model="exStatusText"
                             active-color="#13ce66"
                             inactive-color="#ff4949"
                             @change="exStatusChange()"
                             active-value="通过"
                             inactive-value="否决">
                  </el-switch>
                </el-tooltip>
              </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button :disabled="formDisabled"
                         @click="shelve(opAudit)">搁 置</el-button>
              <el-button type="primary"
                         :disabled="formDisabled"
                         @click="dispose(opAudit)">{{btnText}}</el-button>
            </div>
          </el-dialog>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'PayAudit',
  data() {
    return {
      audits: [], // -status状态(0未读 1处理 2搁置)
      auditStatus: [
        // { value: '', label: '全部' },
        { value: 0, label: '未读' },
        { value: 1, label: '处理' },
        { value: 2, label: '搁置' },
      ],
      auditParmas: {
        pageNum: 1,
        pageSize: 10,
        audtypeId: '',
        status: '',
      },
      total: 0,
      auditStatusTexts: [
        { id: 0, name: '未读' },
        { id: 1, name: '处理' },
        { id: 2, name: '搁置' },
      ],
      //全局变量区
      opAudit: { auditId: '', audtypeId: '' }, //操作对象audit

      //公共数据
      positionsAll: [],

      //info 审核信息 模块
      //1.激活模块 user表信息
      userData: {
        //Audit 信息
        auditId: '',
        audtypeId: '',
        notes: '',

        userId: '', //用户Id
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
        basepay: '', //基本工资**
        status: '', //用户状态(0 停用 1 启用)
      },
      roles: [], //{roleId,rname}
      depts: [], //{deptId,dname}
      positions: [], //{positionId,pname}
      jobgrades: [], //{jobgradeId,jobtitle}
      educations: [{ name: '专科' }, { name: '本科' }, { name: '研究生' }],
      positionIdOld: '',
      positionTextOld: '',

      userStatusText: '禁用',
      userVisible: false,
      rulesUser: {},
      //end

      //2.请假模块 leave表信息
      leaveVisible: false,
      leaveStatusText: '通过',
      leaveAudit: {
        //Audit 信息
        auditId: '',
        audtypeId: '',
        notes: '',
      },
      leaveData: {
        auditId: '',
        audtypeId: '',
        //leave信息
        leaveId: '',
        userId: '',
        startdate: '',
        enddate: '',
        type: '', //请假类型(1病假 2事假)
        status: '',
        notes: '',
        opinion: '',
        updatetime: '',
      },
      leaveUserInfo: {
        dname: '',
        pname: '',
        typeText: '',
        sdate: '',
        edate: '',
      },
      userInfo: {},
      rulesLeave: {},

      //3.加班模块 extrawork表信息
      extraworkVisible: false,
      extraworkData: {
        //Audit 信息
        auditId: '',
        audtypeId: '',
        notes: '',
        //extrawork表信息
        ewtypeId: '',
        userId: '',
        extraworkId: '',
        status: 1, //(0 未审核 1 审核通过 2 审核失败)
        date: '', //加班日期(yyyy-mm-dd)
        duration: '',
        opinion: '',

        typeName: '',
        realname: '',
        dname: '',
        pname: '',
      },
      exStatusText: '通过',
      ruleExtrawork: {},

      //elemen-Ui 组件数据
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },

      formDisabled: false,
      btnText: '处 理',
      testData: '',
      audtypes: [],
    }
  },
  methods: {
    init() {
      this.getAudits()
      this.getRoles()
      this.getDepts()
      this.getPositionsAll()
      this.getJobgrades()
      this.getAudtyoes()
    },
    getAudtyoes() {
      this.$axios.get('audtype/list').then((e) => {
        this.audtypes = e.data.data
      })
    },
    getAudits() {
      console.log(this.auditParmas)
      this.$axios
        .post('audit/getaudits', this.auditParmas)
        .then((e) => {
          console.log(e.data)
          this.audits = e.data.page.data
          this.total = e.data.page.total
        })
        .catch()
    },
    upAudit() {},
    upAudObjByType(type) {},
    //处理审批内容
    //获取内容
    getAuditInfo(audit) {
      // console.log(audit)
      if (audit.status == 1) {
        //已处理
        this.formDisabled = true
        this.btnText = '已处理'
      } else {
        this.formDisabled = false
        this.btnText = '处 理'
      }
      var auditId = audit.auditId
      this.$axios
        .get('audit/getauditinfo', { params: { auditId } })
        .then((e) => {
          if (e.data.errorcode == 100) {
            if (e.data.info.audtypeId == 1) {
              //激活
              this.userData = e.data.info.auditInfo //数据
              this.getPositions(this.userData.deptId)
              this.userStatusInitText()
              this.userData.auditId = auditId
              this.userData.audtypeId = audit.audtype.audtypeId
              this.userData.notes = audit.notes
              this.positionIdOld = this.userData.positionId
              this.userVisible = true //视图
            }
            if (e.data.info.audtypeId == 2) {
              //请假
              // console.log(e)
              this.leaveAudit.auditId = auditId
              this.leaveAudit.audtypeId = audit.audtype.audtypeId
              this.leaveAudit.notes = audit.notes
              this.leaveData = e.data.info.auditInfo //主数据
              this.leaveData.auditId = auditId
              this.leaveData.audtypeId = audit.audtype.audtypeId
              this.getUserInfo(this.leaveData.userId)

              this.leaveStatusInitText()
              this.leaveVisible = true
            }
            if (e.data.info.audtypeId == 3) {
              //加班
              this.extraworkData = e.data.info.auditInfo
              this.extraworkData.auditId = auditId
              this.extraworkData.audtypeId = audit.audtype.audtypeId
              this.extraworkData.notes = audit.notes
              this.exStatusInitText()
              this.extraworkVisible = true
            }
          } else {
            console.log(e.data.errorcode)
          }
        })
        .catch()
    },
    //获取对象模块
    showAuditInfo(audit) {
      //记录操作对象
      this.opAudit.auditId = audit.auditId
      this.opAudit.audtypeId = audit.audtype.audtypeId
      this.getAuditInfo(audit) //加载数据及视图
    },
    //更新审批内容
    upAuditInfo() {},
    //页码改变事件
    pageSizechange(e) {
      this.auditParmas.pageSize = e
      this.getAudits()
    },
    pageNumchange(e) {
      // console.log(">>触发页面改变事件");
      this.auditParmas.pageNum = e
      this.getAudits()
    },

    //info 审核信息 模块 初始化的数据
    //1.激活模块 activate
    //数据区
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
      const all = this.positionsAll
      const ps = []
      all.forEach((e) => {
        if (e.deptId === deptId) ps.push(e)
      })
      this.positions = ps

      // this.$axios
      //   .get('position/getinbydeptid', { params: { deptId } })
      //   .then((e) => {
      //     this.positions = e.data.positions
      //     this.userData.positionId = ''
      //   })
      //   .catch()
    },
    clearPosition() {
      this.userData.positionId = ''
    },
    getPositionsAll() {
      this.$axios
        .get('position/getpositions')
        .then((e) => {
          this.positionsAll = e.data.positions
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
    //功能区
    userStatusChange() {
      if (this.userStatusText == '启用') {
        this.userData.status = 1
      }
      if (this.userStatusText == '禁用') {
        this.userData.status = 0
      }
    },
    userStatusInitText() {
      this.userStatusText = this.userData.status == 1 ? '启用' : '禁用'
    },

    //业务区
    delAudit(id) {
      //删除
      this.$confirm('是否确删除当前审核信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          this.$axios.get('audit/remove', { params: { id } }).then((e) => {
            if (e.data.error === 1) {
              this.$message({
                type: 'success',
                message: '删除成功',
              })
              this.getAudits()
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

    //2.请假模块 leave

    //功能区
    getLeaveTypeText(type) {
      if (type == 1) return '病假'
      if (type == 2) return '事假'
    },
    getDate(datetime) {
      return datetime.substring(0, datetime.indexOf(' '))
    },
    leaveStatusChange() {
      if (this.userStatusText == '通过') {
        this.userData.status = 1
      }
      if (this.userStatusText == '否决') {
        this.userData.status = 2
      }
    },
    getDeptName(deptId) {
      const dept = this.depts.find((e) => e.deptId == deptId)
      return dept.dname
    },
    getPositionName(positionId) {
      const position = this.positionsAll.find((e) => e.positionId == positionId)
      return position.pname
    },
    //数据区
    getUserInfo(userId) {
      this.$axios
        .get('user/getuserbyid', { params: { userId } })
        .then((e) => {
          this.userInfo = e.data.user
          this.getLeaveUserInfo()
        })
        .catch()
    },
    getLeaveUserInfo() {
      this.leaveUserInfo.dname = this.getDeptName(this.userInfo.deptId)
      this.leaveUserInfo.pname = this.getPositionName(this.userInfo.positionId)
      this.leaveUserInfo.typeText = this.getLeaveTypeText(this.leaveData.type)
      // this.leaveUserInfo.sdate = this.getDate(this.leaveData.startdate)
      // this.leaveUserInfo.edate = this.getDate(this.leaveData.enddate)
      this.leaveUserInfo.sdate = this.leaveData.startdate
      this.leaveUserInfo.edate = this.leaveData.enddate
    },

    //**公共方法
    dispose(opAudit) {
      //处理
      var updata = {}
      if (opAudit.audtypeId == 1) updata = this.userData
      if (opAudit.audtypeId == 2) updata = this.leaveData
      if (opAudit.audtypeId == 3) updata = this.extraworkData
      this.$axios
        .post('audit/upaudit', updata)
        .then((e) => {
          if (e.data.errorcode == 100) {
            this.$message({
              type: 'success',
              message: '成功!',
            })
            this.getAudits()
          } else {
            this.$message({
              type: 'error',
              message: '失败!',
            })
          }
        })
        .catch()
      this.closePop(opAudit)
    },
    shelve(opAudit) {
      //搁置
      this.$axios
        .get('audit/shelve', { params: { auditId: opAudit.auditId } })
        .then((e) => {
          if (e.data.errorcode == 100) {
            this.$message({
              type: 'success',
              message: '成功!',
            })
            this.getAudits()
          } else {
            this.$message({
              type: 'error',
              message: '失败!',
            })
            console.log(e.data)
          }
        })
        .catch()
      this.closePop(opAudit)
    },
    //关闭模态框
    closePop(opAudit) {
      if (opAudit.audtypeId == 1) this.userVisible = false
      if (opAudit.audtypeId == 2) this.leaveVisible = false
      if (opAudit.audtypeId == 3) this.extraworkVisible = false
    },
    exStatusChange() {
      if (this.exStatusText == '通过') {
        this.extraworkData.status = 1
      }
      if (this.exStatusText == '否决') {
        this.extraworkData.status = 2
      }
    },
    leaveStatusChange() {
      if (this.leaveStatusText == '通过') {
        this.leaveData.status = 1
      }
      if (this.leaveStatusText == '否决') {
        this.leaveData.status = 2
      }
    },
    exStatusInitText() {
      if (this.extraworkData.status == 1) {
        this.exStatusText = '通过'
      } else if (this.extraworkData.status == 2) {
        this.exStatusText = '否决'
      }
    },
    leaveStatusInitText() {
      if (this.leaveData.status == 1) {
        this.leaveStatusText = '通过'
      } else if (this.leaveData.status == 2) {
        this.leaveStatusText = '否决'
      }
    },
    emptyQuery() {
      this.auditParmas.pageNum = 1
      this.auditParmas.pageSize = 10
      this.auditParmas.audtypeId = ''
      this.auditParmas.status = ''
      this.getAudits()
    },
    testEnd() {
      //结束
    },
  },
  mounted() {
    this.init()
  },
  watch: {},
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
.title_span {
  color: rgb(43, 224, 224);
  /* color: rgb(255, 75, 75); */
}
.page {
  margin: 10px 0;
}
</style>
