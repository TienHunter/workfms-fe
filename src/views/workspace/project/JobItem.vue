<template lang="">
  <div>
    <a-button size="medium">Thêm một mục</a-button>
  </div>
</template>
<script setup>
  const props = defineProps({
    jpb: {
      type: Object,
      default: null,
    },
  });
  const emit = defineEmits();
</script>
<style lang=""></style>
