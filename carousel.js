const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".arrow.next");
const prevBtn = document.querySelector(".arrow.prev");

let currentIndex = 0;
let slideInterval;

/* Show slide */
function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

/* Next slide (infinite loop) */
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

/* Previous slide (infinite loop) */
function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

/* Auto play */
function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

/* Arrow controls */
nextBtn.addEventListener("click", () => {
  stopAutoSlide();
  nextSlide();
  startAutoSlide();
});

prevBtn.addEventListener("click", () => {
  stopAutoSlide();
  prevSlide();
  startAutoSlide();
});

/* Click slide → open category */
slides.forEach(slide => {
  slide.addEventListener("click", () => {
    const category = slide.dataset.category;
    if (category) {
      window.location.href = `shop.html?category=${category}`;
    }
  });
});

/* Init */
showSlide(currentIndex);
startAutoSlide();
