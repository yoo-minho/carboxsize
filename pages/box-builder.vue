<script setup>
// 회전 값 설정
const rotationX = ref(22.5);
const rotationY = ref(112.5);
const rotationZ = ref(0);

// 선택된 차량 관리 (4개로 확장)
const selectedVehicles = ref([null, null, null, null]);

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

// 비교 모드 상태 관리
const isCompareMode = ref(false);

// 차량 색상 관리
const vehicleColors = [
  'rgba(59, 130, 246, 0.5)',  // 파란색
  'rgba(168, 85, 247, 0.5)',  // 보라색
  'rgba(236, 72, 153, 0.5)',  // 핑크색
  'rgba(16, 185, 129, 0.5)'   // 녹색
];

// 차량 라벨
const vehicleLabels = ['A', 'B', 'C', 'D'];

// 차량 선택 함수
const selectVehicle = (vehicle, slot) => {
  if (slot >= 0 && slot < selectedVehicles.value.length) {
    selectedVehicles.value[slot] = { ...vehicle };
  }
};

// 차량 선택 해제 함수
const clearSelection = (slot) => {
  if (slot >= 0 && slot < selectedVehicles.value.length) {
    selectedVehicles.value[slot] = null;
  }
};

// 랜덤 차량 선택 함수
const selectRandomVehicles = () => {
  // 사람과 주차장을 제외한 차량만 선택 (인덱스 2부터 시작)
  const carVehicles = vehicles.value.slice(2);
  
  // 이미 선택된 차량을 추적하기 위한 배열
  const selectedIndices = [];
  
  // 4개의 서로 다른 랜덤 차량 선택
  for (let i = 0; i < 4; i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * carVehicles.length);
    } while (selectedIndices.includes(randomIndex));
    
    selectedIndices.push(randomIndex);
    selectedVehicles.value[i] = { ...carVehicles[randomIndex] };
  }
};
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

        <!-- 비교 모드 / 전체 보기 모드 토글 -->
        <div class="flex justify-center mb-8">
            <button @click="isCompareMode = !isCompareMode"
                class="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                {{ isCompareMode ? '전체 차량 보기' : '차량 비교하기' }}
            </button>
        </div>

        <!-- 비교 모드 UI -->
        <div v-if="isCompareMode" class="mb-8">
            <!-- 차량 선택 영역 (셀렉트 박스) -->
            <div class="bg-white p-6 rounded-xl shadow-lg mb-8">
                <h3 class="text-xl font-bold mb-4">차량 선택</h3>
                <div class="flex justify-end mb-4">
                    <button @click="selectRandomVehicles"
                        class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow hover:shadow-lg transition-all transform hover:scale-105">
                        랜덤 차량 선택
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div v-for="(_, index) in selectedVehicles" :key="'select-' + index">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            차량 {{ vehicleLabels[index] }} 선택
                        </label>
                        <select @change="(e) => selectVehicle(vehicles.find(v => v.name === e.target.value), index)"
                            :class="`w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-${index === 0 ? 'blue' : index === 1 ? 'purple' : index === 2 ? 'pink' : 'green'}-500 focus:border-${index === 0 ? 'blue' : index === 1 ? 'purple' : index === 2 ? 'pink' : 'green'}-500`">
                            <option value="" selected disabled>차량을 선택해주세요</option>
                            <option v-for="vehicle in vehicles" :key="`${index}-${vehicle.name}`" :value="vehicle.name">
                                {{ vehicle.name }} ({{ vehicle.xSize }}×{{ vehicle.ySize }}×{{ vehicle.zSize }}mm)
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- 선택된 차량 표시 영역 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div v-for="(selectedVehicle, index) in selectedVehicles" :key="'selected-' + index"
                    class="bg-white p-4 rounded-xl shadow-lg">
                    <div class="mb-4 flex justify-between items-center">
                        <h3 class="text-lg font-semibold">차량 {{ vehicleLabels[index] }}</h3>
                        <button v-if="selectedVehicle" @click="clearSelection(index)"
                            class="text-red-500 hover:text-red-700">
                            <span class="text-xl">&times;</span>
                        </button>
                    </div>

                    <div v-if="selectedVehicle" class="flex justify-center">
                        <BoxBuilder v-model:xSize="selectedVehicle.xSize" v-model:ySize="selectedVehicle.ySize"
                            v-model:zSize="selectedVehicle.zSize" v-model:xInSize="selectedVehicle.xInSize"
                            v-model:rotationX="rotationX" v-model:rotationY="rotationY" v-model:rotationZ="rotationZ"
                            :boxColor="vehicleColors[index]" :title="selectedVehicle.name" />
                    </div>
                    <div v-else class="h-72 flex items-center justify-center bg-gray-100 rounded-lg">
                        <p class="text-gray-500">차량을 선택해주세요</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 회전 조정 영역 -->
        <div v-if="!isCompareMode" class="bg-white p-6 rounded-xl shadow-lg mb-8 max-w-md mx-auto">
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

        <!-- 전체 차량 그리드 -->
        <div v-if="!isCompareMode" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="(vehicle, index) in vehicles" :key="index" class="flex justify-center">
                <BoxBuilder v-model:xSize="vehicle.xSize" v-model:ySize="vehicle.ySize" v-model:zSize="vehicle.zSize"
                    v-model:xInSize="vehicle.xInSize" v-model:rotationX="rotationX" v-model:rotationY="rotationY"
                    v-model:rotationZ="rotationZ" :boxColor="'rgba(0,0,0,0.2)'" :title="vehicle.name" />
            </div>
        </div>
    </div>
</template>