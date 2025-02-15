const slides = document.querySelectorAll('.slide');
const progressBar = document.getElementById('progress-bar');
const sidebar = document.getElementById('sidebar');
const burger = document.getElementById('burger');
const closeBtn = document.getElementById('close-sidebar');
const togglePlayBtn = document.getElementById('toggle-play');
const slideListItems = document.querySelectorAll('.slide-list li');

let currentSlide = 0;
const totalSlides = slides.length;
const slideIntervalTime = 10000; // 10 секунд
let slideInterval;
let isPlaying = true;

// Функция для перехода к определенному слайду
function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    slides[n].classList.add('active');
    currentSlide = n;
    resetProgressBar();
}

// Функция для перехода к следующему слайду
function nextSlide() {
    let next = currentSlide + 1;
    if (next >= totalSlides) next = 0;
    goToSlide(next);
    updateSidebarActive();
}

// Функция для перехода к предыдущему слайду
function prevSlide() {
    let prev = currentSlide - 1;
    if (prev < 0) prev = totalSlides - 1;
    goToSlide(prev);
    updateSidebarActive();
}

// Обновление активного элемента в боковой панели
function updateSidebarActive() {
    slideListItems.forEach(item => {
        item.classList.remove('active-list');
        if (parseInt(item.getAttribute('data-slide')) === currentSlide) {
            item.classList.add('active-list');
        }
    });
}

// Обновление прогресс-бара
function updateProgressBar() {
    let start = Date.now();
    progressBar.style.width = '0%';
    function frame() {
        let elapsed = Date.now() - start;
        let progress = (elapsed / slideIntervalTime) * 100;
        if (progress > 100) progress = 100;
        progressBar.style.width = progress + '%';
        if (progress < 100 && isPlaying) {
            requestAnimationFrame(frame);
        }
    }
    requestAnimationFrame(frame);
}

// Сброс прогресс-бара
function resetProgressBar() {
    progressBar.style.width = '0%';
    if (isPlaying) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideIntervalTime);
        updateProgressBar();
    }
}

// Запуск слайд-шоу
function startSlideshow() {
    isPlaying = true;
    togglePlayBtn.innerHTML = '&#10074;&#10074;'; // Pause иконка
    slideInterval = setInterval(nextSlide, slideIntervalTime);
    updateProgressBar();
}

// Остановка слайд-шоу
function stopSlideshow() {
    isPlaying = false;
    togglePlayBtn.innerHTML = '&#9658;'; // Play иконка
    clearInterval(slideInterval);
    progressBar.style.width = '0%';
}

// Переключение play/pause
togglePlayBtn.addEventListener('click', () => {
    if (isPlaying) {
        stopSlideshow();
    } else {
        startSlideshow();
    }
});

// Инициализация слайд-шоу
startSlideshow();

// Управление боковой панелью
burger.addEventListener('click', () => {
    sidebar.classList.add('active');
    burger.style.display = 'none';
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    burger.style.display = 'block';
});

// Клик по элементам списка в боковой панели
slideListItems.forEach(item => {
    item.addEventListener('click', () => {
        const slideNumber = parseInt(item.getAttribute('data-slide'));
        goToSlide(slideNumber);
        sidebar.classList.remove('active');
        burger.style.display = 'block';
    });
});

// Управление слайдом с помощью клавиатуры
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});

// Инициализация прогресс-бара
updateProgressBar();

// Обновление активного слайда в боковой панели
updateSidebarActive();