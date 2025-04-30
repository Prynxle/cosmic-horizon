document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');

    let currentIndex = 0;

    function updateSlides(direction) {
        // Remove active class from current slide
        slides[currentIndex].classList.remove('active');
        
        // Update index based on direction
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % slides.length;
        } else {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        }

        // Add active class to new slide
        slides[currentIndex].classList.add('active');
    }

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateSlides('prev');
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateSlides('next');
    });

    // Initialize the first slide
    slides[0].classList.add('active');
}); 