<template>
  <div class="container-medium">
    <el-row style="width: 100%" type="flex">
      <el-steps :active="getActiveStep.activeStep" class="stepper">
        <el-step title="Choice of products" icon="el-icon-goods" />
        <el-step title="Note" icon="el-icon-edit" />
      </el-steps>
    </el-row>
    <el-row>
      <el-cart-first-step v-if="getActiveStep.activeStep === 0" />
      <el-cart-second-step v-else-if="getActiveStep.activeStep === 1" />
    </el-row>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import CartFirstStep from '~/components/CartFirstStep.vue';
import CartSecondStep from '~/components/CartSecondStep.vue';

/**
 * @module Cart_Box
 * @vue-data {String} [activeNames='basket'] Collapse element trigger
 * @vue-computed {Array} getSale Sale object
 * @vue-computed {Object} getActiveStep Steps of sale process
 * */

export default {
  components: {
    elCartFirstStep: CartFirstStep,
    elCartSecondStep: CartSecondStep
  },
  computed: {
    getActiveStep() {
      return this.$store.getters['getActiveStep'];
    },
    getSale() {
      return this.$store.getters['getSale'];
    }
  },
  mounted() {
    this.listenersForArrows();
  },
  methods: {
    /**
     * @param {event} event Date value
     * @description Method for setting date in sale object
     * */

    setSaleDate(event) {
      let payload;
      payload = event.target.value;
      this.$store.dispatch('setSaleDate', payload);
    },
    /**
     * @description Method for increasing active step
     * */

    increaseActiveStep() {
      let activeStep;
      let prevStep;
      let step = {};

      activeStep = this.getActiveStep.activeStep;
      if (activeStep < 2) {
        prevStep = activeStep;
        activeStep++;
        step = {
          activeStep,
          prevStep
        };
        this.$store.dispatch('setActiveStep', step);
      }
    },
    /**
     * @description Method for decreasing active step
     * */

    decreaseActiveStep() {
      let activeStep;
      let prevStep;
      let step = {};
      activeStep = this.getActiveStep.activeStep;
      if (activeStep > 0) {
        prevStep = activeStep;
        activeStep--;
        step = {
          activeStep,
          prevStep
        };

        if (activeStep === 0) {
          this.$confirm(
            'Are you sure that you want to start sale from beginning?'
          ).then(_ => {
            this.$store.dispatch('saleReset');
            let pad = s => {
              return s < 10 ? '0' + s : s;
            };
            let d = new Date();
            this.getSale.date = [
              pad(d.getDate()),
              pad(d.getMonth() + 1),
              d.getFullYear()
            ].join('.');
          });
        } else {
          this.$store.dispatch('setActiveStep', step);
        }
      } else {
        return false;
      }
    },
    /**
     * @description Methods for arrow navigation
     * */

    listenersForArrows() {
      window.addEventListener('keyup', event => {
        const activeElement = document.activeElement;
        const inputs = ['input', 'select', 'button', 'textarea'];

        // If down arrow was pressed...
        if (
          event.keyCode === 39 &&
          inputs.indexOf(activeElement.tagName.toLowerCase()) === -1
        ) {
          this.increaseActiveStep();
        }

        if (
          event.keyCode === 37 &&
          inputs.indexOf(activeElement.tagName.toLowerCase()) === -1
        ) {
          this.decreaseActiveStep();
        }
      });
    }
  }
};
</script>
