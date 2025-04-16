<script setup>
// 회전 값 설정
const rotationX = ref(22.5);
const rotationY = ref(112.5);
const rotationZ = ref(0);

// 선택된 차량 관리 (4개로 확장)
const selectedVehicles = ref([null, null]);

// 차량 데이터 배열로 관리
const vehicles = ref([
  // 첫 번째 행
  { name: '성인사람', xSize: 500, ySize: 500, zSize: 1700, xInSize: 0 },
  { name: '주차장', xSize: 5000, ySize: 2300, zSize: 300, xInSize: 0 },

  //{ name: '현대 뉴 슈퍼 에어로시티 (bus)', xSize: 10955, ySize: 2490, zSize: 3180, xInSize: 5400 },
  //{ name: 'K1A1 전차', xSize: 9710, ySize: 3590, zSize: 2250, xInSize: 0 },
  //{ name: 'K9 자주포', xSize: 7440, ySize: 3500, zSize: 3400, xInSize: 0 },
  //{ name: 'K-511 군용트럭 (일명 두돈반)', xSize: 6712, ySize: 2483, zSize: 2845, xInSize: 0 },

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
  { name: '2009 현대 싼타페 CM', xSize: 4675, ySize: 1890, zSize: 1725, xInSize: 2700 },
  { name: '2012 현대 싼타페 DM', xSize: 4685, ySize: 1890, zSize: 1750, xInSize: 2700 },
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

// 정렬 기준 상태 관리
const sortBy = ref('spaceVolume'); // 기본값: 공간볼륨순
const sortOrder = ref('asc'); // 기본값: 오름차순

// 볼륨 계산 함수
const calculateVolume = (x, y, z) => {
  return Math.round((x * y * z * 100) / (1000 * 1000 * 1000)) / 100;
};

// 정렬된 차량 목록 계산
const sortedVehicles = computed(() => {
  return [...vehicles.value]
    .filter(vehicle => {
      // 정렬 기준에 따라 0인 항목 필터링
      switch (sortBy.value) {
        case 'xSize':
          return vehicle.xSize > 0;
        case 'ySize':
          return vehicle.ySize > 0;
        case 'zSize':
          return vehicle.zSize > 0;
        case 'xInSize':
          return vehicle.xInSize > 0;
        case 'boxVolume':
          return vehicle.xSize > 0 && vehicle.ySize > 0 && vehicle.zSize > 0;
        case 'spaceVolume':
          return vehicle.xInSize > 0 && vehicle.ySize > 0 && vehicle.zSize > 0;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      // 우선순위에 따른 정렬 함수 배열
      const sortFunctions = [
        // 1순위: 공간볼륨
        (a, b) => {
          const valueA = calculateVolume(a.xInSize, a.ySize, a.zSize);
          const valueB = calculateVolume(b.xInSize, b.ySize, b.zSize);
          return valueA - valueB;
        },
        // 2순위: 박스볼륨
        (a, b) => {
          const valueA = calculateVolume(a.xSize, a.ySize, a.zSize);
          const valueB = calculateVolume(b.xSize, b.ySize, b.zSize);
          return valueA - valueB;
        },
        // 3순위: 축거
        (a, b) => a.xInSize - b.xInSize,
        // 4순위: 전장
        (a, b) => a.xSize - b.xSize,
        // 5순위: 전고
        (a, b) => a.zSize - b.zSize,
        // 6순위: 전폭
        (a, b) => a.ySize - b.ySize
      ];

      // 현재 정렬 기준에 맞는 우선순위 인덱스 찾기
      const currentSortIndex = {
        'spaceVolume': 0,
        'boxVolume': 1,
        'xInSize': 2,
        'xSize': 3,
        'zSize': 4,
        'ySize': 5
      }[sortBy.value];

      // 현재 정렬 기준부터 시작하여 동률이면 다음 우선순위로 정렬
      for (let i = currentSortIndex; i < sortFunctions.length; i++) {
        const result = sortFunctions[i](a, b);
        if (result !== 0) {
          return sortOrder.value === 'asc' ? result : -result;
        }
      }
      
      return 0;
    });
});

// 정렬 기준 변경 함수
const changeSort = (newSortBy) => {
  if (sortBy.value === newSortBy) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = newSortBy;
    sortOrder.value = 'asc';
  }
};

// 랜덤 차량 선택 함수
const selectRandomVehicles = () => {
  // 사람과 주차장을 제외한 차량만 선택 (인덱스 2부터 시작)
  const carVehicles = vehicles.value.slice(2);
  
  // 이미 선택된 차량을 추적하기 위한 배열
  const selectedIndices = [];
  
  // 4개의 서로 다른 랜덤 차량 선택
  for (let i = 0; i < 2; i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * carVehicles.length);
    } while (selectedIndices.includes(randomIndex));
    
    selectedIndices.push(randomIndex);
    selectedVehicles.value[i] = { ...carVehicles[randomIndex] };
  }
};

// 스크롤 상태 관리
const isHeaderVisible = ref(true);
let lastScrollTop = 0;

// 스크롤 이벤트 핸들러
const handleScroll = () => {
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
    // 아래로 스크롤할 때
    isHeaderVisible.value = false;
  } else {
    // 위로 스크롤할 때
    isHeaderVisible.value = true;
  }
  
  lastScrollTop = currentScrollTop;
};

// 모드 전환 핸들러
const handleModeChange = (mode) => {
  isCompareMode.value = mode;
  if(mode) {
    selectRandomVehicles();
  }
};

// 스크롤 이벤트 리스너 등록
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <!-- 헤더 -->
  <header :class="[
    'fixed top-0 left-0 right-0 z-50 transition-transform duration-300 h-16',
    isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
  ]">
    <div class="max-w-md mx-auto bg-white shadow-md w-full h-full relative">
      <div class="max-w-md mx-auto px-4 py-3 h-full flex items-center">
        <div class="flex flex-col items-center w-full">
          <div class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Car Box Size
          </div>
          <div class="text-xs text-gray-500 tracking-tighter">
            <span class="text-blue-600">공간 = 축거</span> x 전폭 x 전고 / <span class="text-purple-600">외형 = 전장</span> x 전폭 x
            전고
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- 메인 컨텐츠 -->
  <main class="pt-16 max-w-md mx-auto bg-gray-100 min-h-[calc(100vh-96px)]">
    <div class="m-4">
      <div v-if="isCompareMode">
        <div class="grid grid-cols-2 gap-4">
          <div v-for="(selectedVehicle, index) in selectedVehicles" :key="'select-' + index">
            <div class="flex items-center gap-2">
              <select v-model="selectedVehicles[index]"
                :class="`w-full p-3 border border-gray-300 bg-white rounded-t-lg shadow-sm`">
                <option :value="null" disabled>차량을 선택해주세요</option>
                <option v-for="vehicle in vehicles" :key="`${index}-${vehicle.name}`" :value="vehicle">
                  {{ vehicle.name }}
                </option>
              </select>
            </div>
            <div>
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

        <!-- 비교 표 -->
        <div v-if="selectedVehicles[0] && selectedVehicles[1]" class="my-4 bg-white rounded-lg shadow-lg p-4">
          <div class="text-center font-medium text-gray-700 mb-4">차량 크기 비교</div>
          <div class="w-full text-sm flex flex-col">
            <!-- 공간 크기 -->
            <div class="flex gap-2">
              <div class="text-blue-600">공간</div>
              <div class="flex-1">
                <span
                  v-if="calculateVolume(selectedVehicles[0].xInSize, selectedVehicles[0].ySize, selectedVehicles[0].zSize) > calculateVolume(selectedVehicles[1].xInSize, selectedVehicles[1].ySize, selectedVehicles[1].zSize)">
                  <b>{{ selectedVehicles[0].name }}</b> 차가 {{ (calculateVolume(selectedVehicles[0].xInSize,
                    selectedVehicles[0].ySize, selectedVehicles[0].zSize)
                    - calculateVolume(selectedVehicles[1].xInSize, selectedVehicles[1].ySize,
                      selectedVehicles[1].zSize)).toFixed(2) }}m³ 더 크다
                </span>
                <span
                  v-else-if="calculateVolume(selectedVehicles[1].xInSize, selectedVehicles[1].ySize, selectedVehicles[1].zSize) > calculateVolume(selectedVehicles[0].xInSize, selectedVehicles[0].ySize, selectedVehicles[0].zSize)">
                  <b>{{ selectedVehicles[1].name }}</b> 차가 {{ (calculateVolume(selectedVehicles[1].xInSize,
                    selectedVehicles[1].ySize, selectedVehicles[1].zSize)
                    - calculateVolume(selectedVehicles[0].xInSize, selectedVehicles[0].ySize,
                      selectedVehicles[0].zSize)).toFixed(2) }}m³ 더 크다
                </span>
                <span v-else class="text-gray-500">
                  두 차량의 공간 크기가 같습니다
                </span>
              </div>
            </div>

            <!-- 외형 크기 -->
            <div class="flex gap-2">
              <div class="text-purple-600">외형</div>
              <div class="flex-1">
                <span
                  v-if="calculateVolume(selectedVehicles[0].xSize, selectedVehicles[0].ySize, selectedVehicles[0].zSize) > calculateVolume(selectedVehicles[1].xSize, selectedVehicles[1].ySize, selectedVehicles[1].zSize)">
                  <b>{{ selectedVehicles[0].name }}</b> 차가 {{ (calculateVolume(selectedVehicles[0].xSize,
                    selectedVehicles[0].ySize, selectedVehicles[0].zSize) -
                    calculateVolume(selectedVehicles[1].xSize, selectedVehicles[1].ySize,
                      selectedVehicles[1].zSize)).toFixed(2) }}m³ 더 크다
                </span>
                <span
                  v-else-if="calculateVolume(selectedVehicles[1].xSize, selectedVehicles[1].ySize, selectedVehicles[1].zSize) > calculateVolume(selectedVehicles[0].xSize, selectedVehicles[0].ySize, selectedVehicles[0].zSize)">
                  <b>{{ selectedVehicles[1].name }}</b> 차가 {{ (calculateVolume(selectedVehicles[1].xSize,
                    selectedVehicles[1].ySize, selectedVehicles[1].zSize) -
                    calculateVolume(selectedVehicles[0].xSize, selectedVehicles[0].ySize,
                      selectedVehicles[0].zSize)).toFixed(2) }}m³ 더 크다
                </span>
                <span v-else class="text-gray-500">
                  두 차량의 외형 크기가 같습니다
                </span>
              </div>
            </div>

            <!-- 축거 -->
            <div class="flex gap-2">
              <div>축거</div>
              <div class="flex-1">
                <span v-if="selectedVehicles[0].xInSize > selectedVehicles[1].xInSize">
                  <b>{{ selectedVehicles[0].name }}</b> 차가 {{ selectedVehicles[0].xInSize - selectedVehicles[1].xInSize
                  }}mm 더
                  길다
                </span>
                <span v-else-if="selectedVehicles[1].xInSize > selectedVehicles[0].xInSize">
                  <b>{{ selectedVehicles[1].name }}</b> 차가 {{ selectedVehicles[1].xInSize - selectedVehicles[0].xInSize
                  }}mm 더
                  길다
                </span>
                <span v-else class="text-gray-500">
                  두 차량의 축거가 같습니다
                </span>
              </div>
            </div>

            <!-- 전장 -->
            <div class="flex gap-2">
              <div>전장</div>
              <div class="flex-1">
                <span v-if="selectedVehicles[0].xSize > selectedVehicles[1].xSize">
                  <b>{{ selectedVehicles[0].name }}</b> 차가 {{ selectedVehicles[0].xSize - selectedVehicles[1].xSize }}mm
                  더 길다
                </span>
                <span v-else-if="selectedVehicles[1].xSize > selectedVehicles[0].xSize">
                  <b>{{ selectedVehicles[1].name }}</b> 차가 {{ selectedVehicles[1].xSize - selectedVehicles[0].xSize }}mm
                  더 길다
                </span>
                <span v-else class="text-gray-500">
                  두 차량의 전장이 같습니다
                </span>
              </div>
            </div>

            <!-- 전폭 -->
            <div class="flex gap-2">
              <div>전폭</div>
              <div class="flex-1">
                <span v-if="selectedVehicles[0].ySize > selectedVehicles[1].ySize">
                  <b>{{ selectedVehicles[0].name }}</b> 차가 {{ selectedVehicles[0].ySize - selectedVehicles[1].ySize }}mm
                  더 넓다
                </span>
                <span v-else-if="selectedVehicles[1].ySize > selectedVehicles[0].ySize">
                  <b>{{ selectedVehicles[1].name }}</b> 차가 {{ selectedVehicles[1].ySize - selectedVehicles[0].ySize }}mm
                  더 넓다
                </span>
                <span v-else class="text-gray-500">
                  두 차량의 전폭이 같습니다
                </span>
              </div>
            </div>

            <!-- 전고 -->
            <div class="flex gap-2">
              <div>전고</div>
              <div class="flex-1">
                <span v-if="selectedVehicles[0].zSize > selectedVehicles[1].zSize">
                  <b>{{ selectedVehicles[0].name }}</b> 차가 {{ selectedVehicles[0].zSize - selectedVehicles[1].zSize }}mm
                  더 높다
                </span>
                <span v-else-if="selectedVehicles[1].zSize > selectedVehicles[0].zSize">
                  <b>{{ selectedVehicles[1].name }}</b> 차가 {{ selectedVehicles[1].zSize - selectedVehicles[0].zSize }}mm
                  더 높다
                </span>
                <span v-else class="text-gray-500">
                  두 차량의 전고가 같습니다
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex justify-center gap-3">
            <button @click="selectRandomVehicles"
              class="px-6 py-3 rounded-full transition-all bg-white shadow-lg text-gray-700 hover:bg-gray-50 hover:shadow-md flex items-center gap-1">
              <span>랜덤</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-6 gap-2 w-full">
            <button v-for="(label, value) in {
              spaceVolume: '공간',
              boxVolume: '외형',
              xInSize: '축거',
              xSize: '전장',
              zSize: '전고',
              ySize: '전폭'
            }" :key="value" @click="changeSort(value)" :class="[
              'px-2 py-2 rounded-lg transition-all font-medium text-xs w-full',
              sortBy === value
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            ]">
              {{ label }}
              <span v-if="sortBy === value" class="ml-1">
                {{ sortOrder === 'asc' ? '↑' : '↓' }}
              </span>
            </button>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <template v-for="(vehicle, index) in sortedVehicles" :key="index">
              <BoxBuilder v-model:xSize="vehicle.xSize" v-model:ySize="vehicle.ySize" v-model:zSize="vehicle.zSize"
                v-model:xInSize="vehicle.xInSize" v-model:rotationX="rotationX" v-model:rotationY="rotationY"
                v-model:rotationZ="rotationZ" :title="vehicle.name" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- 하단 푸터 네비게이션 -->
  <footer class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg max-w-md mx-auto">
    <div class="max-w-md mx-auto">
      <div class="flex justify-around items-center h-16">
        <button @click="handleModeChange(false)" :class="[
          'flex-1 h-full flex flex-col items-center justify-center gap-1 transition-all',
          !isCompareMode ? 'text-blue-600' : 'text-gray-500'
        ]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span class="text-xs">전체보기</span>
        </button>
        <button @click="handleModeChange(true)" :class="[
          'flex-1 h-full flex flex-col items-center justify-center gap-1 transition-all',
          isCompareMode ? 'text-blue-600' : 'text-gray-500'
        ]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span class="text-xs">비교하기</span>
        </button>
      </div>
      <!-- 크레딧 바 -->
      <div class="h-8 text-xs text-white bg-black flex items-center justify-center gap-2">
        <span class="flex items-center justify-center cursor-pointer"
          @click="navigateTo('https://www.threads.net/@irontaek', { external: true, open: { target: '_blank' } })">
          made by 유철택
          <Icon name="ph:threads-logo" />
        </span>
        <span> · </span>
        <span class="">
          powered by <span class="underline underline-offset-2 cursor-pointer"
            @click="navigateTo('https://make1k.app', { external: true, open: { target: '_blank' } })">make1k.app</span>
        </span>
      </div>
    </div>
  </footer>
</template>
<style>
body {
  background-color: rgba(0, 0, 0, 0.1);
  padding-bottom: 4rem;
  /* 푸터 높이만큼 패딩 추가 */
}
</style>