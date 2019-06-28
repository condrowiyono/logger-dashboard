<template>
  <v-layout row class="align-center layout px-4 pt-4 app--page-header">
    <div class="page-header-left">
      <h2>
        <v-btn 
          icon
          :active-class="''"
          :to="(to) ? to : '/'" >
          <v-icon>{{(to) ? 'arrow_back'  : 'home'}}</v-icon>
        </v-btn>
        {{ title }}
      </h2>
    </div>
    <v-spacer></v-spacer>
    <div class="page-header-right">
      <v-btn icon>
        <v-icon @click="print" class="text--secondary">print</v-icon>
      </v-btn>
    </div>
  </v-layout>
</template>

<script>
export default {
  props: ['title','to'],
  methods: {
    print() {
      this.$emit('on-print')
    }
  }
}
</script>
<style lang="stylus" scoped>
.disabled {
  color: grey;
  pointer-events: none;
  text-decoration: blink;
}
</style>