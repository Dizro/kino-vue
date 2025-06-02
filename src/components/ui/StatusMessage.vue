<template>
  <div
    :class="[
      'my-8 flex flex-col items-center justify-center rounded-xl p-6 text-center shadow-md',
      statusTypeClass,
    ]"
  >
    <div v-if="iconComponent" class="mb-4 text-5xl">
      <component :is="iconComponent" class="w-12 h-12" />
    </div>
    <p :class="['text-lg font-semibold', statusTitleClass]" v-if="title">{{ title }}</p>
    <p class="mt-1 text-sm" v-if="message">
      <slot>{{ message }}</slot>
    </p>
    <div v-if="$slots.actions" class="mt-6">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ErrorIcon from '../icons/ErrorIcon.vue'
import InfoIcon from '../icons/InfoIcon.vue'
import EmptyIcon from '../icons/EmptyIcon.vue'

const props = defineProps({
  type: {
    type: String,
    default: 'info',
  },
  title: String,
  message: String,
  icon: {
    type: String,
    default: null,
  },
})

const statusTypeClass = computed(function () {
  if (props.type === 'error') return 'bg-red-700/20 text-red-300 border border-red-700'
  if (props.type === 'warning') return 'bg-orange-400/20 text-orange-300 border border-orange-400'
  if (props.type === 'info') return 'bg-blue-500/20 text-blue-300 border border-blue-500'
  if (props.type === 'success') return 'bg-green-500/20 text-green-300 border border-green-500'
  if (props.type === 'empty') return 'bg-slate-800/50 text-slate-400 border border-slate-700'
  return 'bg-slate-700 text-slate-300'
})

const statusTitleClass = computed(function () {
  if (props.type === 'error') return 'text-red-200'
  if (props.type === 'warning') return 'text-orange-200'
  if (props.type === 'info') return 'text-blue-200'
  if (props.type === 'success') return 'text-green-200'
  return 'text-slate-100'
})

const iconComponent = computed(() => {
  if (props.icon) return null
  if (props.type === 'error') return ErrorIcon
  if (props.type === 'info') return InfoIcon
  if (props.type === 'empty') return EmptyIcon
  return null
})
</script>
