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
  { name: '성인사람', xSize: 500, ySize: 500, zSize: 1700, xInSize: 0 },
  { name: '주차장', xSize: 5000, ySize: 2300, zSize: 300, xInSize: 0 },
  { name: '2025 BYD atto 3', xSize: 4455, ySize: 1875, zSize: 1615, xInSize: 2720 },
  { name: '2025 BYD 씰', xSize: 4800, ySize: 1875, zSize: 1460, xInSize: 2920 },
  { name: '2025 기아 쏘렌토', xSize: 4815, ySize: 1900, zSize: 1700, xInSize: 2815 },
  { name: '2025 르노 QM6', xSize: 4675, ySize: 1845, zSize: 1700, xInSize: 2705 },
  { name: '2019 쉐보레 올란도', xSize: 4684, ySize: 1807, zSize: 1627, xInSize: 2796 },
  { name: '2016 르노 QM5', xSize: 4525, ySize: 1855, zSize: 1695, xInSize: 2690 },
  { name: '2025 기아 EV3', xSize: 4310, ySize: 1850, zSize: 1570, xInSize: 2680 },
  { name: '2025 기아 EV4', xSize: 4730, ySize: 1860, zSize: 1480, xInSize: 2820 },
  { name: '2025 기아 EV6', xSize: 4695, ySize: 1880, zSize: 1550, xInSize: 2900 },
  { name: '2025 기아 EV9', xSize: 5015, ySize: 1980, zSize: 1755, xInSize: 3100 },
  { name: '2024 테슬라 모델 3', xSize: 4720, ySize: 1935, zSize: 1440, xInSize: 2875 },
  { name: '2024 테슬라 모델 Y', xSize: 4750, ySize: 1920, zSize: 1625, xInSize: 2890 },
  { name: '2025 테슬라 모델 Y', xSize: 4790, ySize: 1980, zSize: 1635, xInSize: 2890 },
  { name: '2024 테슬라 사이버트럭', xSize: 5885, ySize: 2027, zSize: 1905, xInSize: 3635 },
  { name: '2024 현대 스타리아', xSize: 5255, ySize: 1995, zSize: 2000, xInSize: 3275 },
  { name: '2025 기아 카니발', xSize: 5155, ySize: 1995, zSize: 1775, xInSize: 3090 },
  { name: '2025 현대 펠리세이드', xSize: 5060, ySize: 1980, zSize: 1805, xInSize: 2970 },  
  { name: '2025 현대 싼타페', xSize: 4830, ySize: 1900, zSize: 1780, xInSize: 2815 },
  { name: '2025 현대 투싼', xSize: 4640, ySize: 1865, zSize: 1665, xInSize: 2755  },
  { name: '2025 기아 셀토스', xSize: 4390, ySize: 1880, zSize: 1620, xInSize: 2630 },
  { name: '2025 기아 스포티지', xSize: 4685, ySize: 1865, zSize: 1680, xInSize: 2755 },
  { name: '2023 기아 모닝', xSize: 3595, ySize: 1595, zSize: 1485, xInSize: 2400 },
  { name: '2025 현대 캐스퍼', xSize: 3595, ySize: 1595, zSize: 1605, xInSize: 2400 },
  { name: '2025 기아 레이', xSize: 3595, ySize: 1595, zSize: 1700, xInSize: 2520 },
  { name: '2023 기아 쏘울', xSize: 4196, ySize: 1801, zSize: 1600, xInSize: 2601 },
  { name: '2025 쉐보레 스파크 EUV', xSize: 3996, ySize: 1760, zSize: 1726, xInSize: 2520 },
  { name: '2025 현대 아반떼', xSize: 4710, ySize: 1825, zSize: 1420, xInSize: 2720 },
  { name: '2025 현대 그랜저', xSize: 5035, ySize: 1880, zSize: 1460, xInSize: 2895 },
  { name: '2025 KGM 토레스', xSize: 4705, ySize: 1890, zSize: 1720, xInSize: 2680 },  
  { name: '2024 람보르기니 우라칸', xSize: 4311, ySize: 1945, zSize: 1220, xInSize: 2620 },  
  { name: '2025 기아 니로 하이브리드', xSize: 4420, ySize: 1825, zSize: 1545, xInSize: 2720 },  
  { name: '2025 현대 코나', xSize: 4350, ySize: 1825, zSize: 1590, xInSize: 2660 },  
  { name: '2025 KGM 무쏘 칸', xSize: 5415, ySize: 1950, zSize: 1885, xInSize: 3210 },  
  { name: '2025 KGM 무쏘 EV', xSize: 5160, ySize: 1920, zSize: 1740, xInSize: 3150 },  
  { name: '2025 기아 타스만', xSize: 5410, ySize: 1930, zSize: 1870, xInSize: 3270 },
  { name: '2025 현대 아이오닉6', xSize: 5060, ySize: 1980, zSize: 1790, xInSize: 3130 },
  { name: '2025 현대 넥쏘', xSize: 4750, ySize: 1865, zSize: 1640, xInSize: 2790 },
  { name: '2025 현대 베뉴', xSize: 4040, ySize: 1770, zSize: 1585, xInSize: 2520 },
  { name: '2025 르노 그랑콜레오스', xSize: 4780, ySize: 1880, zSize: 1705, xInSize: 2820 },
]);

// 비교 모드 상태 관리
const isCompareMode = ref(false);

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
  <div class="p-4">
    <div class="flex flex-col gap-4 mb-6">
      <div
        class="text-4xl tracking-tighter font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        Car Box Size
      </div>
      <div class="text-center text-sm text-gray-500 max-w-2xl mx-auto tracking-tighter">
        디자인 배제하고 박스 볼륨 (전장 x 전폭 x 전고) 비교!
      </div>

      <div class="flex justify-center gap-3">
        <div class="bg-white rounded-full shadow-lg p-1 inline-flex">
          <button @click="isCompareMode = false"
            :class="`px-6 py-3 rounded-full transition-all font-medium ${!isCompareMode ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`">
            전체보기
          </button>
          <button @click="isCompareMode = true"
            :class="`px-6 py-3 rounded-full transition-all font-medium ${isCompareMode ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`">
            비교하기
          </button>
        </div>
        <button v-if="isCompareMode" @click="selectRandomVehicles"
          class="px-6 py-3 rounded-full transition-all bg-white shadow-lg text-gray-700 hover:bg-gray-50 hover:shadow-md flex items-center gap-1">
          <span>랜덤</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 비교 모드 UI -->
    <div v-if="isCompareMode" class="mb-8">
      <div class="bg-white p-6 rounded-xl shadow-lg">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(selectedVehicle, index) in selectedVehicles" :key="'select-' + index">
            <div class="flex items-center gap-2">
              <select v-model="selectedVehicles[index]"
                :class="`flex-1 p-3 border border-gray-300 bg-white rounded-lg shadow-sm`">
                <option :value="null" disabled>차량을 선택해주세요</option>
                <option v-for="vehicle in vehicles" :key="`${index}-${vehicle.name}`" :value="vehicle">
                  {{ vehicle.name }}
                </option>
              </select>
            </div>
            <div class="mt-4">
              <div v-if="selectedVehicle">
                <BoxBuilder v-model:xSize="selectedVehicle.xSize" v-model:ySize="selectedVehicle.ySize"
                  v-model:zSize="selectedVehicle.zSize" v-model:xInSize="selectedVehicle.xInSize"
                  v-model:rotationX="rotationX" v-model:rotationY="rotationY" v-model:rotationZ="rotationZ" />
              </div>
              <div v-else class="h-72 flex items-center justify-center bg-gray-100 rounded-lg">
                <p class="text-gray-500">차량을 선택해주세요</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 전체 차량 그리드 -->
    <div v-if="!isCompareMode" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <template v-for="(vehicle, index) in vehicles" :key="index">
        <BoxBuilder v-model:xSize="vehicle.xSize" v-model:ySize="vehicle.ySize" v-model:zSize="vehicle.zSize"
          v-model:xInSize="vehicle.xInSize" v-model:rotationX="rotationX" v-model:rotationY="rotationY"
          v-model:rotationZ="rotationZ" :title="vehicle.name" />
      </template>
    </div>
  </div>
</template>
<style>
body {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>