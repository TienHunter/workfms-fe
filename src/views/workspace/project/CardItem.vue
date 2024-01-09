<template lang="">
  <li>
    <div
      ref="cardRef"
      class="group relative bg-white p-3 my-2 shadow rounded border-b border-gray-300 hover:bg-gray-50 list-none pointer"
      @click.stop.prevent="onOpenCard"
    >
      <Teleport to="body">
        <div
          v-if="isShowingForm"
          class="mask cursor-default"
          @click="isShowingForm = false"
        >
          <form
            ref="formRef"
            action=""
            class="fixed rounded flex flex-col gap-2 z-10 bg-gray-200 p-2"
            :style="positionForm"
            @submit.prevent="onEditTitleCard"
            @click.stop=""
          >
            <a-textarea
              ref="inputRef"
              v-model:value="valueInput"
              class="max-w-full text-sm font-bold placehoder-gray-400"
              size="large"
              placeholder="Input title card"
              :rows="3"
            />
            <div class="flex items-center gap-2">
              <a-button htmlType="submit" type="primary" :loading="loading"
                >Save</a-button
              >
              <a-button htmlType="button" @click="isShowingForm = false"
                >Cancel</a-button
              >
            </div>
          </form>
          <div class="fixed" :style="positionNav" @click.stop>
            <div class="flex flex-col gap-1">
              <a-button>Open card</a-button>
              <a-button>Edit label</a-button>
              <a-button>Move</a-button>
              <a-button>Copy</a-button>
              <a-button>Change date</a-button>
            </div>
          </div>
        </div>
      </Teleport>
      <div class="flex flex-col gap-4">
        <!-- tags -->
        <div v-if="card?.Tags?.length" class="flex gap-2">
          <template v-for="(tag, iTag) in card?.Tags ?? []" :key="iTag">
            <span
              v-if="tag.IsUsed"
              class="round"
              :style="{ backgroundColor: tag.Color }"
              :title="tag.Title"
            ></span>
          </template>
        </div>

        <!-- title -->
        <span href="#" class="text-sm">{{ card?.Title }}</span>
        <!-- deadline -->

        <!-- count -->
        <div class="flex gap-2">
          <!-- desc -->
          <span v-show="card.Description" title="Đã có mô tả" class="p-1">
            <AlignLeftOutlined />
          </span>

          <!-- comment -->

          <!-- attachment -->
          <span
            v-show="card?.Attachments?.length"
            title="Các tập tin đính kèm"
            class="flex gap-1 p-1"
          >
            <PaperClipOutlined />
            {{ card?.Attachments?.length }}
          </span>
          <!-- job finished/ sum job -->
          <span
            v-show="suumJobs"
            title="Mục công việc"
            class="flex gap-1 p-1 rounded"
            :class="{
              'bg-green-400': countJobsFinished === suumJobs && suumJobs > 0,
            }"
          >
            <CheckSquareOutlined />
            {{ `${countJobsFinished}/${suumJobs}` }}
          </span>
        </div>
      </div>

      <a-button
        size="small"
        shape="round"
        class="hidden group-hover:block absolute right-1 text-gray-50 bg-gray-200 center-y"
        @click.stop="openForm"
      >
        <template #icon><EditOutlined /></template>
      </a-button>
    </div>
  </li>
</template>
<script setup>
  import { nextTick, ref, watchEffect, computed } from "vue";
  import { useRouter } from "vue-router";
  import useClickOutside from "../../../hooks/useClickOutSide";
  import CardDetail from "./CardDetail.vue";
  const props = defineProps({
    card: Object,
    editTitleCard: Function,
  });
  const router = useRouter();
  const valueInput = ref(props.card.Title ?? "");
  const isShowingForm = ref(false);
  const inputRef = ref();
  const loading = ref(false);
  const formRef = ref();
  const isClickoutSide = useClickOutside(formRef);
  const cardRef = ref();
  const positionForm = ref({});
  const positionNav = ref({});
  const openCard = ref(false);
  const suumJobs = computed(() => {
    let counts = 0;
    props.card.Checklists.forEach((c) => {
      counts += c?.Jobs.length ?? 0;
    });
    return counts;
  });
  const countJobsFinished = computed(() => {
    let counts = 0;
    props.card.Checklists.forEach((c) => {
      if (c?.Jobs.length > 0) {
        c.Jobs.forEach((j) => {
          if (j.IsFinished) {
            counts++;
          }
        });
      }
    });
    return counts;
  });
  // ========== start lifecycle ==========
  // watchEffect(() => {
  //   if (isClickoutSide.value) {
  //     isShowingForm.value = false;
  //   }
  // });
  watchEffect(() => {
    if (isShowingForm.value) {
      valueInput.value = props.card.Title;
    }
  });

  // ========== end lifecycle ==========

  // ========== start methods ==========
  const onEditTitleCard = async () => {
    if (valueInput.value) {
      loading.value = true;
      await props.editTitleCard(valueInput.value, props.card);
      valueInput.value = "";
      loading.value = false;
      isShowingForm.value = false;

      // formRef.value.scrollIntoView();
    }
  };
  const openForm = () => {
    isShowingForm.value = true;
    console.log(cardRef.value.getBoundingClientRect());
    positionForm.value.top = `${cardRef.value.getBoundingClientRect().top}px`;
    positionForm.value.left = `${cardRef.value.getBoundingClientRect().left}px`;
    positionForm.value.width = `${
      cardRef.value.getBoundingClientRect().width
    }px`;

    positionNav.value.top = `${cardRef.value.getBoundingClientRect().top}px`;
    positionNav.value.left = `${
      cardRef.value.getBoundingClientRect().right + 8
    }px`;

    nextTick(() => {
      inputRef.value.focus();
    });
    // formRef.value.scrollIntoView();
  };
  const onOpenCard = () => {
    router.push({ name: "CardDetail", params: { cardId: props.card.Id } });
  };

  // ========== end methods ==========
</script>
<style scoped>
  /* .drag-card > div {
    transform: rotate(5deg);
  } */
  /* .ghost-card {
    background: lightgray;
    border-radius: 6px;
  }
  .ghost-card > div {
    visibility: hidden;
  } */
</style>
