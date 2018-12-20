<template>
  <el-row style="height: 80px" type="flex" class="view-header sales">
    <div class="main-title-left flex-el-left-center"><h1>Cart title</h1></div>
    <div class="flex-el-left-center flex-el-margin-right">
      <div><span>Date of buying: </span></div>
    </div>
    <div class="flex-el-left-center">
      <el-date-picker
        v-model="getSale.date"
        class="date-input-small"
        type="date"
        format="dd.MM.yyyy"
        value-format="dd.MM.yyyy"
        size="mini"
        @onPick="setSaleDate($event.target.value);"
      />
    </div>
  </el-row>
</template>

<style lang="scss" scoped></style>

<script>

/**
 * @module Head
 * @vue-computed {Object} getSale Sale object
 * */

export default {
  computed: {
    getSale() {
      return this.$store.getters['getSale'];
    }
  },
  mounted() {
    this.todayDate();
  },
  methods: {
   /**
    * @param {String} event Event that contains date value
    * @description Method for setting date in sale object
    * */

    setSaleDate(event) {
      let payload;
      payload = event.target.value;
      this.$store.dispatch('setSaleDate', payload);
    },

    /**
     * @description Method that generates current date
     * */

    todayDate() {
      let pad = s => {
        return s < 10 ? '0' + s : s;
      };
      let d = new Date();
      this.getSale.date = [
        pad(d.getDate()),
        pad(d.getMonth() + 1),
        d.getFullYear()
      ].join('.');
    }
  }
};
</script>
