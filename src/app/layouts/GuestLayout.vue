<template>
  <header class="border-b border-gray-300 py-3 sm:py-4" v-if="!userStore.isLoading">
    <BaseContainer class="flex items-center justify-between">
      <h1 class="text-xl font-bold transition-all duration-300 lg:text-2xl">Q University</h1>
      <div class="">
        <button
          v-if="!isLoggedIn"
          @click="router.push({ path: '/auth/login' })"
          class="flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-xs transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-800 sm:px-4 sm:py-2 sm:text-sm"
        >
          <span class="">Войти</span>
          <ArrowRightEndOnRectangleIcon class="size-4 sm:size-5" />
        </button>
        <button
          v-else
          class="flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-xs transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-800 sm:px-4 sm:py-2 sm:text-sm"
        >
          <span>Личный кабинет</span>
        </button>
      </div>
      <button
        class="group hidden h-6 w-6 items-center justify-center rounded bg-white text-center text-gray-800 transition"
        aria-pressed="false"
        onclick="this.setAttribute('aria-pressed', !(this.getAttribute('aria-pressed') === 'true'))"
        @click="toggleMenu"
      >
        <span class="sr-only">Menu</span>
        <svg
          class="pointer-events-none h-6 w-6 fill-current"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            class="origin-center translate-x-[7px] -translate-y-[5px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-x-0 group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:rotate-[315deg]"
            y="7"
            width="9"
            height="2"
            rx="1"
          ></rect>
          <rect
            class="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-[[aria-pressed=true]]:rotate-45"
            y="7"
            width="16"
            height="2"
            rx="1"
          ></rect>
          <rect
            class="origin-center translate-y-[5px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:-rotate-[225deg]"
            y="7"
            width="9"
            height="2"
            rx="1"
          ></rect>
        </svg>
      </button>
    </BaseContainer>
  </header>
  <RouterView v-if="!userStore.isLoading" />
  <BaseLoader fullscreen v-else />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { BaseContainer } from '@/shared/ui';
import { onMounted, ref, watch } from 'vue';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/entities/user/model/userStore';
import { BaseLoader } from '@/shared/ui';
import { storeToRefs } from 'pinia';

const router = useRouter();
const userStore = useUserStore();
const { isLoggedIn, user } = storeToRefs(userStore);

const isActive = ref<boolean>(false);

watch(
  isLoggedIn,
  (newValue, oldValue) => {
    console.log('isLoggedIn changed from', oldValue, 'to', newValue);
    if (newValue) {
      console.log('User is now logged in:', user.value);
    } else {
      console.log('User is logged out');
    }
  },
  { immediate: true },
);

const toggleMenu = () => {
  isActive.value = !isActive.value;
};

onMounted(() => {
  userStore.checkAuth();
});
</script>
