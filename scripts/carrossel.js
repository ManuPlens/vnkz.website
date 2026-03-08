const slides = document.querySelectorAll('.carrossel-slide');

slides.forEach((trilho) => {
    const fotos = trilho.querySelectorAll('img');
    let indice = 0;
    let intervalo = null; // Guardamos o timer aqui

    // Criar o clone para o loop infinito
    const clone = fotos[0].cloneNode(true);
    trilho.appendChild(clone);
    const todasAsFotos = trilho.querySelectorAll('img');

    function mover() {
        indice++;
        trilho.style.transition = "transform 0.8s ease-in-out";
        trilho.style.transform = `translateX(-${indice * 100}%)`;

        if (indice === todasAsFotos.length - 1) {
            setTimeout(() => {
                trilho.style.transition = "none";
                indice = 0;
                trilho.style.transform = `translateX(0)`;
            }, 800);
        }
    }

    // Função que liga o carrossel
    const play = () => {
        if (!intervalo) {
            intervalo = setInterval(mover, 2000); // 2 segundos entre fotos
        }
    };

    // Função que desliga o carrossel e volta para a primeira foto
    const stop = () => {
        clearInterval(intervalo);
        intervalo = null;
        indice = 0;
        trilho.style.transition = "transform 0.5s ease";
        trilho.style.transform = `translateX(0)`;
    };

    // Pega o card pai para detectar o mouse
    const cardPai = trilho.closest('.vnkz-highlights-card');
    
    cardPai.addEventListener('mouseenter', play);
    cardPai.addEventListener('mouseleave', stop);
});