function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('collapsed');
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
    const orderList = document.getElementById('order-list');
    const arrow = document.getElementById('order-arrow');
    if (orderList.style.display === 'none') {
      orderList.style.display = 'block';
      arrow.textContent = '▲';
    } else {
      orderList.style.display = 'none';
      arrow.textContent = '▼';
    }
  }
  
  