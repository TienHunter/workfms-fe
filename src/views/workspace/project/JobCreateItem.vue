<template lang="">
  <form
    v-if="isShowForm"
    ref="formCreateJob"
    action=""
    class="flex flex-col gap-2"
    @submit.prevent="onSubmitForm"
  >
    <a-textarea
      ref="inputRef"
      v-model:value="jobInfo.JobName"
      placeholder="Nhập tên công việc"
    />
    <div class="flex items-cneter justify-between">
      <div class="flex gap-2">
        <a-button
          type="primary"
          :loading="isLoadingSubmit"
          :disabled="!jobInfo?.JobName"
          @click.prevent="onSubmitForm"
          >Thêm</a-button
        >
        <a-button>Hủy</a-button>
      </div>
      <div class="flex gap-2">
        <a-button>
          <template #icon>
            <UserAddOutlined />
          </template>
          Chỉ định</a-button
        >
        <a-button>
          <template #icon> <ClockCircleOutlined /> </template>Ngày hết
          hạn</a-button
        >
        <a-button>@</a-button>
        <a-button
          ><template #icon><SmileOutlined /></template
        ></a-button>
      </div>
    </div>
  </form>
  <a-button v-else size="medium" @click.prevent.stop="showForm"
    >Thêm một mục</a-button
  >
</template>
<script setup>
  import { ref, nextTick, watchEffect } from "vue";
  import useClickOutside from "../../../hooks/useClickOutSide";
  import { POSITION_GAP } from "../../../utils/constants";
  const props = defineProps({
    checklist: {
      type: Object,
      default: {},
    },
    onSubmit: {
      type: Function,
      default: () => {},
    },
  });

  const isShowForm = ref(false);
  const formCreateJob = ref();
  const inputRef = ref();
  const isClickoutSide = useClickOutside(formCreateJob);
  const isLoadingSubmit = ref(false);
  const jobInfo = ref({});
  // ========== start lifecycle ==========
  // Your code here
  // ========== end lifecycle ==========
  // ========== start methods ==========
  watchEffect(() => {
    if (isClickoutSide.value) {
      isShowForm.value = false;
    }
  });
  const showForm = () => {
    isShowForm.value = true;
    nextTick(() => {
      inputRef.value.focus();
      isClickoutSide.value = false;
    });
  };

  const onSubmitForm = async () => {
    isLoadingSubmit.value = true;
    jobInfo.value.ChecklistId = props.checklist.Id;
    jobInfo.value.CardId = props.checklist.CardId;
    let lastJob = props.checklist?.Jobs?.[props.checklist?.Jobs?.length - 1];
    jobInfo.value.SortOrder = (lastJob?.SortOrder ?? 0) + POSITION_GAP;
    let isSuccess = await props.onSubmit(jobInfo.value);
    isLoadingSubmit.value = false;
    if (isSuccess) {
      jobInfo.value = {};
      isShowForm.value = false;
    }
  };
  // ========== end methods ==========
</script>
<style lang=""></style>
