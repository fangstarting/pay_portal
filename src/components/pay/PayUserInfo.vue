<!-- PayUserInfo -->
<template>
  <div>
    <div class="header">
      <el-divider>
        <h2>个人信息</h2>
      </el-divider>
    </div>
    <div class="userInfo">
      <el-descriptions class="margin-top"
                       title="个人信息展示"
                       :column="3"
                       size=""
                       border>
        <template slot="extra">
          <div class="optionr1">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                信息维护<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <span @click="upPassVisible=true">
                  <el-dropdown-item icon="el-icon-view">密码修改</el-dropdown-item>
                </span>
                <span @click="upInfoClick()">
                  <el-dropdown-item icon="el-icon-user">信息修改</el-dropdown-item>
                </span>
                <span @click="upProVisible=true">
                  <el-dropdown-item icon="el-icon-picture-outline-round">头像修改</el-dropdown-item>
                </span>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            工号
          </template>
          {{userInfo.user.userId}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            姓名
          </template>
          {{userInfo.user.realname}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            性别
          </template>
          {{userInfo.user.sex}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            头像
          </template>
          <div>
            <el-avatar v-if="userInfo.user.profile"
                       :src="userInfo.user.profile">
            </el-avatar>
            <el-avatar v-else
                       src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </div>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号
          </template>
          {{userInfo.user.phone}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            生日
          </template>
          {{birthday}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            部门
          </template>
          <el-tag size="small">{{userInfo.dept.dname}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            职位
          </template>
          <el-tag size="small">{{userInfo.position.pname}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            角色
          </template>
          <el-tag size="small">{{userInfo.role.rname}}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 修改密码 -->
    <div class="upPass">
      <el-dialog title="密码修改"
                 :visible.sync="upPassVisible"
                 width="500px"
                 top="15vh"
                 center="">
        <el-form :model="pass"
                 status-icon
                 :rules="rulePass"
                 ref="pass"
                 label-width="80px"
                 style="padding: 15px"
                 class="demo-ruleForm">
          <el-form-item label="原密码"
                        prop="oldPassword">
            <el-input type="text"
                      v-model="pass.oldPassword"
                      autocomplete="off"
                      prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item label="新密码"
                        prop="newPassword">
            <el-input type="password"
                      v-model="pass.newPassword"
                      autocomplete="off"
                      prefix-icon="el-icon-key"></el-input>
          </el-form-item>
          <el-form-item label="确认密码"
                        prop="verifyPassword">
            <el-input type="password"
                      v-model="pass.verifyPassword"
                      autocomplete="off"
                      prefix-icon="el-icon-key"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="resetForm('pass')">重 置</el-button>
          <el-button type="primary"
                     @click="submitPassword('pass')">修 改</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="upprofile">
      <el-dialog title="头像上传"
                 :visible.sync="upProVisible"
                 width="400px"
                 top="15vh"
                 center="">
        <div title="点击上传图片"
             class="upimg">
          <el-upload class="avatar-uploader"
                     ref="refAddImage"
                     action=""
                     :show-file-list="false"
                     :auto-upload="false"
                     :on-change="addFileProOnChange"
                     :on-preview="handlePictureCardPreview"
                     :on-success="AddhandleAvatarSuccess"
                     :before-upload="AddbeforeAvatarUpload">
            <img v-if="imgUrlShowAdd"
                 :src="imgUrlShowAdd"
                 class="avatar">
            <i v-else
               style="border: 1px dashed #bebebe;"
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- <el-upload action=""
                     list-type="picture-card"
                     :auto-upload="false"
                     :file-list="fileList"
                     drag
                     :on-change="handOnChang"
                     :on-preview="handlePictureCardPreview"
                     :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>

          <el-dialog :visible.sync="dialogVisible">
            <img width="100%"
                 :src="dialogImageUrl"
                 alt="">
          </el-dialog> -->
          <!-- <el-dialog :visible.sync="imgUrlShowAdd">
            <img width="100%"
                 :src="imgUrlShowAdd"
                 alt="">
          </el-dialog> -->
          <el-button class="upProBtn"
                     @click="upPro()"
                     type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>

      </el-dialog>
    </div>

    <!-- 修改信息 -->
    <div class="upInfo">
      <el-dialog title="修改信息"
                 :visible.sync="upInfoVisible"
                 width="500px"
                 top="15vh"
                 center="">
        <el-form :model="upInfoData"
                 status-icon
                 :rules="ruleUpInfoData"
                 ref="upInfoFrom"
                 label-width="50px"
                 style="padding: 0 20px"
                 class="demo-ruleForm">
          <el-form-item label="工号"
                        prop="userId">
            <el-input type="text"
                      v-model="upInfoData.userId"
                      autocomplete="off"
                      disabled
                      prefix-icon="el-icon-s-custom"></el-input>
          </el-form-item>
          <el-form-item label="姓名"
                        prop="realname">
            <el-input type="text"
                      v-model="upInfoData.realname"
                      autocomplete="off"
                      prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item label="性别"
                        prop="sex">
            <el-radio-group v-model="upInfoData.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="学历"
                        prop="education">
            <el-select v-model="upInfoData.education"
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
          <el-form-item label="电话"
                        prop="phone">
            <el-input type="text"
                      v-model="upInfoData.phone"
                      oninput="value=value.replace(/\D/g,'')"
                      autocomplete="off"
                      prefix-icon="el-icon-mobile-phone"
                      maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="生日"
                        prop="birthday">
            <el-date-picker v-model="upInfoData.birthday"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="resetForm('upInfoFrom')">重 置</el-button>
          <el-button type="primary"
                     @click="submitUpInfog('upInfoFrom')">修 改</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- <pay ref="Pay"></pay> -->

    <!-- <el-button type=""
               @click="getProfileImg">test</el-button>
    <el-image style="width: 100px; height: 100px"
              :src="url"
              fit="fit"></el-image> -->
  </div>
</template>

<script>
import { obj, options } from '@/mesconfig/mesconfig.js'
import * as verify from '@/mesconfig/verify.js'
import Pay from '../Pay.vue'
import Utils from '@/utils/util.js'
export default {
  // components: { Pay },
  name: 'PayUserInfo',
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error())
      } else if (value !== this.pass.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userInfo: {
        user: {
          userId: '',
          realname: '',
          sex: '',
          phone: '',
          birthday: '',
        },
        dept: {
          dname: '',
        },
        position: {
          pname: '',
        },
        role: {
          rname: '',
        },
      },
      roles: [], //{roleId,rname}
      depts: [], //{deptId,dname}
      positions: [], //{positionId,pname}
      birthday: '',
      upPassVisible: false,
      pass: {
        oldPassword: '',
        newPassword: '',
        verifyPassword: '',
      },
      rulePass: {
        newPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '长度在 6 到 16 个字符',
            trigger: 'blur',
          },
        ],
        verifyPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          // { validator: false, message: '两次输入密码不一致!', trigger: 'blur' }
          { validator: validatePass2, trigger: 'blur' },
        ],
      },
      upInfoVisible: false,
      upInfoData: {
        userId: '',
        realname: '',
        sex: '',
        education: '',
        phone: '',
        birthday: '',
      },
      educations: obj.educations,
      ruleUpInfoData: {
        realname: [
          { required: true, message: '性名不能为空', trigger: 'blur' },
        ],
        phone: [
          //电话正则
          { required: true, message: '电话不能为空', trigger: 'blur' },
          { validator: verify.phoenTest, trigger: 'blur' },
        ],
        birthday: [
          { required: true, message: '生日不能为空', trigger: 'blur' },
        ],
      },

      //上传头像
      upProVisible: false,
      imageUrl: '',
      imageUrlAdd: '',
      upFile: undefined,
      imgUrlShowAdd: undefined, //渲染本地选择的图片

      // url: 'http://localhost:8081/pay/load/static/resource/profile?profile=default.png',
      url: '',

      dialogImageUrl: '',
      dialogVisible: false,
      flageUp: true,
      fileList: [],
    }
  },
  methods: {
    init() {
      this.getUserInfo()
    },
    getUserInfo() {
      // var userId = JSON.parse(sessionStorage.getItem('userInfo')).userId
      this.$axios.get('user/userinfo').then((e) => {
        // console.log(e)
        if (e.data.error === 1) {
          this.userInfo = e.data.data
          this.birthday = this.getDateText(this.userInfo.user.birthday)
        }
      })
    },
    getDateText(date) {
      return date.substring(0, date.indexOf(' '))
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    //修改密码
    submitPassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          // console.log('//注册表单验证成功')
          const data = {
            oldPassword: this.pass.oldPassword,
            newPassword: this.pass.newPassword,
          }
          this.$axios
            .post('account/uppassword', data)
            .then((e) => {
              if (e.data.error === 1) {
                this.$message({
                  type: 'success',
                  message: '修改密码成功，请重新登录!',
                })
                this.upPassVisible = false
                window.sessionStorage.clear()
                this.$router.push('/login')
              } else if (e.data.error === 0) {
                this.$message({
                  type: 'error',
                  message: '修改密码失败，旧密码不匹配！',
                })
              }
            })
            .catch()
        } else {
          //表单验证失败
          console.log('error submit!!')
          return false
        }
      })
    },
    submitUpInfog(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          const data = this.upInfoData
          this.$axios
            .post('user/upinfo', data)
            .then((e) => {
              if (e.data.error === 1 && e.data.sign) {
                this.$message({
                  type: 'success',
                  message: '修改信息成功!',
                })
                this.userInfo.user = JSON.parse(JSON.stringify(data))
                this.upInfoVisible = false
              } else {
                this.$message({
                  type: 'error',
                  message: '修改信息失败！',
                })
              }
            })
            .catch()
        } else {
          //表单验证失败
          console.log('error submit!!')
          return false
        }
      })
    },
    upInfoClick() {
      this.upInfoVisible = true
      this.upInfoData = JSON.parse(JSON.stringify(this.userInfo.user))
    },
    userName(val) {
      Utils.$emit('userNameCall', val)
    },
    profileShift(val) {
      Utils.$emit('profileCall', val)
    },
    //上传头像
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw) //本地图片渲染到表单中->Element 格式转换
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const condition = isJPG || isPNG
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!condition) {
        this.$message.warning('上传头像图片只能是 JPG或PNG 格式!')
      }
      if (!isLt5M) {
        this.$message.warning('上传头像图片大小不能超过 5MB!')
      }
      return condition && isLt5M
    },
    //Add上传图片
    AddhandleAvatarSuccess(res, file) {
      console.log('AddhandleAvatarSuccess')
      // this.addBookData.imageUrlAdd = URL.createObjectURL(file.raw);
      this.imgUrlShowAdd = URL.createObjectURL(file.raw) //渲染本地选择的图片
    },
    AddbeforeAvatarUpload(file) {
      console.log('AddbeforeAvatarUpload')

      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const condition = isJPG || isPNG
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!condition) {
        this.$message.warning('上传头像图片只能是 JPG或PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.warning('上传头像图片大小不能超过 5MB!')
      }
      this.imgUrlShowAdd = file //打包成file类型的对象
      // this.upPro(file)
      this.upFile = file
      return condition && isLt2M
    },
    verifyUpImage(file) {
      console.log('verifyUpImage')
      // console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const condition = isJPG || isPNG
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!condition) {
        this.$message.warning('上传头像图片只能是 JPG或PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.warning('上传头像图片大小不能超过 5MB!')
      }
      return condition && isLt2M
    },
    handleRemove(file, fileList) {
      console.log('删除。。。')
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      console.log('添加成功')
      this.imgUrlShowAdd = file.url
      // this.dialogVisible = true
    },
    handOnChang(file, fileList) {
      console.log('on change')
      console.log(file)
      console.log(fileList.length)
      if (fileList.length > 0) {
        this.flageUp = false
      } else {
        this.flageUp = true
      }
    },
    addFileProOnChange(file, fileList) {
      const aFile = file.raw
      // console.log('on change')
      // console.log(file)
      if (fileList.length > 0) {
        // console.log(fileList.length)
        const b = this.verifyUpImage(aFile)
        if (b) {
          this.imgUrlShowAdd = URL.createObjectURL(aFile) //渲染本地选择的图片
          this.upFile = aFile
          // console.log(aFile.constructor == File)
        }
        this.$refs['refAddImage'].clearFiles()
      }
    },
    upPro() {
      const file = this.upFile
      // console.log(file instanceof File)
      if (file === null || file === '' || file === undefined) {
        this.$message({
          type: 'warning ',
          message: '请选择上传的图片!',
        })
        return
      }
      const formData = new FormData()
      formData.append('file', file)
      let loadingInstance = this.$loading.service(options)
      this.$axios
        .post('load/up/profile', formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((e) => {
          if (e.data.error === 1) {
            this.$message({
              type: 'success ',
              message: e.data.message,
            })
            this.userInfo.user.profile = undefined
            const url = e.data.data
            setTimeout(() => {
              this.profileShift(url)
              this.userInfo.user.profile = url
              this.upProVisible = false
              this.imgUrlShowAdd = ''
              this.upFile = undefined
              loadingInstance.close()
            }, 3000)
          } else {
            this.$message({
              type: 'error ',
              message: e.data.message,
            })
          }
        })
    },
    getProfileImg() {
      console.log(this)
      console.log(this.$axios)
      // let profile = this.userInfo.user.profile
      let path = 'down/profile'
      let profile = 'memberList.xlsx'

      // 'test/load/download', {
      //           params: { filename: 'excel/memberList.xlsx' },
      //         }
      const filenamepath = 'FoxmailSetup_7.2.23.121.exe'
      this.$axios({
        method: 'get',
        url: 'load/download?filename=' + filenamepath,
        responseType: 'blob',
      }).then((e) => {
        if (e.data.type === 'application/json') return

        //之前乱码，有多个方面的原因，一个是用了封装过的axios，一个是这里写的res
        // const { headers, data } = e
        // let filename = decodeURI(headers['content-disposition']).split(
        //   'filename='
        // )[1]
        // filename = filename.substring(1, filename.length - 1)
        // const blob = new Blob([data], {
        //   type: 'application/octet-stream',
        // })
        // const blobURL = window.URL.createObjectURL(blob)
        // // 创建a标签，用于跳转至下载链接
        // const tempLink = document.createElement('a')
        // tempLink.style.display = 'none'
        // tempLink.href = blobURL
        // tempLink.setAttribute('download', decodeURI(filename))
        // // 兼容：某些浏览器不支持HTML5的download属性
        // if (typeof tempLink.download === 'undefined') {
        //   tempLink.setAttribute('target', '_blank')
        // }
        // // 挂载a标签
        // document.body.appendChild(tempLink)
        // tempLink.click()
        // document.body.removeChild(tempLink)
        // // 释放blob URL地址
        // window.URL.revokeObjectURL(blobURL)

        /** 第二种 */
        // console.log(e)
        const { headers, data } = e
        // 从响应头中获取文件名，*如果network中能看到content-disposition，代码无法获取，需后端配置

        let filename = decodeURI(headers['content-disposition']).split(
          'filename='
        )[1]
        filename = filename.substring(1, filename.length - 1)
        let blob = new Blob([data], { type: headers['content-type'] })
        this.saveAs(blob, filename)
      })
    },
    saveAs(blob, filename) {
      if ('download' in document.createElement('a')) {
        console.log('download')
        const eleA = document.createElement('a')
        eleA.download = filename
        eleA.style.display = 'none'
        eleA.href = URL.createObjectURL(blob)
        document.body.appendChild(eleA)
        eleA.click()
        URL.revokeObjectURL(eleA.href) //释放URL对象
        document.body.removeChild(eleA)
      } else {
        // IE下载
        console.log('IE下载')
        navigator.msSaveOrOpenBlob(blob, filename)
      }
    },
  },
  created() {
    this.init()
  },
  watch: {
    'userInfo.user.birthday'() {
      this.birthday = this.getDateText(this.userInfo.user.birthday)
    },
    'userInfo.user.realname'() {
      this.userName(this.userInfo.user.realname)
    },
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
.userInfo .el-dropdown-link {
  color: rgb(45, 152, 194);
}
.userInfo .optionr1 {
  margin-right: 20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.upimg {
  margin-left: 80px;
}
.upProBtn {
  margin-top: 20px;
  margin-left: 50px;
}
.el-dropdown-link {
  cursor: pointer;
  /* color: #409eff; */
  font-size: 16px;
  display: inline-block;
  margin-right: 10px;
}
.el-icon-arrow-down {
  font-size: 14px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
