<template>
  <div>
    <el-search />
    <el-table />
  </div>
</template>

<style lang="scss"></style>

<script>
import Table from '~/components/Table.vue'
import Search from '~/components/Search.vue'

export default {
  components: {
    elTable: Table,
    elSearch: Search
  }
}
</script>
