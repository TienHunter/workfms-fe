<template lang="">
  <div class="flex flex-col items-start max-w-full">
    <h1
      :class="[isEditting ? 'absolute left-[1000rem]' : '']"
      ref="headingRef"
      class="hover:bg-white/20 whitespace-pre-wrap overflow-hidden text-ellipsis pointer border border-transparent px-3 py-1 m-0 text-2xl text-white font-bold"
      @click="edit()"
    >
      {{ inputValue }}
    </h1>
    <form
      v-show="isEditting"
      @submit.prevent="onSubmit"
      @focusout="onSubmit"
      class="w-full"
    >
      <input
        ref="inputRef"
        v-model="inputValue"
        placeholder="Board name"
        type="text"
        class="max-w-full text-2xl font-bold placehoder-gray-400 px-3 py-1 rounded focus:border-blue-200"
      />
    </form>
  </div>
</template>
<script setup>
  import {
    defineProps,
    nextTick,
    ref,
    watch,
    onMounted,
    watchEffect,
  } from "vue";
  const props = defineProps({
    valueBind: {
      type: String,
      default: "",
    },
  });
  const emit = defineEmits(["onChangeValue"]);
  // ========== start state ==========
  const inputValue = ref("");
  const headingRef = ref();
  const inputRef = ref();
  const isEditting = ref(false);
  // ========== end state ==========
  // Reactively update inputValue when valueBind changes
  watchEffect(() => {
    inputValue.value = props.valueBind;
  });
  const edit = () => {
    console.log(headingRef.value.offsetWidth);
    isEditting.value = true;
    nextTick(() => {
      // resize();
      inputRef.value.select();
    });
  };
  const resize = () => {
    inputRef.value.style.width = `${headingRef.value.offsetWidth + 2}px`;
    console.log(headingRef.value.offsetWidth);
  };
  const onSubmit = () => {
    isEditting.value = false;
    emit("onChangeValue", inputValue.value);
  };
</script>
<style lang=""></style>
