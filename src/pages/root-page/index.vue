<template>
  <BaseContainer class="my-2">
    <h2 class="mb-4 text-2xl font-bold">Доступные курсы</h2>

    <section class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <article
        v-for="course of courseList"
        :key="course.id"
        @click="router.push({ name: 'course-self-page', params: { id: course.id } })"
        class="rounded-2xl border border-gray-300 shadow-md transition-all duration-300 hover:cursor-pointer hover:shadow-lg"
      >
        <img :src="course.thumbnailUrl" :alt="course.title" class="object-fit rounded-2xl" />
        <div class="space-y-2 p-3">
          <h3 class="text-base font-semibold">{{ course.title }}</h3>
          <p class="line-clamp-3 text-sm">{{ course.imageUrl }}</p>
        </div>

        <p
          class="rounded-b-2xl bg-green-100 p-3 text-xs font-medium text-green-700"
          v-if="enrolledCoursesByUser?.map((obj) => obj.id).includes(course.id)"
        >
          Записался
        </p>
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
