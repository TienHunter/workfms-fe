<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const layout = computed(() => (route.meta?.layout || "default") + "-layout");
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<style scoped></style>
