<template>
  <div
    class="animate-pulse group relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-slate-800/60 shadow-lg"
  >
    <div class="flex h-full flex-col justify-start gap-4 px-2 pt-2 pb-4">
      <div class="block w-full aspect-[2/3] relative overflow-hidden rounded-lg bg-slate-700">
        <div class="absolute top-[22px] left-[21px] z-10">
          <div class="h-8 w-12 rounded-lg bg-slate-600"></div>
        </div>
      </div>
      <div class="flex h-full flex-grow flex-col justify-between gap-2 self-stretch p-1 sm:p-2">
        <div class="relative flex-1">
          <div class="h-4 bg-slate-600 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-slate-600 rounded w-1/2"></div>
        </div>
        <div class="mt-auto flex items-center justify-between pt-1 sm:pt-2">
          <div class="h-8 bg-slate-600 rounded-md w-24"></div>
          <div class="h-7 w-7 bg-slate-600 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
