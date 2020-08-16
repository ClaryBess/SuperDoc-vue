<template>
 <div class="goods-item"  >
   <el-card class="box-card" shadow="always">
     <div style="float: right">
       <el-dropdown >
        <span class="el-dropdown-link">
         <i class="el-icon-setting el-icon--right"></i>
        </span>
         <el-dropdown-menu slot="dropdown">
           <el-dropdown-item ><el-button type="text" @click="back">恢复</el-button></el-dropdown-item>
           <el-dropdown-item divided><el-button type="text" @click="dlt">删除</el-button></el-dropdown-item>
         </el-dropdown-menu>
       </el-dropdown>
     </div>
     <!-- <img :src="TemItem.img" alt=""> -->
     <img class="mainImg" src="../assets/文档.svg" />

     <div class="goods-info">
       <p>{{docsItem.title}}</p>
     </div>

   </el-card>
  </div>
</template>

<script>

export default {
  name: "MenuListItem",
  data() {
    return{
    }
  },
  props: {
    docsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
  methods: {
    itemClick() {
      this.$router.push('/detail/' + this.docsItem.id)
    },
    back() {
      this.$confirm('此操作将恢复该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '恢复成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消恢复'
        });
      });
    },
    dlt() {
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    }
};
</script>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #3778ff;
  }
  .el-icon-arrow-down {
    font-size: 8px;
  }
  .goods-item {
    margin-top: 20px;
    margin-right: 38px;
    position: relative;
    width:220px;
    height: 180px;
    margin-bottom: 10px;
  }

  .mainImg {
    width: 70px;
    border-radius: 20px;
    margin-left: 30%;
    margin-top: 8px;
  }

  .goods-info {
    font-size: 13px;
    position: relative;
    margin-top: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 2px;
    padding-bottom: -10px;
  }

</style>
