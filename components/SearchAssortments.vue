<template>
  <el-row type="flex" style="height: 80px;">
    <el-col class="search-input-wrapper">
      <div class="search-group">
        <el-input
          v-model="getSearchInput"
          placeholder="Search"
          suffix-icon="el-icon-search"
        />
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.search-input-wrapper {
  .search-group {
    width: 410px;
    height: 40px;
  }
}
</style>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    getSearchInput: {
      get: function() {
        // Get search input value
        return this.$store.getters['getSearchInput']
      },
      set: function(value) {
        // Run Search filter
        this.$store.dispatch('search', value)
      }
    }
  },
  beforeDestroy() {
    // Reset Search filter
    this.$store.dispatch('search', '')
  },
  methods: {}
}
</script>
