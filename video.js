function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("collapsed");
}

function toggleCategory() {
  const categoryList = document.getElementById('category-list');
  const arrow = document.getElementById('category-arrow');
  if (categoryList.style.display === 'none') {
    categoryList.style.display = 'block';
    arrow.textContent = '▲';
  } else {
    categoryList.style.display = 'none';
    arrow.textContent = '▼';
  }
}

function toggleOrder() {
  const orderList = document.getElementById("order-list");
  const arrows = document.querySelectorAll("#order-list a");
  arrows.forEach((item) => {
    item.classList.remove("selected"); // 모든 아이템에서 'selected' 클래스 제거
    item.onclick = () => {
      arrows.forEach((innerItem) => innerItem.classList.remove("selected"));
      item.classList.add("selected"); // 클릭된 아이템에만 'selected' 클래스 추가
    };
  });
}

function toggleOrder() {
  const orderList = document.getElementById("order-list");
  const arrow = document.getElementById("order-arrow");
  if (orderList.style.display === "none") {
    orderList.style.display = "block";
    arrow.textContent = "▲";
  } else {
    orderList.style.display = "none";
    arrow.textContent = "▼";
  }
}

// 데이터 배열
const videos = [
  { id: 1, title: '쉽게 사용하는 노션 사용법', author: '권수정', rating: 4.8, price: '5,000', views: 100 },
  { id: 2, title: '2시간으로 끝내는 Figma', author: '박수정', rating: 4.9, price: '3,000', views: 50 },
  { id: 3, title: '하루 30분, 포토샵 기본', author: '이수정', rating: '5.0', price: '10,000', views: 200 },
  { id: 4, title: '눈에 띄는 포트폴리오 제작법', author: '정수정', rating: 4.5, price: '8,000', views: 150 }
];

document.addEventListener('DOMContentLoaded', () => {
  sortVideos('rating'); // 페이지 로드 시 평점순으로 자동 정렬
});

function sortVideos(criteria) {
  let sortedVideos = videos.slice(); // 복사본을 만들어 정렬에 사용
  switch (criteria) {
    case 'rating':
      sortedVideos.sort((a, b) => b.rating - a.rating);
      break;
    case 'price':
      sortedVideos.sort((a, b) => a.price - b.price);
      break;
    case 'popularity':
      sortedVideos.sort((a, b) => b.views - a.views);
      break;
  }
  updateVideoList(sortedVideos);
  updateButtonStyles(criteria);
}

function updateButtonStyles(selectedCriteria) {
  const orderItems = document.querySelectorAll('#order-list li');
  orderItems.forEach(item => {
    item.classList.remove('selected');
    if (item.querySelector('a').getAttribute('onclick').includes(selectedCriteria)) {
      item.classList.add('selected');
    }
  });
}

function updateVideoList(videos) {
  const courseList = document.querySelector('.course-list');
  courseList.innerHTML = '';
  videos.forEach(video => {
    const videoElement = `
      <a href="video_sub.html" class="course-item">
        <img src="image/video_${video.id}.png" alt="Video ${video.id}" />
        <div class="course-info">
            <p>${video.author}</p>
            <strong>${video.title}</strong>
            <span class="stars">★ ${video.rating}</span>
            <span>${video.price}원</span>
        </div>
      </a>`;
    courseList.insertAdjacentHTML('beforeend', videoElement);
  });
}
