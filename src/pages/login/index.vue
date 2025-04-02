<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/entities/user/model/userStore';
import { useRouter } from 'vue-router';
import { BaseLoader } from '@/shared/ui';

const userStore = useUserStore();
const username = ref('');
const password = ref('');
const error = ref<string | null>(null);
const router = useRouter();

const handleLogin = async () => {
  try {
    await userStore.login(username.value, password.value);
    error.value = null;
    console.log('Login successful, user:', userStore.user);
    console.log('Is logged in:', userStore.isLoggedIn);

    router.push({ path: '/' });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    error.value = 'Вход в систему не удался. Пожалуйста, проверьте свои учетные данные.';
  }
};
</script>

<template>
  <div class="grid h-screen place-items-center p-4">
    <form @submit.prevent="handleLogin" class="mx-auto w-full max-w-md space-y-4">
      <div>
        <input
          v-model="username"
          type="text"
          placeholder="Логин"
          class="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <input
          v-model="password"
          type="password"
          placeholder="Пароль"
          class="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        class="w-full space-x-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
      >
        <span>Войти</span>
        <BaseLoader size="sm" v-if="userStore.isLoading" />
      </button>
      <p v-if="error" class="text-center text-red-500">{{ error }}</p>
    </form>
  </div>
</template>
