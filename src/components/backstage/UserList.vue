<!-- 用户列表 -->
<template>
  <div>
    <div class="header">
      <el-divider><h2>UserList</h2></el-divider>
    </div>
    <div id="list">
      <div class="table">
        <el-table
            :data="pageList"
            border
            style="width: 1046px">
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="id"
              label="用户编号"
              align="center"
              width="90">
            </el-table-column>
            <el-table-column
              label="头像"
              align="center"
              width="120">
              <img src="../../assets/icon-admin.png" height="60px" style="margin-bottom: -10px;">
            </el-table-column>
            <el-table-column
              prop="LoginId"
              label="用户名"
              header-align="center"
              width="120">
            </el-table-column>
            <el-table-column
              prop="Name"
              label="姓名"
              header-align="center"
              width="100">
            </el-table-column>
            <el-table-column
              prop="Mail"
              label="邮箱"
              header-align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="Address"
              label="地址"
              header-align="center"
              width="150">
            </el-table-column>
            <el-table-column
              prop="RoleName"
              label="角色类型"
              header-align="center"
              width="80">
            </el-table-column>
            <el-table-column
              prop="StateName"
              label="用户状态"
              align="center"
              width="80">
            </el-table-column>
            <!-- <el-table-column
               label="Operate"
               header-align="center"
               width="75">
               <el-button-group slot-scope="scope">
                 <el-tooltip content="修改" placement="top" :open-delay="1000">
                   <el-button @click="upStateName(scope.row.id,scope.$index)" type="primary" size="mini" icon="el-icon-edit"></el-button>
                 </el-tooltip>
               </el-button-group>
            </el-table-column> -->

            <el-table-column
              label="Operate"
              header-align="center"
              width="75">
              <template slot-scope="scope">
              <el-button-group>
                <el-tooltip :content="'用户状态: ' + scope.row.StateName" placement="top" :open-delay="300">
                  <el-switch
                    v-model="userState[scope.$index]"
                    @change="upStateName(scope.row.id,scope.row.StateName)"
                    active-color="#13ce66"
                    inactive-color="#bcbcbc"
                    active-value="正常"
                    inactive-value="禁用">
                  </el-switch>
                </el-tooltip>

              </el-button-group>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
                @size-change="pageSizechange"
                :page-sizes="[5, 10, 20]"
                :page-size="pageSize"

                @current-change="pageCurrentchange"
                :current-page="currentPage"

                layout="total, sizes, prev, pager, next, jumper"
                :total="userCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserList',
    data() {
      return {
        userList:[],
        pageList:[],
        pageSize: 5,
        currentPage: 1,
        userCount: 0,
        userState:[],

        test:''
      }
    },
    methods:{
      init(){
        this.getUserList();
      },
      getUserList(){
        this.$axios.get('bg/userlist').then(e=>{
          this.userList = e.data;
          console.log(">>数据初始化成功>>");
          console.log(this.userList);
          this.userCount = this.userList.length;
          this.getPageList();
        }).catch();
      },
      //逻辑分页
      getPageList(){
        console.log(">>逻辑分页加载ing");
      	/*
      	start=(currentPage-1)*pageSize
      	end=(start+pageSize<userList.length)?start+pageSize:userList.length
      	*/
      	// console.log(">>逻辑分页获取this.userList[]>>");
      	// console.log(this.userList);
      	// console.log(">>获取this.userList[]完毕>>");
      	this.pageList.length=0;//初始化pageList当前页数据
        this.userState.length=0;//初始化userState当前页用户状态
      	var start = (this.currentPage-1)*this.pageSize;
      	var end = (start+this.pageSize<this.userList.length)?start+this.pageSize:this.userList.length;
      	for (var i = start, j = 0; i < end, j < end-start; i++,j++) {

          //添加列表信息
      		this.pageList.push(this.userList[i]);

          //转换角色text
          if(this.userList[i].RoleName==''||this.userList[i].RoleName==undefined||this.userList[i].RoleName==null){
            this.pageList[j].RoleName='暂无信息';
          }else if(this.userList[i].RoleName=='0'){
            this.pageList[j].RoleName='普通用户';
          }else{
            this.pageList[j].RoleName='管理员';
          }
          //转换状态text
          if(this.userList[i].StateName==''||this.userList[i].StateName==undefined||this.userList[i].StateName==null){
            this.pageList[j].StateName='无状态';
          }else if(this.userList[i].StateName=='0'){
            this.pageList[j].StateName='禁用';
          }else if(this.userList[i].StateName=='1'){
            this.pageList[j].StateName='正常';
          }

          //添加状态信息
          this.userState.push(this.pageList[j].StateName);

      	}
        //push()时间复杂度过高 使用arr.slice()切割数组来实现
        // this.pageList.push(this.userList.slice(start,end));
        // this.userState = this.pageList.slice(start,end);
        // console.log(">>切割数组ing");
        // console.log(this.pageList);
        console.log(">>初始数据userList>>");
        console.log(this.userList);
        console.log(">>当前页userState>>");
        console.log(this.userState);

      },
      pageSizechange(e){
        this.pageSize = e;
        this.getPageList();
      },
      pageCurrentchange(e){
        console.log("当前页>>"+e);
        this.currentPage = e;
        this.getPageList();
      },
      upStateName(id,state){
        // console.log(id,state);
        var val = state=='正常'? 0:1;
        this.$confirm('此操作将切换用户状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.updataState(id,val);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
          // location.reload();
          //组件重载>>路由切换
          // console.log(">>组件切换>>");
          // this.$router.push('/bg/o');
          // console.log(">>组件重载>>");
          // window.setTimeout(()=>{
          //   this.$router.push('/bg/UserList');
          // },1);

          this.getUserList();

        });
      },
      //向服务器请求修改用户状态
      updataState(id,val){
        console.log(id,val);
        var userid = id;
        var Isdisable = val;
        this.$axios.get('bg/userdisable',{params:{userid,Isdisable}}).then(e=>{
          console.log(e);
          let desc = e.data.desc;
          this.$message({
            type: 'success',
            message: desc
          });
          // location.reload();
          //组件重载>>路由切换
          // console.log(">>组件切换>>");
          // this.$router.push('/bg/o');
          // console.log(">>组件重载>>");
          // window.setTimeout(()=>{
          //   this.$router.push('/bg/UserList');
          // },1);
          this.getUserList();

        }).catch(e=>{
          console.log(e);
        });
      }
    },
    created() {
      this.init();
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .header{
    height: 50px;
    margin-top: 10px;
    border: 1px dashed #ffffff;
  }
  #list{
    position: relative;
  }
  #list .table{
    width: 100%;
    /* height: 525px; */
    /* background-color: antiquewhite; */
    position: absolute;
    top:50px
  }
  #list .table .el-table{
    margin-left: 70px;
  }
  #list .page{
    position: absolute;
    top: 15px;
    left: 70px;
  }
</style>
