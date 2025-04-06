<script setup lang="ts">
// 차량 치수 정의
const carDimensions = {
    length: 4455, // 전장 (mm)
    width: 1875,  // 전폭 (mm)
    height: 1615, // 전고 (mm)
    wheelbase: 2720 // 축거 (mm)
};

// 활성화된 치수 뷰 상태
const activeView = ref('all'); // 'all', 'length', 'width', 'height', 'wheelbase'

// 뷰 전환 함수
const setActiveView = (view: string) => {
    activeView.value = view;
};
</script>

<template>
    <div>
        <div class="car-info">
            <h2>차량 치수</h2>
            <div class="dimensions">
                <div :class="['dimension-item', { active: activeView === 'length' || activeView === 'all' }]"
                    @click="setActiveView(activeView === 'length' ? 'all' : 'length')">
                    <div class="dimension-label">전장</div>
                    <div class="dimension-value">4,455mm</div>
                </div>
                <div :class="['dimension-item', { active: activeView === 'width' || activeView === 'all' }]"
                    @click="setActiveView(activeView === 'width' ? 'all' : 'width')">
                    <div class="dimension-label">전폭</div>
                    <div class="dimension-value">1,875mm</div>
                </div>
                <div :class="['dimension-item', { active: activeView === 'height' || activeView === 'all' }]"
                    @click="setActiveView(activeView === 'height' ? 'all' : 'height')">
                    <div class="dimension-label">전고</div>
                    <div class="dimension-value">1,615mm</div>
                </div>
                <div :class="['dimension-item', { active: activeView === 'wheelbase' || activeView === 'all' }]"
                    @click="setActiveView(activeView === 'wheelbase' ? 'all' : 'wheelbase')">
                    <div class="dimension-label">축거</div>
                    <div class="dimension-value">2,720mm</div>
                </div>
            </div>
        </div>

        <div class="model-container">
            <!-- CSS 기반 차량 모델 컴포넌트 -->
            <CarModel :length="carDimensions.length" :width="carDimensions.width" :height="carDimensions.height"
                :wheelbase="carDimensions.wheelbase" />
        </div>

        <div class="guide-text">
            <p>각 치수를 클릭하면 해당 치수에 초점을 맞출 수 있습니다</p>
        </div>
    </div>
</template>

<style scoped>
.car-info {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
}

.dimensions {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 15px;
}

.dimension-item {
    background-color: white;
    padding: 10px 15px;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-width: 150px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.dimension-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.dimension-item.active {
    border: 2px solid #1a5fb4;
    background-color: #e6f0ff;
}

.dimension-label {
    color: #666;
    font-size: 14px;
}

.dimension-value {
    font-size: 18px;
    font-weight: bold;
    margin-top: 5px;
}

.model-container {
    margin-top: 30px;
}

.guide-text {
    text-align: center;
    margin-top: 20px;
    color: #666;
    font-size: 14px;
}
</style>