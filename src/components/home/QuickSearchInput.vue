<template>
  <div class="mx-auto w-full max-w-lg">
    <AppInput
      v-model="searchQuery"
      type="search"
      placeholder="Быстрый поиск по названию фильма..."
      :has-icon="true"
      @enter="triggerSearch"
      input-class="text-base py-3"
      wrapper-class="bg-slate-800/70 outline-violet-500/50 focus-within:ring-2 focus-within:ring-violet-500"
    >
      <template #icon>
        <SearchIcon class="text-slate-400 group-focus-within:text-violet-300 w-full h-full" />
      </template>
    </AppInput>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppInput from '../ui/AppInput.vue'
import SearchIcon from '../icons/SearchIcon.vue'

const searchQuery = ref('')
const emit = defineEmits(['searchTriggered'])

function triggerSearch() {
  const query = searchQuery.value.trim()
  if (query !== '') {
    emit('searchTriggered', query)
    searchQuery.value = ''
  }
}
</script>
