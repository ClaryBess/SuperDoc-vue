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
        <doc-list v-show="showList" :docs="Docs"></doc-list>
        <tem-list v-show="showMenu" :tems='Docs'></tem-list>
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

export default {
  name: "Collect",
  components: { NavBar, SideBar, DocList,RightBar,TemList },
  data() {
    return {
      headUrl: require("../assets/head.jpg"),
      Docs: [
        {
          id: '1',
          title: "第111",
          isCollected: true,
          date: "2020/8/14 21:00"
        },
        {
          id: '2',
          title: "第二个hhhhh文档",
          isCollected: true,
          date: "2020/8/14 11:00"
        },
        {
          id: '3',
          title: "第三个文dashdkjlashdjkl档",
          isCollected: true,
          date: "2020/8/14 12:22"
        },
        {
          id: '4',
          title: "四ssssswwwwwwwwwwwwwwwss",
          isCollected: true,
          date: "2020/8/14 12:22"
        },
        {
          id: '5',
          title: "第五wwuwuwuwuwuwwwwwwww个文档",
          isCollected: true,
          date: "2020/8/14 12:00"
        },
        {
          id: '6',
          title: "第六",
          isCollected: true,
          date: "2020/8/14 12:00"
        }
      ],
      showMenu:false,
      showList:true,
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
  }
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
