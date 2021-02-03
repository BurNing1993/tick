<template>
  <teleport to="body">
    <div v-show="visible" class="relative">
      <div
        class="fixed top-0 left-0 z-20 w-full min-h-screen bg-gray-400 bg-opacity-50"
        @click="onClose"
      >
        <div class="bg-white mt-10 mx-auto w-full md:w-1/2 max-w-xl" @click.stop>
          <div class="p-4">
            <div class="flex items-center justify-between">
              <span class="text-base md:text-xl">{{ title }}</span>
              <svg
                class="cursor-pointer"
                @click="onClose"
                width="24"
                height="24"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                <path
                  d="M14 14L34 34"
                  stroke="#333"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14 34L34 14"
                  stroke="#333"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div class="p-6">
            <slot></slot>
          </div>
          <div class="p-6">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: [String, Number],
      default: "title",
    },
  },
  emits: ["update:visible"],
  setup(props, { emit }) {
    const onClose = () => emit("update:visible", false);
    return {
      onClose,
    };
  },
});
</script>
