<script setup>
// 차량 치수 props 정의
const props = defineProps({
  length: {
    type: Number,
    default: 4455  // 전장 (mm)
  },
  width: {
    type: Number,
    default: 1875  // 전폭 (mm)
  },
  height: {
    type: Number,
    default: 1615  // 전고 (mm)
  },
  wheelbase: {
    type: Number,
    default: 2720  // 축거 (mm)
  }
});

// 비율 계산 - 화면에 보기 좋게 조정
const scale = 0.05; // 스케일 조정 (mm -> px)
</script>

<template>
    <div class="car-blueprint">
        <!-- 상단 뷰 -->
        <div class="view top-view">
            <h3>상단 뷰</h3>
            <div class="car-shape top" :style="{
                width: props.length * scale + 'px',
                height: props.width * scale + 'px'
            }">
                <!-- 축거 표시 -->
                <div class="wheelbase-line" :style="{
                    width: props.wheelbase * scale + 'px',
                    left: (props.length - props.wheelbase) * scale / 2 + 'px'
                }">
                    <span class="dimension-label">{{ props.wheelbase }}mm</span>
                </div>
                <!-- 전폭 표시 -->
                <div class="width-line">
                    <span class="dimension-label">{{ props.width }}mm</span>
                </div>
                <!-- 전장 표시 -->
                <div class="length-line">
                    <span class="dimension-label">{{ props.length }}mm</span>
                </div>
            </div>
        </div>

        <!-- 측면 뷰 -->
        <div class="view side-view">
            <h3>측면 뷰</h3>
            <div class="car-shape side" :style="{
                width: props.length * scale + 'px',
                height: props.height * scale + 'px'
            }">
                <!-- 전고 표시 -->
                <div class="height-line">
                    <span class="dimension-label">{{ props.height }}mm</span>
                </div>
                <!-- 축거 표시 -->
                <div class="wheelbase-line" :style="{
                    width: props.wheelbase * scale + 'px',
                    left: (props.length - props.wheelbase) * scale / 2 + 'px'
                }">
                </div>
            </div>
        </div>

        <!-- 정면 뷰 -->
        <div class="view front-view">
            <h3>정면 뷰</h3>
            <div class="car-shape front" :style="{
                width: props.width * scale + 'px',
                height: props.height * scale + 'px'
            }">
            </div>
        </div>
    </div>
</template>

<style scoped>
.car-blueprint {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 20px;
    background-color: #f7f9fc;
    border-radius: 8px;
}

.view {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

h3 {
    margin-bottom: 10px;
    color: #333;
    font-size: 16px;
}

.car-shape {
    position: relative;
    border: 2px solid #1a5fb4;
    border-radius: 8px;
    background-color: rgba(26, 95, 180, 0.1);
}

/* 상단 뷰 스타일 */
.car-shape.top {
    border-radius: 30px;
}

/* 측면 뷰 스타일 */
.car-shape.side {
    border-radius: 20px 20px 5px 5px;
}

/* 정면 뷰 스타일 */
.car-shape.front {
    border-radius: 15px 15px 5px 5px;
}

/* 치수 표시 라인 */
.wheelbase-line,
.width-line,
.height-line,
.length-line {
    position: absolute;
    background-color: #ff5252;
}

/* 축거 선 */
.wheelbase-line {
    height: 2px;
    bottom: -20px;
}

.wheelbase-line::before,
.wheelbase-line::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 8px;
    background-color: #ff5252;
    top: -3px;
}

.wheelbase-line::before {
    left: 0;
}

.wheelbase-line::after {
    right: 0;
}

/* 전폭 선 */
.width-line {
    width: 2px;
    height: 100%;
    top: 0;
    right: -20px;
}

.width-line::before,
.width-line::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 2px;
    background-color: #ff5252;
    left: -3px;
}

.width-line::before {
    top: 0;
}

.width-line::after {
    bottom: 0;
}

/* 전고 선 */
.height-line {
    width: 2px;
    height: 100%;
    top: 0;
    right: -20px;
}

.height-line::before,
.height-line::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 2px;
    background-color: #ff5252;
    left: -3px;
}

.height-line::before {
    top: 0;
}

.height-line::after {
    bottom: 0;
}

/* 전장 선 */
.length-line {
    width: 100%;
    height: 2px;
    bottom: -40px;
}

.length-line::before,
.length-line::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 8px;
    background-color: #ff5252;
    top: -3px;
}

.length-line::before {
    left: 0;
}

.length-line::after {
    right: 0;
}

/* 치수 레이블 */
.dimension-label {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 10px;
    white-space: nowrap;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
}

.height-line .dimension-label {
    transform: rotate(90deg) translateX(-50%);
    transform-origin: left center;
    left: 10px;
    top: 50%;
}

.width-line .dimension-label {
    transform: rotate(90deg) translateX(-50%);
    transform-origin: left center;
    left: 10px;
    top: 50%;
}
</style>