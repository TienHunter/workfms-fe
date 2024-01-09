<template lang="">
  <li class="list-none">
    <div class="flex items-center gap-2">
      <a-checkbox :checked="job.IsFinished" @change="onChangeStatus" />
      <div class="hover:bg-gray-300 flex-1 p-2 rounded pointer">
        <span :class="{ 'line-through': job.IsFinished }">{{
          job.JobName
        }}</span>
      </div>
    </div>
  </li>
</template>
<script setup>
  import { watchEffect, watch } from "vue";
  import { jobService } from "@/api/services";
  const props = defineProps({
    job: {
      type: Object,
      required: true,
      default: {},
    },
  });
  const emit = defineEmits();

  // watch(
  //   () => props.job.IsFinished,
  //   async () => {
  //     try {
  //       await jobService.updateStatusJob(props.job.Id, props.job.IsFinished);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // );
  const onChangeStatus = async () => {
    props.job.IsFinished = !props.job.IsFinished;
    try {
      await jobService.updateStatusJob(props.job.Id, props.job.IsFinished);
    } catch (error) {
      console.log(error);
    }
  };
</script>
<style lang=""></style>
