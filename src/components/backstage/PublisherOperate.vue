<!-- 出版社管理 -->
<template>
  <div>
    <div class="header">
      <el-divider><h2>PublisherOperate</h2></el-divider>
    </div>
    <div class="container">
      <div class="top">
        <el-input
          placeholder="出版社字段"
          v-model="pnameQuery"
          style="width: 200px;"
          clearable>
        </el-input>
        <el-button @click="getData()" icon="el-icon-search" circle></el-button>
        <el-button type="primary" @click="addPubVisible=true" plain style="margin-left: 150px;">新增出版社</el-button>
      </div>
      <div class="page">
        <el-pagination
                @size-change="pageSizechange"
                :page-sizes="[8, 20, 50]"
                :page-size="pageSize"
                @current-change="pageCurrentchange"
                :current-page="currentPage"

                layout="total, sizes, prev, pager, next, jumper"
                :total="Count">
        </el-pagination>
      </div>
      <div class="list">
        <el-table
            :data="onPageData"
            border
            max-height="430"
            style="width: 535px">
            <el-table-column
              label="序号"
              type="index"
              header-align="center"
              align="center"
              width="60">
            </el-table-column>
            <el-table-column
              prop="id"
              label="出版社编号"
              header-align="center"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              prop="Name"
              label="出版社名称"
              width="250">
            </el-table-column>
           <el-table-column
              label="操作"
              header-align="center"
              align="center"
              width="105">
            <el-button-group slot-scope="scope">
              <el-tooltip content="删除" placement="top" :open-delay="1000">
                <el-button @click="delPubTest(scope.row.id)" type="primary" size="mini" icon="el-icon-delete"></el-button>
              </el-tooltip>
            </el-button-group>
           </el-table-column>
        </el-table>
      </div>
      <div class="addPub">
         <el-dialog title="新增书籍类型" :visible.sync="addPubVisible" width="300px" top="15vh" center="">
           <el-form :model="addPubData" status-icon :rules="addPubrules" ref="addPubData" label-width="80px" class="demo-ruleForm">
             <el-form-item label="类别名称" prop="name">
               <el-input type="text" v-model="addPubData.name" autocomplete="off" prefix-icon="el-icon-edit"></el-input>
             </el-form-item>
           </el-form>
           <div slot="footer" class="dialog-footer">
             <el-button @click="resetForm('addPubData')">重 置</el-button>
             <el-button type="primary" @click="submitAddPub('addPubData')">添 加</el-button>
           </div>
         </el-dialog>
       </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'PublisherOperate',
    data() {
      return {
        pnameQuery:'',//查询条件
        onPageData:[],
        publisherData:[],

        pageSize: 20,
        currentPage: 1,
        Count: 0,
        //addPub
        addPubVisible:false,
        addPubData:{
          name:''
        },
        addPubrules:{
          name:[
            { required: true, message: '出版社名不能为空', trigger: 'blur' }
            ]
        },
        Tets:''
      }
    },
    methods:{
      init(){
        this.getData();
      },
      getData(){
        let pname = this.pnameQuery==''?null:this.pnameQuery;
        this.$axios.get('bg/publisherquery',{params:{pname}}).then(e=>{
          this.publisherData = e.data;
          this.Count = e.data.length;
          this.getPageData();//初始化首页数据
        }).catch();
      },
      getPageData(){
        var start = (this.currentPage-1)*this.pageSize;
        var end = (start+this.pageSize<this.publisherData.length)?start+this.pageSize:this.publisherData.length;
        //使用arr.slice()切割数组来实现逻辑分页
        this.onPageData = this.publisherData.slice(start,end);
      },
      pageSizechange(e){
        this.pageSize = e;
        this.getPageData();
      },
      pageCurrentchange(e){
        this.currentPage = e;
        this.getPageData();
      },
      addPub(){
        var pname = this.addPubData.name;
        this.$axios.get('bg/addpublisher',{params:{pname}}).then(e=>{
          let desc = e.data.desc;
          this.$message({
            type: 'success',
            message: desc
          });
          //组件重载>>路由切换
          console.log(">>组件切换>>");
          this.$router.push('/bg/o');
          console.log(">>组件重载>>");
          window.setTimeout(()=>{
            this.$router.push('/bg/publisherOperate');
          },1);
        }).catch();
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //表单验证
      submitAddPub(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //表单验证成功
            this.addPub();
          } else {
            //表单验证失败
            console.log('error submit!!');
            return false;
          }
        });
      },
      //删除type
      delPub(pid){
        this.$axios.get('bg/publisherdelete',{params:{pid}}).then(e=>{
          let desc = e.data.desc;
          this.$message({
            type: 'success',
            message: desc
          });
          //组件重载>>路由切换
          console.log(">>组件切换>>");
          this.$router.push('/bg/o');
          console.log(">>组件重载>>");
          window.setTimeout(()=>{
            this.$router.push('/bg/publisherOperate');
          },1);
        }).catch();
      },
      delPubTest(id){
        this.$confirm('此操作将删除此类别, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => this.delPub(id)).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }

    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>
  .header{
    height: 50px;
    margin-top: 10px;
    border: 1px dashed #ffffff;
  }
  .container{
    text-align: left;
  }
  .container .top{
    margin-left: 20%;
    margin-top: 15px;
  }
  .container .page{
    margin-left: 20%;
    margin-top: 15px;
  }
  .container .list{
    /* width: 518px; */
    /* height: 500px; */
    margin-left: 20%;
    margin-top: 15px;
  }
</style>
