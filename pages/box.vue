<script setup lang="ts">
// 직육면체 치수 정의
const boxDimensions = reactive({
    length: 300, // 길이 (mm) - X축
    width: 300,  // 너비 (mm) - Z축
    height: 300  // 높이 (mm) - Y축
});

// 슬라이더 입력 처리
const updateDimension = (dimension: string, value: number) => {
    if (dimension in boxDimensions) {
        boxDimensions[dimension as keyof typeof boxDimensions] = value;
    }
};

// 부피 계산
const volume = computed(() => {
    return (boxDimensions.length * boxDimensions.width * boxDimensions.height / 1000000).toFixed(2);
});
</script>

<template>
    <div class="container">
        <h1>3D 직육면체 모델</h1>

        <div class="coordinate-guide">
            <h3>좌표계 안내</h3>
            <div class="axis-info">
                <div class="axis-item">
                    <div class="axis-color x-color"></div>
                    <div class="axis-details">
                        <div class="axis-name">X축 (길이)</div>
                        <div class="axis-desc">직육면체의 가로 방향 길이</div>
                    </div>
                </div>
                <div class="axis-item">
                    <div class="axis-color y-color"></div>
                    <div class="axis-details">
                        <div class="axis-name">Y축 (높이)</div>
                        <div class="axis-desc">직육면체의 세로 방향 높이</div>
                    </div>
                </div>
                <div class="axis-item">
                    <div class="axis-color z-color"></div>
                    <div class="axis-details">
                        <div class="axis-name">Z축 (너비)</div>
                        <div class="axis-desc">직육면체의 깊이 방향 너비</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="control-panel">
            <div class="dimension-controls">
                <h3>치수 조정</h3>
                <div class="control-group">
                    <label for="length">X축 (길이): {{ boxDimensions.length }}mm</label>
                    <input type="range" id="length" v-model.number="boxDimensions.length" min="100" max="1000" step="10"
                        @input="updateDimension('length', boxDimensions.length)" />
                </div>

                <div class="control-group">
                    <label for="height">Y축 (높이): {{ boxDimensions.height }}mm</label>
                    <input type="range" id="height" v-model.number="boxDimensions.height" min="50" max="500" step="10"
                        @input="updateDimension('height', boxDimensions.height)" />
                </div>

                <div class="control-group">
                    <label for="width">Z축 (너비): {{ boxDimensions.width }}mm</label>
                    <input type="range" id="width" v-model.number="boxDimensions.width" min="100" max="800" step="10"
                        @input="updateDimension('width', boxDimensions.width)" />
                </div>

                <div class="volume-display">
                    <div class="volume-label">부피:</div>
                    <div class="volume-value">{{ volume }} 리터</div>
                </div>
            </div>

            <div class="model-container">
                <BoxModel :length="boxDimensions.length" :width="boxDimensions.width" :height="boxDimensions.height" />
            </div>
        </div>

        <div class="info-text">
            <p>슬라이더를 움직여 직육면체의 크기를 조정하세요</p>
            <p>박스를 드래그하여 3D 모델을 회전시키거나 슬라이더로 축별 회전을 조정할 수 있습니다</p>
            <p>각 축은 색상으로 구분됩니다: X축(빨강), Y축(초록), Z축(파랑)</p>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

h3 {
    margin-bottom: 15px;
    color: #444;
    font-size: 18px;
}

.coordinate-guide {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
}

.axis-info {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.axis-item {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: white;
    padding: 10px;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    flex: 1;
    min-width: 180px;
}

.axis-color {
    width: 20px;
    height: 20px;
    border-radius: 4px;
}

.x-color {
    background-color: #ff0000;
}

.y-color {
    background-color: #00ff00;
}

.z-color {
    background-color: #0000ff;
}

.axis-name {
    font-weight: bold;
    font-size: 14px;
}

.axis-desc {
    font-size: 12px;
    color: #666;
    margin-top: 2px;
}

.control-panel {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.dimension-controls {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
}

.control-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
}

input[type="range"] {
    width: 100%;
    height: 8px;
    border-radius: 4px;
    outline: none;
    background: #ddd;
    appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #1a5fb4;
    cursor: pointer;
}

.volume-display {
    margin-top: 20px;
    padding: 10px;
    border-radius: 6px;
    background-color: rgba(26, 95, 180, 0.1);
    display: flex;
    align-items: center;
    gap: 10px;
}

.volume-label {
    font-weight: bold;
    color: #444;
}

.volume-value {
    font-size: 18px;
    color: #1a5fb4;
}

.model-container {
    margin: 0;
}

.info-text {
    text-align: center;
    color: #666;
    font-size: 14px;
    margin-top: 30px;
    line-height: 1.6;
    background-color: #efefef;
    padding: 15px;
    border-radius: 8px;
}

@media (min-width: 768px) {
    .control-panel {
        flex-direction: row;
    }

    .dimension-controls {
        width: 40%;
    }

    .model-container {
        width: 60%;
    }
}
</style>