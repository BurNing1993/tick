<template>
  <svg
    @click="visible = true"
    class="absolute top-2 right-2"
    width="24"
    height="24"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" fill="white" fill-opacity="0.01" />
    <path
      d="M41.5 10H35.5"
      stroke="#333"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M27.5 6V14"
      stroke="#333"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M27.5 10L5.5 10"
      stroke="#333"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.5 24H5.5"
      stroke="#333"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M21.5 20V28"
      stroke="#333"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M43.5 24H21.5"
      stroke="#333"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M41.5 38H35.5"
      stroke="#333"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M27.5 34V42"
      stroke="#333"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M27.5 38H5.5"
      stroke="#333"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <Modal v-model:visible="visible" title="设置">
    <form action="" class="text-sm md:text-base">
      <label for="targetDate" class="block md:flex md:items-center">
        <span class="w-full md:w-20 block md:inline-block">目标日期</span>
        <input
          id="targetDate"
          class="w-full flex-1 mt-1 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          type="date"
          min="2021-02-10"
          v-model="form.target"
        />
      </label>
      <label for="title" class="block md:flex md:items-center mt-4">
        <span class="w-full md:w-20 block md:inline-block">标题</span>
        <input
          id="title"
          type="text"
          class="w-full flex-1 mt-1 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          v-model="form.title"
        />
      </label>
      <label for="background" class="block md:flex md:items-center mt-4">
        <span class="w-full md:w-20 block md:inline-block">背景</span>
        <img
          v-if="form.bgImg"
          :src="form.bgImg"
          class="max-h-44 object-cover mt-1"
          alt="背景"
        />
        <div
          v-else
          class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
        >
          <div class="space-y-1 text-center">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="flex text-sm text-gray-600">
              <span>Upload background</span>
            </div>
          </div>
        </div>
        <input
          ref="uploadEl"
          id="background"
          type="file"
          class="sr-only"
          accept="image/*"
          @input="onUpload"
        />
      </label>
    </form>
    <template #footer>
      <div class="flex justify-between">
        <button
          class="mr-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none"
          @click="visible = false"
        >
          取 消
        </button>
        <button
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          @click="onSubmit"
        >
          设 置
        </button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from "vue";
import Modal from "./components/Modal.vue";
import { LOCAL_TITLE, LOCAL_DATE, LOCAL_BG, fileToBase64 } from "./utils";
export interface Info {
  target: string;
  title: string;
  bgImg: string;
}

export default defineComponent({
  name: "Setting",
  components: { Modal },
  emits: ["confirm"],
  setup(_, { emit }) {
    const visible = ref(false);
    const uploadEl = ref<HTMLInputElement | null>(null);
    const form = reactive<Info>({
      target: localStorage[LOCAL_TITLE] || "",
      title: localStorage[LOCAL_DATE] || "",
      bgImg: localStorage[LOCAL_BG] || "",
    });
    const show = () => {
      visible.value = true;
    };
    const onSubmit = () => {
      const data = toRaw(form);
      if (data.title) {
        localStorage[LOCAL_TITLE] = data.title;
      }
      if (data.target) {
        localStorage[LOCAL_DATE] = data.target;
      }
      if (data.bgImg) {
        localStorage[LOCAL_BG] = data.bgImg;
      }
      emit("confirm", data);
      visible.value = false;
    };
    const onUpload = (e: any) => {
      const files: FileList = e.target?.files;
      if (files && files.length) {
        fileToBase64(files[0], (base64) => (form.bgImg = base64));
      }
    };
    return {
      visible,
      show,
      form,
      onSubmit,
      uploadEl,
      onUpload,
    };
  },
});
</script>
