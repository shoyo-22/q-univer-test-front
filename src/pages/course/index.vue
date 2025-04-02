<script setup lang="ts">
const props = defineProps({
  id: String,
});

import { api } from '@/shared/api/base';
import { onMounted, ref } from 'vue';
import type { Course } from '../root-page/index.vue';
import { BaseContainer, BaseLoader } from '@/shared/ui';
import { useUserStore } from '@/entities/user/model/userStore';
import { storeToRefs } from 'pinia';

const course = ref<Course | null>(null);
const isLoading = ref<boolean>(false);
const userStore = useUserStore();
const { enrolledCoursesByUser } = storeToRefs(userStore);
const enrollBtnIsLoading = ref<boolean>(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await api.get(`/courses/${props.id}`);
    course.value = response.data;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});

async function enrollCourse() {
  try {
    enrollBtnIsLoading.value = true;
    const response = await api.post(`/user/enroll/${props.id}`, props.id);
    console.log(response);
  } catch (error) {
    console.log(error);
  } finally {
    enrollBtnIsLoading.value = false;
  }
}
</script>

<template>
  <BaseContainer class="my-4">
    <BaseLoader v-if="isLoading" color="text-blue-500" class="mt-5 w-full" />
    <div v-else>
      <article
        class="flex rounded-2xl border border-gray-300 shadow-md transition-all duration-300 hover:cursor-pointer hover:shadow-lg max-sm:flex-col"
      >
        <img :src="course?.thumbnailUrl" :alt="course?.title" class="object-fit rounded-2xl" />
        <div class="space-y-2 p-3">
          <span
            class="my-3 rounded-2xl bg-green-100 px-2 py-1 text-xs font-medium text-green-700"
            v-if="enrolledCoursesByUser?.map((obj) => obj.id).includes(course?.id || 0)"
          >
            Вы уже записались на этот курс
          </span>
          <h3 class="text-base font-semibold">{{ course?.title }}</h3>
          <p class="line-clamp-3 text-sm">{{ course?.imageUrl }}</p>
        </div>
      </article>

      <button
        v-if="!enrolledCoursesByUser?.map((obj) => obj.id).includes(course?.id || 0)"
        @click="enrollCourse"
        class="my-3 cursor-pointer rounded-xl bg-blue-200 px-4 py-2 text-blue-700 transition-all duration-300 hover:bg-blue-300"
      >
        <span>Записаться</span>
      </button>
    </div>
  </BaseContainer>
</template>
