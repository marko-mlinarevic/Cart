<template>
  <div class="sales-footer" 
style="min-height: 55px;">
    <template v-if="getActiveStep.activeStep > 0">
      <el-button
        type="primary"
        size="mini"
        class="step-button"
        @click="setActiveStep('back')"
      >
        <template v-if="getActiveStep.activeStep === 1">
          <i class="el-icon-arrow-left" /> Choose products
        </template>
      </el-button>
    </template>

    <template v-if="getActiveStep.activeStep < 1">
      <el-button
        type="primary"
        size="mini"
        class="step-button"
        @click="setActiveStep('front')"
      >
        <template v-if="getActiveStep.activeStep === 0">
          Write note <i class="el-icon-arrow-right" />
        </template>
      </el-button>
    </template>

    <el-button
      :disabled="getActiveStep.activeStep !== 1 || getSale.total === 0"
      type="secondary"
      size="mini"
      @click="saveSale"
    ><i class="el-icon-check" /> Finish sale</el-button
    >
    <el-button
      :disabled="getActiveStep.activeStep === 0"
      type="text"
      size="mini"
      @click="resetSale"
    >Reset sale</el-button
    >
  </div>
</template>

<style lang="scss"></style>

<script>
export default {
  computed: {
    getSale() {
      return this.$store.getters['getSale']
    },
    getAssortments() {
      return this.$store.getters['getAssortments']
    },
    getActiveStep() {
      return this.$store.getters['getActiveStep']
    }
  },
  methods: {
      // Method that set active step
    setActiveStep(direction) {
      if (direction === 'back') {
        let activeStep
        let prevStep
        let step = {}
        activeStep = this.getActiveStep.activeStep
        if (activeStep > 0) {
          prevStep = activeStep
          activeStep--
          step = {
            activeStep,
            prevStep
          }
          this.$store.dispatch('setActiveStep', step)
        } else {
          return false
        }
      } else if (direction === 'front') {
        let activeStep
        let prevStep
        let step = {}

        activeStep = this.getActiveStep.activeStep
        if (activeStep < 2) {
          prevStep = activeStep
          activeStep++
          step = {
            activeStep,
            prevStep
          }
          this.$store.dispatch('setActiveStep', step)
        }
      }
    },
    // Method that finishes Sale
    saveSale() {
      this.$confirm(
        'Are you sure that you want to finish the sale?'
      ).then(_ => {
        if (this.getSale.date === null) {
          this.$alert(
            'Please enter the date before finishing the sale',
            'Warning',
            {
              confirmButtonText: 'OK'
            }
          )
        } else {
          let assortments = []

          this.getSale.assortments.forEach(item => {
            let newObject = {
              assortment_id: item.id,
              quantity: item.quantity,
              assortment_price: item.price
            }

            assortments.push(newObject)
          })

          let saleData = {
            total_price: this.getSale.total,
            assortments: assortments,
            note: this.getSale.note,
            quantity: this.getSale.quantity,
            created_at: this.getSale.date
          }

          this.$store.dispatch('completeSale', saleData)
        }
      })
    },
      // Method that resets sale
    resetSale() {
      this.$confirm('Are you sure that you want to reset the sale?').then(
        _ => {
          this.$store.dispatch('saleReset')
        }
      )
    }
  }
}
</script>
