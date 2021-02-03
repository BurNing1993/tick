<template>
  <div
    id="main"
    class="w-full h-screen relative overflow-hidden bg-green-50"
    :style="styleObject"
  >
    <div
      class="text-sm md:text-base max-w-full absolute top-20 left-1/2 z-10 mx-auto text-center transform -translate-x-1/2"
    >
      <h1 class="text-xl mb-8">{{ title }}</h1>
      <div class="text-2xl md:text-3xl max-w-full whitespace-nowrap">
        {{ countdown }}
      </div>
    </div>
    <div class="absolute top-0 left-0">
      <canvas id="bg" width="100" height="100"></canvas>
    </div>
    <Setting  @confirm="onConfirm"></Setting>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import Setting, { Info } from "./Setting.vue";
import colorBall from "./utils/ball";
import { LOCAL_TITLE, LOCAL_DATE, LOCAL_BG } from "./utils";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const getFmt = (target: number | string | Date | dayjs.Dayjs) => {
  const targetDate = dayjs(target);
  const durationTime = dayjs.duration(targetDate.diff(dayjs()));
  if (durationTime.asYears() > 1) {
    return "Y年M月D天H时m分ss秒SSS";
  } else if (durationTime.asMonths() > 1) {
    return "M月D天H时m分ss秒SSS";
  } else if (durationTime.asDays() > 1) {
    return "D天H时m分ss秒SSS";
  } else if (durationTime.asHours() > 1) {
    return "H时m分ss秒SSS";
  } else if (durationTime.asMinutes() > 1) {
    return "m分ss秒SSS";
  } else {
    return "ss秒SSS";
  }
};

export default defineComponent({
  name: "App",
  components: {
    Setting,
  },
  setup() {
    let target = dayjs("2021-02-12");
    let isAfterTime = dayjs().isBefore(target);
    let fmt = "";
    let countdown = ref("");
    const title = ref("");
    const bgImg = ref("");
    if (isAfterTime) {
      fmt = getFmt(target);
      title.value = "过年";
      countdown.value = dayjs.duration(target.diff(dayjs())).format(fmt);
    } else {
      title.value = "设置时间到了!";
    }
    let timer: number | null = null;
    onMounted(() => {
      colorBall();
      const localTitle = localStorage[LOCAL_TITLE];
      if (localTitle) {
        title.value = localTitle;
      }
      const localTarget = localStorage[LOCAL_DATE];
      if (localTarget) {
        target = dayjs(localTarget);
      }
      const localBack = localStorage[LOCAL_BG];
      if (localBack) {
        bgImg.value = localBack;
      }
      if (isAfterTime) {
        setInterval(() => {
          isAfterTime = dayjs().isBefore(target);
          countdown.value = dayjs.duration(target.diff(dayjs())).format(fmt);
        });
      } else {
        title.value = "设置时间到了!";
      }
    });
    onBeforeUnmount(() => {
      if (timer) {
        clearInterval(timer);
      }
    });
    const styleObject = computed(() => {
      if (bgImg.value) {
        return {
          backgroundImage: `url(${bgImg.value})`,
        };
      }
      return null;
    });
    const onConfirm = (data: Info) => {
      target = data.target ? dayjs(data.target) : target;
      fmt = getFmt(target);
      if (data.title) {
        title.value = data.title;
      }
      bgImg.value = data.bgImg;
    };
    return {
      countdown,
      title,
      onConfirm,
      styleObject,
    };
  },
});
</script>
