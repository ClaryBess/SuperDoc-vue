<template>
  <div class="docs">
    <div class="docs-item" @click="itemClick" >
      <!-- 展示图片为成员头像 -->
      <!-- <img class="docimg" :src="memberItem.url" @click="itemClick"> -->
      <img class="docimg" :src="'http://175.24.74.107:8080'+memberItem.profileUrl"  @click="itemClick" />
      <div class="docs-info">
        <p>{{memberItem.userName}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MemberListItem2",
  inject:['reload'],
  data() {
    return {};
  },
  props: {
    memberItem: {
      type: Object,
      default() {
        return {
          profileUrl: require("@/assets/head.jpg"),
        };
      },
    },
  },
  methods: {
    itemClick() {
      var _this=this;
      axios.post("/user/getUserByName", this.memberItem.userName)
        .then(function (response) {
          console.log("对了");
          console.log(response.data.userID);
          _this.$router.push("/homepage/"+response.data.userID);
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });

    },
    deleteMem() {
      var _this=this;
      axios.post("/team/quit/" + this.$route.params.id, this.memberItem.id)
        .then(function (response) {
          _this.$message({
            message: '已删除成员',
            type: 'success'
          });
          _this.reload();
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
    },
    manageAuth() {
      alert("管理成员权限");
    },
  },
};
</script>

<style scoped>
.docs {
  position: relative;
  padding: 5px;
}
.docs-item {
  width: 320px;
  display: flex;
  position: relative;
  border-radius: 20px;
  margin-right: 60px;
  margin-bottom: 22px;
  padding: 1px;
  background-color: #f4f7f8;
}

.docimg {
  width: 50px;
  padding: 10px;
  border-radius: 25px;
}

.docs-info {
  font-size: 16px;
  position: relative;
  padding-left: 8px;
  padding-top: 10px;
  padding-bottom: 12px;
  padding-right: 11px;
  overflow: hidden;
  text-align: center;
}

.docs-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
</style>
