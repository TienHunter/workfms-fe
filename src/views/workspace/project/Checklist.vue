<template lang="">
  <div class="check-list">
    <div class="flex items-center gap-3 mt-2 text-xl handle pointer">
      <CheckSquareOutlined />
      {{ checklist.ChecklistName }}
      <a-button class="ml-auto bg-transparent">Xóa</a-button>
    </div>
    <div>
      <a-progress
        v-if="checklist.Jobs.length > 0"
        :stroke-color="{
          from: '#108ee9',
          to: '#87d068',
        }"
        :percent="percentFinsihed"
        status="active"
      />
      <draggable
        :list="checklist.Jobs"
        class=""
        tag="ul"
        group="jobs"
        item-key="job"
        drag-class="drag-card"
        ghost-class="sortable-ghost"
        animation="150"
        @start="drag = true"
        @end="drag = false"
        @change="onchangeJob"
      >
        <template #item="{ element, index }">
          <JobItem :job="element" />
        </template>
      </draggable>
      <div>
        <job-create-item :checklist="checklist" :onSubmit="createJob" />
      </div>
      <!-- <ul class="list-none flex flex-col gap-2">
        <li
          v-for="j in checklist.Jobs"
          :key="j.Id"
          class="flex items-center gap-2"
        >
          <a-checkbox v-model:checked="j.IsFinished" />
          <div class="hover:bg-gray-300 flex-1 p-2 rounded pointer">
            <span :class="{ 'line-through': j.IsFinished }">{{
              j.JobName
            }}</span>
          </div>
        </li>
        <li>
          <job-create-item :checklist="checklist" :onSubmit="createJob" />
        </li>
      </ul> -->
    </div>
  </div>
</template>
<script setup>
  import { ref, computed, watchEffect } from "vue";
  import draggable from "vuedraggable";
  import JobCreateItem from "./JobCreateItem.vue";
  import JobItem from "./JobItem.vue";
  import helper from "@/utils/helper";
  import { jobService } from "@/api/services";
  import { message } from "ant-design-vue";
  import { POSITION_GAP } from "@/utils/constants";
  const props = defineProps({
    checklist: {
      type: Object,
      default: {},
    },
  });
  const emit = defineEmits([]);

  // ========== start state ==========
  const percentFinsihed = ref(0);
  watchEffect(() => {
    let jobFinsihed = 0;
    let percentJob = 0;
    if (props.checklist?.Jobs?.length > 0) {
      props.checklist.Jobs.forEach((element) => {
        if (element.IsFinished) {
          jobFinsihed++;
        }
      });
      percentFinsihed.value = Math.floor(
        (jobFinsihed / props.checklist.Jobs.length) * 100
      );
    } else {
      percentFinsihed.value = 0;
    }
  });

  // ========== end state ==========
  // ========== start methods ==========
  const createJob = async (jobInfo) => {
    try {
      let value = helper.deepClone(jobInfo) ?? {};
      let res = await jobService.create(value);
      if (res.Success) {
        props.checklist.Jobs.push(res.Data);

        return true;
      }
      return false;
    } catch (error) {
      message.error("create job failure");
      console.log(error);
      return false;
    }
  };
  const onchangeJob = async (e) => {
    let item = e.added || e.moved;
    if (!item) {
      return;
    }
    let index = item.newIndex;
    let prevJob = props.checklist.Jobs[index - 1];
    let nextJob = props.checklist.Jobs[index + 1];
    let currentJob = props.checklist.Jobs[index];
    let sortOrder = POSITION_GAP;
    if (prevJob && nextJob) {
      sortOrder = (prevJob.SortOrder + nextJob.SortOrder) / 2;
    } else if (prevJob) {
      sortOrder = prevJob.SortOrder + prevJob.SortOrder / 2;
    } else if (nextJob) {
      sortOrder = nextJob.SortOrder / 2;
    }
    currentJob.SortOrder = sortOrder;
    // call api update new item
    try {
      let valueUpdate = {
        Id: currentJob.Id,
        ChecklistId: props.checklist.Id,
        SortOrder: sortOrder,
      };
      await jobService.move(valueUpdate);
    } catch (error) {
      console.log(error);
      message.error("Đã xảy ra lỗi cập nhật kanban");
    }
  };

  // ========== end methods ==========
</script>
<style lang=""></style>
