// --- CARROSSEL HERO (PÁGINA INICIAL) ---
document.addEventListener('DOMContentLoaded', function() {
    // Configuração do carrossel hero
    const heroCarouselContainer = document.querySelector('.hero-carousel-container');
    if (heroCarouselContainer) {
        const slides = document.querySelectorAll('.hero-carousel-slide');
        let currentSlideIndex = 0;

        // Função para mostrar slide específico
        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        };

        // Função para próximo slide
        const nextSlide = () => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            showSlide(currentSlideIndex);
        };

        // Inicializar carrossel se houver slides
        if (slides.length > 1) {
            // Mostrar primeiro slide
            showSlide(0);
            
            // Auto-rotação a cada 5 segundos
            setInterval(nextSlide, 5000);
        } else if (slides.length === 1) {
            // Se houver apenas um slide, mostrá-lo
            showSlide(0);
        }
    }

    // --- MENU HAMBÚRGUER (MOBILE) ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            const isActive = navLinks.classList.contains('active');
            
            // Mudança do ícone
            if (isActive) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                menuToggle.setAttribute('aria-label', 'Fechar menu');
                document.body.style.overflow = 'hidden'; // Previne scroll quando menu aberto
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                menuToggle.setAttribute('aria-label', 'Abrir menu');
                document.body.style.overflow = '';
            }
        });

        // Fechar menu ao clicar em link (mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                menuToggle.setAttribute('aria-label', 'Abrir menu');
                document.body.style.overflow = '';
            });
        });

        // Fechar menu ao clicar fora dele
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                menuToggle.setAttribute('aria-label', 'Abrir menu');
                document.body.style.overflow = '';
            }
        });
    }

    // --- MARCAR LINK ATIVO NA NAVEGAÇÃO ---
    const currentPagePath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinkItems = document.querySelectorAll('.nav-links a');

    navLinkItems.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        link.classList.remove('active'); // Remove todas as classes active
        if (linkPath === currentPagePath) {
            link.classList.add('active');
        }
    });

    



    // --- ANIMAÇÕES AO ROLAR A PÁGINA ---
    const fadeInElements = document.querySelectorAll('.fade-in');
    if (fadeInElements.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Para de observar após animação
                }
            });
        }, observerOptions);

        fadeInElements.forEach(el => {
            observer.observe(el);
        });
    }

    // --- NEWSLETTER FORM ---
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Aqui você pode adicionar a lógica para enviar o email
                alert('Obrigado por se inscrever na nossa newsletter!');
                emailInput.value = '';
            }
        });
    }
});

// --- LÓGICA DA PAGINAÇÃO (PÁGINA DE PRODUTOS) ---
document.addEventListener('DOMContentLoaded', function() {
    const produtosContainer = document.getElementById('produtos-container');
    if (produtosContainer) {
        const itemsPerPage = 6;
        const productCards = Array.from(produtosContainer.querySelectorAll('.product-card'));
        const paginationWrapper = document.querySelector('.pagination-wrapper');
        const totalPages = Math.ceil(productCards.length / itemsPerPage);
        let currentPage = 1;

        const showPage = (page) => {
            if (page < 1 || page > totalPages) return;
            
            currentPage = page;
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            // Esconder todos os produtos
            productCards.forEach(card => {
                card.style.display = 'none';
            });

            // Mostrar produtos da página atual
            productCards.slice(startIndex, endIndex).forEach(card => {
                card.style.display = 'flex';
            });

            updatePaginationButtons();
            
            // Scroll para o topo da seção de produtos
            produtosContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        const updatePaginationButtons = () => {
            if (!paginationWrapper || totalPages <= 1) {
                if (paginationWrapper) paginationWrapper.style.display = 'none';
                return;
            }

            let paginationHTML = '<div class="pagination">';
            
            // Botão anterior
            paginationHTML += `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" data-page="${currentPage - 1}">
                <i class="fas fa-chevron-left"></i>
            </button>`;
            
            // Números das páginas
            for (let i = 1; i <= Math.min(totalPages, 5); i++) {
                paginationHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
            }
            
            if (totalPages > 5) {
                paginationHTML += '<span class="page-dots">...</span>';
                paginationHTML += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
            }
            
            // Botão próximo
            paginationHTML += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" data-page="${currentPage + 1}">
                <i class="fas fa-chevron-right"></i>
            </button>`;
            
            paginationHTML += '</div>';
            paginationWrapper.innerHTML = paginationHTML;
            
            // Adicionar event listeners aos botões
            paginationWrapper.querySelectorAll('.page-btn:not(.disabled)').forEach(btn => {
                btn.addEventListener('click', function() {
                    const page = parseInt(this.dataset.page);
                    if (page && page !== currentPage) {
                        showPage(page);
                    }
                });
            });
        };
        
        // Inicializar paginação se há produtos
        if (productCards.length > 0) {
            showPage(1);
        }
    }

    // --- FILTROS E PESQUISA (PÁGINA DE PRODUTOS) ---
    const searchInput = document.getElementById('produto-search');
    const categoriaFilter = document.getElementById('categoria-filter');
    const sazonalidadeFilter = document.getElementById('sazonalidade-filter');
    const sortSelect = document.getElementById('sort-select');

    if (searchInput || categoriaFilter || sazonalidadeFilter || sortSelect) {
        const applyFilters = () => {
            let filteredProducts = Array.from(document.querySelectorAll('.product-card'));
            
            // Filtro de pesquisa
            if (searchInput) {
                const searchTerm = searchInput.value.toLowerCase().trim();
                if (searchTerm) {
                    filteredProducts = filteredProducts.filter(card => {
                        const title = card.querySelector('h3').textContent.toLowerCase();
                        const description = card.querySelector('.description').textContent.toLowerCase();
                        return title.includes(searchTerm) || description.includes(searchTerm);
                    });
                }
            }
            
            // Filtro de categoria
            if (categoriaFilter && categoriaFilter.value) {
                filteredProducts = filteredProducts.filter(card => {
                    const tag = card.querySelector('.tag');
                    return tag && tag.textContent.toLowerCase().includes(categoriaFilter.value);
                });
            }
            
            // Mostrar/esconder produtos filtrados
            document.querySelectorAll('.product-card').forEach(card => {
                card.style.display = filteredProducts.includes(card) ? 'flex' : 'none';
            });
            
            // Atualizar contagem e paginação
            const visibleCount = filteredProducts.length;
            console.log(`${visibleCount} produtos encontrados`);
        };

        // Event listeners para filtros
        if (searchInput) {
            searchInput.addEventListener('input', applyFilters);
        }
        if (categoriaFilter) {
            categoriaFilter.addEventListener('change', applyFilters);
        }
        if (sazonalidadeFilter) {
            sazonalidadeFilter.addEventListener('change', applyFilters);
        }

        // Botão de pesquisa
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', applyFilters);
        }
    }
});

// --- SMOOTH SCROLL PARA ÂNCORAS ---
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Adicione este código à seção de carrossel no seu main.js
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const progressBar = document.querySelector('.carousel-progress-bar');
    
    const heroTitle = document.getElementById('hero-title');
    const heroDescription = document.getElementById('hero-description');
    
    let currentSlide = 0;
    let slideInterval;
    let progressInterval;
    const slideTime = 6000;
    
    const updateContent = (slideIndex) => {
        const slide = slides[slideIndex];
        const title = slide.dataset.title;
        const subtitle = slide.dataset.subtitle;
        const description = slide.dataset.description;
        
        heroTitle.style.opacity = '0';
        heroDescription.style.opacity = '0';
        
        setTimeout(() => {
            heroTitle.innerHTML = `${title}, <span class="highlight">${subtitle}</span>`;
            heroDescription.textContent = description;
            heroTitle.style.opacity = '1';
            heroDescription.style.opacity = '1';
        }, 300);
    };
    
    const showSlide = (index) => {
        clearInterval(slideInterval);
        clearInterval(progressInterval);
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        updateContent(index);
        currentSlide = index;
        
        startAutoRotation();
        startProgressBar();
    };
    
    const nextSlide = () => {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    };
    
    const prevSlide = () => {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    };
    
    const startAutoRotation = () => {
        slideInterval = setInterval(nextSlide, slideTime);
    };
    
    const startProgressBar = () => {
        if (progressBar) {
            progressBar.style.width = '0%';
            let progress = 0;
            const increment = 100 / (slideTime / 50);
            
            progressInterval = setInterval(() => {
                progress += increment;
                progressBar.style.width = progress + '%';
                
                if (progress >= 100) {
                    clearInterval(progressInterval);
                }
            }, 50);
        }
    };
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    const heroSection = document.getElementById('hero');
    heroSection.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
        clearInterval(progressInterval);
    });
    
    heroSection.addEventListener('mouseleave', () => {
        startAutoRotation();
        startProgressBar();
    });
    
    if (slides.length > 0) {
        showSlide(0);
    }
});

// --- HANDLER PARA BOTÕES "ADICIONAR AO CARRINHO" ---
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.btn-green');
    addToCartButtons.forEach(button => {
        if (button.textContent.includes('Adicionar ao Carrinho')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Feedback visual
                const originalText = this.textContent;
                this.textContent = 'Adicionado!';
                this.style.backgroundColor = '#28a745';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                }, 2000);
                
                // Aqui você pode adicionar lógica para adicionar ao carrinho real
                console.log('Produto adicionado ao carrinho');
            });
        }
    });
});
