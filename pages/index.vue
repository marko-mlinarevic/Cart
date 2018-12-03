<template>
  <div>
    <el-sales-head />

    <el-row type="flex" 
class="view-container">
      <el-sales-cart-box />
      <el-sales-cart-basket />
    </el-row>

    <el-row type="flex">
      <el-col :span="24"> <el-sales-cart-footer /> </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.view-container {
  min-height: calc(100vh - 195px);
}
</style>

<script>
import SalesHead from '~/components/SalesHead.vue'
import SalesCartBox from '~/components/SalesCartBox.vue'
import SalesCartBasket from '~/components/SalesCartBasket.vue'
import SalesCartFooter from '~/components/SalesCartFooter.vue'

export default {
  components: {
    elSalesHead: SalesHead,
    elSalesCartBox: SalesCartBox,
    elSalesCartBasket: SalesCartBasket,
    elSalesCartFooter: SalesCartFooter
  }
}
</script>
