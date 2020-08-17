<template>
  <div class="docs">
    <doc-list-item2 v-for="item in tems" :tem-item="item" :key="item.id">
    </doc-list-item2>
  </div>
</template>

<script>
  import DocListItem2 from "./DocListItem2";

  export default {
    name: "DocList2",
    components: {
      DocListItem2
    },
    props: {
      //从外部获取的模板数组
      tems: {
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
