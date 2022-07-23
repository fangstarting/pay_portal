<template>
  <div class="edit_container">
    <div class="opbut">
      <!-- <el-button icon="el-icon-check"
                 size="mini"
                 @click="save"
                 circle></el-button> -->
      <el-button icon="el-icon-delete"
                 size="mini"
                 @click="clear"
                 circle></el-button>
    </div>

    <!--//字定义文本编辑头1-->
    <quill-editor v-model="content"
                  :style="editorStyle"
                  ref="editorRef"
                  :options="editorOption"
                  @focus="onEditorFocus($event)"
                  @blur="onEditorBlur($event)"
                  @change="onEditorChange($event)"
                  class="editor" />
    <!--//字定义文本编辑头2-->
    <!-- <quill-editor style="height: 500px"
                  v-model="content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @change="onEditorChange($event)">
    </quill-editor> -->

    <!-- <div v-html="str"
         class="ql-editor">
      {{ str }}
    </div> -->
  </div>
</template>

<script>
import * as Quill from 'quill'
import { quillEditor } from 'vue-quill-editor'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
//字体样式css文件
// import '../../assets/css/quillEditor.css'
// 自定义的字体，注意下面的内容要和css里面对应上
//quill编辑器的字体
var fonts = [
  'SimSun',
  'SimHei',
  'Microsoft-YaHei',
  'KaiTi',
  'FangSong',
  'Arial',
  'Times-New-Roman',
  'sans-serif',
]
// 自定义字号的大小，注意下面的内容要和css里面对应上
var sizes = [false, '16px', '18px', '20px', '22px', '26px', '28px', '30px']
var Size = Quill.import('formats/size')
Size.whitelist = sizes
var Font = Quill.import('formats/font')
Font.whitelist = fonts //将字体加入到白名单
Quill.register(Font, true)

//字定义文本编辑头1
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ['blockquote', 'code-block'], // 引用  代码块-----['blockquote', 'code-block']
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  [{ indent: '-1' }, { indent: '+1' }],
  [{ size: sizes }], // 配置字号
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ font: fonts }], //显示字体选择
  [{ align: [] }], // 对齐方式-----[{ align: [] }]
  ['clean'], // 清除文本格式-----['clean']
  ['link', 'image', 'video'], // 链接、图片、视频-----
]
//字定义文本编辑头2
const toolbarOptions2 = [
  ['bold', 'italic', 'underline', 'strike', 'image'],
  ['formula', 'clean'],
  [{ header: 1 }, { header: 2 }], // 几级标题
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // 颜色选择
  [
    {
      font: [
        'SimSun',
        'SimHei',
        'Microsoft-YaHei',
        'KaiTi',
        'FangSong',
        'Arial',
      ],
    },
  ], // 字体
  [{ align: [] }],
  [{ direction: 'rtl' }],
]

export default {
  name: 'Quill1',
  components: { quillEditor },
  data() {
    return {
      editorStyle: '', //编辑器样式
      content: '',
      str: '',
      editorOption: {
        modules: {
          toolbar: toolbarOptions,
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false,
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white',
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar'],
          },
        },
      },
    }
  },
  computed: {
    //当前富文本实例
    editor() {
      return this.$refs.editorRef.quillEditor
      // return this.$refs.myQuillEditor.quill
    },
  },
  // props: {
  //   value: Object,
  // },
  props: ['text'],
  mounted() {
    this.initText()
  },
  methods: {
    // 准备富文本编辑器
    onEditorReady() {
      // console.log('准备富文本编辑器')
    },
    // 富文本编辑器 失去焦点事件
    onEditorBlur() {
      // console.log('失去焦点事件')
    },
    // 富文本编辑器 获得焦点事件
    onEditorFocus() {
      // console.log('获得焦点事件')
    },
    // 富文本编辑器 内容改变事件
    onEditorChange({ html }) {
      //内容改变事件
      // console.log('内容改变事件')
      // console.log(this.content, 'content')
    },
    save() {
      // console.log(this.text)
      return this.content
    },
    clear() {
      this.content = ''
    },
    // 把实体格式字符串转义成HTML格式的字符串
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, '<')
      str = str.replace(/&gt;/g, '>')
      return str
    },
    initText() {
      this.content = this.text
      // this.content = this.escapeStringHTML(this.text)
    },
  },
}
</script>
<style scope>
* {
  /* padding: 0; */
  /* margin: 0; */
}
.edit_container {
  line-height: 1em;
  position: relative;
  text-align: left;
}
.editor {
  /* height: 500px; */
  height: inherit;
  /* padding: 0 10px 20px; */
  /* margin-bottom: 100px; */
}
.opbut {
  position: absolute;
  top: 8px;
  right: 20px;
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='SimHei']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='SimHei']::before {
  content: '黑体';
  font-family: 'SimHei';
}

.ql-snow
  .ql-picker.ql-font
  .ql-picker-label[data-value='Microsoft-YaHei']::before,
.ql-snow
  .ql-picker.ql-font
  .ql-picker-item[data-value='Microsoft-YaHei']::before {
  content: '微软雅黑';
  font-family: 'Microsoft YaHei';
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='KaiTi']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='KaiTi']::before {
  content: '楷体';
  font-family: 'KaiTi';
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='FangSong']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='FangSong']::before {
  content: '仿宋';
  font-family: 'FangSong';
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='Arial']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='Arial']::before {
  content: 'Arial';
  font-family: 'Arial';
}

.ql-snow
  .ql-picker.ql-font
  .ql-picker-label[data-value='Times-New-Roman']::before,
.ql-snow
  .ql-picker.ql-font
  .ql-picker-item[data-value='Times-New-Roman']::before {
  content: 'Times New Roman';
  font-family: 'Times New Roman';
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='sans-serif']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='sans-serif']::before {
  content: 'sans-serif';
  font-family: 'sans-serif';
}

.ql-font-SimSun {
  font-family: 'SimSun';
}

.ql-font-SimHei {
  font-family: 'SimHei';
}

.ql-font-Microsoft-YaHei {
  font-family: 'Microsoft YaHei';
}

.ql-font-KaiTi {
  font-family: 'KaiTi';
}

.ql-font-FangSong {
  font-family: 'FangSong';
}

.ql-font-Arial {
  font-family: 'Arial';
}

.ql-font-Times-New-Roman {
  font-family: 'Times New Roman';
}

.ql-font-sans-serif {
  font-family: 'sans-serif';
}

/* 字号设置 */
/* 默认字号 */
.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='14px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='14px']::before {
  content: '14px';
  font-size: 14px;
}

.ql-size-14px {
  font-size: 14px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='16px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='16px']::before {
  content: '16px';
  font-size: 16px;
}

.ql-size-16px {
  font-size: 16px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='18px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='18px']::before {
  content: '18px';
  font-size: 18px;
}

.ql-size-18px {
  font-size: 18px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='20px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='20px']::before {
  content: '20px';
  font-size: 20px;
}

.ql-size-20px {
  font-size: 20px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='22px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='22px']::before {
  content: '22px';
  font-size: 22px;
}

.ql-size-22px {
  font-size: 22px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='26px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='26px']::before {
  content: '26px';
  font-size: 26px;
}

.ql-size-26px {
  font-size: 26px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='28px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='28px']::before {
  content: '28px';
  font-size: 28px;
}

.ql-size-28px {
  font-size: 28px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='30px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='30px']::before {
  content: '30px';
  font-size: 30px;
}

.ql-size-30px {
  font-size: 30px;
}
</style>