<template>
  <el-container>
    <el-header>
      <div>
        <NavBar :headSrc="headUrl"></NavBar>
      </div>
    </el-header>
    <el-container>
      <el-aside width="15%">
      <SideBar  currentindex='3'></SideBar>
      </el-aside>
      <el-main style="width: 80%">

        <el-button class="switch"  type="text" @click="toMenu">
          <i class="el-icon-menu"></i>
        </el-button>
        <el-button class="switch" style="margin-right: -5px" type="text" @click="toList">
          <i class="el-icon-s-unfold"></i>
        </el-button>

        <h2 class="h2color">自己创建的文件</h2>
        <!-- <doc-list :docs="createdDocs"></doc-list> -->
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
import TemList from "./TemList";
import RightBar from "./RightBar";

export default {
  name: "Created",
  components: { NavBar, SideBar,DocList,RightBar,TemList  },
  data() {
    return {
      headUrl: require("../assets/head.jpg"),
      Docs: [
        {
          id: '1',
          title: "第111",
          isCollected: false,
          date: "2020/8/14 12:00"
        },
        {
          id: '2',
          title: "第二个hhhhh文档",
          isCollected: true,
          date: "2020/8/14 12:00"
        },
        {
          id: '3',
          title: "第三个文dashdkjlashdjkl档",
          isCollected: false,
          date: "2020/8/14 12:00"
        },
        {
          id: '2',
          title: "第二个hhhhh文档",
          isCollected: true,
          date: "2020/8/14 12:00"
        },
        {
          id: '3',
          title: "第三个文dashdkjlashdjkl档",
          isCollected: false,
          date: "2020/8/14 12:00"
        },
        {
          id: '2',
          title: "第二个hhhhh文档",
          isCollected: true,
          date: "2020/8/14 12:00"
        },
        {
          id: '3',
          title: "第三个文dashdkjlashdjkl档",
          isCollected: false,
          date: "2020/8/14 12:00"
        }
      ],
      showMenu:false,
      showList:true,
    };
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
