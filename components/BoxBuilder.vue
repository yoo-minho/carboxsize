<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// defineModel을 사용하여 v-model 바인딩 속성 정의
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
    default: 'rgba(0,0,0,0.5)'
  },
  title: {
    type: String,
    default: '직육면체'
  }
});

const emit = defineEmits(['update:rotationX', 'update:rotationY', 'update:rotationZ', 
                          'update:xSize', 'update:ySize', 'update:zSize']);

// 실제 픽셀 값을 계산하는 함수
const calculatePixels = (mm) => {
  return mm * 1/18;
};

// Y축 애니메이션을 위한 추가 변수
const animationOffset = ref(0);
let animationFrameId = null;

// Y축 애니메이션 효과 - 더 부드러운 애니메이션을 위해 requestAnimationFrame 사용
onMounted(() => {
  let direction = 1;
  let lastTime = 0;
  const animationSpeed = 0.3; // 애니메이션 속도 조절
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
    <div class="flex flex-col">
        <div class="bg-white p-4 rounded-t-xl shadow-lg">
            <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
        </div>
        <div class="bg-gradient-to-br from-gray-200 to-gray-500 p-6 shadow-lg flex items-center justify-center">
            <div class="box-container w-72 h-72 relative"
                :style="{ transform: `rotateX(${rotationX}deg) rotateY(${rotationY + animationOffset}deg) rotateZ(${rotationZ}deg)` }">
                <div class="box absolute preserve-3d transition-transform" :style="{
                    width: `${calculatePixels(xSize)}px`,
                    height: `${calculatePixels(zSize)}px`,
                    transform: `translateZ(${calculatePixels(ySize) / 2}px)`,
                    backgroundColor: boxColor,
                }"></div>
                <div class="box absolute preserve-3d transition-transform" :style="{
                    width: `${calculatePixels(xSize)}px`,
                    height: `${calculatePixels(zSize)}px`,
                    transform: `translateZ(${-calculatePixels(ySize) / 2}px)`,
                    backgroundColor: boxColor,
                }"></div>
                <div class="box absolute preserve-3d transition-transform" :style="{
                    width: `${calculatePixels(xSize)}px`,
                    height: `${calculatePixels(ySize)}px`,
                    transform: `rotateX(90deg) translateZ(${calculatePixels(zSize) / 2}px)`,
                    backgroundColor: boxColor,
                }"></div>
                <div class="box absolute preserve-3d transition-transform" :style="{
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
                }"></div>
                <div class="box absolute preserve-3d transition-transform" :style="{
                    width: `${calculatePixels(ySize)}px`,
                    height: `${calculatePixels(zSize)}px`,
                    transform: `rotateY(90deg) translateZ(${-calculatePixels(xSize) / 2}px)`,
                    backgroundColor: boxColor,
                }"></div>
            </div>
        </div>
        <div class="bg-white p-6 rounded-b-xl shadow-lg grid grid-cols-3 text-xs">
            <div>
                <div class="text-gray-500">전장(mm)</div>
                <div>{{ xSize }}</div>
            </div>
            <div>
                <div class="text-gray-500">전폭(mm)</div>
                <div>{{ ySize }}</div>
            </div>
            <div>
                <div class="text-gray-500">전고(mm)</div>
                <div>{{ zSize }}</div>
            </div>
            <div>
                <div class="text-gray-500">축거(mm)</div>
                <div>{{ xInSize }}</div>
            </div>
            <div>
                <div class="text-gray-500">공간효율성</div>
                <div>{{ Math.round((xInSize * 1000) / xSize) / 10 }}%</div>
            </div>
            <div>
                <div class="text-gray-500">볼륨</div>
                <div>{{ Math.round((xSize * ySize * zSize * 10) / (1000 * 1000 * 1000)) / 10 }}m³</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.box-container {
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    will-change: transform;
}

.box {
    position: absolute;
    transform-style: preserve-3d;
    transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    border: 1px solid rgba(0, 0, 0);
    will-change: transform, width, height;
    /* box-shadow: 0 0 15px rgba(0, 0, 0, 0.05); */
    /* backdrop-filter: blur(5px); */
}

.preserve-3d {
    transform-style: preserve-3d;
}

input[type="range"] {
    -webkit-appearance: none;
    height: 8px;
    border-radius: 4px;
    background: #e0e0e0;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #3490dc;
    cursor: pointer;
}

.transition-transform {
    transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    will-change: transform;
}
</style>