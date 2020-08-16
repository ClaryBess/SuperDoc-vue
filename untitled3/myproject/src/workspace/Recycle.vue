<template>
  <el-container>
    <el-header>
      <div>
        <NavBar :headSrc="headUrl"></NavBar>
      </div>
    </el-header>
    <el-container>
      <el-aside width="15%">
        <SideBar currentindex="5"></SideBar>
      </el-aside>
      <el-main style="width: 80%">

        <el-button class="switch"  type="text" @click="toMenu">
          <i class="el-icon-menu"></i>
        </el-button>
        <el-button class="switch" style="margin-right: -5px" type="text" @click="toList">
          <i class="el-icon-s-unfold"></i>
        </el-button>
        <delete-all class="switch"></delete-all>

        <h2 class="h2color">回收站</h2>
        <!-- <doc-list :docs="recycleDocs"></doc-list> -->
        <delete-list  v-show="showList" :docs="Docs"></delete-list>
        <menu-list v-show="showMenu" :menus='Docs' style="width: 100%"></menu-list>
      </el-main>
      <right-bar></right-bar>
    </el-container>
  </el-container>
</template>

<script>
import NavBar from "../components/NavBar";
import SideBar from "./SideBar";
import DeleteList from "./DeleteList";
import RightBar from "./RightBar";
import DeleteAll from "./DeleteAll";
import MenuList from "./MenuList";

export default {
  name: "Recycle",
  components: {
    NavBar,
    SideBar,
    DeleteList,
    RightBar,
    DeleteAll,
    MenuList
  },
  data() {
    return {
      headUrl: require("../assets/head.jpg"),
      Docs: [
        {
          id: "1",
          title: "第111",
        },
        {
          id: "2",
          title: "第二个hhhhh文档",
        },
        {
          id: "3",
          title: "第三个文dashdkjlashdjkl档",
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
<style scoped>
.h2color {
  color: #7093ff;
}
.switch{
  width: 40px;
  float: right;
  margin-top:35px;
  margin-right: 40px;
}
</style>
