<template>
  <header class="py-3 sm:py-4">
    <BaseContainer class="flex items-center justify-between">
      <h1 class="flex-1 text-lg font-bold transition-all duration-300 sm:text-xl lg:text-2xl">
        Q University
      </h1>
      <div class="">
        <button
          class="flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-xs transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-800 sm:px-4 sm:py-2 sm:text-sm"
        >
          <span class="">Войти</span>
          <ArrowRightEndOnRectangleIcon class="size-4 sm:size-5" />
        </button>
      </div>
    </BaseContainer>
  </header>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { BaseContainer } from '@/shared/ui';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/vue/24/solid';
</script>
