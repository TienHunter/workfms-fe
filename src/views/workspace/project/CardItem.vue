<template lang="">
  <li>
    <div
      ref="cardRef"
      class="group relative bg-white p-3 my-2 shadow rounded border-b border-gray-300 hover:bg-gray-50 list-none pointer"
      @click.stop="openCard = true"
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
              :placeholder="placeholder"
              rows="3"
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

      <span href="#" class="text-sm">{{ card?.Title }}</span>

      <a-button
        size="small"
        shape="round"
        class="hidden group-hover:block absolute right-1 text-gray-50 bg-gray-200 center-y"
        @click.stop="openForm"
      >
        <template #icon><EditOutlined /></template>
      </a-button>
    </div>
    <Teleport to="body">
      <CardDetail
        v-if="openCard"
        :isShow="openCard"
        :cardId="card.Id"
        @closeModal="openCard = false"
      />
    </Teleport>
  </li>
</template>
<script setup>
  import { nextTick, ref, watchEffect } from "vue";
  import useClickOutside from "../../../hooks/useClickOutSide";
  import CardDetail from "./CardDetail.vue";
  const props = defineProps({
    card: Object,
    editTitleCard: Function,
  });
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

  // ========== end methods ==========
</script>
<style scoped>
  .drag-card > div {
    transform: rotate(5deg);
  }
  .ghost-card {
    background: lightgray;
    border-radius: 6px;
  }
  .ghost-card > div {
    visibility: hidden;
  }
</style>
