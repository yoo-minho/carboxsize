<script setup>
// 직육면체 치수 props 정의
const props = defineProps({
  length: {
    type: Number,
    default: 300  // 길이 (mm) - X축
  },
  width: {
    type: Number,
    default: 300  // 너비 (mm) - Z축
  },
  height: {
    type: Number,
    default: 300  // 높이 (mm) - Y축
  }
});

// 회전 각도 상태 관리
const rotateX = ref(-20);
const rotateY = ref(30);
const rotateZ = ref(0);

// 마우스 드래그로 회전 구현
const isDragging = ref(false);
const lastMouseX = ref(0);
const lastMouseY = ref(0);
const boxRef = ref(null);

// 회전 각도 계산
const boxTransform = computed(() => {
  return `translate(-50%, -50%) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) rotateZ(${rotateZ.value}deg)`;
});

// 마우스 이벤트 핸들러
const handleMouseDown = (e) => {
  isDragging.value = true;
  lastMouseX.value = e.clientX;
  lastMouseY.value = e.clientY;
};

const handleMouseMove = (e) => {
  if (!isDragging.value) return;
  
  const deltaX = e.clientX - lastMouseX.value;
  const deltaY = e.clientY - lastMouseY.value;
  
  rotateY.value += deltaX * 0.5;
  rotateX.value += deltaY * 0.5;
  
  lastMouseX.value = e.clientX;
  lastMouseY.value = e.clientY;
};

const handleMouseUp = () => {
  isDragging.value = false;
};

// 회전 각도 제어
const resetRotation = () => {
  rotateX.value = -20;
  rotateY.value = 30;
  rotateZ.value = 0;
};

// 비율 계산 - 화면에 보기 좋게 조정
const scale = 0.5; // 스케일 조정 (mm -> px)

// 컴포넌트가 마운트될 때 이벤트 리스너 등록
onMounted(() => {
  window.addEventListener('mouseup', handleMouseUp);
  window.addEventListener('mousemove', handleMouseMove);
});

// 컴포넌트가 언마운트될 때 이벤트 리스너 제거
onUnmounted(() => {
  window.removeEventListener('mouseup', handleMouseUp);
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<template>
    <div class="box-model">
        <!-- 3D 직육면체 표현 -->
        <div class="box-3d-container">
            <div class="rotation-controls">
                <button @click="resetRotation">회전 초기화</button>
                <div class="axis-controls">
                    <label>X축 <input type="range" v-model.number="rotateX" min="-180" max="180" /></label>
                    <label>Y축 <input type="range" v-model.number="rotateY" min="-180" max="180" /></label>
                    <label>Z축 <input type="range" v-model.number="rotateZ" min="-180" max="180" /></label>
                </div>
            </div>

            <div ref="boxRef" class="box-3d" :style="{
                '--length': props.length * scale + 'px',
                '--width': props.width * scale + 'px',
                '--height': props.height * scale + 'px',
                transform: boxTransform
            }" @mousedown="handleMouseDown">
                <div class="face front"></div>
                <div class="face back"></div>
                <div class="face right"></div>
                <div class="face left"></div>
                <div class="face top"></div>
                <div class="face bottom"></div>

                <!-- 치수 표시 및 좌표축 -->
                <div class="dimension length-line">
                    <span class="dimension-label">X: {{ props.length }}mm</span>
                </div>
                <div class="dimension width-line">
                    <span class="dimension-label">Z: {{ props.width }}mm</span>
                </div>
                <div class="dimension height-line">
                    <span class="dimension-label">Y: {{ props.height }}mm</span>
                </div>

                <!-- 좌표축 표시 -->
                <div class="axis x-axis"></div>
                <div class="axis y-axis"></div>
                <div class="axis z-axis"></div>
            </div>
        </div>

        <!-- 치수 정보 -->
        <div class="dimensions-info">
            <div class="dimension-item">
                <div class="dimension-key">X축 (길이):</div>
                <div class="dimension-value">{{ props.length }}mm</div>
            </div>
            <div class="dimension-item">
                <div class="dimension-key">Z축 (너비):</div>
                <div class="dimension-value">{{ props.width }}mm</div>
            </div>
            <div class="dimension-item">
                <div class="dimension-key">Y축 (높이):</div>
                <div class="dimension-value">{{ props.height }}mm</div>
            </div>
            <div class="dimension-item">
                <div class="dimension-key">부피:</div>
                <div class="dimension-value">{{ (props.length * props.width * props.height / 1000000).toFixed(2) }}리터
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.box-model {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background-color: #f7f9fc;
    border-radius: 8px;
}

.box-3d-container {
    position: relative;
    width: 100%;
    height: 400px;
    perspective: 1000px;
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.rotation-controls {
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.rotation-controls button {
    background-color: #1a5fb4;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 15px;
    cursor: pointer;
    font-size: 14px;
}

.axis-controls {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
}

.axis-controls label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
}

.axis-controls input[type="range"] {
    width: 120px;
}

.box-3d {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-style: preserve-3d;
    cursor: grab;
    transition: transform 0.1s ease;
}

.box-3d:active {
    cursor: grabbing;
}

.face {
    position: absolute;
    border: 1px solid rgba(0, 0, 0, 0.3);
}

.front {
    width: var(--length);
    height: var(--height);
    transform: translate3d(0, 0, calc(var(--width) / 2));
    background-color: rgba(26, 95, 180, 0.2);
}

.back {
    width: var(--length);
    height: var(--height);
    transform: translate3d(0, 0, calc(var(--width) / -2));
    background-color: rgba(26, 95, 180, 0.1);
}

.right {
    width: var(--width);
    height: var(--height);
    transform: translate3d(calc(var(--length) / 2), 0, 0) rotateY(90deg);
    background-color: rgba(26, 95, 180, 0.15);
}

.left {
    width: var(--width);
    height: var(--height);
    transform: translate3d(calc(var(--length) / -2), 0, 0) rotateY(90deg);
    background-color: rgba(26, 95, 180, 0.15);
}

.top {
    width: var(--length);
    height: var(--width);
    transform: translate3d(0, calc(var(--height) / -2), 0) rotateX(90deg);
    background-color: rgba(26, 95, 180, 0.3);
}

.bottom {
    width: var(--length);
    height: var(--width);
    transform: translate3d(0, calc(var(--height) / 2), 0) rotateX(90deg);
    background-color: rgba(26, 95, 180, 0.25);
}

/* 좌표축 표시 */
.axis {
    position: absolute;
    transform-style: preserve-3d;
}

.x-axis {
    width: calc(var(--length) + 30px);
    height: 2px;
    background: linear-gradient(to right, transparent, #ff0000);
    transform: translate3d(15px, 0, 0);
}

.y-axis {
    width: 2px;
    height: calc(var(--height) + 30px);
    background: linear-gradient(to top, transparent, #00ff00);
    transform: translate3d(0, 15px, 0) rotateX(180deg);
}

.z-axis {
    width: 2px;
    height: calc(var(--width) + 30px);
    background: linear-gradient(to top, transparent, #0000ff);
    transform: translate3d(0, 0, 15px) rotateX(90deg) rotateY(90deg);
}

.dimension {
    position: absolute;
    background-color: #ff5252;
    z-index: 10;
}

.length-line {
    width: var(--length);
    height: 2px;
    transform: translate3d(0, calc(var(--height) + 20px), calc(var(--width) / 2));
}

.width-line {
    width: var(--width);
    height: 2px;
    transform: translate3d(calc(var(--length) / 2), calc(var(--height) + 20px), 0) rotateY(90deg);
}

.height-line {
    width: var(--height);
    height: 2px;
    transform: translate3d(calc(var(--length) / 2), 0, calc(var(--width) / 2 + 20px)) rotateZ(90deg);
}

.dimension-label {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 12px;
    white-space: nowrap;
    left: 50%;
    transform: translateX(-50%) translateY(-15px);
}

.dimensions-info {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

.dimension-item {
    background-color: white;
    padding: 8px 12px;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 6px;
}

.dimension-key {
    color: #666;
    font-size: 14px;
}

.dimension-value {
    font-size: 16px;
    font-weight: bold;
}
</style>