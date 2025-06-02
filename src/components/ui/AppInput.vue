<template>
  <div
    :class="[
      'flex px-4 py-3 bg-black/10 rounded-xl outline outline-1 outline-offset-[-1px] outline-slate-700 items-center gap-3 sm:gap-4',
      wrapperClass,
    ]"
  >
    <div v-if="hasIcon" class="icon-container">
      <div class="relative w-5 h-5 sm:w-6 sm:h-6 text-slate-500">
        <slot name="icon">
          <SearchIcon />
        </slot>
      </div>
    </div>
    <div class="input-field-wrapper flex-1">
      <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @keyup.enter="$emit('enter', $event.target.value)"
        :placeholder="placeholder"
        :class="[
          'w-full bg-transparent text-slate-100 placeholder-slate-500 font-poppins focus:outline-none caret-violet-500',
          inputClass,
          sizeBasedInputClass,
        ]"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SearchIcon from '../icons/SearchIcon.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Введите текст...',
  },
  type: {
    type: String,
    default: 'text',
  },
  hasIcon: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: 'md',
  },
  inputClass: {
    type: String,
    default: '',
  },
  wrapperClass: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue', 'focus', 'blur', 'enter'])

const sizeBasedInputClass = computed(function () {
  if (props.size === 'sm') {
    return 'text-sm leading-none h-8'
  }
  if (props.size === 'lg') {
    return 'text-lg sm:text-xl h-12'
  }
  return 'text-sm sm:text-base leading-normal h-10'
})
</script>
