<template>
  <div
    class="flex h-full w-full items-center justify-center rounded-lg bg-slate-700 text-center text-slate-400"
    :style="placeholderDimensions"
  >
    <div class="flex flex-col items-center">
      <PhotoPlaceholderIcon class="w-1/4 h-1/4 mb-2 opacity-50" />
      <span class="text-xs sm:text-sm">{{ actualText }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PhotoPlaceholderIcon from '../icons/PhotoPlaceholderIcon.vue'

const props = defineProps({
  text: String,
  width: String,
  height: String,
  aspectRatio: String,
})

const placeholderDimensions = computed(function () {
  return {
    width: props.width,
    height: props.height,
    aspectRatio: props.aspectRatio,
  }
})

const actualText = computed(function () {
  if (props.text) {
    return props.text
  }
  return 'Нет изображения'
})
</script>
