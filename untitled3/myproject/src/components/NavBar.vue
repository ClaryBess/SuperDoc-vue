// 这是登录后导航栏组件，通过属性headSrc来更换头像
<template>
  <div id="root" class="tabBar">
    <router-link to="/">
      <img class="logo" src="../assets/nav-logo.png" alt />
    </router-link>

    <ul class="nav">
      <li>
        <router-link to="/recently">工作台</router-link>
      </li>
      <li>
        <router-link to="/unreadmessage">消息</router-link>
        <!-- <a href="#">消息</a> -->
      </li>
      <li>
        <router-link to="/team">团队</router-link>
      </li>
    </ul>

    <div :class="search">
      <a @click="getM">
        <i class="iconfont iconsearch"></i>
      </a>
      <input
        @keyup.enter="getM"
        type="text"
        class="searchInput"
        v-model="searchID"
        placeholder="搜索团队ID"
        @focus="inputFocus"
        @blur="inputBlur"
      />
    </div>
    <!--    <span>{{this.searchID}}</span>-->
    <div class="right">
      <ul class="rightNav">
        <li class="dropdown">
          <!--          <router-link :to="{name:'homepage',params:{id:'this.iduser'}}">-->
          <img :src="this.profileUrl" class="userhead" @click="clickimg" />
          <!--          </router-link>-->
        </li>
        <li>
          <div>
            <router-link to="/">
              <el-button round>退出</el-button>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NavBar",
  inject: ["reload"],
  data() {
    return {
      iduser:'',
      profileUrl:
        "http://175.24.74.107:8080/file/9ef7d8c0-6754-4222-bb27-8316eed5d8eb.png",
      itemList: [
        {
          title: "我的工作台",
          subItemList: [],
        },
        {
          title: "消息",
          subItemList: [],
        },
      ],
      userList: [],
      search: "search",
      searchID: "",
      isID: false,
    };
  },
  methods: {
    inputFocus: function () {
      this.search = "searchLong";
    },
    inputBlur: function () {
      this.search = "search";
    },
    getM: function () {
      if (this.searchID == "") {
        console.log("空");
        this.$message("请输入团队ID");
      } else {
        console.log("id为：" + this.searchID);
        const h = this.$createElement;
        this.$msgbox({
          title: "提示",
          message: h("p", null, [
            h("span", null, "确定加入团队 (id:" + this.searchID + ") 吗？"),
          ]),
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "执行中...";
              setTimeout(() => {
                var _this = this;

                console.log("搜索的团队:" + _this.searchID);
                console.log("当前用户:" + _this.userL.userID);
                axios
                  .post("/news/apply/" + _this.searchID, _this.userL.userID)
                  .then((res) => {
                    if (res.data.status === 200) {
                      _this.isID = true;
                      this.$message({
                        type: "success",
                        message: "已发送申请",
                      });
                      console.log(res);
                    }
                  })
                  .catch((err) => {
                    _this.isID = false;
                    console.log(err);
                    console.log("没有团队哇");
                    console.log("搜索的团队:" + _this.searchID);
                    console.log("当前用户:" + _this.userL.userID);
                    console.log(_this.isID);
                    this.$message({
                      type: "erro",
                      message: "团队ID不存在",
                    });
                  });
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                  // this.reload();
                }, 300);
              }, 1000);
            } else {
              done();
            }
          },
        })
          .then((action) => {
            if (this.isID == true) {
              this.$message({
                type: "info",
                message: "已发送申请",
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作",
            });
          });
      }
    },
    clickimg:function(){
      console.log(JSON.parse(sessionStorage.getItem("userL")).userID)
      this.$router.push('/homepage/'+JSON.parse(sessionStorage.getItem("userL")).userID);
      //window.location.reload();
    },
    fetchUser() {
      this.userL = JSON.parse(sessionStorage.getItem("userL"));
      this.profileUrl = "http://175.24.74.107:8080"+ this.userL.profileUrl;
      this.iduser = "http://175.24.74.107:8081/" + this.userL.userID;
    },
  },
  created() {
    this.fetchUser();
  },
};
</script>

<style scoped>
.LoginForm {
  margin: 0 auto;
  width: 80%;
}
.tabBar {
  height: 56px;
  width: 100%;
  border-bottom-color: #f2f2f2;
  background-color: #ffffff;
  border-bottom-width: 2px;
  border-bottom-style: inset;
  display: flex;
  z-index: 9999;
}

.logo {
  height: 56px;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  display: block;
}

.nav {
  width: 225px;
  margin-left: 100px;
}

.nav li {
  width: 65px;
  height: 56px;
  float: left;
}

.nav > li > a {
  width: 65px;
  line-height: 56px;
  color: #333;
  text-align: center;
  font-size: 17px;
}

.nav li:hover {
  background-color: #f5f5f5;
}

.subNav {
  height: 350px;
  width: 180px;
  visibility: hidden;
  border: #eeeeee solid 1px;
  background-color: #ffffff;
  box-shadow: 0 2px 2px #eeeeee;
}

.subNav li:first-child {
  margin-top: 7px;
}

.subNav li {
  height: 48px;
  width: 180px;
}

.nav > li:last-child:hover .subNav {
  visibility: visible;
}

.subNav li a {
  width: 180px;
  height: 48px;
  background-color: #ffffff;
  line-height: 48px;
  color: #333333;
}

.subNav li span,
.subNav li i {
  margin-left: 15px;
}

.subNav li a:hover {
  background-color: #f5f5f5;
}

.search,
.searchLong {
  height: 38px;
  background-color: #eee;
  margin: auto 0;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border-radius: 38px;
  transition: width 0.5s;
  transition-delay: 0.5s;
  -webkit-transition-delay: 0.5s;
  -webkit-transition: width 0.5s;
}

.search {
  width: 160px;
}

.searchLong {
  width: 220px;
}

.search i,
.searchLong i {
  display: block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  color: rgb(156, 149, 149);
}

.searchLong i {
  text-align: center;
  border-radius: 15px;
  color: #fff;
  margin-right: 5px;
  line-height: 30px;
  background-color: #969696;
}

.searchInput {
  width: 100%;
  height: 38px;
  padding-left: 15px;
  background: none;
  border: 0px;
  outline: none;
  font-size: 15px;
}

::-webkit-input-placeholder {
  color: #a1a1a1;
}

::-moz-placeholder {
  color: #a1a1a1;
}

/* firefox 19+ */
:-ms-input-placeholder {
  color: #a1a1a1;
}

/* ie */
input:-moz-placeholder {
  color: #a1a1a1;
}

.right {
  flex: 1;
  margin-right: 80px;
  display: flex;
  flex-direction: row-reverse;
}

.rightNav li {
  height: 56px;
  float: left;
  line-height: 56px;
}

.rightNav li:first-child a {
  width: 65px;
  color: #333;
}

.rightNav .login:hover {
  background-color: #f5f5f5;
}

.write {
  width: 100px;
  height: 40px;
  display: inline-block;
  background-color: #ffffff;
  color: #50bfff;
  font-size: 15px;
  line-height: 40px;
  text-align: center;
  border-radius: 20px;
  margin-left: 30px;
  border-color: #50bfff;
  border-style: solid;
  border-width: thin;
}

.write:hover {
  border-color: #409eff;
  color: #409eff;
  transition: color 0.7s;
}

.dropdown {
  width: 90px;
  margin: 0 20px;
}

.dropdown > a {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 56px;
  justify-content: center;
  color: #333;
}

.dropdown > a i {
  color: rgb(156, 149, 149);
}

.userhead {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 50%;
}

.dropdown:hover {
  background-color: #f5f5f5;
}

.dropdownNav {
  width: 180px;
  height: 420px;
  visibility: hidden;
  border: #eeeeee solid 1px;
  background-color: #ffffff;
  box-shadow: 0 2px 2px #eeeeee;
}

.dropdownNav li:first-child {
  margin-top: 10px;
}

.dropdown:hover .dropdownNav {
  visibility: visible;
}

.dropdownNav li {
  width: 180px;
  height: 50px;
  line-height: 50px;
  background-color: #ffffff;
}

.dropdownNav li:hover {
  background-color: #f5f5f5;
}

.dropdownNav li a span,
.dropdownNav li a i {
  color: #333;
  margin-left: 15px;
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
