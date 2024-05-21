function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

function toggleCategory() {
    const categoryList = document.getElementById('category-list');
    const arrow = document.getElementById('category-arrow');
    if (categoryList.style.display === 'none' || !categoryList.style.display) {
        categoryList.style.display = 'block';
        arrow.textContent = '▲';
    } else {
        categoryList.style.display = 'none';
        arrow.textContent = '▼';
    }
}


// Ensure category is open on load
document.addEventListener('DOMContentLoaded', () => {
    toggleCategory(); // Ensure categories are visible on load
    setupEventListeners();
    filterByCategory('전체'); // Display all files initially
    sortFiles('인기순'); // Initially set sort to popularity
});


function toggleOrder() {
  const orderList = document.getElementById('order-list');
  const arrow = document.getElementById('order-arrow');
  if (orderList.style.display === 'none' || orderList.style.display === '') {
      orderList.style.display = 'block';
      arrow.textContent = '▲';
  } else {
      orderList.style.display = 'none';
      arrow.textContent = '▼';
  }
}

function setupEventListeners() {
  const categoryList = document.getElementById('category-list');
  categoryList.addEventListener('click', function(event) {
      if (event.target.tagName === 'A') {
          filterByCategory(event.target.textContent.trim());
      }
  });

  const orderList = document.getElementById('order-list');
  orderList.addEventListener('click', function(event) {
      if (event.target.tagName === 'A') {
          sortFiles(event.target.textContent.trim().toLowerCase());
      }
  });
}

const files = [
  { title: "신난 수룡이", category: "이모티콘", desc: "하늘을 날라다니는 수룡이", popularity: 100, rating: 4.5, date: "2023-05-01" },
  { title: "행복한 수룡이", category: "이모티콘", desc: "손하트하고 있는 수룡이", popularity: 200, rating: 4.8, date: "2023-04-15" },
  { title: "수룡이 인형", category: "작품", desc: "학과별 수룡이", popularity: 150, rating: 4.6, date: "2023-05-10" },
  { title: "공부하는 수룡이", category: "이모티콘", desc: "도서관에서 공부하고 있는 수룡이", popularity: 90, rating: 4.3, date: "2023-03-22" },
  { title: "수룡이 휴대폰 거치대", category: "작품", desc: "수룡이가 그려진 휴대폰 거치대", popularity: 50, rating: 4.0, date: "2023-04-01" },
  { title: "놀란 수룡이", category: "이모티콘", desc: "동그란 눈과 입이 떡 벌어진 수룡이", popularity: 30, rating: 3.5, date: "2023-01-20" }
];

function filterByCategory(category) {
  const categoryItems = document.querySelectorAll('.category-item');
  categoryItems.forEach(item => {
      item.classList.remove('selected');
      if (item.textContent.trim() === category) {
          item.classList.add('selected');
      }
  });
  const filteredFiles = files.filter(file => category === '전체' || file.category === category);
  displayFiles(filteredFiles);
}

function sortFiles(criteria) {
  const criteriaMap = {
      '인기순': 'popularity',
      '평점순': 'rating',
      '최신순': 'newest'
  };
  const actualCriteria = criteriaMap[criteria] || criteria;

  const orderItems = document.querySelectorAll('.order-item');
  orderItems.forEach(item => {
      item.classList.remove('selected');
      if (item.querySelector('a').textContent.trim().toLowerCase() === criteria) {
          item.classList.add('selected');
      }
  });

  let sortedFiles = [...document.getElementById('file-display').children];
  sortedFiles.sort((a, b) => {
      switch (actualCriteria) {
          case 'popularity':
              return parseInt(b.dataset.popularity) - parseInt(a.dataset.popularity);
          case 'rating':
              return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
          case 'newest':
              return new Date(b.dataset.date) - new Date(a.dataset.date);
          default:
              return 0;
      }
  });
  const display = document.getElementById('file-display');
  display.innerHTML = ''; // Clear existing content
  sortedFiles.forEach(file => display.appendChild(file));
}

function displayFiles(files) {
  const display = document.getElementById('file-display');
  display.innerHTML = '';  // Clear existing content
  files.forEach(file => {
      const fileBox = document.createElement('div');
      fileBox.className = 'file-box';
      fileBox.innerHTML = `
          <img src="image/sale.jpg" alt="" class="file-icon" />
          <div class="file-details">
              <div class="file-title">[${file.category}] ${file.title}</div>
              <div class="file-desc">${file.desc}</div>
              <a href="sale_sub.html" class="file-link">상세 보기</a>
          </div>`;
      fileBox.dataset.popularity = file.popularity;
      fileBox.dataset.rating = file.rating;
      fileBox.dataset.date = file.date;
      display.appendChild(fileBox);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  filterByCategory('전체'); // 초기 파일 표시
  sortFiles('인기순'); // 초기 정렬 기준 설정
});
