<template>
  <div class="sales-step-4">
    <el-row :gutter="10" class="sales-content-row-detached">
      <el-col :span="16">
        <div :span="16" class="sales-content-col with-margin-right">
          <h5>Sale note</h5>
          <el-input
            :rows="7"
            v-model="getSale.note"
            type="textarea"
            placeholder="Please enter note if necessary"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.sales-content-row {
  margin-top: 20px;
}
</style>

<script>
export default {
  computed: {
    // Method for getting note
    getSale() {
      return this.$store.getters['getSale']
    }
  }
}
</script>
