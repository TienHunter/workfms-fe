<template lang="">
  <a-layout class="app">
    <TheHeader />
    <slot></slot>
  </a-layout>
</template>
<script setup>
import TheHeader from "./TheHeader.vue";
</script>
<style scoped>
.app {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
</style>
