<script setup lang="ts">
import { computed } from 'vue';

interface LoaderProps {
  fullscreen?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
  color?: string;
  text?: string;
  background?: string;
  thickness?: 'thin' | 'normal' | 'thick';
  ariaLabel?: string;
  animationSpeed?: 'slow' | 'normal' | 'fast';
}

const props = withDefaults(defineProps<LoaderProps>(), {
  fullscreen: false,
  size: 'md',
  color: 'text-primary-600',
  text: '',
  background: 'bg-white/90 backdrop-blur-sm',
  thickness: 'normal',
  ariaLabel: 'Loading indicator',
  animationSpeed: 'normal',
});

type SizePreset = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizeClasses = new Map<SizePreset | string, string>([
  ['xs', 'h-3 w-3'],
  ['sm', 'h-4 w-3'],
  ['md', 'h-8 w-8'],
  ['lg', 'h-12 w-12'],
  ['xl', 'h-16 w-16'],
]);

const thicknessClasses = {
  thin: 'border-1',
  normal: 'border-2',
  thick: 'border-3',
};

const speedClasses = {
  slow: 'animate-spin-slow',
  normal: 'animate-spin',
  fast: 'animate-spin-fast',
};

const spinnerClasses = computed(() => {
  const base = 'rounded-full border-transparent border-t-current';
  const size = sizeClasses.get(props.size) || `h-[${props.size}] w-[${props.size}]`;
  return [
    base,
    size,
    thicknessClasses[props.thickness],
    props.color,
    speedClasses[props.animationSpeed],
  ];
});

const containerClasses = computed(() => [
  'flex items-center justify-center',
  props.fullscreen ? `fixed inset-0 z-50 ${props.background}` : 'inline-block',
]);
</script>

<template>
  <div role="status" :aria-label="props.ariaLabel" :class="containerClasses">
    <div class="flex flex-col items-center gap-2">
      <div :class="spinnerClasses" aria-hidden="true" />
      <span v-if="props.text" class="text-sm font-medium text-gray-600">
        {{ props.text }}
      </span>
    </div>
  </div>
</template>
