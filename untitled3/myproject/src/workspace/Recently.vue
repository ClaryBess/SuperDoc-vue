<template>
  <el-container>
    <el-header>
      <div>
        <NavBar :headSrc="headUrl"></NavBar>
      </div>
    </el-header>
    <el-container>
      <el-aside width="15%">
        <SideBar currentindex="1"></SideBar>
      </el-aside>
      <el-main style="width: 80%">
        <el-button class="switch" type="text" @click="toMenu">
          <i class="el-icon-menu"></i>
        </el-button>
        <el-button class="switch" style="margin-right: -5px" type="text" @click="toList">
          <i class="el-icon-s-unfold"></i>
        </el-button>

        <h2 class="h2color">最近浏览的文档</h2>
        <!-- <doc-list :docs="Docs"></doc-list> -->
        <doc-list v-show="showList" :docs="Docs" :currentview="1"></doc-list>
        <tem-list v-show="showMenu" :tems="Docs"></tem-list>
      </el-main>
      <right-bar></right-bar>
    </el-container>
  </el-container>
</template>

<script>
import NavBar from "../components/NavBar";
import SideBar from "./SideBar";
import DocList from "./DocList";
import RightBar from "./RightBar";
import TemList from "./TemList";
import axios from "axios";

export default {
  name: "Recently",
  components: {
    NavBar,
    SideBar,
    DocList,
    RightBar,
    TemList,
  },
  data() {
    return {
      headUrl: require("../assets/head.jpg"),
      Docs: [
        {
          id: "1",
          title: "第111",
          isCollected: true,
          date: "2020/8/14 12:00",
        },
      ],

      showMenu: false,
      showList: true,
    };
  },
  computed: {
    // showDocs() {
    //   return 浏览的文档列表
    // }
  },

  methods: {
    toMenu: function () {
      this.showMenu = true;
      this.showList = false;
    },
    toList: function () {
      this.showList = true;
      this.showMenu = false;
    },
    fetchList() {
      this.userL = JSON.parse(sessionStorage.getItem("userL"));
      console.log(this.userL);
      axios
        // .post("http://127.0.0.1:8081/browse/getBrowse", this.userL.userID)
        .post("http://127.0.0.1:8081/browse/getBrowse", 1)
        .then(function (response) {
          var docL = response.data.data;
          console.log(response.data);
          this.Docs = response.data;
          console.log(this.Docs);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.fetchList();
  },
};
</script>

<style>
.h2color {
  color: #7093ff;
}
.switch {
  width: 40px;
  float: right;
  margin-top: 27px;
  margin-right: 30px;
}
</style>
