<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <!--    task-card-->
    <slot />
  </div>
</template>

<script setup>
import { DATA_TRANSFER_PAYLOAD } from "../constants";

const emit = defineEmits(["drop"]);

/**
 * Drop event handler
 * @param event - obj
 */
function onDrop({ dataTransfer }) {
  if (!dataTransfer) {
    return;
  }
  // We get the current object set in AppDrag via the DATA_TRANSFER_PAYLOAD key
  const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
  if (payload) {
    // TODO: can update it in PR
    const transferData = JSON.parse(
      dataTransfer.getData(DATA_TRANSFER_PAYLOAD)
    );
    // const transferData = JSON.parse(payload);
    emit("drop", transferData);
  }
}
</script>
