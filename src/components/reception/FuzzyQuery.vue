<!-- 高级查询查询图书列表 -->
<template>
  <div class="body">
    <div id="find">
      <div class="find-title">
        <span>书籍筛选</span>
      </div>
      <div class="find">
        <span>
          书籍名称：
          <el-autocomplete
            v-model="queryTitle"
            :fetch-suggestions="querySearchAsync"
            placeholder="书名字段"
            @select="upBTitle"
            clearable
          ></el-autocomplete>
        </span>
        <span>
          书籍类型：
          <el-autocomplete
            class="inline-input"
            v-model="queryCname"
            :fetch-suggestions="querySearchType"
            placeholder="书籍类别"
            @select="upBTyper"
            clearable
          ></el-autocomplete>
        </span>
        <span>
          出版社：
          <el-autocomplete
            class="inline-input"
            v-model="queryPname"
            :fetch-suggestions="querySearchPub"
            placeholder="出版社"
            @select="upBPublisher"
            clearable
          ></el-autocomplete>
        </span>
        <span>
          <el-button title="搜索" @click="querySuper()" icon="el-icon-search" circle></el-button>
          <el-button title="重置" icon="el-icon-refresh" @click="emptyQuery()" circle></el-button>
        </span>
      </div>
    </div>
    <h2>图书列表</h2>
    <div class="booksList">
     <div v-if="" class="book" v-for="(item,index) in onPageData" :key="index">
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
                :total="Count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FuzzyQuery',
    data() {
      return {
        /**
         * 分页数据模块
         */
        cacheAll: {},//缓存池:所有类型//条件改变不会被清空
        cacheQuery: {},//缓存池:条件缓存//条件改变会被清空
        onPageData: [],//当前页面数据
        currentpage: 1,//当前页
        pagesize: 20,//每页数量
        Count: 0,//书籍数量
        /**
         * 查询模块
         */
        //查询条件
        queryTitle: '',//String书名||undefined||null
        queryCid: '',//int类别编号||undefined||null
        queryPid: '',//int出版社编号||undefined||null
        queryCname:'',//String类别名称
        queryPname:'',//String出版社名称
        //查询按钮后params参数变更/请求条件参数 (防止搜索了变更后再未点击查询的前提下产生数据污染)
        requestTitle:'',
        requestCid:'',
        requestPid:'',
        //初始化查询列表建议
        titleData:[],//拉取title
        typeData:[],//拉取Type
        publisherData:[],//拉取publisher
        timeout:  null,
      }
    },
    methods:{
      init(){
        this.getPageData();
        this.getBookType();
        this.getBookPublisher();
        // this.getServerBookTitle();//拉取全部信息会报错：已经被CORS策略阻塞:在飞行前响应中，Access-Control-Allow-Headers不允许请求报头字段令牌。
        /**
         * 服务器拉取服务器title:  getServerBookTitle()
         * 拉取当前页面title:  getOnpageBookTitle()
         * 拉取缓存池title:  getCacheAllBookTitle()
         */
        window.setTimeout(()=>this.getOnpageBookTitle(),3000);
      },
      /**
       * 查询模块
       */
      //获取书籍总数量
      getCount(){
        this.$axios.get('querybookforavgpageadn').then(e=>{
          this.Count = e.data.rowtotal;
        }).catch();
      },
       //向服务器请求数据
       getPageData(){
         let title = this.requestTitle==''?null:this.requestTitle;
         let cid = this.requestCid==''?null:this.requestCid;
         let pid = this.requestPid==''?null:this.requestPid;
         this.$axios.get('querybookforavgpageadn',{params:{
           currentpage:this.currentpage,
           pagesize:this.pagesize,
           title,cid,pid
         }}).then(e=>{
           console.log(e);
           console.log("%c%s","color:red",">>向服务器请求数据>>成功>>");
           this.Count = e.data.rowtotal;
           this.setData(this.currentpage,e.data.data);
           this.getData(this.currentpage);//初始化当前页面数据
         }).catch();
       },
       getData(key){
         if(this.requestTitle==''&&this.requestCid==''&&this.requestPid==''){
           console.log(">>无条件>>key="+key);
           console.log(this.cacheAll);
           if(key in this.cacheAll){
             console.log("%c%s","color:blue","getData("+this.currentpage+"):数据已缓存>>取出>>cacheAll数据>>完成");
             this.onPageData = this.cacheAll[key];
           }else{
             console.log("%c%s","color:red","getData("+this.currentpage+"):>>cacheAll缓存池无数据>>请求axios>>");
             this.getPageData();
           }
         }else{
           if(key in this.cacheQuery){
             console.log("%c%s","color:blue","getData("+this.currentpage+"):数据已缓存>>取出>>cacheQuery数据>>完成");
             this.onPageData = this.cacheQuery[key];
           }else{
             console.log("%c%s","color:red","getData("+this.currentpage+"):>>cacheQuery缓存池无数据>>请求axios>>");
             this.getPageData();
           }
         }
       },
       setData(key,value){
         if(this.requestTitle==''&&this.requestCid==''&&this.requestPid==''){
           console.log("%c%s","color:red","setData("+key+",value):请求服务器>>无条件查询>>数据载入cacheAll缓存池>>");
           this.cacheAll[key] = value;
         }else{
           console.log("%c%s","color:red","setData("+key+",value):请求服务器>>有条件查询>>数据载入cacheQuery缓存池>>");
           this.cacheQuery[key] = value;
         }
       },
       //页码改变事件
       pageCurrentchange(e){
         // console.log(">>触发页面改变事件");
         this.currentpage = e;
         this.getData(e);
         this.getOnpageBookTitle();
       },
       //搜索模块
       //拉取当前页面title存入缓存池
       getOnpageBookTitle(){
         // console.log(this.onPageData);
         console.log(">>statr>>当前页>>拉取titleData");
         for (let item in this.onPageData) {
           let obj = {
             value: ''
           }
           obj.value = this.onPageData[item].Title;
           this.titleData.push(obj);
         }
         console.log(">>end>>当前页>>titleData拉取完成");
         // console.log(this.titleData);
       },
       //远程搜索
       querySearchAsync(queryString, cb) {
         var titleData = this.titleData;
         var results = queryString ? titleData.filter(this.createStateFilter(queryString)) : titleData;

         clearTimeout(this.timeout);
         this.timeout = setTimeout(() => {
           cb(results);
         }, 3000 * Math.random());
       },
       createStateFilter(queryString) {
         return (state) => {
           return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
         };
       },
       //end
       //书籍类型搜索建议
       getBookType(){
         this.$axios.get('querycategoriesall').then(e=>{
           console.log(">>加载typeData>>");
           var datas = e.data;
           for (let item in datas) {
             let obj = {
               value: '',
               id:''
             }
             obj.value = datas[item].Name;
             obj.id = datas[item].id;
             this.typeData.push(obj);
           }
           // console.log(this.typeData);
         }).catch();
       },
       //Type搜索数据建议
       querySearchType(queryString, cb) {
         var restaurants = this.typeData;
         var results = queryString ? restaurants.filter(this.createFilterType(queryString)) : restaurants;
         // 调用 callback 返回建议列表的数据
         cb(results);
       },
       createFilterType(queryString) {
         return (restaurant) => {
           return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
         };
       },
       //出版社搜索建议
       getBookPublisher(){
         this.$axios.get('querypublisherall').then(e=>{
           console.log(">>加载BookPublisher>>");
           var datas = e.data;
           for (let item in datas) {
             let obj = {
               value: '',
               id:''
             }
             obj.value = datas[item].Name;
             obj.id = datas[item].id;
             this.publisherData.push(obj);
           }
           // console.log(this.publisherData);
         }).catch();
       },
       //Publisher搜索数据建议
       querySearchPub(queryString, cb) {
         var restaurants = this.publisherData;
         var results = queryString ? restaurants.filter(this.createFilterPub(queryString)) : restaurants;
         // 调用 callback 返回建议列表的数据
         cb(results);
       },
       createFilterPub(queryString) {
         return (restaurant) => {
           return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
         };
       },
       //搜索栏select change事件
       upBTitle(item) {
         //v-model/title为String无需更改
         console.log(item);
       },
       upBPublisher(item) {
         this.queryPid = item.id;
         console.log(this.queryPid);
       },
       upBTyper(item) {
         console.log(item);
         this.queryCid = item.id;
         console.log(this.queryCid);
       },
       querySuper(){
         //所有条件查询参数只有在点击搜索后才可更改参数值，否则由于v-model双向绑定，在每次更改页面时都会读取查询条件值
         this.requestTitle = this.queryTitle;
         this.requestCid = this.queryCid;
         this.requestPid = this.queryPid;
         console.log("requestTitle>>"+this.requestTitle);
         console.log("requestCid>>"+this.requestCid);
         console.log("requestPid>>"+this.requestPid);
         //调用高级查询时初始化页码和数据
         this.currentpage = 1;
         this.getData(1);//取出第一页数据
       },
       emptyQuery(){
         //清空搜索条件并重置数据
         this.queryTitle='';
         this.queryCname='';
         this.queryPname='';
         this.queryCid='';
         this.queryPid='';
         this.getCount();//重置书籍数量Count
         this.querySuper();
         console.log(">>清空条件缓存池>>cacheQuery>>");
         var newCacheQuery = {};
         this.cacheQuery = newCacheQuery;
         console.log(this.cacheQuery);
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
    mounted() {
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
    /* left: 250px; */
    width: 100%;
    /* border: 1px dashed #000000; */
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
