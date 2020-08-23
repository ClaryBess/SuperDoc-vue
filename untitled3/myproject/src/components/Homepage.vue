<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <NavBar>
      </NavBar>
    </el-header>
    <!-- 主体 -->
    <div class="main">
      <el-main>
        <div class="info">
          <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-card class="box-card" >
              <!-- 卡片头部 -->
              <div slot="header" class="clearfix">
                <p>
                  <strong>个人空间</strong>
                  <el-button v-if="gai" class="btn" type="text" @click="toEdit()">
                    <i class="el-icon-edit-outline"></i>
                    修改信息
                  </el-button>
                </p>
              </div>
              <!-- 卡片内容 -->
              <div class="card-main">

                <el-form-item label="头像" prop="profile">
                  <el-avatar style="margin-left: 5px" :src="profileUrl"></el-avatar>
                </el-form-item>

                <el-form-item  label="用户名" prop="username">
                  <span>{{ruleForm.username}}</span>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                  <span>{{ruleForm.email}}</span>
                </el-form-item>

                <el-form-item label="性别" prop="sex">
                  <span>{{ruleForm.gender}}</span>
                </el-form-item>

                <el-form-item label="生日" prop="birth">
                  <span>{{ruleForm.birthday}}</span>
                </el-form-item>

              </div>
            </el-card>

          </el-form>
        </div>
      </el-main>
    </div>
  </el-container>
</template>

<script>
  import NavBar from "./NavBar";
  import axios from "axios";

  export default {
    name: "Homepage",
    inject:["reload"],
    components: {NavBar},

    inject: ["reload"],
    data() {
      return {
        gai:false,
        iduser:'',
        ruleForm: {
          profileUrl:'',
          userName:'',
          email:'',
          gender:'',
          birthday:'',
        },
      }
    },
    created() {
      this.iduser = this.$route.params.id;
      console.log("ididididididididididididididid是"+this.$route.params.id);
      // this.fetchUser();
      this.fetchPage();
      this.showGai();
    },
    methods: {
      showGai(){
        var userL=JSON.parse(sessionStorage.getItem("userL"))
        console.log(userL.userID)
        console.log("雷霆嘎巴"+this.iduser);
        if(userL.userID == this.iduser){
          this.gai = true;
          console.log("有缘人");
        } else {
          console.log("再见");
        }
      },
      fetchPage(){
        var _this = this;
        axios.post("/user/getUser",this.$route.params.id)
          .then(function (response) {
            console.log("看这里！！！！！")
            console.log(response.data)
            var content = response.data;
            _this.ruleForm.username = content.userName;
            _this.ruleForm.email = content.email;
            _this.ruleForm.gender = content.gender;
            var tmp1 = content.birthday.toString().substring(0,9);
            var tmp2 = parseInt(content.birthday.toString().substring(9,10))+1;
            _this.ruleForm.birthday = tmp1+tmp2;
            _this.profileUrl = "http://175.24.74.107:8080/file/head.jpg";
          })
          .catch(function (error) { // 请求失败处理
            console.log(error);
          });
      },
      toEdit() {
        this.$router.push('/homepageedit/'+this.$route.params.id);
      },
      // fetchUser(){
      //   this.userL=JSON.parse(sessionStorage.getItem("userL"))
      //   this.profileUrl="http://localhost:8081/"+this.userL.profileUrl;
      //   console.log("看这里！！！"+this.userL.birthday.toString().substring(0,10));
      // }
    },
  }
</script>

<style scoped>
  span{
    color: #66b1ff;
    font-size: 17px
  }

  p{
    margin-top:5px;
    margin-left: 66px;
    height: 14px;
    font-size: 29px;
    color: #333333;
  }

  .main{
    width: 100%;
    margin: 0 auto;
    background-color: #f1f8fa;
  }

  .info{
    margin-top: 3%;
    margin-left: 78px;
  }

  .demo-ruleForm {
    margin-left: 17%;
  }

  .clearfix:before,

  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    margin-top: 40px;
    margin-left: 1%;
    width: 800px;
    height: 600px;
  }

  .card-main{
    margin-left: 20%;
    margin-top: 5%
  }

  .btn {
    float: right;
    font-size: 17px;
    padding: 15px
  }

</style>
