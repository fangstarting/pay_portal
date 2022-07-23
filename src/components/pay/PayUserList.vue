<!-- PayUserList -->
<template>
  <div>
    <div class="header">
      <el-divider>
        <h2>员工列表</h2>
      </el-divider>
    </div>
    <div class="topOperate">
      <el-button @click="getFinds()"
                 icon="el-icon-search"
                 circle></el-button>
      <el-input v-model="getUsersParams.userId"
                placeholder="输入工号"
                oninput="value=value.replace(/\D/g,'')"
                clearable
                style="width: 120px;"></el-input>
      <el-input v-model="getUsersParams.realname"
                placeholder="姓名字段"
                clearable
                style="width: 120px;"></el-input>
      <template>
        <el-select clearable
                   v-model="getUsersParams.roleId"
                   placeholder="角色"
                   style="width: 150px;">
          <el-option v-for="item in roles"
                     :key="item.roleId"
                     :label="item.rname"
                     :value="item.roleId">
          </el-option>
        </el-select>
      </template>
      <el-autocomplete class="inline-input"
                       v-model="findText.deptText"
                       :fetch-suggestions="querySearchDept"
                       placeholder="部门"
                       @select="selectDept"
                       clearable
                       style="width: 150px;"></el-autocomplete>
      <el-autocomplete class="inline-input"
                       v-model="findText.positionText"
                       :fetch-suggestions="querySearchPosition"
                       placeholder="职位"
                       @select="selectPosition"
                       clearable
                       style="width: 150px;"></el-autocomplete>
      <template>
        <el-select clearable
                   v-model="getUsersParams.status"
                   placeholder="状态"
                   style="width: 120px;">
          <el-option v-for="item in userStatus"
                     :key="item.val"
                     :label="item.title"
                     :value="item.val">
          </el-option>
        </el-select>
      </template>

      <el-button icon="el-icon-refresh"
                 @click="emptyQuery()"
                 circle></el-button>
      <!-- <el-button type="primary" @click="" plain></el-button> -->
    </div>
    <div class="page">
      <el-pagination @size-change="pageSizechange"
                     :page-sizes="[6, 12, 20]"
                     :page-size="getUsersParams.pageSize"
                     @current-change="pageNumchange"
                     :current-page="getUsersParams.pageNum"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="userTotal">
      </el-pagination>
    </div>

    <div class="table">
      <el-table :data="users"
                border
                @row-click="opUser">
        <el-table-column prop="accountId"
                         label="工号"
                         sortable
                         align="center"
                         width="">
        </el-table-column>
        <el-table-column label="头像"
                         align="center"
                         prop="profile"
                         width="120">
          <template slot-scope="scope">
            <img v-if='true'
                 :src="scope.row.profile"
                 height="60px"
                 style="margin-bottom: -10px;">
            <img v-else
                 src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                 height="60px"
                 style="margin-bottom: -10px;">
          </template>

        </el-table-column>
        <el-table-column prop="realname"
                         label="姓名"
                         header-align="center"
                         width="">
        </el-table-column>
        <el-table-column prop="sex"
                         label="性别"
                         header-align="center"
                         align="center"
                         min-width="50">
        </el-table-column>
        <el-table-column prop="roleId"
                         label="角色"
                         header-align="center"
                         align="center"
                         width="120">
          <template slot-scope="scope">{{getRoleName(scope.row.roleId)}}</template>
        </el-table-column>
        <el-table-column prop="education"
                         label="学历"
                         header-align="center"
                         align="center"
                         width="100">
        </el-table-column>
        <el-table-column prop="jobgradeId"
                         label="职称"
                         align="center"
                         header-align="center"
                         width="">
          <template slot-scope="scope">{{getJobgradeName(scope.row.jobgradeId)}}</template>
        </el-table-column>
        <el-table-column prop="positionId"
                         label="岗位"
                         align="center"
                         min-width="100">
          <template slot-scope="scope">{{getPositionName(scope.row.positionId)}}</template>
        </el-table-column>
        <el-table-column prop="deptId"
                         label="部门"
                         align="center"
                         min-width="80">
          <template slot-scope="scope">{{getDeptName(scope.row.deptId)}}</template>
        </el-table-column>
        <el-table-column prop="phone"
                         label="手机号码"
                         align="center"
                         width="140">
        </el-table-column>
        <el-table-column prop="basepay"
                         label="基本工资(元)"
                         sortable
                         align="center"
                         width="">
        </el-table-column>
        <el-table-column prop="hiredate"
                         label="入职日期"
                         sortable
                         min-width=""
                         align="center">
          <template slot-scope="scope">{{getHiredateText(scope.row.hiredate)}}</template>
        </el-table-column>
      </el-table>
    </div>

    <div class="userInfo">
      <el-dialog title="员工信息"
                 :visible.sync="userVisible"
                 width="750px"
                 top="8vh"
                 center="">
        <el-form :model="userData"
                 :inline="true"
                 status-icon
                 ref="userData"
                 label-width="80px"
                 class="demo-ruleForm">
          <el-row>
            <el-col :span="6">
              <el-form-item label="工号:"
                            prop="userId">
                <span>{{userData.userId}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="姓名:"
                            prop="realname">
                <span>{{userData.realname}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别:"
                            prop="sex">
                <span>{{userData.sex}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="手机号"
                            prop="phone">
                <el-input type="text"
                          v-model="userData.phone"
                          autocomplete="off"
                          prefix-icon="el-icon-mobile-phone"
                          maxlength="11"
                          disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
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
            </el-col>
          </el-row>
          <el-form-item label="生日"
                        prop="birthday">
            <el-date-picker v-model="userData.birthday"
                            align="right"
                            disabled
                            type="date">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="登录时间"
                        prop="loginendtime">
            <el-date-picker v-model="userData.loginendtime"
                            align="right"
                            disabled
                            type="datetime">
            </el-date-picker>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="8">
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
            </el-col>
            <el-col :span="8">
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
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="部门"
                            prop="deptId">
                <el-select v-model="userData.deptId"
                           @change="infoDeptChange(userData.deptId)"
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
            </el-col>
            <el-col :span="8">
              <el-form-item label="职位"
                            prop="positionId">
                <el-select v-model="userData.positionId"
                           placeholder="选择职位"
                           size="medium"
                           style="width: 120px;">
                  <el-option v-for="item in positionsInfo"
                             :key="item.positionId"
                             :label="item.pname"
                             :value="item.positionId"
                             :disabled="item.status==0">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="入职日期"
                        prop="hiredate">
            <el-date-picker v-model="userData.hiredate"
                            align="right"
                            style="width: 146px;"
                            type="date"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="基本工资"
                        prop="basepay">
            <el-input type="number"
                      v-model="userData.basepay"
                      autocomplete="off"
                      prefix-icon="el-icon-mobile-phone"
                      style="width: 160px;"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="24">
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
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="userVisible=false">关 闭</el-button>
          <el-button type="primary"
                     @click="upUser()">修 改</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PayUserList',
  data() {
    return {
      getUsersParams: {
        pageNum: 1,
        pageSize: 6,
        userId: '',
        realname: '', //模糊
        roleId: '',
        deptId: '',
        positionId: '',
        status: '',
      },
      users: [],
      userTotal: 0,

      roles: [], //{roleId,rname}
      depts: [], //{deptId,dname}
      positions: [], //{positionId,pname}
      jobgrades: [], //{jobgradeId,jobtitle}
      educations: [{ name: '专科' }, { name: '本科' }, { name: '研究生' }],
      userStatus: [
        { val: 1, title: '启用' },
        { val: 2, title: '禁用' },
      ],
      //userInfo模态框 模块
      rowData: {}, //当前行数据（引用地址）
      userData: {
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
        loginendtime: '', //最终登录时间
        basepay: '', //基本工资**
        status: '', //用户状态(2 禁用 1 启用)
      },
      positionsInfo: [],
      userStatusText: '禁用',
      userVisible: false,

      //组合查询
      findText: {
        deptText: '',
        positionText: '',
      },
      positionsByDeptIdData: [],

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

      //数据分页缓存
      //分页缓存池
      cache: {}, //缓存池变量
      // cache:{
      //   page1: [data1],
      //   page2: [data2],
      //   page3: [data3],
      //   page4: [data4],
      //   page5: [data5]
      // },
      currData: [], //当前页数据

      testData: 'end',
    }
  },
  methods: {
    initCreated() {
      this.getRoles()
      this.getDepts()
      this.getPositions()
      this.getJobgrades()
    },
    initMounted() {
      this.getUsers()
    },
    getUsers() {
      console.log(this.getUsersParams)
      this.$axios
        .post('user/getusers', this.getUsersParams)
        .then((e) => {
          console.log(e)
          if (e.data.errorcode == 100) {
            this.users = e.data.page.records
            this.userTotal = e.data.page.total
          } else {
            console.log(e.data.errorcode)
          }
        })
        .catch()
    },

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
    getPositions() {
      this.$axios
        .get('position/getpositions')
        .then((e) => {
          this.positions = e.data.positions
        })
        .catch()
    },
    getPositionsByDeptId(deptId) {
      this.$axios
        .get('position/getinbydeptid', { params: { deptId } })
        .then((e) => {
          this.positionsInfo = e.data.positions
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
    getRoleName(roleId) {
      if (roleId === null || roleId === undefined || roleId === '') {
        return ''
      }
      const role = this.roles.find((e) => e.roleId == roleId)
      return role.rname
    },
    getDeptName(deptId) {
      if (deptId === null || deptId === undefined || deptId === '') {
        return ''
      }
      const dept = this.depts.find((e) => e.deptId == deptId)
      return dept.dname
    },
    getPositionName(positionId) {
      if (
        positionId === null ||
        positionId === undefined ||
        positionId === ''
      ) {
        return ''
      }
      const position = this.positions.find((e) => e.positionId == positionId)
      return position.pname
    },
    getJobgradeName(jobgradeId) {
      if (
        jobgradeId === null ||
        jobgradeId === undefined ||
        jobgradeId === ''
      ) {
        return ''
      }
      const jobgrade = this.jobgrades.find((e) => e.jobgradeId == jobgradeId)
      return jobgrade.jobtitle
    },
    getHiredateText(date) {
      return date.substring(0, date.indexOf(' '))
    },
    infoDeptChange(deptId) {
      this.userData.positionId = ''
      this.getPositionsByDeptId(deptId)
    },

    //业务区
    //表格点击时间row-click 参数 row, event, column
    opUser(row) {
      //绑定row的model
      this.rowData = row
      // this.userData = Object.assign(row);//浅拷贝一个对象，解除与源数据的绑定
      this.userData = JSON.parse(JSON.stringify(row)) //深度拷贝
      this.userStatusInitText()
      this.getPositionsByDeptId(row.deptId)
      this.userVisible = true
    },
    //修改user对象
    upUser() {
      this.$axios
        .post('user/upuser', this.userData)
        .then((e) => {
          if (e.data.errorcode == 100) {
            this.$message({
              type: 'success',
              message: '成功!',
            })
            //数据修改成功，更新表格数据
            this.upRowData()
          } else if (e.data.errorcode === 103) {
            this.$message({
              type: 'warning',
              message: e.data.message,
            })
            this.upRowDataNoStatus()
          } else {
            this.$message({
              type: 'error',
              message: '失败!',
            })
          }
        })
        .catch()
    },
    //数据修改成功，更新表格数据
    upRowData() {
      //遍历赋值给row当前行数据，可以避免一次请求。赋值对象会改变引用地址，导致表格数据无法同步，因此使用遍历赋值；
      for (let key in this.rowData) {
        // console.log(this.userData[key])
        if (this.userData[key] != null) {
          this.rowData[key] = this.userData[key]
        }
      }
    },
    upRowDataNoStatus() {
      //遍历赋值给row当前行数据，可以避免一次请求。赋值对象会改变引用地址，导致表格数据无法同步，因此使用遍历赋值；
      for (let key in this.rowData) {
        if (key != 'status' && key != 'roleId' && this.userData[key] != null) {
          this.rowData[key] = this.userData[key]
        }
      }
    },
    //功能区
    userStatusChange() {
      if (this.userStatusText == '启用') {
        this.userData.status = 1
      }
      if (this.userStatusText == '禁用') {
        this.userData.status = 2
      }
    },
    userStatusInitText() {
      this.userStatusText = this.userData.status == 1 ? '启用' : '禁用'
    },
    //页码改变事件
    pageSizechange(e) {
      this.getUsersParams.pageSize = e
      console.log('页码改变事件>>' + e)
      this.getFinds()
    },
    pageNumchange(e) {
      // console.log(">>触发页面改变事件");
      this.getUsersParams.pageNum = e
      console.log('页面改变事件>>' + e)
      this.getFinds()
    },
    //组合查询
    getFinds() {
      if (this.findText.deptText == '') {
        this.getUsersParams.deptId = ''
      }
      if (this.findText.positionText == '') {
        this.getUsersParams.positionId = ''
      }
      this.getUsers()
    },
    //清空查询条件
    emptyQuery() {
      this.getUsersParams.userId = ''
      this.getUsersParams.realname = ''
      this.getUsersParams.roleId = ''
      this.getUsersParams.status = ''
      this.findText.deptText = ''
      this.findText.positionText = ''
      this.getFinds()
    },
    querySearchPosition(queryString, cb) {
      var dateSource = this.positionsByDeptIdData
      if (
        this.positionsByDeptIdData.length == 0 ||
        this.findText.deptText == ''
      ) {
        dateSource = this.positions
      }
      var positionsData = []
      for (let item in dateSource) {
        let obj = {
          value: '',
          id: '',
        }
        obj.value = dateSource[item].pname
        obj.id = dateSource[item].positionId
        positionsData.push(obj)
      }
      var restaurants = positionsData
      var results = queryString
        ? restaurants.filter(this.createFilterPosition(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
      // clearTimeout(this.timeout);
      // this.timeout = setTimeout(() => {
      //   cb(results);
      // }, 1500 * Math.random());
    },
    createFilterPosition(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    selectPosition(item) {
      this.getUsersParams.positionId = item.id
    },
    querySearchDept(queryString, cb) {
      //对象数组数据处理
      var dataSource = this.depts //数据源
      var newData = [] //新数据
      for (let item in dataSource) {
        let obj = {
          value: '',
          id: '',
        }
        obj.value = dataSource[item].dname
        obj.id = dataSource[item].deptId
        newData.push(obj)
      }
      var restaurants = newData //配置数据{id,value}
      var results = queryString
        ? restaurants.filter(this.createFilterDept(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
      // clearTimeout(this.timeout);
      // this.timeout = setTimeout(() => {
      //   cb(results);
      // }, 1500 * Math.random());
    },
    createFilterDept(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    selectDept(item) {
      this.findText.positionText = ''
      this.getUsersParams.deptId = item.id
      this.$axios
        .get('position/getinbydeptid', { params: { deptId: item.id } })
        .then((e) => {
          this.positionsByDeptIdData = e.data.positions
        })
        .catch()
    },

    //物理分页请求
    /**
     * currentpage 当前页
     * pagesize 每页数量
     */
    /**pageData 取出缓存池数据渲染页面
     * 取出当前页缓存池数据到>>books数组对象当中
     * @param {Object} page currentpage当前页码
     */
    pageData(page) {
      console.log('>>取出缓存池当前页数据>>')
      this.books = this.cache[page] //改变了books数组对象的堆地址指，因此无需对books数组清空/若使用arr.push()每次必须初始化books.length=0
      console.log(this.books)
    },
    /**
     * getPageData 向服务器请求数据
     * @param {Object} page currentpage当前页码
     */
    getPageData(page) {
      var currentpage = page
      var pagesize = this.pagesize
      this.$axios
        .get('querybookforavgpageadn', {
          params: {
            currentpage,
            pagesize,
          },
        })
        .then((e) => {
          if (e.data.currentrowtotal == 0) {
          } //判断返回数据是否为空
          //set:缓存数据>>获取接口返回的数据存放到变量池cache
          this.set(currentpage, e.data.data)
          console.log('%c%s', 'color:red', '缓存数据结束>>')
          //pageData:取出缓存池数据到books当中进行页面渲染
          this.pageData(page)
        })
        .catch()
    },
    //operate分页缓存池数据
    /**
     * set 缓存当前页面数据
     * @param {Object} page cache:key
     * @param {Object} books cache:value
     */
    set(page, booksData) {
      this.cache[page] = booksData //缓存//存储新数据
    },
    /**
     * get 获取当前页缓存数据
     * @param {Object} page cahche:key
     */
    get(page) {
      if (page in this.cache) {
        //true:数据已缓存
        console.log(
          '%c%s',
          'color:blue',
          '页面>>第' + page + '页>>数据已经缓存>>无需再请求>>'
        )
        //pageData:取出缓存池数据到books当中进行页面渲染
        this.pageData(page)
      } else {
        //false:请求数据并缓存
        console.log(
          '%c%s',
          'color:red',
          '页面>>第' + page + '页>>数据未缓存>>需要请求数据>>'
        )
        //getPageData:向服务器请求数据
        this.getPageData(page)
      }
    },
    Test() {
      console.log('end')
    },
  },
  created() {
    this.initCreated()
  },
  mounted() {
    this.initMounted()
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
.table {
  /* margin-top: 20px; */
  /* width: 100%; */
  /* height: 525px; */
  /* background-color: antiquewhite; */
  /* position: absolute; */
}
.table .el-table {
  /* margin-left: 25px; */
}
.page {
  /* position: absolute; */
  margin: 10px 0;
  /* left: 70px; */
}
</style>
