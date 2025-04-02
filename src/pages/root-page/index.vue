<template>
  <BaseContainer class="my-2">
    <h2 class="mb-4 text-2xl font-bold">Доступные курсы</h2>

    <BaseLoader v-if="isLoading" color="text-blue-500" class="mt-5 w-full" />

    <section v-else class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <article
        v-for="course of courseList"
        :key="course.id"
        @click="router.push({ name: 'course-self-page', params: { id: course.id } })"
        class="rounded-2xl border border-gray-300 shadow-md transition-all duration-300 hover:cursor-pointer hover:shadow-lg"
      >
        <img
          :src="course.thumbnailUrl"
          :alt="course.title"
          class="object-fit h-60 w-full rounded-2xl"
        />

        <div class="space-y-2 p-3">
          <span
            class="my-2 rounded-2xl bg-green-100 px-2 py-1 text-xs font-medium text-green-700"
            v-if="enrolledCoursesByUser?.map((obj) => obj.id).includes(course.id)"
          >
            Записался
          </span>
          <h3 class="text-base font-semibold">{{ course.title }}</h3>
          <p class="line-clamp-3 text-sm">{{ course.imageUrl }}</p>
        </div>
      </article>
    </section>
  </BaseContainer>
</template>

<script setup lang="ts">
import { api } from '@/shared/api/base';
import { BaseContainer } from '@/shared/ui';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/entities/user/model/userStore';
import { storeToRefs } from 'pinia';
import { BaseLoader } from '@/shared/ui';

export type Course = {
  id: number;
  title: string;
  imageUrl: string;
  thumbnailUrl: string;
};

const courseList = ref<Course[]>([]);
const isLoading = ref<boolean>(false);
const router = useRouter();
const userStore = useUserStore();
const { enrolledCoursesByUser } = storeToRefs(userStore);

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await api.get('/courses');
    courseList.value = response.data;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});
</script>
