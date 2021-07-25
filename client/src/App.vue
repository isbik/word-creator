<template>
  <the-header></the-header>
  <router-view />
</template>

<script lang="ts">
import TheHeader from './components/TheHeader.vue';
export default {
  components: {
    TheHeader,
  },
};
</script>

<style>
@import './assets/index.scss';
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background: radial-gradient(#f588d8, #c0a3e5);
}
</style>
