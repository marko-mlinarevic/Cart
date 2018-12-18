<template>
  <div>
    <el-head />

    <el-row type="flex" 
class="view-container">
      <el-cart-box />
      <el-cart-basket />
    </el-row>

    <el-row type="flex">
      <el-col :span="24"> <el-cart-footer /> </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.view-container {
  min-height: calc(100vh - 195px);
}
</style>

<script>
import Head from '~/components/Head.vue'
import CartBox from '~/components/CartBox.vue'
import CartBasket from '~/components/CartBasket.vue'
import CartFooter from '~/components/CartFooter.vue'

export default {
  components: {
    elHead: Head,
    elCartBox: CartBox,
    elCartBasket: CartBasket,
    elCartFooter: CartFooter
  }
}
</script>
