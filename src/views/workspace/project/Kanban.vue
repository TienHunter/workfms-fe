<template>
  <div
    class="w-72 bg-gray-500 flex flex-col rounded max-h-full shadow-lg rounded overflow-hidden"
  >
    <div class="flex items-center justify-between px-3 py-2 bg-blue-200 handle">
      <div class="text-sm font-bold text-gray-700">{{ list.Title }}</div>
      <a-dropdown trigger="['click']">
        <template #overlay>
          <a-menu>
            <a-menu-item key="1">
              <PlusOutlined />
              Add card
            </a-menu-item>

            <a-menu-item key="2" style="color: red">
              <DeleteOutlined />
              Delete list
            </a-menu-item>
          </a-menu>
        </template>
        <a-button>
          <template #icon>
            <EllipsisOutlined />
          </template>
        </a-button>
      </a-dropdown>
    </div>
    <div class="flex flex-col overflow-hidden">
      <div class="flex-1 overflow-y-auto px-2">
        <draggable
          :list="cards"
          group="cards"
          :item-key="(element) => element.KanbanId"
          tag="ul"
          @start="drag = true"
          @end="drag = false"
          drag-class="drag-card"
          ghost-class="ghost-card"
          @change="onChange"
        >
          <template #item="{ element }">
            <CardItem :card="element" :editTitleCard="editTitleCard" />
          </template>
        </draggable>
      </div>
      <div class="m-2">
        <CreateItem
          tag="textarea"
          placeholder="Enter the title card"
          textSubmit="Add card"
          textCancel="Cancel"
          textButton="Add card"
          :onSubmit="addCard"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
  import {
    ref,
    onBeforeMount,
    reactive,
    watchEffect,
    watch,
    defineProps,
    defineEmits,
    computed,
  } from "vue";
  import draggable from "vuedraggable";
  import CreateItem from "./CreateItem.vue";
  import CardItem from "./CardItem.vue";
  import { cardService } from "@/api/services";
  import helper from "@/utils/helper";
  const props = defineProps({
    list: {
      type: Object,
      required: true,
    },
  });

  const emit = defineEmits(["createdCard", "editTitleCard"]);
  // const cards = computed(() => props.list.Cards);
  const cards = ref(props.list.Cards);
  // ========== start methods ==========
  const addCard = async (value) => {
    console.log(props.list);
    try {
      let newCard = {
        KanbanId: props.list.Id,
        SortOrder: props.list?.Cards?.length ?? 0,
        Title: value,
      };

      let res = await cardService.create(newCard);
      if (res?.Success) {
        emit("createdCard", {
          index: props.list.SortOrder,
          card: res.Data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editTitleCard = async (value, card) => {
    try {
      console.log("kaban", value, card);
      const tmp = helper.deepClone(card);
      tmp.Title = value;
      // call api edit title card
      await cardService.editTitle(tmp);
      // success emit value, indexCard, indexKanban -> gap loi khi nhieu nguoi dung (de sau)
      emit("editTitleCard", {
        value: value,
        indexCard: card.SortOrder,
        indexKanban: props.list.SortOrder,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = async (e) => {
    let item = e.added || e.moved;
    if (!item) {
      return;
    }
    let index = item.newIndex;
    let prevCard = cards.value[index - 1];
    let nextCard = cards.value[index - 1];
    let card = cards.value[index];
    let position = card.Position;
    if (prevCard && nextCard) {
      position = (prevCard.Position + nextCard.Position) / 2;
    } else if (prevCard) {
      position = prevCard.Position + prevCard.Position / 2;
    } else if (nextCard) {
      position = nextCard.Position / 2;
    }
    // // call api update new item

    // sau khi xong thi emit de call lai kanbanList

    // console.log("change:", e, props.list);
  };
  // ========== end methods ==========
</script>
<style></style>
