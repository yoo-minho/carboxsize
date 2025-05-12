<script setup>
const xSize = defineModel('xSize', { default: 0 });
const xInSize = defineModel('xInSize', { default: 0 });
const ySize = defineModel('ySize', { default: 0 });
const zSize = defineModel('zSize', { default: 0 });
const rotationX = defineModel('rotationX', { default: 22.5 });
const rotationY = defineModel('rotationY', { default: 157.5 });
const rotationZ = defineModel('rotationZ', { default: 0 });

// 일반 prop으로 남겨둘 속성들
const props = defineProps({
  boxColor: {
    type: String,
    default: 'rgba(0,0,0,0.1)'
  },
  title: {
    type: String,
    default: ''
  },
  brand: {
        type: String,
    default: ''
  },
  no: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['update:rotationX', 'update:rotationY', 'update:rotationZ', 
                          'update:xSize', 'update:ySize', 'update:zSize']);

// 실제 픽셀 값을 계산하는 함수
const calculatePixels = (mm) => {
  return mm * 1/32;
};

// Y축 애니메이션을 위한 추가 변수
const animationOffset = ref(0);
let animationFrameId = null;

// 차량 이미지 URL 계산
const carImageUrl = computed(() => {
  if (props.no) {
    return `https://autoimg.danawa.com/photo/${props.no}/model_360.png`;
  }
  return null;
});

// Y축 애니메이션 효과 - 더 부드러운 애니메이션을 위해 requestAnimationFrame 사용
onMounted(() => {
  let direction = 1;
  let lastTime = 0;
  const animationSpeed = 0; // 애니메이션 속도 조절
  const maxOffset = 10; // 최대 오프셋 값
  
  const animate = (currentTime) => {
    if (!lastTime) lastTime = currentTime;
    const deltaTime = currentTime - lastTime;
    
    // 방향 전환 로직 - 경계값 체크 개선
    if (animationOffset.value >= maxOffset) {
      direction = -1;
      animationOffset.value = maxOffset; // 최대값 초과 방지
    }
    if (animationOffset.value <= -maxOffset) {
      direction = 1;
      animationOffset.value = -maxOffset; // 최소값 초과 방지
    }
    
    // 시간 기반 애니메이션으로 더 부드럽게 처리
    animationOffset.value += direction * animationSpeed * (deltaTime / 16.67); // 60fps 기준 보정
    
    lastTime = currentTime;
    animationFrameId = requestAnimationFrame(animate);
  };
  
  animationFrameId = requestAnimationFrame(animate);
});

// 컴포넌트가 제거될 때 애니메이션 정리
onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<template>
  <div class="flex flex-col relative">
    <div v-if="title" class="bg-white p-2 pb-1 rounded-t-xl shadow-lg">
      <h3 class="font-semibold text-gray-800 text-sm">{{ title }}</h3>
    </div>
    <div>
      <div
        class="bg-gradient-to-br from-gray-200 to-gray-500 shadow-lg flex items-center justify-center w-full aspect-square z-1 relative">
        <div v-if="carImageUrl" class="absolute inset-0 z-0 flex items-center justify-center">
          <img :src="carImageUrl" alt="차량 이미지" class="object-contain"
            :style="{ width: calculatePixels(xSize) + 'px' }" />
        </div>
        <div class="box-container relative z-10"
          :style="{ transform: `rotateX(${rotationX}deg) rotateY(${rotationY + animationOffset}deg) rotateZ(${rotationZ}deg)` }">
          <div class="box absolute preserve-3d transition-transform" :style="{
            width: `${calculatePixels(xSize)}px`,
            height: `${calculatePixels(zSize)}px`,
            transform: `translateZ(${calculatePixels(ySize) / 2}px)`,
            backgroundColor: boxColor,
          }">
          </div>
          <div class="box absolute preserve-3d transition-transform " :style="{
            width: `${calculatePixels(xSize)}px`,
            height: `${calculatePixels(zSize)}px`,
            transform: `translateZ(${-calculatePixels(ySize) / 2}px)`,
            backgroundColor: boxColor,
          }"></div>
          <div class="box absolute preserve-3d transition-transform " :style="{
            width: `${calculatePixels(xSize)}px`,
            height: `${calculatePixels(ySize)}px`,
            transform: `rotateX(90deg) translateZ(${calculatePixels(zSize) / 2}px)`,
            backgroundColor: boxColor,
          }">
          </div>
          <div class="box absolute preserve-3d transition-transform " :style="{
            width: `${calculatePixels(xSize)}px`,
            height: `${calculatePixels(ySize)}px`,
            transform: `rotateX(90deg) translateZ(${-calculatePixels(zSize) / 2}px)`,
            backgroundColor: boxColor,
          }"></div>
          <div class="box absolute preserve-3d transition-transform" :style="{
            width: `${calculatePixels(ySize)}px`,
            height: `${calculatePixels(zSize)}px`,
            transform: `rotateY(90deg) translateZ(${calculatePixels(xSize) / 2}px)`,
            backgroundColor: boxColor,
          }">
          </div>
          <div class="box absolute preserve-3d transition-transform" :style="{
            width: `${calculatePixels(ySize)}px`,
            height: `${calculatePixels(zSize)}px`,
            transform: `rotateY(90deg) translateZ(${-calculatePixels(xSize) / 2}px)`,
            backgroundColor: boxColor,
          }"></div>
        </div>
      </div>
    </div>
    <div class="bg-white p-2 rounded-b-xl shadow-lg grid grid-cols-3 text-xs tracking-tighter">
      <div>
        <div class="text-gray-500">전장<span class="text-[8px]">(mm)</span></div>
        <div>{{ xSize }}</div>
      </div>
      <div>
        <div class="text-gray-500">전폭<span class="text-[8px]">(mm)</span></div>
        <div>{{ ySize }}</div>
      </div>
      <div>
        <div class="text-gray-500">전고<span class="text-[8px]">(mm)</span></div>
        <div>{{ zSize }}</div>
      </div>
      <div>
        <div class="text-gray-500">축거<span class="text-[8px]">(mm)</span></div>
        <div>{{ xInSize }}</div>
      </div>
      <div>
        <div class="text-gray-500">공간</div>
        <div class="text-blue-600">{{ Math.round((xInSize * ySize * zSize * 100) / (1000 * 1000 * 1000)) / 100 }}m³
        </div>
      </div>
      <div>
        <div class="text-gray-500">외형</div>
        <div class="text-purple-600">{{ Math.round((xSize * ySize * zSize * 100) / (1000 * 1000 * 1000)) / 100 }}m³
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-container {
  transform-style: preserve-3d;
  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
}

.box {
  border: 0.5px solid black;
}
</style>