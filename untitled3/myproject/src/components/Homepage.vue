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
          <el-form :model="ruleForm"label-width="100px" class="demo-ruleForm">

            <el-card class="box-card" >
              <!-- 卡片头部 -->
              <div slot="header" class="clearfix">
                <p>
                  <strong>个人空间</strong>
                  <el-button class="btn" type="text" @click="submitForm('ruleForm')">
                    <i class="el-icon-edit-outline"></i>
                    修改信息
                  </el-button>
                </p>
              </div>
              <!-- 卡片内容 -->
              <div class="card-main">

                <el-form-item label="头像" prop="profile">
                  <el-avatar style="margin-left: 5px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </el-form-item>

                <el-form-item  label="用户名" prop="username">
                  <span>酒醉的蝴蝶</span>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                  <span>12345678@qq.com</span>
                </el-form-item>

                <el-form-item label="性别" prop="sex">
                  <span>男</span>
                </el-form-item>

                <el-form-item label="生日" prop="birth">
                  <span>1999-09-09</span>
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
  export default {
    name: "Homepage",
    components: {NavBar},
    methods: {
      submitForm(formName) {
            this.$router.push('HomepageEdit')
      },
    }
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
