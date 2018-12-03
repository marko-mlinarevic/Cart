<template>
  <div class="aside-big" 
style="min-height: 80px;">
    <div class="cart-sale-box"
style="min-height: 80px;">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="Basket"
name="basket">
          <template v-for="assortment in getSale.assortments">
            <div :key="assortment.id" 
@click="update(assortment.id)">
              <div class="cart-box-item__row1">
                <span>{{ assortment.code }}</span>
                <span>{{ parseFloat(assortment.full_price).toFixed(2) }}€</span>
              </div>

              <div>
                {{ assortment.quantity }} ×
                {{ parseFloat(assortment.price).toFixed(2) }}€<br >
              </div>
            </div>
          </template>
        </el-collapse-item>
      </el-collapse>

      <div class="cart-box__footer">
        <strong
        >Total price: <span>{{ parseFloat(getSale.total).toFixed(2) }}€</span></strong
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>

<script>
export default {
  data() {
    return {
      activeNames: ['basket']
    }
  },
  computed: {
    getSale() {
      return this.$store.getters['getSale']
    },
    getAssortments() {
      return this.$store.getters['getAssortments']
    }
  },
  methods: {
    // Method that updates state of assortments
    update(id) {
      this.$store.dispatch('updateValue', {
        assortments: this.getAssortments,
        id: id
      })
    }
  }
}
</script>
