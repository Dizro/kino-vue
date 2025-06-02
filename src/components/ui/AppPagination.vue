<template>
  <nav
    v-if="totalPages > 1"
    class="flex items-center justify-center sm:justify-end space-x-1 sm:space-x-2"
  >
    <AppButton
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      variant="outline-blue"
      size="sm"
      custom-class="w-10 h-10 p-0 flex items-center justify-center sm:w-auto sm:px-4"
      :class="{
        'opacity-50 cursor-not-allowed text-slate-600 border-slate-700 hover:bg-transparent':
          currentPage === 1,
      }"
    >
      <span class="hidden sm:inline">Назад</span>
      <PreviousArrowIcon class="h-5 w-5 sm:hidden" />
    </AppButton>

    <AppButton
      @click="goToPage(1)"
      variant="outline-blue"
      size="sm"
      custom-class="w-10 h-10 p-0"
      :class="
        currentPage === 1
          ? '!bg-violet-500 !border-violet-500 !text-white'
          : 'text-slate-300 border-slate-700 hover:bg-slate-700/50'
      "
    >
      1
    </AppButton>

    <span v-if="shouldShowLeftDots" class="px-1.5 py-2 text-slate-500">...</span>

    <AppButton
      v-if="currentPage !== 1 && currentPage !== totalPages"
      @click="goToPage(currentPage)"
      variant="outline-blue"
      size="sm"
      custom-class="w-10 h-10 p-0 !bg-violet-500 !border-violet-500 !text-white"
    >
      {{ currentPage }}
    </AppButton>

    <span v-if="shouldShowRightDots" class="px-1.5 py-2 text-slate-500">...</span>

    <AppButton
      v-if="totalPages > 1"
      @click="goToPage(totalPages)"
      variant="outline-blue"
      size="sm"
      custom-class="w-10 h-10 p-0"
      :class="
        currentPage === totalPages
          ? '!bg-violet-500 !border-violet-500 !text-white'
          : 'text-slate-300 border-slate-700 hover:bg-slate-700/50'
      "
    >
      {{ totalPages }}
    </AppButton>

    <AppButton
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      variant="outline-blue"
      size="sm"
      custom-class="w-10 h-10 p-0 flex items-center justify-center sm:w-auto sm:px-4"
      :class="{
        'opacity-50 cursor-not-allowed text-slate-600 border-slate-700 hover:bg-transparent':
          currentPage === totalPages,
      }"
    >
      <span class="hidden sm:inline">Вперед</span>
      <NextArrowIcon class="h-5 w-5 sm:hidden" />
    </AppButton>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import AppButton from './AppButton.vue'
import PreviousArrowIcon from '../icons/PreviousArrowIcon.vue'
import NextArrowIcon from '../icons/NextArrowIcon.vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['pageChanged'])

function goToPage(pageNumber) {
  if (pageNumber >= 1 && pageNumber <= props.totalPages && pageNumber !== props.currentPage) {
    emit('pageChanged', pageNumber)
  }
}

const shouldShowLeftDots = computed(function () {
  return props.currentPage > 2
})

const shouldShowRightDots = computed(function () {
  return props.currentPage < props.totalPages - 1
})
</script>
