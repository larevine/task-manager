<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <!--    task-card-->
    <slot />
  </div>
</template>

<script setup>
import { DATA_TRANSFER_PAYLOAD } from "../constants";

// передаем данные в дочерние компоненты
const emit = defineEmits(["drop"]);

/**
 * Обработчик события Drop
 * @param event - объект события
 */
function onDrop({ dataTransfer }) {
  if (!dataTransfer) {
    return;
  }
  // Получаем текущий объект установленный в AppDrag через ключ DATA_TRANSFER_PAYLOAD
  const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
  if (payload) {
    // TODO: можно обновить это в PR
    const transferData = JSON.parse(
      dataTransfer.getData(DATA_TRANSFER_PAYLOAD)
    );
    // const transferData = JSON.parse(payload);
    emit("drop", transferData);
  }
}
</script>
