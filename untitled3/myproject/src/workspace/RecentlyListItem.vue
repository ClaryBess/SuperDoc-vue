<template>
  <div class="docs">
    <div class="docs-item">
      <img class="docimg" src="../assets/文档.svg" @click="itemClick" />
      <div class="docs-info" @click="itemClick">
        <p>{{docsItem.title}}</p>
      </div>
      <div class="docs-time" @click="itemClick">
        <p>{{docsItem.date}}</p>
      </div>
      <slot name="deleteIcon">
        <img class="smallimg" src="../assets/删除.svg" @click="deleteDoc" />
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecentlyListItem",
  data() {
    return {};
  },
  props: {
    docsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    itemClick() {
      this.$router.push("/detail/" + this.docsItem.id);
    },
    deleteDoc() {
      alert("删除文件");
    },
  },
};
</script>

<style scoped>
.docs {
  position: relative;
  padding: 10px;
}
.docs-item {
  display: flex;
  position: relative;
  border-radius: 20px;
  padding: 5px;
  background-color: #f4f7f8;
}

.docimg {
  width: 50px;
  padding: 10px;
}

.smallimg {
  position: absolute;
  right: 30px;
  width: 30px;
  padding-top: 20px;
  padding-right: 10px;
}

.docs-info {
  font-size: 16px;
  position: relative;
  padding-left: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 20px;
  overflow: hidden;
  text-align: left;
}

.docs-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.docs-time {
  font-size: 12px;
  position: absolute;
  right: 120px;
  padding-left: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 20px;
  overflow: hidden;
  text-align: left;
}
</style>
