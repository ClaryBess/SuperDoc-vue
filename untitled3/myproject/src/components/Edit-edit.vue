<template>
  <div>
    <el-container>
      <el-header>
        <NavBar :headSrc="headUrl" style="z-index: 9999"></NavBar>
      </el-header>
      <el-main>
        <el-card class="main-body">
          <div class="card">
            <el-row>
              <p class="top-title">创建文档</p>
            </el-row>
            <div class="tips">
              <p>你可以使用“模板”功能来快速创建文档</p>
            </div>
            <div style="margin-top: 40px;">
              <el-form :model="docForm" label-width="80px" :rules="rule" ref="docForm">
                <el-row>
                  <el-form-item label="文档标题" prop="title">
                    <el-input v-model="docForm.title"></el-input>
                  </el-form-item>
                </el-row>
                <el-form-item label="文档权限">
                  <el-checkbox-group v-model="docForm.privilege">
                    <el-checkbox label="可查看" name="type"></el-checkbox>
                    <el-checkbox label="可评论" name="type"></el-checkbox>
                    <el-checkbox label="可编辑" name="type"></el-checkbox>
                    <el-checkbox label="可分享" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <!--<div class="editor">
                  <vue-ueditor-wrap v-model="docForm.doc" :config="ueConfig"></vue-ueditor-wrap>
                </div>-->
                <el-form-item label="知识点内容" prop="contents">
                  <UEditor  id="qb-editor1" :config="config" ref="ueditor" v-model="docForm.doc"></UEditor>
                </el-form-item>
                <el-form-item class="button-row">
                  <el-button type="primary" @click="onSubmit('docForm')" >提交</el-button>
                  <el-button style="margin-left: 30px">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-card>
      </el-main>
    </el-container>
    <el-backtop right="80"></el-backtop>
  </div>
</template>

<script>
 // import UEditor from "./UEditor";
  import NavBar from "./NavBar";
  import VueUeditorWrap from "vue-ueditor-wrap";
  import axios from "axios";
  import UEditor from "./ueditor/ueditor.vue";
  export default {
    name: "Edit",
    components: {UEditor, NavBar, VueUeditorWrap},
    data(){
      return{
        headUrl: require('../assets/head.jpg'),
        docForm:{
          title: "",
          doc: "我是默认内容咿呀咿呀咿",
          privilege: []
        },
        rule:{
          title: [
            { required: true, message: '请输入标题', trigger: ['blur','change']},
            { min: 1, max: 25, message: '标题长度在25字以内', trigger: ['blur','change']}
          ]
        },
       /* ueConfig:{
          toolbars: [
            [
              'source', // 源代码
              // 'anchor', // 锚点
              'undo', // 撤销
              'redo', // 重做
              'bold', // 加粗
              'indent', // 首行缩进
              // 'snapscreen', //截图
              'italic', // 斜体
              'underline', // 下划线
              'strikethrough', // 删除线
              'subscript', // 下标
              'fontborder', // 字符边框
              'superscript', // 上标
              'formatmatch', // 格式刷
              'blockquote', // 引用
              'pasteplain', // 纯文本粘贴模式
              'selectall', // 全选
              // 'print', // 打印
              'preview', // 预览
              'horizontal', // 分隔线
              'removeformat', // 清除格式
              // 'time', // 时间
              // 'date', // 日期
              // 'unlink', // 取消链接
              'insertrow', // 前插入行
              'insertcol', // 前插入列
              'mergeright', // 右合并单元格
              'mergedown', // 下合并单元格
              'deleterow', // 删除行
              'deletecol', // 删除列
              'splittorows', // 拆分成行
              'splittocols', // 拆分成列
              'splittocells', // 完全拆分单元格
              'deletecaption', // 删除表格标题
              'inserttitle', // 插入标题
              'mergecells', // 合并多个单元格
              'deletetable', // 删除表格
              'cleardoc', // 清空文档
              'insertparagraphbeforetable', // "表格前插入行"
              'insertcode', //代码语言
              'fontfamily', // 字体
              'fontsize', // 字号
              // 'paragraph', // 段落格式
              'simpleupload', // 单图上传
              //'insertimage', // 多图上传
              'edittable', // 表格属性
              'edittd', // 单元格属性
              // 'link', // 超链接
              // 'emotion', // 表情
              // 'spechars', // 特殊字符
              // 'searchreplace', // 查询替换
              // 'map', // Baidu地图
              // 'gmap', // Google地图
              // 'insertvideo', // 视频
              // 'help', // 帮助
              'justifyleft', // 居左对齐
              'justifyright', // 居右对齐
              'justifycenter', // 居中对齐
              'justifyjustify', // 两端对齐
              'forecolor', // 字体颜色
              'backcolor', // 背景色
              'insertorderedlist', // 有序列表
              'insertunorderedlist', // 无序列表
              // 'fullscreen', // 全屏
              'directionalityltr', // 从左向右输入
              'directionalityrtl', // 从右向左输入
              'rowspacingtop', // 段前距
              'rowspacingbottom', // 段后距
              // 'pagebreak', // 分页
              // 'insertframe', // 插入Iframe
              'imagenone', // 默认
              'imageleft', // 左浮动
              'imageright', // 右浮动
              // 'attachment', //附件
              'imagecenter', // 居中
              // 'wordimage', //图片转存
              'lineheight', // 行间距
              // 'edittip ', // 编辑提示
              // 'customstyle', // 自定义标题
              'autotypeset', // 自动排版
              // 'webapp', // 百度应用
              'touppercase', // 字母大写
              'tolowercase', // 字母小写
              // 'background', // 背景
              'template', // 模板
              // 'scrawl', // 涂鸦
              // 'music', // 音乐
              'inserttable'// 插入表格
              // 'drafts', // 从草稿箱加载
              // 'charts', // 图表
            ]
          ],
          // 初始容器高度
          initialFrameHeight: 400,
          // 初始容器宽度
          initialFrameWidth: "100%",
          // 上传文件接口
          enableAutoSave: true,
          autoHeightEnabled:false,
          serverUrl: "http://127.0.0.1:8081"
        }*/
        config: {
          //可以在此处定义工具栏的内容
          toolbars: [
            [
              //'anchor', //锚点
              "undo", //撤销
              "redo", //重做
              "bold", //加粗
              "indent", //首行缩进
              // 'snapscreen', //截图
              "italic", //斜体
              "underline", //下划线
              // 'strikethrough', //删除线
              // 'subscript', //下标
              // 'fontborder', //字符边框
              // 'superscript', //上标
              "formatmatch", //格式刷
              "source", //源代码
              // 'blockquote', //引用
              "pasteplain", //纯文本粘贴模式
              "selectall", //全选
              //'print', //打印
              // 'preview', //预览
              // 'horizontal', //分隔线
              "removeformat", //清除格式
              // 'time', //时间
              //'date', //日期
              //'unlink', //取消链接
              // 'insertrow', //前插入行
              // 'insertcol', //前插入列
              //'mergeright', //右合并单元格
              //'mergedown', //下合并单元格
              //'deleterow', //删除行
              //'deletecol', //删除列
              // 'splittorows', //拆分成行
              // 'splittocols', //拆分成列
              // 'splittocells', //完全拆分单元格
              //'deletecaption', //删除表格标题
              // 'inserttitle', //插入标题
              // 'mergecells', //合并多个单元格
              //'deletetable', //删除表格
              "cleardoc", //清空文档
              // 'insertparagraphbeforetable', //"表格前插入行"
              // 'insertcode', //代码语言
              "fontfamily", //字体
              "fontsize", //字号
              "paragraph", //段落格式
              // 'simpleupload', //单图上传
              "insertimage", //多图上传
              // 'edittable', //表格属性
              //'edittd', //单元格属性
              // 'link', //超链接
              // 'emotion', //表情
              // 'spechars', //特殊字符
              // 'searchreplace', //查询替换
              //'map', //Baidu地图
              // 'gmap', //Google地图
              "insertvideo", //视频
              //'help', //帮助
              "justifyleft", //居左对齐
              "justifyright", //居右对齐
              "justifycenter", //居中对齐
              //'justifyjustify', //两端对齐
              "forecolor", //字体颜色
              "backcolor", //背景色
              // 'insertorderedlist', //有序列表
              //'insertunorderedlist', //无序列表
              // 'fullscreen', //全屏
              // 'directionalityltr', //从左向右输入
              // 'directionalityrtl', //从右向左输入
              "rowspacingtop", //段前距
              "rowspacingbottom", //段后距
              //'pagebreak', //分页
              // 'insertframe', //插入Iframe
              // 'imagenone', //默认
              // 'imageleft', //左浮动
              //'imageright', //右浮动
              // 'attachment', //附件
              "imagecenter", //居中
              // 'wordimage', //图片转存
              "lineheight" //行间距
              //'edittip ', //编辑提示
              //  'customstyle', //自定义标题
              // 'autotypeset', //自动排版
              //'webapp', //百度应用
              // 'touppercase', //字母大写
              //'tolowercase', //字母小写
              //'background', //背景
              //'template', //模板
              // 'scrawl', //涂鸦
              // 'music', //音乐
              //'inserttable', //插入表格
              //'drafts', // 从草稿箱加载true
              //'charts', // 图表
            ]
          ],
          autoHeightEnabled: false,
          autoFloatEnabled: true,
          initialContent: "请输入内容", //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
          autoClearinitialContent: true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
          initialFrameWidth: null,
          initialFrameHeight: 200,
          BaseUrl: "",
          UEDITOR_HOME_URL: "static/UEditor/"
        },
      }
    },
    methods: {
      fetchUser(){
        this.userL=JSON.parse(sessionStorage.getItem("userL"))
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var _this=this
            var pri = 0;
            for(var i = 0; i < this.docForm.privilege.length; i++){
              if(this.docForm.privilege[i] === '可查看'){
                pri += 1000;
              }
              else if(this.docForm.privilege[i] === '可编辑'){
                pri += 100;
              }
              else if(this.docForm.privilege[i] === '可评论'){
                pri += 10;
              }
              else if(this.docForm.privilege[i] === '可分享'){
                pri += 1;
              }
            }
            axios.post("http://127.0.0.1:8081/doc",{
              //权限是一个四位整数，0代表仅自己，1代表所有人，2代表仅团队；可查看、可编辑、可评论、可分享
              userID: _this.userL.UserID,
              title: this.docForm.title,
              content: this.docForm.doc,
              privilege: pri,
              isTeam: 0
            })
              .then(function (response) {
                // console.log(response.data.status)
                if(response.data.status === 200){
                  //alert("新建文档成功")
                     _this.$message({
                     message: '新建文档成功',
                     type: 'success'
                   })
                  _this.$router.push('/detail/' + response.data.data)
                }
              })
              .catch(function (error) {
                console.log(error)
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    created() {
      this.fetchUser()
    }
  }
</script>

<style scoped>
  .main-body{
    width: 90%;
    margin-left: 5%;
  }
  .top-title{
    float: left;
    font-size: 30px;
    color: #333333;
  }
  .button-row{
    text-align: center;
    margin-top: 30px;
    width: 100%;
  }
  .tips{
    border-radius: 5px;
    background: RGB(236,248,255);
    padding: 12px;
    margin-bottom: 20px;
    border: 5px solid RGB(236,248,255);
    border-left-color: RGB(80, 191, 255);
  }
  .editor{
    text-align: center;
  }
  .card{
    width: 90%;
    margin-left: 5%;
  }
</style>
