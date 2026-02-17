// capturam os elementos do HTML e os preparam para o JavaScript, 
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");
const galleryImage = document.querySelectorAll(".vnkz-gallery-item img");

//let currentIndex serve para acompanhar qual imagem está sendo exibida no lightbox, permitindo que as funções de navegação (próxima e anterior) saibam qual imagem mostrar a seguir, ja o array.from(galleryImage) é usado para criar um array a partir da coleção de elementos de imagem selecionados.
let currentIndex = 0;
const images = Array.from(galleryImage)

// as funções openLightbox (index) serve para abrir o lightbox e exibir a imagem correspondente ao índice clicado, currentIandex=index atualiza o índice atual para a imagem clicada, updateLightboxImage() atualiza a imagem e a legenda do lightbox.
function openLightbox(index) {
  currentIndex = index;
  updateLightboxImage();

// lightbox.style.display = "flex" torna o lightbox visível, e document.body.style.overflow = "hidden" impede que a página role enquanto o lightbox estiver aberto, proporcionando uma melhor experiência de visualização.
  lightbox.style.display = "flex";
  document.body.style.overflow = "hidden";
}

// a função closeLightbox() é responsável por fechar o lightbox, definindo seu estilo de exibição para "none" e restaurando a capacidade de rolagem da página.
function closeLightbox() {
  lightbox.style.display = "none";
  document.body.style.overflow = "auto";
}

// a função updateLightboxImage() atualiza a imagem, const image = images[currentIndex] obtém a imagem atual com base no índice, lightboxImg.src = image.src define a fonte da imagem do lightbox para a fonte da imagem atual, lightboxImg.alt = image.alt define o texto alternativo da imagem do lightbox para o texto alternativo da imagem atual, e lightboxCaption.textContent = image.alt atualiza a legenda do lightbox para o texto alternativo da imagem atual.
function updateLightboxImage() {
  const image = images[currentIndex];
  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt;

  lightboxCaption.textContent = image.alt;
}

// as funções showNext() é responsável por mostrar a próxima imagem no lightbox, currentIndex = (currentIndex + 1) % images.length incrementa o índice atual e usa o operador módulo para garantir que ele volte ao início da lista de imagens quando atingir o final, e updateLightboxImage() atualiza a imagem exibida no lightbox.
function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightboxImage();
}

// a função showPrev() é responsável por mostrar a imagem anterior no lightbox, currentIndex = (currentIndex - 1 + images.length) % images.length decrementa o índice atual e usa o operador módulo para garantir que ele volte ao final da lista de imagens quando atingir o início, e updateLightboxImage() atualiza a imagem exibida no lightbox.
function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightboxImage();
}

// images.forEach((img, index) => { ... }) percorre cada imagem na galeria, img.style.cursor = "pointer" define o cursor para "pointer" quando o mouse estiver sobre a imagem, indicando que ela é clicável, e img.addEventListener("click", () => openLightbox(index)) adiciona um evento de clique a cada imagem que chama a função openLightbox com o índice da imagem clicada.
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