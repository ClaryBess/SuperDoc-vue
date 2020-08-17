<template>
    <el-container>
      <el-header>
        <NavBar></NavBar>
      </el-header>
      <el-main>
        <el-page-header @back="goBack" :content="title"></el-page-header>
        <div class="main-part">
          <div class="doc">
            <el-card :body-style="{padding:'0px'}">
              <div style="padding: 50px">
                <p v-html="content"></p>
              </div>
            </el-card>
            <el-card style="margin-top: 20px" shadow="hover" v-if="CommentP">
              <div>
                <el-form :model="Form" :rules="rule" ref="Form">
                  <el-row>
                    <el-col span="2"><img :src="headSrc" class="commentHead"> </el-col>
                    <el-col span="22">
                      <el-form-item prop="content">
                        <el-input
                          type="textarea"
                          :autosize="{ minRows: 3}"
                          placeholder="请输入内容"
                          v-model="Form.content" class="te"  @click.native="show3 = true">
                        </el-input>
                      </el-form-item></el-col>
                  </el-row>
                  <el-collapse-transition>
                    <div v-show="show3">
                      <el-row>
                        <el-col span="24">
                          <el-form-item>
                            <el-button type="primary" @click="onSubmit('Form')" style="float: right" size="small" icon="el-icon-edit" round>提交</el-button>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-collapse-transition>
                </el-form>
              </div>
            </el-card>
            <el-card style="margin-top: 20px" shadow="hover">
              <div style="font-size: 20px; margin-bottom: 40px; margin-left: 7px">
                <el-row>
                  <el-col span="1"><div class="tips"><p></p></div></el-col>
                  <el-col span="23" style="margin-top: 5px">评论</el-col>
                </el-row>
              </div>
              <el-row></el-row>
              <ul style="list-style: none;margin: 0; padding: 0;">
                <li v-for="item in commentItem">
                  <div style="width: 100%;float: left">
                    <span style="width: 8.3%; float: left">
                      <img :src="item.src" class="commentHead">
                    </span>
                    <span style="float: left" class="commentName">
                      {{item.user}}
                    </span>
                  </div>
                  <p class="commentText">{{item.content}}</p>
                  <div style="width: 100%" class="commentTime">
                    <div style="margin-left: 8.3%">
                      <p>{{item.time}}</p>
                    </div>
                  </div>
                  <el-divider></el-divider>
                </li>
              </ul>
            </el-card>
          </div>
          <div class="right-col">
            <el-card shadow="hover" class="up-card">
              <el-row v-if="isTeam">
                <div style="float: left"><i class="iconfont iconCustomermanagement"></i>团队：</div>
                <div style="color: #409EFF;float: left">{{TeamName}}</div>
              </el-row>
              <el-row>
                <div style="float: left"><i class="iconfont iconpin"></i>作者：</div>
                <div style="color: #409EFF;float: left">{{Author}}</div>
              </el-row>
              <el-row><div style="float: left"><i class="iconfont iconcomments"></i>评论数：</div>
                <div style="color: #409EFF;float: left">{{CommentNum}}</div>
              </el-row>
              <el-row><div style="float: left"><i class="iconfont iconfavorites"></i>收藏数：</div>
                <div style="color: #409EFF;float: left">{{CollectNum}}</div>
              </el-row>
            </el-card>
            <el-card shadow="hover" style="margin-top: 20px; margin-bottom: 20px">
              <div slot="header">
                编辑记录
                <i class="iconfont iconsuggest" @click="EditDoc" style="float: right;color:#409EFF " v-if="EditP">编辑文档</i>
              </div>
              <el-timeline reverse="true">
                <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :timestamp="activity.timestamp"
                  color="#409EFF">
                  {{activity.content}}
                </el-timeline-item>
              </el-timeline>
            </el-card>
            <el-card shadow="hover" id="fixedCard" :class="{'isFixed':fixed}">
              <div v-if="ShareP">
                <p style="font-size: 13px;">喜欢本文？点击
                  <span style="color: #409EFF; margin-right: 2px">复制链接</span>分享给好友：</p>
                <el-input v-model="short_url" size="small" style="width: 50%;"></el-input>
                <el-button v-if="short_url" class="copy" size="small" @click="CopyUrl" type="primary" plain>复制链接</el-button>
              </div>
              <div style="text-align: center">
                <el-button type="primary" size="mini" icon="el-icon-star-on" round="true" plain v-if="hasCollect" style="margin-top: 20px;" @click="CancelCollect">取消收藏</el-button>
                <div style="font-size: 13px;margin-top: 30px; margin-bottom: 10px" v-else>您也可以：
                    <el-button type="primary" size="mini" icon="el-icon-star-off" round="true" @click="addCollect">收藏本文</el-button>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </el-main>
      <el-backtop right="80"></el-backtop>
    </el-container>
</template>

<script>
    import NavBar from "./NavBar";
    import axios from "axios";

    export default {
        name: "View",
      components: {NavBar},
      inject:['reload'],
      data(){
          return{
            EditP: true,
            CommentP: true,
            ShareP: true,
            title: '123',
            isTeam: false,
            TeamName: 'Aligay',
            Author: 'lzmshh',
            CollectNum: 10,
            CommentNum: 2,
            content: '<h1>123</h1>',
            hasCollect: true,
            commentItem: [{
              src: require("../assets/head.jpg"),
              user: 'YuanCZ',
              content: '你用两个脑子思考？',
              time: '2020-8-13'
            }, {
              src: require("../assets/head.jpg"),
              user: '宋友',
              content: '你真幸运',
              time: '2020-8-14'
              }],
            show3: false,
            Form: [{
              content: ''
            }],
            rule:{
              content: [
                { required: true, message: '请输入评论', trigger: ['blur']}
              ]
            },
            activities: [{
              content: 'wsy',
              timestamp: '2020-04-15'
            }, {
              content: '王奶糖',
              timestamp: '2020-04-13'
            }, {
              content: '王咪咪',
              timestamp: '2020-04-11'
            }],
            offsetTop:0,
            offsetWidth:0,
            colWidth:0,
            fixed:false,
            short_url:'www.wsynb.com',
          }
      },
      mounted(){

        //对整个页面滚轮进行监听，每发生一次滚轮事件，执行一次方法
        window.addEventListener('scroll',this.initHeight);


        // DOM异步更新 对未来更新后的视图进行操作 在更新后执行
        this.$nextTick(()=>{
          //获取到达页面顶端的值
          var height = document.getElementById("fixedCard")
          this.offsetTop = height.offsetTop+60;
          //获取宽度
          this.offsetWidth = height.offsetWidth;
          console.log(1)
        })
      },
      destroyed(){
        //移除监听
        window.removeEventListener('scroll',this.initHeight);
      },
      methods: {
        goBack() {
          this.$router.go(-1)
        },
        EditDoc() {
          this.axios.post("http://127.0.0.1:8081/doc" + this.$route.params.id, {
            Editable: 1
          })
            .then(function (response) {
              if(response.data.status === 200){
                if(this.isTeam === false){
                  this.$router.push('/change/' + this.$route.params.id)
                }
                else{
                  this.$router.push('/changeTeam/' + this.$route.params.id)
                }
              }
            })
            .catch(function (error) { // 请求失败处理
              console.log(error);
            });
        },
        initHeight(){
          //兼容性，获取页面滚动距离
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          //判断滚动距离是否大于元素到顶端距离
          this.fixed = scrollTop>this.offsetTop?true:false;
          //宽度赋值
          document.getElementById("fixedCard").style.width = this.offsetWidth+'px'
        },
        CopyUrl(data){
          var oInput = document.createElement("input");
          oInput.value = this.$data.short_url;
          document.body.appendChild(oInput);
          oInput.select(); // 选择对象
          document.execCommand("Copy"); // 执行浏览器复制命令
          oInput.className = "oInput";
          oInput.style.display = "none";
          this.$message({
            message:"复制成功!",
            type:'success'
          })
        },
        getCollect(){
          var userL=JSON.parse(sessionStorage.getItem("userL"))
          axios.post("http://127.0.0.1:8081/collect/collected", {
            docID: this.$route.params.id,
            userID: userL.userID
          })
          .then(function (response) {
            if(response.data.status === 200 && response.data.msg === "collected"){
              this.hasCollect = true;
            }
            else if(response.data.status === 200 && response.data.msg === "not collected"){
              this.hasCollect = false;
            }
          })
            .catch(function (error) { // 请求失败处理
              console.log(error);
            });
        },
        CancelCollect(){
          var _this=this
          var userL=JSON.parse(sessionStorage.getItem("userL"))
          axios.post("http://127.0.0.1:8081/collect/deleteCollect",{
            userID: userL.userID,
            docID: this.$route.params.id
          })
            .then(function (response) {
              // console.log(response.data.status)
              if(response.data.status === 200){
                //alert("新建文档成功")
                _this.$message({
                  message: '取消收藏成功',
                  type: 'success'
                })
                _this.reload();
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        addCollect(){
          var _this=this
          var userL=JSON.parse(sessionStorage.getItem("userL"))
          axios.post("http://127.0.0.1:8081/collect/insertCollect",{
            userID: userL.userID,
            docID: this.$route.params.id
          })
            .then(function (response) {
              // console.log(response.data.status)
              if(response.data.status === 200){
                //alert("新建文档成功")
                _this.$message({
                  message: '收藏成功',
                  type: 'success'
                })
                _this.reload();
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        getCommentList(){
          axios.post("http://127.0.0.1:8081/comment/" + this.$route.params.id)
            .then(function (response) {
              if(response.data.status === 200){
                var list = response.data.data;
                this.CommentNum = list.length;
                while(this.commentItem.length > 0)
                  this.commentItem.pop();
                for(var i = 0; i < list.length; i ++){
                  this.commentItem[i].content = list[i].content;
                  this.commentItem[i].time = list[i].time;
                  //这里还要加一个获得头像src和获得
                  var _this=this
                  axios.post("http://127.0.0.1:8081/user/getName/",{
                    userID: list[i].userID
                  })
                    .then(function (response) {
                      _this.commentItem[i].user = response.data
                    })
                  axios.post("http://127.0.0.1:8081/user/getPro/",{
                    userID: list[i].userID
                  })
                    .then(function (response) {
                      _this.commentItem[i].src = response.data
                    })
                    .catch(function (error) {
                      console.log(error)
                    })
                }
              }
            })
            .catch(function (error) { // 请求失败处理
              console.log(error);
            });
        },
        onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var _this=this
              var userL=JSON.parse(sessionStorage.getItem("userL"))
              axios.post("http://127.0.0.1:8081/comment",{
                userID: userL.userID,
                docID: this.$route.params.id,
                content: this.Form.content
              })
                .then(function (response) {
                  // console.log(response.data.status)
                  if(response.data.status === 200){
                    //alert("新建文档成功")
                    _this.$message({
                      message: '评论成功',
                      type: 'success'
                    })
                    _this.reload();
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
        },
        getDoc(){
          var _this=this;
          this.axios.post("http://127.0.0.1:8081/doc/get/" + this.$route.params.id)
            .then(function (response) {
              console.log(response.data.status);
              if(response.data.status === 200){
                var docL = JSON.parse(JSON.stringify(response.data.data));
                console.log(docL.title);
                _this.title = docL.title;
                _this.content = docL.content;
                if(docL.isTeam === 1){
                  _this.isTeam = true;
                  _this.TeamName = docL.team;
                }
                else if(docL.isTeam === 0){
                  _this.isTeam = false;
                }
                //这里获得作者用户名
                axios.post("http://127.0.0.1:8081/user/getName/" + docL.userID)
                  .then(function (response) {
                      _this.Author = response.data;
                  })

              }
            })
            .catch(function (error) { // 请求失败处理
              console.log(error);
            });
        },
        getPri(){
          var userL=JSON.parse(sessionStorage.getItem("userL"))
          this.axios.post("http://127.0.0.1:8081/doc/checkPriEdit/" + this.$route.params.id, {
            userID: userL.userID
          })
            .then(function (response) {
              if(response.data.status === 200){
                this.EditP = response.data.data;
              }
            })
          this.axios.post("http://127.0.0.1:8081/doc/checkPriComment/" + this.$route.params.id, {
            userID: userL.userID
          })
            .then(function (response) {
              if(response.data.status === 200){
                this.CommentP = response.data.data;
              }
            })
          this.axios.post("http://127.0.0.1:8081/doc/checkPriShare/" + this.$route.params.id, {
            userID: userL.userID
          })
            .then(function (response) {
              if(response.data.status === 200){
                this.ShareP = response.data.data;
              }
            })
            .catch(function (error) { // 请求失败处理
              console.log(error);
            });
        },
        getCollectNum(){
          axios.post("http://127.0.0.1:8081/collect", {
            docID: this.$route.params.id,
          })
            .then(function (response) {
              this.CollectNum = response.data.data;
            })
            .catch(function (error) { // 请求失败处理
              console.log(error);
            });
        },
        getEdit(){
          axios.post("http://127.0.0.1:8081/edit", {
            docID: this.$route.params.id,
          })
            .then(function (response) {
              while(this.activities.length > 0)
                this.activities.pop();
              for(var i = 0; i < response.data.data.length; i ++){
                this.activities[i].content = response.data.data[i].userName;
                this.activities[i].timestamp = response.data.data[i].time;
              }
            })
            .catch(function (error) { // 请求失败处理
              console.log(error);
            });
        }
    },
      created() {
        this.getDoc();
        //this.getCollect();
        //this.getCommentList();
        //this.getPri();
        //this.getCollectNum();
        //this.getEdit();
        var userL=JSON.parse(sessionStorage.getItem("userL"))
        this.$data.short_url = userL.userName + '给您分享了文档：《' + this.$data.title + '》，点击链接查看：' + window.location.href;
      }
    }
</script>

<style>
  .main-part{
    width: 90%;
    margin-left: 5%;
    margin-top: 20px;
  }
  .doc{
    float: left;
    width: 70%;
  }
  .right-col{
    float: right;
    width: 25%;
  }
  .up-card{
    line-height: 200%;
    color: #333333;
  }
  .edit-bottom{
    color: #409EFF;
    font-size: 10px;
  }
  .isFixed{
    position: fixed;
    top: 0;
  }
  .commentHead {
    width: 40px;
    height: 40px;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
  .te .el-textarea__inner{
    font-size: 16px;
    color: #333333!important;
    font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif!important;
    line-height: 200%;
    background-color: #FAFAFA;
  }
  .tips{
    border-radius: 5px;
    padding: 5px;
    border: 3px solid white;
    border-left-color: RGB(80, 191, 255);
  }
  .commentTime{
    font-size: 14px;
    color: #969696;
    margin-top: 10px;
  }
  .commentName{
    float: left;
    margin-top: 10px;
    color: #409EFF;
  }
  .commentText{
    margin-left: 8.3%;
  }

</style>
