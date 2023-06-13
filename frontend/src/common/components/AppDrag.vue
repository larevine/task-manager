<template>
  <!--  Атрибут  draggable  со значением "true" указывает, что элемент может быть перетаскиваемым.-->
  <!--  Атрибут  @dragstart.self="onDrag"  задает обработчик события dragstart (начало перетаскивания), который будет вызван при первом щелчке на элементе и начале перетаскивания.  onDrag  - это функция, которая обрабатывает событие начала перетаскивания, отправляет данные в  dataTransfer  и определяет доступные операции-->
  <!--  Обработчики  @dragover.prevent  и  @dragenter.prevent  предотвращают выполнение действий по умолчанию при прохождении курсора мыши над элементом. В данном случае, они отменяют поведение браузера при перетаскивании, которое может вызвать нежелательные эффекты, когда элемент будет наведен на другой элемент или зону.-->
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
  // task
  transferData: {
    type: Object,
    required: true,
  },
});

/**
 * Вызываем в начале перетаскивания
 * @param dataTransfer
 */
function onDrag({ dataTransfer }) {
  // effectAllowed определяет, какие операции перетаскивания могут быть выполнены над элементом
  // dropEffect определяет, какая операция будет выполнена после отпускания элемента (например, копирование или перемещение).
  dataTransfer.effectAllowed = MOVE;
  dataTransfer.dropEffect = MOVE;
  // Упаковываем данные в строку, где ключ DATA_TRANSFER_PAYLOAD
  dataTransfer.setData(
    DATA_TRANSFER_PAYLOAD,
    JSON.stringify(props.transferData)
  );
}
</script>
