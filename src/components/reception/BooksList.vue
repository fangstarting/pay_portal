<!-- 图书列表 -->
<template>
  <div class="body">
    <!-- 模糊查询 -->
    <div id="find">
      <div class="find-title">
        <span>书籍筛选</span>
      </div>
      <div class="find">
        <span>
          书籍名称：
          <el-input
            placeholder="书名字段"
            v-model="title"
            clearable>
          </el-input>
        </span>
        <span>
          书籍类型：
          <el-select v-model="categoryId" clearable placeholder="请选择">
            <el-option
              v-for="item in categorys"
              :key="item.id"
              :label="item.Name"
              :value="item.id">
            </el-option>
          </el-select>
        </span>
        <span>
          出版社：
          <el-select v-model="publishId" clearable placeholder="请选择">
            <el-option
              v-for="item in publishs"
              :key="item.id"
              :label="item.Name"
              :value="item.id">
            </el-option>
          </el-select>
        </span>
        <span>
          <el-button type="primary" icon="el-icon-search" @click="">搜索</el-button>
        </span>
      </div>
    </div>

    <h2>图书列表</h2>
    <div class="booksList">
     <div v-if="" class="book" v-for="(item,index) in books" :key="index">
       <div class="img">
         <img :src="item.ImageUrl" @click="bookInfo(item.BookId)" width="150px" height="180px">
       </div>
       <div class="title">
         <p @click="bookInfo(item.BookId)">{{item.Title}}}</p>
       </div>
       <div class="price">
         <span @click="bookInfo(item.BookId)">￥{{item.Price}}</span>
       </div>
      </div>
      <div class="page">
        <el-pagination
                :page-size="pagesize"
                @current-change="pageCurrentchange"
                :current-page="currentpage"

                layout="total , prev, pager, next, jumper"
                :total="booksCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BooksList',
    data() {
      return {
        //分页缓存池
        cache:{},//缓存池变量
        // cache:{
        //   page1: [data1],
        //   page2: [data2],
        //   page3: [data3],
        //   page4: [data4],
        //   page5: [data5]
        // },
        books:[],//当前页数据
        currentpage: 1,//当前页
        pagesize: 20,//每页数量
        booksCount: 0,//书籍总数
        //模糊查询select
        bookName:'',
        categorys:[],//书籍类别列表
        publishs:[],//出版社列表
        categoryId: '',//类别编号>>null
        publishId:'',//出版社编号>>null
        title:'',//书名>>null
        //book-item
        book:{
          BookId: '',
          Title: '',
          price: ''
        },
        type: ''
      }
    },
    methods:{
      //初始化数据
      init(){
        console.log("%c%s","color:red","初始化数据");
        //模糊查询select初始化
        this.initFind();
        //获取书籍总数量
        this.$axios.get('querybookforavgpageadn').then(e=>{
          this.booksCount = e.data.rowtotal;
        }).catch();
        //初始化>>booksList page:currentpage=1>>数据
        this.get(this.currentpage);
        // this.pageData(this.currentpage);//使用钩子函数实现异步操作同一性
      },
      //模糊查询select初始化
      initFind(){
        //获取书籍类别列表
        this.$axios.get('querycategoriesall').then(e=>{
          // console.log(">>获取书籍类别列表");
          this.categorys = e.data;
        }).catch();
        //获取出版社列表
        this.$axios.get('querypublisherall').then(e=>{
          // console.log(">>获取出版社列表");
          this.publishs = e.data;
        }).catch();
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
      pageData(page){
        console.log(">>取出缓存池当前页数据>>");
        this.books = this.cache[page];//改变了books数组对象的堆地址指，因此无需对books数组清空/若使用arr.push()每次必须初始化books.length=0
        console.log(this.books);
      },
      /**
       * getPageData 向服务器请求数据
       * @param {Object} page currentpage当前页码
       */
      getPageData(page){
        var currentpage = page;
        var pagesize = this.pagesize;
        this.$axios.get('querybookforavgpageadn',{params:{
          currentpage,
          pagesize
        }}).then(e=>{
          if(e.data.currentrowtotal==0){}//判断返回数据是否为空
          //set:缓存数据>>获取接口返回的数据存放到变量池cache
          this.set(currentpage,e.data.data);
          console.log("%c%s","color:red","缓存数据结束>>");
          //pageData:取出缓存池数据到books当中进行页面渲染
          this.pageData(page);
        }).catch();
      },
      //operate分页缓存池数据
      /**
       * set 缓存当前页面数据
       * @param {Object} page cache:key
       * @param {Object} books cache:value
       */
      set(page,booksData){
        this.cache[page] = booksData; //缓存//存储新数据
      },
      /**
       * get 获取当前页缓存数据
       * @param {Object} page cahche:key
       */
      get(page){
        if(page in this.cache){
          //true:数据已缓存
          console.log("%c%s","color:blue","页面>>第"+page+"页>>数据已经缓存>>无需再请求>>");
          //pageData:取出缓存池数据到books当中进行页面渲染
          this.pageData(page);
        }else{
          //false:请求数据并缓存
          console.log("%c%s","color:red","页面>>第"+page+"页>>数据未缓存>>需要请求数据>>");
          //getPageData:向服务器请求数据
          this.getPageData(page);
        }
      },
      /**
       * 分页响应事件>>刷新参数值 >currentpage
       * @param {Object} e 当前页码
       */
      pageCurrentchange(e){
      	this.get(e);//页码变更>>get获取当前页数据Data
      },
      /**点击书籍获取书籍信息/加入购物车/购买
       * @param {Object} id 图书编号BookId
       */
      bookInfo(id){
        // let routeUrl = this.$router.resolve({path:`/bookItem/${id}`});
        let routeUrl = this.$router.resolve({
          path:'/bookItem',
          query:{id:id}
        });
        window.open(routeUrl.href,'_blank');
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>
  .body{
    padding: 0px 0 5px 0;
    background-color: #F8F8F8;
  }
  .booksList{
    position: relative;
    /* background-color: antiquewhite; */
    width: 1082px;
    height: 1200px;
    margin: 0 auto;
  }
  .booksList .book{
    float: left;
    background-color: #fefefe;
    border: 1px solid #cbcbcb;
    box-shadow: 5px 5px 8px #c6c6c6;
    width: 200px;
    height: 270px;
    margin: 5px;
  }
  .booksList .book .img{
    margin: 10px 20px;
  }
  .booksList .book .img img{
    cursor: pointer;
  }
  .booksList .book .title{
    padding: 0px 10px;
  }
  .booksList .book .title p{
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis; /*多余文字显示省略号*/
    white-space: nowrap;
    width: 180px;
    cursor: pointer;
  }
  .booksList .book .price{
    position: relative;
  }
  .booksList .book .price span{
    color: red;
    position: absolute;
    left: 10px;
    cursor: pointer;
  }
  .booksList .page{
    position: absolute;
    bottom: 10px;
    left: 250px;
  }
  /* 查询 */
  #find{
    /* background-color: antiquewhite; */
    background-color: #eadca6;
  }
  #find .find-title{
    width: 1200px;
    text-align: -webkit-left;
    margin: 0 auto;
    text-align: 50px;
  }
  #find .find-title span{
    font-family: "宋体";
    font-size: 22px;
    font-weight: 700;
    display: inline-block;
    line-height: 50px;
    margin-left: 20px;
    color: #000000;
  }
  #find .find{
     width: 1200px;
     height: 50px;
     /* border: 1px dashed #333333; */
     padding: 10px;
     margin: 0 auto;
  }
  #find .find span{
    display: inline-block;
    margin: 0px 10px;
  }
  #find .find span:nth-child(1) .el-input{
    display: inline-block;
    width: 230px;
  }
</style>
