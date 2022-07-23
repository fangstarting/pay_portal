<!-- 图书列表管理 -->
<template>
  <div>
    <div class="header">
      <el-divider><h2>BookListOperate</h2></el-divider>
    </div>
    <div class="topOperate">
      <el-button @click="querySuper()" icon="el-icon-search" circle></el-button>
      <el-autocomplete
        v-model="queryTitle"
        :fetch-suggestions="querySearchAsync"
        placeholder="书名"
        @select="upBTitle"
        clearable
      ></el-autocomplete>
      <el-autocomplete
        class="inline-input"
        v-model="queryPname"
        :fetch-suggestions="querySearchPub"
        placeholder="出版社"
        @select="upBPublisher"
        clearable
      ></el-autocomplete>
      <el-autocomplete
        class="inline-input"
        v-model="queryCname"
        :fetch-suggestions="querySearchType"
        placeholder="书籍类别"
        @select="upBTyper"
        clearable
      ></el-autocomplete>
      <el-button icon="el-icon-refresh" @click="emptyQuery()" circle></el-button>
      <el-button type="primary" @click="addBookVisible=true" plain>上架书籍</el-button>
    </div>
    <div class="bookOperate">
      <div class="page">
        <el-pagination
                :page-size="pagesize"
                @current-change="pageCurrentchange"
                :current-page="currentpage"

                layout="total , prev, pager, next, jumper"
                :total="Count">
        </el-pagination>
      </div>
      <div class="list">
        <el-table
            :data="onPageData"
            :border="false"
            style="width: 100%"
            max-height="420px"
            >
            <el-table-column
              type="index"
              label="序号"
              header-align="center"
              align="center"
              width="60">
            </el-table-column>
            <el-table-column
              prop="BookId"
              label="书籍编号"
              header-align="center"
              align="center"
              width="80">
            </el-table-column>
            <el-table-column
              prop="Title"
              label="书名"
              header-align="center"
              align="center"
              width="250">
            </el-table-column>
            <el-table-column
              prop="CategoryName"
              label="类别名称"
              header-align="center"
              align="center"
              width="160">
            </el-table-column>
            <el-table-column
              prop="PublishName"
              label="出版社名称"
              header-align="center"
              align="center"
              width="160">
            </el-table-column>
            <el-table-column
              prop="Author"
              label="作者"
              header-align="center"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              prop="Price"
              label="单价"
              header-align="center"
              align="center"
              width="80">
            </el-table-column>
           <el-table-column
              label="操作"
              header-align="center"
              align="center"
              width="155">
            <el-button-group slot-scope="scope">
              <el-tooltip content="查看" placement="top" :open-delay="1000">
                <el-button @click="showBook(scope.row)" type="primary" size="mini" icon="el-icon-view"></el-button>
              </el-tooltip>
              <el-tooltip content="修改" placement="top" :open-delay="1000">
                <el-button @click="updateBook(scope.row)" type="primary" size="mini" icon="el-icon-edit"></el-button>
              </el-tooltip>
              <el-tooltip content="下架" placement="top" :open-delay="1000">
                <el-button @click="downBook(scope.row.BookId)" type="primary" size="mini" icon="el-icon-delete"></el-button>
              </el-tooltip>
            </el-button-group>
           </el-table-column>
        </el-table>
      </div>

    </div>
    <!-- 上架书籍 -->
    <div class="addBook">
      <el-dialog title="上 架 书 籍" :visible.sync="addBookVisible" width="730px" top="8vh" center="">
        <el-form :model="addBookData" :inline="true" status-icon :rules="addBookrules" ref="addBookData" label-width="80px" class="demo-ruleForm">
          <el-form-item label="书名" prop="title">
            <el-input type="text" v-model="addBookData.title" autocomplete="off" prefix-icon="el-icon-edit"></el-input>
          </el-form-item>
          <el-form-item label="出版期" prop="publisherdate">
            <el-date-picker type="date" placeholder="选择日期" v-model="addBookData.publisherdate" style=""></el-date-picker>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input type="text" v-model="addBookData.author" autocomplete="off" prefix-icon="el-icon-s-custom"></el-input>
          </el-form-item>
          <el-form-item label="出版号" prop="isbn">
            <el-input type="text" v-model="addBookData.isbn" autocomplete="off" prefix-icon="el-icon-info" maxlength="13"></el-input>
          </el-form-item>
          <el-form-item label="类别" prop="cid">
           <el-select v-model="addBookData.cid" clearable placeholder="选择书籍类别">
             <el-option
               v-for="item in typeData"
               :key="item.id"
               :label="item.value"
               :value="item.id">
             </el-option>
           </el-select>
          </el-form-item>
          <el-form-item label="出版社" prop="pid">
            <el-select v-model="addBookData.pid" clearable placeholder="选择出版社">
              <el-option
                v-for="item in publisherData"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价" prop="price">
            <el-input type="text" v-model.number="addBookData.price" autocomplete="off" prefix-icon="el-icon-money"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input type="textarea" v-model="addBookData.desc" autocomplete="off" prefix-icon="el-icon-s-custom" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="目录" prop="toc">
            <el-input type="textarea" :autosize="{ minRows: 8, maxRows:8}" v-model="addBookData.toc" autocomplete="off" prefix-icon="el-icon-s-custom" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <div title="点击上传图片" class="upimg">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:8080/BookShop/bg/upbook"
                :show-file-list="false"
                :on-success="AddhandleAvatarSuccess"
                :before-upload="AddbeforeAvatarUpload">
                <img v-if="addBookData.imageUrlAdd" :src="imgUrlShowAdd" class="avatar">
                <i v-else style="border: 1px dashed #bebebe;" class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('addBookData')">重 置</el-button>
          <el-button type="primary" @click="submitAddBook('addBookData')">上 架</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 更新书籍 -->
    <div class="updateBook">
      <el-dialog title="更 新 书 籍" :visible.sync="updateBookVisible" width="730px" top="8vh" center="">
        <el-form :model="updateBookData" :inline="true" status-icon :rules="updateBookrules" ref="updateBookData" label-width="80px" class="demo-ruleForm">
          <el-form-item label="编号" prop="bid">
            <el-input type="text" v-model.number="updateBookData.bid" autocomplete="off" prefix-icon="el-icon-edit"></el-input>
          </el-form-item>
          <el-form-item label="单价" prop="price">
            <el-input type="text" v-model.number="updateBookData.price" autocomplete="off" prefix-icon="el-icon-money"></el-input>
          </el-form-item>
          <el-form-item label="书名" prop="title">
            <el-input type="text" v-model="updateBookData.title" autocomplete="off" prefix-icon="el-icon-edit"></el-input>
          </el-form-item>
          <el-form-item label="出版期" prop="publisherdate">
            <el-date-picker type="date" placeholder="选择日期" v-model="updateBookData.publisherdate" style=""></el-date-picker>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input type="text" v-model="updateBookData.author" autocomplete="off" prefix-icon="el-icon-s-custom"></el-input>
          </el-form-item>
          <el-form-item label="出版号" prop="isbn">
            <el-input type="text" disabled="" v-model="updateBookData.isbn" autocomplete="off" prefix-icon="el-icon-info" maxlength="13"></el-input>
          </el-form-item>
          <el-form-item label="类别" prop="cid">
           <el-select v-model="updateBookData.cid" clearable placeholder="选择书籍类别">
             <el-option
               v-for="item in typeData"
               :key="item.id"
               :label="item.value"
               :value="item.id">
             </el-option>
           </el-select>
          </el-form-item>
          <el-form-item label="出版社" prop="pid">
            <el-select v-model="updateBookData.pid" clearable placeholder="选择出版社">
              <el-option
                v-for="item in publisherData"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="目录" prop="toc">
            <el-input type="textarea" :autosize="{ minRows: 8, maxRows:8}" v-model="updateBookData.toc" autocomplete="off" prefix-icon="el-icon-s-custom" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows:2}" v-model="updateBookData.desc" autocomplete="off" prefix-icon="el-icon-s-custom" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="图片" class="el-form-img">
            <div title="点击修改图片" class="upimg">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:8080/BookShop/bg/upupdatebook"
                :show-file-list="false"
                :on-success="UpdatehandleAvatarSuccess"
                :before-upload="UpdatebeforeAvatarUpload">
                <img v-if="updateBookData.imageUrlUpdate" :src="imgUrlShowUpdate" class="avatar">
                <img v-else :src="updateBookData.imageUrl" class="avatar">
              </el-upload>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateBookVisible=false">取 消</el-button>
          <el-button type="primary" @click="submitUpdate('updateBookData')">更 新</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 查看书籍 -->
    <div class="showBook">
      <el-dialog title="书 籍 详 情" :visible.sync="showBookVisible" width="730px" top="8vh" center="">
        <el-form :model="showBookData" disabled :inline="true" status-icon label-width="80px" class="demo-ruleForm">
          <el-form-item label="书名" prop="Title">
            <el-input type="text" v-model="showBookData.Title" autocomplete="off" prefix-icon="el-icon-edit"></el-input>
          </el-form-item>
          <el-form-item label="出版期" prop="PublishDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="showBookData.PublishDate" style=""></el-date-picker>
          </el-form-item>
          <el-form-item label="作者" prop="Author">
            <el-input type="text" v-model="showBookData.Author" autocomplete="off" prefix-icon="el-icon-s-custom"></el-input>
          </el-form-item>
          <el-form-item label="出版号" prop="ISBN">
            <el-input type="text" v-model="showBookData.ISBN" autocomplete="off" prefix-icon="el-icon-info" maxlength="13"></el-input>
          </el-form-item>
          <el-form-item label="类别" prop="CategoryId">
           <el-select v-model="showBookData.CategoryId" clearable placeholder="选择书籍类别">
             <el-option
               v-for="item in typeData"
               :key="item.id"
               :label="item.value"
               :value="item.id">
             </el-option>
           </el-select>
          </el-form-item>
          <el-form-item label="出版社" prop="PublishId">
            <el-select v-model="showBookData.PublishId" clearable placeholder="选择出版社">
              <el-option
                v-for="item in publisherData"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价" prop="Price">
            <el-input type="text" v-model.number="showBookData.Price" autocomplete="off" prefix-icon="el-icon-money"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="Desc">
            <el-input type="textarea" v-model="showBookData.Desc" autocomplete="off" prefix-icon="el-icon-s-custom" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="目录" prop="TOC">
            <el-input type="textarea" :autosize="{ minRows: 8, maxRows:8}" v-model="showBookData.TOC" autocomplete="off" prefix-icon="el-icon-s-custom" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <div class="upimg">
              <img :src="showBookData.ImageUrl" width="150px" height="180px">
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showBookVisible=false">关 闭</el-button>
          <el-button type="primary" @click="updateBook(showBookData)">修 改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BookListOperate',
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
        /**
         * 上架书籍模块
         */
        addBookVisible: false,
        addBookData:{
          imageUrlAdd: '',//封面图片，type=file //Boolean上传照片判断
          title:'',//String书名，不能为空
          price:'',//Integer单价，不能为空，数字类型
          isbn:'',//String书的出版号，唯一，不能重复，不能为空
          desc:'',//String书的描述
          toc:'',//String目录，不能为空
          cid:'',//Integer类别编号，不能为空
          pid:'',//Integer出版社编号，不能为空
          publisherdate:'',//String出版日期，可以为空，空为服务器时间
          author:'',//String作者
        },
        imgUrlShowAdd:'',//渲染本地选择的图片
        addBookrules:{
          title:[
            { required: true, message: '书名不能为空', trigger: 'blur' }
          ],
          price:[
            { required: true, message: '请输入单价', trigger: 'blur' }
          ],
          author:[
            { required: true, message: '请输入作者', trigger: 'blur' }
          ],
          isbn:[
            { required: true, message: '出版号不能为空', trigger: 'blur' },
            { min: 13, max: 13, message: '出版号为13位数字', trigger: 'blur' }
          ],
          cid:[
            { required: true, message: '请选择类别', trigger: ['blur','change'] }
          ],
          pid:[
            { required: true, message: '请选择出版社', trigger: ['blur','change'] }
          ],
          publisherdate:[
            { required: false, message: '请选择出版日期', trigger: 'blur' }
          ],
          desc:[
            { required: false, message: '请输入书籍描述', trigger: 'blur' }
          ],
          toc:[
            { required: true, message: '目录不能为空', trigger: 'blur' }
          ]
        },
        /**
         * 更新书籍模块
         */
        updateBookVisible: false,
        updateBookData:{
          imageUrlUpdate: '',//封面图片，type=file
          imageUrl:'',//Url封面图片
          bid:'',//String书的编号，不能为空
          title:'',//String书名，不能为空
          price:'',//Integer单价，不能为空，数字类型
          isbn:'',//String书的出版号，唯一，不能重复，不能为空
          desc:'',//String书的描述
          toc:'',//String目录，不能为空
          cid:'',//Integer类别编号，不能为空
          pid:'',//Integer出版社编号，不能为空
          publisherdate:'',//String出版日期，可以为空，空为服务器时间
          author:'',//String作者
        },
        imgUrlShowUpdate:'',//渲染本地选择的图片//每次都需要清空
        updateBookrules:{
          bid:[
            { required: true, message: '编号不能为空', trigger: 'blur' }
          ],
          title:[
            { required: true, message: '书名不能为空', trigger: 'blur' }
          ],
          price:[
            { required: true, message: '请输入单价', trigger: 'blur' }
          ],
          author:[
            { required: true, message: '请输入作者', trigger: 'blur' }
          ],
          // isbn:[
          //   { required: true, message: '出版号不能为空', trigger: 'blur' },
          //   { min: 13, max: 13, message: '出版号为13位数字', trigger: 'blur' }
          // ],
          cid:[
            { required: true, message: '请选择类别', trigger: ['blur','change'] }
          ],
          pid:[
            { required: true, message: '请选择出版社', trigger: ['blur','change'] }
          ],
          publisherdate:[
            { required: false, message: '请选择出版日期', trigger: 'blur' }
          ],
          desc:[
            { required: false, message: '请输入书籍描述', trigger: 'blur' }
          ],
          toc:[
            { required: true, message: '目录不能为空', trigger: 'blur' }
          ]
        },
        /**
         * 查看书籍模块
         */
        showBookVisible: false,
        showBookData:{
          // fengmian: {},//封面图片，type=file
          // imageUrl:'',//Url封面图片
          // bid:'',//String书的编号，不能为空
          // title:'',//String书名，不能为空
          // price:'',//Integer单价，不能为空，数字类型
          // isbn:'',//String书的出版号，唯一，不能重复，不能为空
          // desc:'',//String书的描述
          // toc:'',//String目录，不能为空
          // cid:'',//Integer类别编号，不能为空
          // pid:'',//Integer出版社编号，不能为空
          // publisherdate:'',//String出版日期，可以为空，空为服务器时间
          // author:'',//String作者
        },


        TestData:''
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
        this.$axios.get('bg/bookqueryadn').then(e=>{
          this.Count = e.data.rowtotal;
        }).catch();
      },
      //向服务器请求数据
      getPageData(){
        let title = this.requestTitle==''?null:this.requestTitle;
        let cid = this.requestCid==''?null:this.requestCid;
        let pid = this.requestPid==''?null:this.requestPid;
        this.$axios.get('bg/bookqueryadn',{params:{
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
      //服务器拉取服务器title
      getServerBookTitle(){
        this.$axios.get('querybookfortitlelike').then(e=>{
          console.log(">>statr>>服务器>>拉取titleData");
          for (let item in e.data) {
            this.titleData.push(e.data[item].Title);
          }
          console.log(">>end>>服务器>>titleData拉取完成");
        }).catch();
      },
      //拉取当前页面title
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
      //拉取缓存池title
      getCacheAllBookTitle(){
        // console.log(this.cacheAll);
        console.log(">>statr>>cacheAll缓存池>>拉取titleData");
        for (let item in this.cacheAll) {
          let obj = {
            value: ''
          }
          let onCacheItem = this.cacheAll[item];
          for (let index in onCacheItem) {
            obj.value = onCacheItem[index].Title;
            this.titleData.push(obj);
          }
        }
        console.log(">>end>>cacheAll缓存池>>titleData拉取完成");
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
        this.$axios.get('bg/categoryquery').then(e=>{
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
        this.$axios.get('bg/publisherquery').then(e=>{
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
      /**
       * 书籍下架
       * @param {Object} id 书籍编号/不能为空
       */
      downBook(id){
        this.$confirm('此操作将下架此书籍, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$axios.get('bg/downbook',{params:{bookid:id}}).then(e=>{
            let desc = e.data.desc;
            this.$message({
              type: 'success',
              message: desc
            });
            //重载当前页数据
            console.log("%c%s","color:red;font-size:20px","当前页数据更新>>重载"+this.currentpage+"页数据");
            this.getPageData();
          }).catch();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /**
       * 上架书籍
       */
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //上架
      submitAddBook(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //表单验证成功
            let date = this.addBookData.publisherdate;
            let y = date.getFullYear();
            let m = date.getMonth()+1;
            let d = date.getDate();
            let dateStr = y+"-"+m+"-"+d;

            var formData = new FormData();
            formData.append('publisherdate',dateStr);
            formData.append('fengmian',this.addBookData.imageUrlAdd);
            formData.append('title',this.addBookData.title);
            formData.append('price',this.addBookData.price);
            formData.append('isbn',this.addBookData.isbn);
            formData.append('desc',this.addBookData.desc);
            formData.append('toc',this.addBookData.toc);
            formData.append('cid',this.addBookData.cid);
            formData.append('pid',this.addBookData.pid);
            formData.append('author',this.addBookData.author);
            console.log('上架书籍>>axios>>>>');
            console.log(formData);
            this.$axios.post('bg/upbook',formData,{
              headers:{
                'content-type':'multipart/form-data'
              }
            }).then(e=>{
              let desc = e.data.desc;
              this.$message({
                type: 'success',
                message: desc
              });
              this.addBookVisible=false;
              //重载当前页数据
              console.log("%c%s","color:red;font-size:20px","当前页数据更新>>重载"+this.currentpage+"页数据");
              this.getPageData();
            }).catch(error=>{
              console.log(error);
            });
          } else {
            //表单验证失败
            console.log('error submit!!');
            return false;
          }
        });
      },
      //Add上传图片
      AddhandleAvatarSuccess(res, file) {
        // this.addBookData.imageUrlAdd = URL.createObjectURL(file.raw);
        this.imgUrlShowAdd = URL.createObjectURL(file.raw);//渲染本地选择的图片
      },
      AddbeforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传书籍图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传书籍图片大小不能超过 2MB!');
        }
        this.addBookData.imageUrlAdd = file;//打包成file类型的对象
        return isJPG && isLt2M;
      },
      /**
       * 查看书籍详情模块
       *
       * 无法使用前台数据接口查看书籍信息
       * Error：has been blocked by CORS policy: Request header field token is not allowed by Access-Control-Allow-Headers in preflight response./已经被CORS策略阻塞:在飞行前响应中，Access-Control-Allow-Headers不允许请求报头字段令牌。
       *
       * @param {String} title 书名
       * @param {Integer} cid  类别编号
       * @param {Integer} pid 出版社编号
       *  此方法实现时间复杂度过高，需要请求服务器，且为模糊查询，存在漏洞，不可取！！！
       */
      // showBook(title,cid,pid){
      //   this.$axios.get('bg/bookqueryadn',{params:{title,cid,pid}}).then(e=>{
      //     console.log(e.data.data[0]);
      //     let obj = e.data.data[0];
      //     let time = (obj.PublishDate.split(" "))[0];
      //     this.showBookData.imageUrl=obj.ImageUrl;
      //     this.showBookData.title=obj.Title;
      //     this.showBookData.price=obj.Price;
      //     this.showBookData.isbn=obj.ISBN;
      //     this.showBookData.desc=obj.Desc;
      //     this.showBookData.toc=obj.TOC;
      //     this.showBookData.cid=obj.CategoryId;
      //     this.showBookData.pid=obj.PublishId;
      //     this.showBookData.publisherdate=time;
      //     this.showBookData.author=obj.Author;

      //     this.showBookVisible=true;
      //   }).catch(e=>{
      //     console.log(e);
      //     this.showBookVisible=true;
      //   });
      // },
      /**
       * @param {Object} obj 当前点击显示的图书对象
       */
      showBook(obj){
        this.showBookData = obj;
        console.log(this.showBookData);
        this.showBookVisible=true;
      },
      /**
       * 更新书籍模块
       * @param {Object} id 被修改图书Id
       */
      updateBook(obj){
        this.updateBookData.imageUrlUpdate='';//初始化上传的图片
        this.imgUrlShowUpdate='';//初始化渲染的图片
        console.log(obj);
        this.showBookVisible=false;
        let time = (obj.PublishDate.split(" "))[0];

        this.updateBookData.imageUrl=obj.ImageUrl;
        this.updateBookData.bid=obj.BookId;
        this.updateBookData.title=obj.Title;
        this.updateBookData.price=obj.Price;
        this.updateBookData.isbn=obj.ISBN;
        this.updateBookData.desc=obj.Desc;
        this.updateBookData.toc=obj.TOC;
        this.updateBookData.cid=obj.CategoryId;
        this.updateBookData.pid=obj.PublishId;
        this.updateBookData.publisherdate=time;
        this.updateBookData.author=obj.Author;

        this.updateBookVisible=true;
      },
      submitUpdate(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //表单验证成功
            console.log(this.updateBookData.publisherdate);
            var dateStr = String;
            if(typeof(this.updateBookData.publisherdate)==='string'||this.updateBookData.publisherdate==null){
              console.log("日期为String无需操作>>");
              dateStr = this.updateBookData.publisherdate;
            }else{
              let date = this.updateBookData.publisherdate;
              let y = date.getFullYear();
              let m = date.getMonth()+1;
              let d = date.getDate();
              dateStr = y+"-"+m+"-"+d;
            }
            console.log(dateStr);
            // console.log(this.updateBookData);
            var formData = new FormData();
            formData.append('publisherdate',dateStr);
            formData.append('fengmian',this.updateBookData.imageUrlUpdate);
            formData.append('title',this.updateBookData.title);
            formData.append('price',this.updateBookData.price);
            formData.append('bid',this.updateBookData.bid);
            formData.append('desc',this.updateBookData.desc);
            formData.append('toc',this.updateBookData.toc);
            formData.append('cid',this.updateBookData.cid);
            formData.append('pid',this.updateBookData.pid);
            formData.append('author',this.updateBookData.author);
            console.log('更新书籍>>axios>>>>');
            console.log(formData);
            this.$axios.post('bg/upupdatebook',formData,{
              headers:{
                'content-type': 'multipart/form-data' //固定
              }
            }).then(e=>{
              let desc = e.data.desc;
              this.$message({
                type: 'success',
                message: desc
              });
              this.updateBookVisible=false;
              //重载当前页数据
              console.log("%c%s","color:red;font-size:20px","当前页数据更新>>重载"+this.currentpage+"页数据");
              this.getPageData();

            }).catch(e=>{
              console.log(e);
            });
          } else {
            //表单验证失败
            console.log('error submit!!');
            return false;
          }
        });
      },
      //Update上传图片
      UpdatehandleAvatarSuccess(res, file) {
        this.imgUrlShowUpdate = URL.createObjectURL(file.raw);//本地图片渲染到表单中->Element 格式转换
      },
      UpdatebeforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传书籍图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传书籍图片大小不能超过 2MB!');
        }
        this.updateBookData.imageUrlUpdate = file;
        return isJPG && isLt2M;
      },
      // 提醒工具
      tooltip(){
        this.$confirm('此操作将下架此书籍, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'desc'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      TestFuntion(){

      }
    },
    created() {
      this.init();
    },
    mounted() {
      console.log(this);
    }
  }
</script>

<style scoped>
  .header{
    height: 50px;
    margin-top: 10px;
    border: 1px dashed #ffffff;
  }
  /* 搜索栏 */
  .topOperate {
    text-align: left;
    margin: 15px 0px 15px 10px;
  }
  /* 分页 */
  .page{
    text-align: left;
    margin: 0px 0px 15px 10px;
  }
  /* form表单 */
  .el-dialog .el-form .el-dialog--center .el-dialog__body {
  }
  /* 上传照片 */
  .el-form .upimg{
    /* border: 1px dashed #d9d9d9; */
  }
  .updateBook .el-form .el-form-img{
    margin-top: -125px;
    margin-left: 315px;
  }
  .updateBook .el-form .upimg{
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 180px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 180px;
    display: block;
  }
</style>
