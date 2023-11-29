<template lang="">
  <form
    v-if="isShowingForm"
    ref="formRef"
    action=""
    class="p-3 bg-gray-200 rounded flex flex-col gap-2"
    @submit.prevent="onSubmitForm"
  >
    <a-input
      v-if="tag === 'input'"
      ref="inputRef"
      v-model:value="valueInput"
      class="max-w-full text-sm font-bold placehoder-gray-400"
      type="text"
      size="large"
      :placeholder="placeholder"
    />
    <a-textarea
      v-else-if="tag === 'textarea'"
      ref="inputRef"
      v-model:value="valueInput"
      class="max-w-full text-sm font-bold placehoder-gray-400"
      size="large"
      :placeholder="placeholder"
    />
    <div class="flex items-center gap-2">
      <a-button
        htmlType="submit"
        type="primary"
        :loading="loading"
        :disabled="!valueInput"
        >{{ textSubmit }}</a-button
      >
      <a-button htmlType="button" @click="isShowingForm = false">{{
        textCancel
      }}</a-button>
    </div>
  </form>
  <a-button v-else block size="large" @click.stop.prevent="showForm">
    <template #icon>
      <PlusOutlined />
    </template>
    {{ textButton }}
  </a-button>
</template>
<script setup>
  import {
    defineProps,
    defineEmits,
    ref,
    nextTick,
    watch,
    watchEffect,
  } from "vue";
  import useClickOutside from "../../../hooks/useClickOutSide";
  // ========== start state ==========
  const props = defineProps({
    initValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    textSubmit: {
      type: String,
      default: "Submit",
    },
    textCancel: {
      type: String,
      default: "Cancel",
    },
    onSubmit: {
      type: Function,
      default: () => {},
    },
    textButton: {
      type: String,
      default: "Add",
    },
    tag: {
      type: String,
      default: "input",
      validator: function (value) {
        return ["input", "textarea"].includes(value);
      },
    },
    rows: {
      type: Number,
      default: 3,
    },
  });
  const valueInput = ref(props.initValueInput);
  const isShowingForm = ref(false);
  const inputRef = ref();
  const loading = ref(false);
  const formRef = ref();
  const isClickoutSide = useClickOutside(formRef);
  // ========== end state ==========

  // ========== start lifecycle ==========
  // Your code here
  // ========== end lifecycle ==========

  // ========== start methods ==========
  watchEffect(() => {
    if (isClickoutSide.value && !valueInput.value) {
      isShowingForm.value = false;
    }
  });

  const showForm = () => {
    isShowingForm.value = true;
    nextTick(() => {
      inputRef.value.focus();
      isClickoutSide.value = false;
    });
  };

  const onSubmitForm = async () => {
    if (valueInput.value) {
      loading.value = true;
      await props.onSubmit(valueInput.value);
      valueInput.value = "";
      loading.value = false;
      inputRef.value.focus();
      // formRef.value.scrollIntoView();
    }
  };
  // ========== end methods ==========
</script>
<style lang=""></style>
