<template>
  <div class="docs">
    <recently-list-item v-for="item in docs" :docs-item="item" :key="item.id">
    </recently-list-item>
  </div>
</template>

<script>
  import RecentlyListItem from "./RecentlyListItem";

  export default {
    name: "RecentlyList",
    components: {
      RecentlyListItem
    },
    props: {
      //文档数组
      docs: {
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
    /* display: flex; 
    flex-wrap: wrap; */
    padding: 5px;
  }
</style>
