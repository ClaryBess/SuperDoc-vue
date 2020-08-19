<template>
  <div class="mes">
    <div class="mes-item">
      <img class="mesimg" src="@/assets/mes.svg" @click="itemClick" />
      <div class="mes-info" @click="itemClick">
        <p>{{ mesItem.content }}</p>
      </div>
      <div class="mes-time" @click="itemClick">
        <p>{{mesItem.dateTime}}</p>
      </div>
      <img class="messmallimg" src="@/assets/删除.svg" @click="deleteMes" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MesListItem",
  data() {
    return {};
  },
  inject: ["reload"],
  props: {
    mesItem: {
      type: Object,
      default() {
        return {};
      },
    },
    //当前用户id
    userID: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    setRead() {
      let data = {
        NewsID: this.mesItem.newsID,
        UserID: this.userID,
      };
      console.log(data);
      axios
        .post("/news/readNews", data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    itemClick() {
      // 将是否已读设置为已读
      this.setRead();
      if (this.mesItem.type == 1) {
        const h = this.$createElement;
        this.$msgbox({
          title: "提示",
          message: h("p", null, [h("span", null, "是否要同意申请?")]),
          showCancelButton: true,
          confirmButtonText: "同意",
          cancelButtonText: "拒绝",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "执行中...";
              setTimeout(() => {
                // 同意申请后的将申请者加入团队的接口操作
                console.log(this.mesItem.content)
                axios
                  .post("/news/admitApply", this.mesItem.content)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                this.reload();
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                  this.reload();
                }, 300);
              }, 1000);
            } else {
              done();
            }
          },
        })
          .then((action) => {
            this.$message({
              type: "info",
              message: "已同意申请",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已拒绝申请",
            });
          });
      }
    },
    setRead() {
      let data = {
        NewsID: this.mesItem.newsID,
        UserID: this.userID,
      };
      console.log(data);
      axios
        .post("/news/readNews", data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteMes() {
      const h = this.$createElement;
      this.$msgbox({
        title: "提示",
        message: h("p", null, [
          h("span", null, "此操作将删除该消息, 是否继续?"),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              let data = {
                NewsID: this.mesItem.newsID,
                UserID: this.userID,
              };
              axios
                .post("/news/deleteNews", data)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
                this.reload();
              }, 300);
            }, 1000);
          } else {
            done();
          }
        },
      })
        .then((action) => {
          this.$message({
            type: "info",
            message: "已成功删除",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.mes {
  position: relative;
  padding: 10px;
}
.mes-item {
  display: flex;
  position: relative;
  border-radius: 20px;
  padding: 5px;
  background-color: #f4f7f8;
}

.mesimg {
  width: 50px;
  padding: 10px;
}

.messmallimg {
  position: absolute;
  right: 30px;
  width: 30px;
  padding-top: 20px;
  padding-right: 10px;
}

.mes-info {
  font-size: 16px;
  position: relative;
  padding-left: 0px;
  padding-top: 10px;
  padding-top: 10px;
  padding-right: 20px;
  overflow: hidden;
  text-align: left;
}

.mes-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.mes-time {
  font-size: 12px;
  position: absolute;
  right: 70px;
  padding-left: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 20px;
  overflow: hidden;
  text-align: left;
}
</style>
