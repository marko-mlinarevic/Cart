<template>
  <div>
    <el-search />
    <el-table />
  </div>
</template>

<style lang="scss"></style>

<script>
import Table from '~/components/Table.vue';
import Search from '~/components/Search.vue';

/**
 * @module Cart_First_Step
 * @param Table Table component with list of elements
 * @param Search Search component which search trough table
 * @description Parent component of elements for first step
 * */

export default {
  components: {
    elTable: Table,
    elSearch: Search
  }
};
</script>
