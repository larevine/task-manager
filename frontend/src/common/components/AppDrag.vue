<template>
  <!--  The draggable attribute with a value of "true" indicates that the element is draggable.-->
  <!--  The @dragstart.self="onDrag" attribute specifies the dragstart (drag start) event handler, to be called when the element is first clicked and the drag begins. onDrag is a function, that handles the drag start event, sends the data to dataTransfer and determines the available operations-->
  <!--  The @dragover.prevent and @dragenter.prevent handlers prevent the default behavior when the mouse cursor passes over an element. In this case, they override the browser's drag and drop behavior, which can cause unwanted effects when the element is hovered over another element or zone.-->
  <!--  Block transfer of blocks if the user is not logged in-->
  <div
    :draggable="authStore.isAuthenticated"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <!--    TaskCardTags-->
    <slot />
  </div>
</template>

<script setup>
import { DATA_TRANSFER_PAYLOAD, MOVE } from "../constants";
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();

const props = defineProps({
  // tasks
  transferData: {
    type: Object,
    required: true,
  },
});

/**
 * Called at the beginning of the drag
 * @param dataTransfer
 */
function onDrag({ dataTransfer }) {
  // effectAllowed determines which drag and drop operations can be performed on an element
  // dropEffect determines what operation will be performed after the element is released (for example, copy or move).
  dataTransfer.effectAllowed = MOVE;
  dataTransfer.dropEffect = MOVE;
  // We pack the data into a string where the key is DATA_TRANSFER_PAYLOAD
  dataTransfer.setData(
    DATA_TRANSFER_PAYLOAD,
    JSON.stringify(props.transferData)
  );
}
</script>
