const scrollButton1 = document.getElementById('scrollButton1');
const scrollButton2 = document.getElementById('scrollButton2'); 
const scrollButton3 = document.getElementById('scrollButton3'); 
const scrollButton4 = document.getElementById('scrollButton4'); 
const scrollButton5 = document.getElementById('scrollButton5'); 
const scrollButton6 = document.getElementById('scrollButton6'); 
const scrollButton7 = document.getElementById('scrollButton7'); 
const targetElement1 = document.getElementById('targetElement1');
const targetElement2 = document.getElementById('targetElement2'); 
const targetElement3 = document.getElementById('targetElement3');
const targetElement4 = document.getElementById('targetElement4'); 
const targetElement5 = document.getElementById('targetElement5'); 
const targetElement6 = document.getElementById('targetElement6');
const targetElement7 = document.getElementById('targetElement7');

scrollButton1.addEventListener('click', () => {
    targetElement1.scrollIntoView({
        behavior: 'smooth', 
        block: 'start',     
        inline: 'nearest'
    });
});

scrollButton2.addEventListener('click', () => {
    targetElement2.scrollIntoView({
        behavior: 'smooth', 
        block: 'start',     
        inline: 'nearest'
    });
});

scrollButton3.addEventListener('click', () => {
    targetElement3.scrollIntoView({
        behavior: 'smooth', 
        block: 'start',     
        inline: 'nearest'
    });
});

scrollButton4.addEventListener('click', () => {
    targetElement4.scrollIntoView({
        behavior: 'smooth', 
        block: 'start',     
        inline: 'nearest'
    });
});

scrollButton5.addEventListener('click', () => {
    targetElement5.scrollIntoView({
        behavior: 'smooth', 
        block: 'start',     
        inline: 'nearest'
    });
});

scrollButton6.addEventListener('click', () => {
    targetElement6.scrollIntoView({
        behavior: 'smooth', 
        block: 'start',     
        inline: 'nearest'
    });
});

scrollButton7.addEventListener('click', () => {
    targetElement7.scrollIntoView({
        behavior: 'smooth', 
        block: 'start',     
        inline: 'nearest'
    });
});

(function() {
    const wrapper = document.getElementById('cardsScrollWrapper');
    const track = document.getElementById('cardsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let cardStep = 0;       
    let debounceTimer = null;

    function updateCardStep() {
        if (!track) return;
        const cards = track.querySelectorAll('.card');
        if (cards.length === 0) {
            cardStep = 324; 
            return;
        }
        const firstCard = cards[0];
        const cardRect = firstCard.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const trackStyles = window.getComputedStyle(track);
        let gap = parseFloat(trackStyles.gap);
        if (isNaN(gap)) gap = 24;
        cardStep = cardWidth + gap;
    }

    function updateButtonsState() {
        if (!wrapper || !prevBtn || !nextBtn) return;

        const scrollLeft = wrapper.scrollLeft;
        const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;

        if (scrollLeft <= 2) {
            prevBtn.disabled = true;
            prevBtn.style.opacity = '0.5';
            prevBtn.style.cursor = 'not-allowed';
        } else {
            prevBtn.disabled = false;
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
        }

        if (maxScroll - scrollLeft <= 2) {
            nextBtn.disabled = true;
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
        } else {
            nextBtn.disabled = false;
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        }
    }

    function scrollGallery(direction) {
        if (!wrapper) return;
        updateCardStep(); 
        let newScrollLeft;
        if (direction === 'next') {
            newScrollLeft = wrapper.scrollLeft + cardStep;
        } else {
            newScrollLeft = wrapper.scrollLeft - cardStep;
        }
        const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
        if (newScrollLeft < 0) newScrollLeft = 0;
        if (newScrollLeft > maxScroll) newScrollLeft = maxScroll;
        
        wrapper.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth'
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollGallery('prev');
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollGallery('next');
        });
    }

    if (wrapper) {
        wrapper.addEventListener('scroll', () => {
            updateButtonsState();
        });
    }

    window.addEventListener('resize', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            updateCardStep();
            updateButtonsState();
        }, 150);
    });

    function initGallery() {
        updateCardStep();
        updateButtonsState();
        const images = track ? track.querySelectorAll('.card-image img') : [];
        let loadedCount = 0;
        if (images.length === 0) return;
        function onImageLoad() {
            loadedCount++;
            if (loadedCount === images.length) {
                updateCardStep();
                updateButtonsState();
            }
        }
        images.forEach(img => {
            if (img.complete) {
                onImageLoad();
            } else {
                img.addEventListener('load', onImageLoad);
                img.addEventListener('error', onImageLoad);
            }
        });
    }

    if (track) {
        const observer = new MutationObserver(() => {
            updateCardStep();
            updateButtonsState();
        });
        observer.observe(track, { childList: true, subtree: true, attributes: true });
    }

    initGallery();
})();

const stages = document.querySelectorAll('.stage');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

stages.forEach((stage, index) => {
    stage.style.opacity = '0';
    stage.style.transform = 'translateY(20px)';
    stage.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(stage);
});

stages.forEach(stage => {
    stage.addEventListener('click', () => {
        const title = stage.querySelector('h3').textContent;
        console.log(`Вы выбрали этап: ${title}`);
        
        stage.style.transform = 'scale(0.98)';
        setTimeout(() => {
            stage.style.transform = '';
        }, 200);
    });
});


(function() {
  const yearElement = document.querySelector('.footer-bottom p');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace(/\d{4}/, currentYear);
  }

  const footer = document.querySelector('.footer');
  if (footer) {
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(20px)';
    footer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footer.style.opacity = '1';
          footer.style.transform = 'translateY(0)';
          observer.unobserve(footer);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(footer);
  }

  const logoIcon = document.querySelector('.footer-logo-icon');
  if (logoIcon) {
    logoIcon.addEventListener('mouseenter', () => {
      logoIcon.style.transform = 'rotate(10deg) scale(1.1)';
      logoIcon.style.transition = 'transform 0.2s ease';
    });
    logoIcon.addEventListener('mouseleave', () => {
      logoIcon.style.transform = 'rotate(0deg) scale(1)';
    });
  }
})();

const computers = [
    {
        id: 1,
        name: "HYPER NEO",
        image: "https://placehold.co/400x360/1a1a2a/8b5cf6?text=HYPER+NEO",
        specs: "Intel Core i7 · RTX 4070 · 32GB DDR5",
        price: "189 990 ₽"
    },
    {
        id: 2,
        name: "HYBERION X",
        image: "https://placehold.co/400x360/1a1a2a/a855f7?text=HYBERION+X",
        specs: "AMD Ryzen 9 · RTX 4080 · 64GB DDR5",
        price: "249 990 ₽"
    },
    {
        id: 3,
        name: "HYPER STRIX",
        image: "https://placehold.co/400x360/1a1a2a/d946ef?text=HYPER+STRIX",
        specs: "Intel Core i9 · RTX 4090 · 128GB DDR5",
        price: "389 990 ₽"
    },
    {
        id: 4,
        name: "HYPER PRO",
        image: "https://placehold.co/400x360/1a1a2a/ec4899?text=HYPER+PRO",
        specs: "AMD Ryzen 7 · RTX 4070 Ti · 32GB DDR5",
        price: "199 990 ₽"
    },
    {
        id: 5,
        name: "HYPER MINI",
        image: "https://placehold.co/400x360/1a1a2a/c026d3?text=HYPER+MINI",
        specs: "Intel Core i5 · RTX 4060 · 16GB DDR5",
        price: "129 990 ₽"
    }
];

const track = document.getElementById('cardsTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');

let currentIndex = 0;
let cardsPerView = 1;
let trackWidth = 0;
let cardWidth = 0;

function getCardsPerView() {
    const width = window.innerWidth;
    if (width >= 1200) return 3;
    if (width >= 768) return 2;
    return 1;
}

function createCards() {
    track.innerHTML = '';
    computers.forEach(computer => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-image">
                <img src="${computer.image}" alt="${computer.name}" loading="lazy">
            </div>
            <h3 class="card-title">${computer.name}</h3>
            <div class="card-specs">${computer.specs}</div>
            <div class="card-price">${computer.price}</div>
            <button class="card-btn">Заказать звонок</button>
        `;
        card.querySelector('.card-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            alert(`Спасибо за интерес к ${computer.name}! Наш менеджер свяжется с вами.`);
        });
        track.appendChild(card);
    });
}

function createDots() {
    dotsContainer.innerHTML = '';
    const totalDots = Math.ceil(computers.length / cardsPerView);
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function updateCarousel() {
    const containerWidth = document.querySelector('.cards-wrapper').clientWidth;
    const cards = document.querySelectorAll('.card');
    
    if (cards.length === 0) return;
    
    cardWidth = cards[0].offsetWidth;
    const gap = 32; 
    
    const maxIndex = Math.max(0, Math.ceil(computers.length / cardsPerView) - 1);
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;
    
    const offset = currentIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;
    
    updateDots();
}

function handleResize() {
    const newCardsPerView = getCardsPerView();
    if (newCardsPerView !== cardsPerView) {
        cardsPerView = newCardsPerView;
        const oldIndex = currentIndex;
        createDots();
        currentIndex = Math.min(oldIndex, Math.ceil(computers.length / cardsPerView) - 1);
        if (currentIndex < 0) currentIndex = 0;
        updateCarousel();
    } else {
        updateCarousel();
    }
}

function nextSlide() {
    const maxIndex = Math.ceil(computers.length / cardsPerView) - 1;
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    } else if (currentIndex === maxIndex && computers.length % cardsPerView !== 0) {
    } else if (currentIndex === maxIndex) {
        currentIndex = maxIndex;
        updateCarousel();
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
}

function init() {
    createCards();
    cardsPerView = getCardsPerView();
    createDots();
    
    setTimeout(() => {
        updateCarousel();
    }, 10);
    
    window.addEventListener('resize', () => {
        setTimeout(handleResize, 100);
    });
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
}

document.addEventListener('DOMContentLoaded', init);

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');
    
    const cards = document.querySelectorAll('.card');
    const cardsPerView = getCardsPerView();
    const totalCards = cards.length;
    let currentIndex = 0;
    
    function getCardsPerView() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 1024) return 3;
        return 4;
    }
    
    function getCardWidth() {
        const container = document.querySelector('.carousel-container');
        const containerWidth = container.clientWidth;
        const perView = getCardsPerView();
        const gap = 24; 
        return (containerWidth - (gap * (perView - 1))) / perView;
    }
    
    function setCardWidths() {
        const cardWidth = getCardWidth();
        cards.forEach(card => {
            card.style.flex = `0 0 ${cardWidth}px`;
        });
    }
    
    function updateCarousel() {
        const cardWidth = getCardWidth();
        const gap = 24;
        const offset = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;
        updateDots();
        updateArrows();
    }
    
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        const maxIndex = totalCards - getCardsPerView();
        const normalizedIndex = Math.min(currentIndex, maxIndex);
        
        dots.forEach((dot, idx) => {
            if (idx === normalizedIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function updateArrows() {
        const maxIndex = totalCards - getCardsPerView();
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
        
        prevBtn.style.opacity = currentIndex === 0 ? '0.4' : '1';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.4' : '1';
        prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
        nextBtn.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
    }
    
    function createDots() {
        const maxIndex = totalCards - getCardsPerView();
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const maxIndex = totalCards - getCardsPerView();
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newCardsPerView = getCardsPerView();
            const maxIndex = totalCards - newCardsPerView;
            
            if (currentIndex > maxIndex && maxIndex >= 0) {
                currentIndex = maxIndex;
            }
            if (currentIndex < 0) currentIndex = 0;
            
            setCardWidths();
            createDots();
            updateCarousel();
        }, 100);
    });
    
    function init() {
        setCardWidths();
        createDots();
        updateCarousel();
    }
    
    init();
});