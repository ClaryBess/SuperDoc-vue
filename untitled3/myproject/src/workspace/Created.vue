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
        <h2 class="h2color">自己创建的文件</h2>
        <!-- <doc-list :docs="createdDocs"></doc-list> -->
        <doc-list :docs="Docs"></doc-list>
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

export default {
  name: "Created",
  components: { NavBar, SideBar,DocList,RightBar },
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
        }
      ]
    };
  },
};
</script>

<style>
  .h2color {
    color: #7093FF;
  }
</style>
