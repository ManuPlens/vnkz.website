const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");
const galleryImage = document.querySelectorAll(".vnkz-gallery-item img");

let currentIndex = 0;
const images = Array.from(galleryImage)

function openLightbox(index) {
  currentIndex = index;
  updateLightboxImage();

  lightbox.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.style.display = "none";
  document.body.style.overflow = "auto";
}

function updateLightboxImage() {
  const image = images[currentIndex];
  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt;

  lightboxCaption.textContent = image.alt;
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightboxImage();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightboxImage();
}

images.forEach((img, index) => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => openLightbox(index));
});

closeBtn.addEventListener("click", closeLightbox);

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showPrev();
})

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showNext();
})

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.classList.contains("lightbox-content")) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      showNext();
    } else if (e.key === "ArrowLeft") {
      showPrev();
    }
  }
});