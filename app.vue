<script setup>
// 회전 값 설정
const rotationX = ref(8);
const rotationY = ref(128);
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

  //'https://autoimg.danawa.com/photo/4653/model_360.png'

  //현대
  { name: '캐스퍼 (2025)', xSize: 3595, ySize: 1595, zSize: 1605, xInSize: 2400, brand:'현대', no:4671}, 
  { name: '캐스퍼EV (2025)', xSize: 3845, ySize: 1610, zSize: 1610, xInSize: 2580, brand:'현대', no:4653}, 
  { name: '아반떼 (2026/25/23)', xSize: 4710, ySize: 1825, zSize: 1420, xInSize: 2720, trunk:474, brand:'현대', no:4455}, 
  { name: '아반떼N (2026/25/23)', xSize: 4710, ySize: 1825, zSize: 1415, xInSize: 2720, brand:'현대', no:4564}, 
  { name: '쏘나타 (2025/24)', xSize: 4910, ySize: 1860, zSize: 1445, xInSize: 2840, trunk:480, brand:'현대', no:4466}, 
  { name: '아이오닉6 (2024/23)', xSize: 4855, ySize: 1880, zSize: 1495, xInSize: 2950, brand:'현대', no:4087}, 
  { name: '그랜저 (2025/23)', xSize: 5035, ySize: 1880, zSize: 1460, xInSize: 2895, trunk:480, brand:'현대', no:4188}, 
  { name: '베뉴 (2025/23)', xSize: 4040, ySize: 1770, zSize: 1585, xInSize: 2520, brand:'현대', no:3654 },
  { name: '코나 (2025/24/23)', xSize: 4350, ySize: 1825, zSize: 1585, xInSize: 2660, brand:'현대', no:4361 },  
  { name: '코나EV (2024)', xSize: 4385, ySize: 1825, zSize: 1580, xInSize: 2660, brand:'현대', no:4510 },  
  { name: '투싼 (2025/24)', xSize: 4640, ySize: 1865, zSize: 1665, xInSize: 2755, brand:'현대', no:4592  }, 
  { name: '아이오닉5 (2024)', xSize: 4655, ySize: 1890, zSize: 1605, xInSize: 3000, brand:'현대', no:4624  },
  { name: '넥쏘 (2024)', xSize: 4670, ySize: 1860, zSize: 1630, xInSize: 2790, brand:'현대', no:3564 },
  { name: '싼타페 (2025/24)', xSize: 4830, ySize: 1900, zSize: 1770, xInSize: 2815, brand:'현대', no:4435 },
  { name: '펠리세이드 (2025)', xSize: 5065, ySize: 1980, zSize: 1805, xInSize: 2970, brand:'현대', no:4699 },
  { name: '아이오닉9 (2025)', xSize: 5060, ySize: 1980, zSize: 1790, xInSize: 3130, brand:'현대', no:4088 }, 
  { name: '스타리아 (2024/23)', xSize: 5255, ySize: 1995, zSize: 1990, xInSize: 3275, brand:'현대', no:4014 },    

  //BYD
  { name: '아토3 (2025)', xSize: 4455, ySize: 1875, zSize: 1615, xInSize: 2720, brand:'BYD', no:4702 },
  { name: '씰 (2025)', xSize: 4800, ySize: 1875, zSize: 1460, xInSize: 2920, brand:'BYD', no:4703 },
  { name: '씨라이언7 (2025)', xSize: 4830, ySize: 1925, zSize: 1620, xInSize: 2930, brand:'BYD', no:4706 },

  //기아
  { name: '모닝 (2024/23)', xSize: 3595, ySize: 1595, zSize: 1485, xInSize: 2400, brand:'기아', no:4554 },
  { name: '레이 (2025/24/23)', xSize: 3595, ySize: 1595, zSize: 1700, xInSize: 2520, brand:'기아', no:4689 },
  { name: '레이EV (2025/24)', xSize: 3595, ySize: 1595, zSize: 1710, xInSize: 2520, brand:'기아', no:4691 },
  { name: 'EV4 (2025)', xSize: 4730, ySize: 1860, zSize: 1480, xInSize: 2820, brand:'기아', no:4712 },
  { name: 'K5 (2025/24)', xSize: 4905, ySize: 1860, zSize: 1445, xInSize: 2850, brand:'기아', no:4585 },
  { name: 'K8 (2025)', xSize: 5050, ySize: 1880, zSize: 1480, xInSize: 2895, brand:'기아', no:4665 },
  { name: 'K9 (2025/24/23/22)', xSize: 5140, ySize: 1915, zSize: 1490, xInSize: 3105, brand:'기아', no:4066 },
  { name: '셀토스 (2025/24/23)', xSize: 4390, ySize: 1800, zSize: 1620, xInSize: 2630, brand:'기아', no:4391 },
  { name: '니로하이브리드 (2025/24/23)', xSize: 4420, ySize: 1825, zSize: 1545, xInSize: 2720, brand:'기아', no:4130 }, 
  { name: '니로EV (2025)', xSize: 4420, ySize: 1825, zSize: 1570, xInSize: 2720, brand:'기아', no:4396 }, 
  { name: 'EV3 (2025/24)', xSize: 4310, ySize: 1850, zSize: 1570, xInSize: 2680, brand:'기아', no:4647 },
  { name: 'EV6 (2025)', xSize: 4695, ySize: 1890, zSize: 1550, xInSize: 2900, brand:'기아', no:4641 },
  { name: '스포티지 (2025)', xSize: 4685, ySize: 1865, zSize: 1680, xInSize: 2755, brand:'기아', no:4684 },
  { name: 'EV9 (2025/24)', xSize: 5010, ySize: 1980, zSize: 1755, xInSize: 3100, brand:'기아', no:4128},
  { name: '쏘렌토 (2025/24)', xSize: 4815, ySize: 1900, zSize: 1700, xInSize: 2815, brand:'기아', no:4563 },
  { name: '카니발 (2025)', xSize: 5155, ySize: 1995, zSize: 1785, xInSize: 3090, brand:'기아', no:4586 },
  { name: '타스만 (2025)', xSize: 5410, ySize: 1930, zSize: 1870, xInSize: 3270, brand:'기아', no:4686 },
  { name: '봉고3 (2025/24/22/20)', xSize: 5125, ySize: 1740, zSize: 1995, xInSize: 2615, brand:'기아', no:3772 },

  //테슬라
  { name: '모델3 (2024)', xSize: 4720, ySize: 1935, zSize: 1440, xInSize: 2875, trunk: 649, brand:'테슬라', no:4610 },
  { name: '모델Y (2024)', xSize: 4750, ySize: 1980, zSize: 1625, xInSize: 2890, trunk: 854, brand:'테슬라', no:3687 },
  { name: '모델Y주니퍼 (2025)', xSize: 4790, ySize: 1980, zSize: 1625, xInSize: 2890, brand:'테슬라', no:4667 },
  { name: '모델X (2023)', xSize: 5057, ySize: 1999, zSize: 1680, xInSize: 2965, brand:'테슬라', no:4027 },
  { name: '사이버트럭 (2024)', xSize: 5885, ySize: 2027, zSize: 1905, xInSize: 3635, brand:'테슬라', no:3825 },

  //제네시스
  { name: 'G70 (2023)', xSize: 4685, ySize: 1850, zSize: 1400, xInSize: 2835, brand:'제네시스', no:3995 },
  { name: 'G80 (2025/24)', xSize: 5005, ySize: 1925, zSize: 1465, xInSize: 3010, brand:'제네시스', no:3995 },
  { name: 'G80EV (2025)', xSize: 5135, ySize: 1925, zSize: 1480, xInSize: 3140, brand:'제네시스', no:4660 },
  { name: 'G90 (2025)', xSize: 5275, ySize: 1930, zSize: 1490, xInSize: 3180, brand:'제네시스', no:4016 },
  { name: 'GV60 (2025)', xSize: 4545, ySize: 1890, zSize: 1580, xInSize: 2900, brand:'제네시스', no:4701 },
  { name: 'GV70 (2025)', xSize: 4715, ySize: 1910, zSize: 1630, xInSize: 2875, brand:'제네시스', no:4609 },
  { name: 'GV80 (2025)', xSize: 4940, ySize: 1975, zSize: 1715, xInSize: 2955, brand:'제네시스', no:4465 },

  //르노
  { name: '그랑콜레오스 (2025)', xSize: 4780, ySize: 1880, zSize: 1705, xInSize: 2820, brand:'르노', no:4659 },
  { name: 'QM6 (2026/25/24)', xSize: 4675, ySize: 1845, zSize: 1700, xInSize: 2705, brand:'르노', no:4483 },
  { name: '아르카나 (2026/25)', xSize: 4570, ySize: 1820, zSize: 1570, xInSize: 2720, trunk: 487, brand:'르노', no:4560 },
  { name: 'SM6 (2025/24/23/22)', xSize: 4855, ySize: 1870, zSize: 1460, xInSize: 2810, brand:'르노', no:3979 },

  //KGM
  { name: '티볼리 (2024)', xSize: 4225, ySize: 1810, zSize: 1620, xInSize: 2600, brand:'KGM', no:4545 },
  { name: '코란도 (2024)', xSize: 4450, ySize: 1870, zSize: 1630, xInSize: 2675, brand:'KGM', no:3635 },
  { name: '토레스 (2025)', xSize: 4705, ySize: 1890, zSize: 1720, xInSize: 2680, brand:'KGM', no:4646 },
  { name: '토레스EVX (2025/24)', xSize: 4715, ySize: 1890, zSize: 1745, xInSize: 2680, trunk:839, brand:'KGM', no:4492 },
  { name: '액티언 (2025)', xSize: 4740, ySize: 1910, zSize: 1680, xInSize: 2680, brand:'KGM', no:4622 },
  { name: '렉스턴 (2025/24)', xSize: 4850, ySize: 1960, zSize: 1825, xInSize: 2865, brand:'KGM', no:4518 },
  { name: '무쏘스포츠 (2025)', xSize: 5105, ySize: 1950, zSize: 1870, xInSize: 3100, brand:'KGM', no:4716 },
  { name: '무쏘칸 (2025)', xSize: 5415, ySize: 1950, zSize: 1885, xInSize: 3210, brand:'KGM', no:4717 },
  { name: '무쏘EV (2025)', xSize: 5160, ySize: 1920, zSize: 1740, xInSize: 3150, brand:'KGM', no:4666 },

  //쉐보레
  { name: '트랙스크로스오버 (2025)', xSize: 4540, ySize: 1825, zSize: 1560, xInSize: 2700, brand:'쉐보레', no:4429 },
  { name: '트레일블레이저 (2025)', xSize: 4425, ySize: 1810, zSize: 1670, xInSize: 2640, brand:'쉐보레', no:4474 },
  { name: '올란도 (2019)', xSize: 4684, ySize: 1807, zSize: 1627, xInSize: 2796, brand: '쉐보레', no:2140 },

  //폴스타
  { name: '폴레스타2 (2025)', xSize: 4605, ySize: 1860, zSize: 1480, xInSize: 2735, brand:'폴스타', no:4468 },
  { name: '폴레스타4 (2025)', xSize: 4840, ySize: 2008, zSize: 1534, xInSize: 2999, brand:'폴스타', no:4513 },

  //람보르기니
  { name: '우라칸 (2023)', xSize: 4567, ySize: 1933, zSize: 1165, xInSize: 2620, brand:'람보르기니', no:3746 },  
  { name: '우루스 (2022)', xSize: 5137, ySize: 2026, zSize: 1618, xInSize: 3006, brand:'람보르기니', no:3526 }, 

  //포르쉐
  { name: '카이엔 (2026/25)', xSize: 4930, ySize: 1983, zSize: 1696, xInSize: 2895, brand:'포르쉐', no:4506 }, 

  //BMW Mini
  { name: '미니쿠퍼 (2026/25)', xSize: 3875, ySize: 1745, zSize: 1450, xInSize: 2495, brand:'BMW Mini', no:4618 }, 

  // { name: '2016 르노 QM5', xSize: 4525, ySize: 1855, zSize: 1695, xInSize: 2690 },
  // { name: '2009 현대 싼타페 CM', xSize: 4675, ySize: 1890, zSize: 1725, xInSize: 2700 },
  // { name: '2012 현대 싼타페 DM', xSize: 4685, ySize: 1890, zSize: 1750, xInSize: 2700 },
  // { name: '2023 기아 쏘울', xSize: 4196, ySize: 1801, zSize: 1600, xInSize: 2601 },
  // { name: '2025 쉐보레 스파크 EUV', xSize: 3996, ySize: 1760, zSize: 1726, xInSize: 2520 },
  // { name: '2024 람보르기니 우라칸', xSize: 4311, ySize: 1945, zSize: 1220, xInSize: 2620 },   
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
    true || isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
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
  <main class="pt-16 pb-[100px] min-h-screen max-w-md mx-auto bg-gray-100">
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
                <BoxBuilder v-bind="selectedVehicle" v-model:rotationX="rotationX" v-model:rotationY="rotationY"
                  v-model:rotationZ="rotationZ" />
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
            <template v-for="(vehicle) in sortedVehicles" :key="index">
              <BoxBuilder v-bind="vehicle" v-model:rotationX="rotationX" v-model:rotationY="rotationY"
                v-model:rotationZ="rotationZ" :title="vehicle.name" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- 하단 푸터 네비게이션 -->
  <footer class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg max-w-md mx-auto z-1">
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
}
</style>