<template>
  <el-container>
    <el-header>
      <div>
        <NavBar :headSrc="headUrl"></NavBar>
      </div>
    </el-header>
    <el-container>
      <el-aside width="15%">
      <SideBar currentindex='2'></SideBar>
      </el-aside>
      <el-main style="width: 80%">

        <el-button class="switch"  type="text" @click="toMenu">
          <i class="el-icon-menu"></i>
        </el-button>
        <el-button class="switch" style="margin-right: -5px" type="text" @click="toList">
          <i class="el-icon-s-unfold"></i>
        </el-button>

        <h2 class="h2color">收藏的文档</h2>
        <!-- 此处传入的是收藏的文档数组 -->
        <doc-list v-show="showList"
        :docs="Docs"
        :currentview=2
        :userID="userID"
        ></doc-list>
         <doc-list2 v-show="showMenu"
        :tems="Docs"
        :currentview=2
        :userID="userID"
        ></doc-list2>
        <div v-show="this.isNULL">
          <h1>您还没有收藏的文档呢~~~</h1>
        </div>
      </el-main>
      <right-bar></right-bar>
    </el-container>
  </el-container>
</template>

<script>
import NavBar from "../components/NavBar";
import SideBar from "./SideBar";
import DocList from "./DocList";
import DocList2 from "./DocList2";
import RightBar from "./RightBar";
import axios from "axios";

export default {
  name: "Collect",
  components: { NavBar, SideBar, DocList,RightBar,DocList2 },
  data() {
    return {
      headUrl: require("../assets/head.jpg"),
      Docs: [],
      userID:1,
      showMenu:false,
      showList:true,
      isNULL:false
    };
  },
  computed: {
    // collectedDocs() {
    //   return 收藏的文档列表
    // }
  },
  methods:{
    toMenu:function () {
      this.showMenu = true;
      this.showList = false;
    },
    toList:function () {
      this.showList = true;
      this.showMenu = false;
    },
    fetchList() {
      this.userL = JSON.parse(sessionStorage.getItem("userL"));
      console.log(this.userL);
      // this.userID=this.userL.userID;
      axios
        // .post("http://127.0.0.1:8081/collect/getCollect", this.userID)
        .post("http://127.0.0.1:8081/collect/getCollect", 1)
        .then(res=>{
          console.log(res)
          if(res.data == ""){
            this.isNULL=true;
          }
          else{
            this.isNULL=false
            var docL = res.data;
            var _this = this;
            _this.Docs=docL;
            console.log(_this.Docs);
          }
        })
        .catch(err=> {
          console.log(err);
        });
    }
  },
   created() {
    this.fetchList();
  },
};
</script>

<style>
  .h2color {
    color: #7093FF;
  }
  .switch{
    width: 40px;
    float: right;
    margin-top:27px;
    margin-right: 30px;
  }
</style>
