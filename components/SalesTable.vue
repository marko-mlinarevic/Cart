<template>
  <div>
    <el-table-wrapper
            v-loading="loader"
            ref="assortmentsTable"
            :data="assortmentsClone"
            :columns="[
      {
        label: 'PRODUCT TYPE',
        prop: 'assortment_type.name',
        sortable: true,
        minWidth: 100
      },
      {
        label: 'PRODUCT CODE',
        prop: 'assortment[0].code',
        sortable: true,
        sortMethod: productCode,
        minWidth: 110
      },
      {
        label: 'QUANTITY',
        prop: 'assortment[0].quantity',
        scopedSlot: 'quantity-slot',
        minWidth: 100
      },
      {
        label: 'PRICE FOR ONE PRODUCT',
        prop: 'assortment[0].price',
        scopedSlot: 'price-slot',
        minWidth: 120
      },
      {
        label: 'TOTAL PRICE',
        prop: 'assortment[0].quantity',
        scopedSlot: 'full-price-slot',
        minWidth: 100
      }
    ]"
            :pagination="pagination"
            size="mini"
            stripe=""
            class="table small-input"
            highlight-current-row
    >
      <template slot-scope="scope"
                slot="price-slot">
        {{ parseFloat(scope.row.assortment[0].price).toFixed(2)  }}€
      </template>
      <template slot-scope="scope"
                slot="quantity-slot">
        <el-input-number v-model="scope.row.assortment[0].quantity" size="mini" @change="updateValue" mini :min="0" :max="100"></el-input-number>
      </template>
      <template slot-scope="scope"
                slot="full-price-slot">
        {{ parseFloat(scope.row.assortment[0].full_price).toFixed(2) }}€
      </template>
    </el-table-wrapper>
  </div>
</template>

<style lang="scss"></style>

<script>
export default {
  data() {
    return {
      pagination: {
        pageSize: 10,
        layout: 'total, sizes, prev, pager, next',
        pageSizes: [10, 20, 50, 100],
        background: true
      },
      loader: false,
    }
  },
  computed: {
    assortmentsClone() {
      return this.$store.getters['assortmentsClone']
    },
    getActiveStep() {
      return this.$store.getters['getActiveStep']
    }
  },
  watch: {
    assortmentsClone: function() {
      return (this.loader = false)
    }
  },
  mounted() {
    if (this.getActiveStep.activeStep === 0) {
      this.loadAssortments()
    }
  },
  methods: {
    // Method that loads assortments to table
    loadAssortments() {
      this.$store.dispatch('loadAssortments')
    },
    // Method that updates values in basket
    updateValue() {
      if(this.assortmentsClone)
      this.$store.dispatch('updateValue', {
        assortments: this.assortmentsClone
      })
    },
    // Method for sorting product code ( custom because default doesn't work with nested objects in array )
    productCode(a, b) {
        return a.assortment[0].code.localeCompare(b.assortment[0].code)
    }
  }
}
</script>
