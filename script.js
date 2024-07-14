// Загрузка отзывов из LocalStorage при запуске страницы
function loadReviews() {
  // Получение отзывов из LocalStorage, если они есть
  const reviews = JSON.parse(localStorage.getItem("reviews")) || {};
  return reviews;
}

// Сохранение отзывов в LocalStorage
function saveReviews(reviews) {
  // Сохранение отзывов в LocalStorage в виде строки
  localStorage.setItem("reviews", JSON.stringify(reviews));
}

// Добавление отзыва
function addReview(product, review) {
  // Загрузка текущих отзывов
  const reviews = loadReviews();
  // Если отзывов по продукту еще нет, создается новый массив
  if (!reviews[product]) {
    reviews[product] = [];
  }
  // Добавление нового отзыва в массив отзывов по продукту
  reviews[product].push(review);
  // Сохранение обновленных отзывов
  saveReviews(reviews);
}

// Отображение списка продуктов
function displayProducts() {
  // Загрузка текущих отзывов
  const reviews = loadReviews();
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  // Перебор продуктов и создание списка продуктов
  for (const product in reviews) {
    const productDiv = document.createElement("div");
    productDiv.textContent = product;
    // Добавление обработчика события на клик для отображения отзывов по продукту
    productDiv.addEventListener("click", () => displayReviews(product));
    productList.appendChild(productDiv);
  }
}

// Отображение отзывов по конкретному продукту
function displayReviews(product) {
  // Загрузка текущих отзывов
  const reviews = loadReviews();
  const reviewList = document.getElementById("reviewList");
  reviewList.innerHTML = "";

  // Перебор отзывов и создание списка отзывов
  reviews[product].forEach((review, index) => {
    const reviewContainer = document.createElement("div");
    reviewContainer.className = "review-container";

    const reviewText = document.createElement("span");
    reviewText.textContent = review;
    reviewContainer.appendChild(reviewText);

    // Кнопка для удаления отзыва
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    // Добавление обработчика события на клик для удаления отзыва
    deleteButton.addEventListener("click", () => deleteReview(product, index));
    reviewContainer.appendChild(deleteButton);

    reviewList.appendChild(reviewContainer);
  });
}

// Удаление отзыва
function deleteReview(product, index) {
  // Загрузка текущих отзывов
  const reviews = loadReviews();
  // Удаление отзыва по индексу
  reviews[product].splice(index, 1);
  // Если после удаления отзывов по продукту не осталось, удалить продукт из списка
  if (reviews[product].length === 0) {
    delete reviews[product];
  }
  // Сохранение обновленных отзывов
  saveReviews(reviews);
  // Перерисовка отзывов
  displayReviews(product);
  // Перерисовка списка продуктов
  displayProducts();
}

// Добавление слушателя события на кнопку для добавления отзыва
document.getElementById("addReviewBtn").addEventListener("click", () => {
  const productName = document.getElementById("productName").value.trim();
  const reviewText = document.getElementById("reviewText").value.trim();

  // Проверка, что поля не пустые
  if (productName && reviewText) {
    // Добавление нового отзыва
    addReview(productName, reviewText);
    // Очистка полей ввода
    document.getElementById("productName").value = "";
    document.getElementById("reviewText").value = "";
    // Перерисовка списка продуктов
    displayProducts();
  } else {
    alert("Заполните все поля");
  }
});

// Инициализация списка продуктов при загрузке страницы
displayProducts();
