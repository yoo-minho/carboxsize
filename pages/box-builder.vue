<script setup>
// 회전 값 설정
const rotationX = ref(22.5);
const rotationY = ref(157.5);
const rotationZ = ref(0);

// 차량 데이터 배열로 관리
const vehicles = ref([
  // 첫 번째 행
  { name: '사람', xSize: 500, ySize: 500, zSize: 1700, xInSize: 0 },
  { name: '주차장', xSize: 5000, ySize: 2300, zSize: 500, xInSize: 0 },
  { name: '2025 BYD atto 3', xSize: 4455, ySize: 1875, zSize: 1615, xInSize: 2720 },
  { name: '2025 기아 쏘렌토', xSize: 4815, ySize: 1900, zSize: 1700, xInSize: 2815 },
  { name: '2025 르노 QM6', xSize: 4675, ySize: 1845, zSize: 1700, xInSize: 2705 },
  { name: '2019 쉐보레 올란도', xSize: 4684, ySize: 1807, zSize: 1627, xInSize: 2796 },
  { name: '2016 르노 QM5', xSize: 4525, ySize: 1855, zSize: 1695, xInSize: 2690 },
  { name: '2025 기아 EV3', xSize: 4310, ySize: 1850, zSize: 1570, xInSize: 2680 },
  { name: '2024 테슬라 모델 3', xSize: 4720, ySize: 1935, zSize: 1440, xInSize: 2875 },
  { name: '2025 테슬라 모델 Y', xSize: 4790, ySize: 1980, zSize: 1635, xInSize: 2890 },
  { name: '2024 현대 스타리아', xSize: 5255, ySize: 1995, zSize: 2000, xInSize: 3275 },
  { name: '2025 기아 카니발', xSize: 5155, ySize: 1995, zSize: 1775, xInSize: 3090 },
  { name: '2025 현대 투싼', xSize: 4640, ySize: 1865, zSize: 1665, xInSize: 2755  },
  { name: '2025 현대 싼타페', xSize: 4830, ySize: 1900, zSize: 1780, xInSize: 2815 },
  { name: '2023 기아 모닝', xSize: 3595, ySize: 1595, zSize: 1485, xInSize: 2400 },
  { name: '2025 현대 캐스퍼', xSize: 3595, ySize: 1595, zSize: 1605, xInSize: 2400 },
  { name: '2025 기아 레이', xSize: 3595, ySize: 1595, zSize: 1700, xInSize: 2520 },
  { name: '2025 쉐보레 스파크 EUV', xSize: 3996, ySize: 1760, zSize: 1726, xInSize: 2520 },
  { name: '2025 현대 아반떼', xSize: 4710, ySize: 1825, zSize: 1420, xInSize: 2720 },
  { name: '2025 KGM 토레스 (일반/하이브리드)', xSize: 4705, ySize: 1890, zSize: 1720, xInSize: 2680 },
  
]);
</script>

<template>
    <div class="container mx-auto my-8 px-4">
        <div
            class="text-4xl tracking-tighter font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Car Space Size
        </div>
        <div class="text-sm text-gray-400 mb-4 max-w-2xl mx-auto">
            전장, 전폭, 전고만으로 차량의 실제 크기를 비교해보세요. 디자인 요소를 배제하고 순수한 차량 공간 크기만 확인할 수 있습니다.
        </div>
        <div class="bg-white p-6 rounded-xl shadow-lg mb-8 max-w-md mx-auto">
            <h2 class="text-xl font-bold mb-4 text-center">회전 조정</h2>
            <div class="flex gap-4">
                <input type="number" v-model="rotationX" min="0" max="360" step="22.5"
                    class="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                <input type="number" v-model="rotationY" min="0" max="360" step="22.5"
                    class="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                <input type="number" v-model="rotationZ" min="0" max="360" step="22.5"
                    class="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="(vehicle, index) in vehicles" :key="index" class="flex justify-center">
                <BoxBuilder v-model:xSize="vehicle.xSize" v-model:ySize="vehicle.ySize" v-model:zSize="vehicle.zSize"
                    v-model:xInSize="vehicle.xInSize" v-model:rotationX="rotationX" v-model:rotationY="rotationY"
                    v-model:rotationZ="rotationZ" :boxColor="'rgba(0,0,0,0.2)'" :title="vehicle.name" />
            </div>
        </div>
    </div>
</template>