<template>
  <div>
    <el-search />
    <el-sales-table />
  </div>
</template>

<style lang="scss"></style>

<script>
import SalesTable from '~/components/SalesTable.vue'
import Search from '~/components/SearchAssortments.vue'

export default {
  components: {
    elSalesTable: SalesTable,
    elSearch: Search
  }
}
</script>
