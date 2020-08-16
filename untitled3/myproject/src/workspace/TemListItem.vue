<template>
  <div class="goods-item" @click="itemClick">
    <el-card class="box-card" shadow="always">
      <div style="float: right">
      <el-dropdown >
        <span class="el-dropdown-link">
         <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu style="" slot="dropdown">
          <el-dropdown-item>收藏</el-dropdown-item>
          <el-dropdown-item divided>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </div>
      <!-- <img :src="TemItem.img" alt=""> -->
      <img class="mainImg" src="../assets/文档.svg" />

      <div class="goods-info">
        <p>{{TemItem.title}}</p>
      </div>
      <div class="goods-info">
        {{TemItem.date}}
      </div>

    </el-card>
  </div>
</template>

<script>
  export default {
    name: "TemListItem",
    data() {
      return {
      };
    },
    props: {
      TemItem: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    methods: {
      //点击进入模板预览界面
      itemClick() {
        this.$router.push("/detail/" + this.TemItem.id);
      },
    },
  };
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 8px;
  }
  .goods-item {
    margin-top: 40px;
    margin-right: 20px;
    position: relative;
    width: 200px;
    height: 200px;
  }

  .mainImg {
    width: 70px;
    border-radius: 20px;
    margin-left: 26%;
    margin-top: 8px;
  }

  .goods-info {
    font-size: 14px;
    position: relative;
    margin-top: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    font-size: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 2px;
  }
</style>
