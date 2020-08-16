<template>
  <div class="docs">
    <menu-list-item v-for="item in menus" :menu-item="item" :key="item.id">
    </menu-list-item>
  </div>
</template>

<script>
  import MenuListItem from "./MenuListItem";

  export default {
    name: "MenuList",
    components: {
      MenuListItem
    },
    props: {
      //文档数组
      menus: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .docs {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
  }
</style>
