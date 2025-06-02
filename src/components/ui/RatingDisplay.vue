<template>
  <div
    v-if="ratingToDisplay"
    class="inline-flex items-center gap-1.5 self-start rounded-lg bg-black/70 px-2.5 py-1.5 shadow-lg border border-white/10"
  >
    <div class="relative h-4 w-4 star-icon-container">
      <StarIcon class="h-full w-full" />
    </div>
    <div class="font-poppins text-sm font-semibold text-white drop-shadow-sm">
      {{ ratingToDisplay }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StarIcon from '../icons/StarIcon.vue'

const props = defineProps({
  rating: {
    type: Number,
    required: true,
  },
})

const ratingToDisplay = computed(function () {
  if (props.rating && typeof props.rating === 'number' && props.rating > 0) {
    return props.rating.toFixed(1)
  }
  return null
})
</script>
