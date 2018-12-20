<template>
  <el-row type="flex" style="height: 80px;">
    <el-col class="search-input-wrapper">
      <div class="search-group">
        <el-input v-model="getSearchInput" placeholder="Search" suffix-icon="el-icon-search" />
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.search-input-wrapper {
  .search-group {
    width: 200px;
    height: 40px;
  }
}
</style>

<script>

/**
 * @module Search
 * @vue-computed {String} getSearchInput Get: Receives input value Set: Run Search filter
 * */

export default {
  computed: {
    getSearchInput: {
      get: function() {
        return this.$store.getters['getSearchInput'];
      },
      set: function(value) {
        this.$store.dispatch('search', value);
      }
    }
  },
  beforeDestroy() {
   /**
     * @description Reset Search filter
     * */
    this.$store.dispatch('search', '');
  },
};
</script>
