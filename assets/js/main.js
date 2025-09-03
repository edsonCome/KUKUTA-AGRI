// --- LÓGICA DO CARROSSEL DA PÁGINA INICIAL ---
const heroCarousel = document.querySelector('.hero-carousel-container');
if (heroCarousel) {
    const slides = document.querySelectorAll('.hero-carousel-slide');
    let currentSlide = 0;

    if (slides.length > 0) {
        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        setInterval(nextSlide, 5000); // Muda de imagem a cada 5 segundos
        showSlide(currentSlide); // Mostra a primeira imagem
    }
}

// --- LÓGICA DO MENU HAMBÚRGUER (MOBILE) ---
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        const isActive = navLinks.classList.contains('active');
        
        icon.classList.toggle('fa-bars', !isActive);
        icon.classList.toggle('fa-times', isActive);
        menuToggle.setAttribute('aria-label', isActive ? 'Fechar menu' : 'Abrir menu');
    });
}

// --- LÓGICA PARA MARCAR LINK ATIVO NA NAVEGAÇÃO ---
const currentPagePath = window.location.pathname.split('/').pop() || 'index.html';
const navLinkItems = document.querySelectorAll('.nav-links a');

navLinkItems.forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentPagePath) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// --- LÓGICA DAS ANIMAÇÕES AO ROLAR A PÁGINA ---
const fadeInElements = document.querySelectorAll('.fade-in');
if (fadeInElements.length > 0) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(el => {
        observer.observe(el);
    });
}

// --- LÓGICA DA PAGINAÇÃO DA PÁGINA DE PRODUTOS ---
const produtosContainer = document.getElementById('produtos-container');
if (produtosContainer) {
    const itemsPerPage = 6;
    const productCards = Array.from(produtosContainer.querySelectorAll('.product-card'));
    const paginationWrapper = document.querySelector('.pagination-wrapper');
    const totalPages = Math.ceil(productCards.length / itemsPerPage);
    let currentPage = 1;

    const showPage = (page) => {
        currentPage = page;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        productCards.forEach(card => card.style.display = 'none');
        productCards.slice(startIndex, endIndex).forEach(card => card.style.display = 'flex');

        updatePaginationButtons();
    };

    const updatePaginationButtons = () => {
        if (!paginationWrapper) return;
        paginationWrapper.innerHTML = `
            <div class="pagination">
                <button class="page-btn" id="prev-page"><i class="fas fa-chevron-left"></i></button>
                <div id="page-numbers" style="display: flex; gap: 0.5rem;"></div>
                <button class="page-btn" id="next-page"><i class="fas fa-chevron-right"></i></button>
            </div>
        `;
        
        const pageNumbersContainer = document.getElementById('page-numbers');
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.classList.add('page-btn');
            button.textContent = i;
            if (i === currentPage) button.classList.add('active');
            button.addEventListener('click', () => showPage(i));
            pageNumbersContainer.appendChild(button);
        }
        
        const prevButton = document.getElementById('prev-page');
        prevButton.disabled = currentPage === 1;
        prevButton.classList.toggle('disabled', currentPage === 1);
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) showPage(currentPage - 1);
        });

        const nextButton = document.getElementById('next-page');
        nextButton.disabled = currentPage === totalPages;
        nextButton.classList.toggle('disabled', currentPage === totalPages);
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) showPage(currentPage + 1);
        });
    };
    
    if (productCards.length > 0) {
        showPage(1);
    }
}

// --- LÓGICA DA JANELA MODAL DE DETALHES DO PRODUTO ---
const modal = document.getElementById('product-modal');
if (modal) {
    const detailButtons = document.querySelectorAll('.view-details-btn');
    const closeModalBtn = document.getElementById('modal-close-btn');
    
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDetails = document.getElementById('modal-details');

    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            modalImg.src = button.dataset.image;
            modalTitle.textContent = button.dataset.title;
            modalDetails.textContent = button.dataset.details;
            
            document.body.classList.add('modal-open');
            modal.classList.add('active');
        });
    });

    const closeModal = () => {
        document.body.classList.remove('modal-open');
        modal.classList.remove('active');
    };

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
}