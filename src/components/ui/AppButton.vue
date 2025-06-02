<template>
  <button
    :type="type"
    @click="$emit('click', $event)"
    :disabled="disabled"
    :class="[
      'inline-flex justify-center items-center gap-2 rounded-lg font-montserrat font-semibold transition-colors duration-150 focus:outline-none focus:ring-0 focus:shadow-none',
      buttonVariantClass,
      buttonSizeClass,
      { 'opacity-50 cursor-not-allowed': disabled },
      customClass,
    ]"
  >
    <span v-if="iconLeft" :class="['w-5 h-5', iconSize]">
      <slot name="icon-left"></slot>
    </span>
    <slot>Текст кнопки</slot>
    <span v-if="iconRight" :class="['w-5 h-5', iconSize]">
      <slot name="icon-right"></slot>
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'md',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  iconLeft: Boolean,
  iconRight: Boolean,
  customClass: String,
})

defineEmits(['click'])

const buttonVariantClass = computed(function () {
  if (props.variant === 'primary') {
    return 'bg-blue-500 text-white hover:bg-opacity-80 focus:ring-blue-500/50'
  }
  if (props.variant === 'secondary') {
    return 'bg-slate-700 text-slate-100 hover:bg-slate-600 focus:ring-slate-500/50'
  }
  if (props.variant === 'outline-violet') {
    return 'bg-transparent text-violet-300 border border-violet-500 hover:bg-violet-500/10 focus:ring-violet-500/50'
  }
  if (props.variant === 'outline-blue') {
    return 'bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500/10 focus:ring-blue-500/50'
  }
  if (props.variant === 'text') {
    return 'bg-transparent text-blue-500 hover:text-violet-400 focus:ring-blue-500/30 px-2 py-1'
  }
  return 'bg-blue-500 text-white hover:bg-opacity-80 focus:ring-blue-500/50'
})

const buttonSizeClass = computed(function () {
  if (props.size === 'sm') {
    return 'px-4 py-1.5 text-xs sm:text-sm h-8 rounded-md'
  }
  if (props.size === 'lg') {
    return 'px-8 py-3 text-base sm:text-lg h-12 rounded-xl'
  }
  return 'px-6 py-2 text-sm sm:text-base h-10 rounded-lg'
})

const iconSize = computed(function () {
  if (props.size === 'sm') {
    return 'w-4 h-4'
  }
  return 'w-5 h-5'
})
</script>
