document.addEventListener('DOMContentLoaded', function() {
    const launchBtn = document.getElementById('launch_btn');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');

    // Define the different states for the launch button
    const buttonStates = [
        { text: 'Launch', class: 'launch-state' },
        { text: 'Explore', class: 'explore-state' },
        { text: 'Discover', class: 'discover-state' }
    ];

    let currentStateIndex = 0;

    function updateButtonState(direction) {
        // Remove current state class
        launchBtn.classList.remove(buttonStates[currentStateIndex].class);
        
        // Update index based on direction
        if (direction === 'next') {
            currentStateIndex = (currentStateIndex + 1) % buttonStates.length;
        } else {
            currentStateIndex = (currentStateIndex - 1 + buttonStates.length) % buttonStates.length;
        }

        // Apply new state
        launchBtn.textContent = buttonStates[currentStateIndex].text;
        launchBtn.classList.add(buttonStates[currentStateIndex].class);
        launchBtn.classList.add('active');

        // Remove the animation class after it completes
        setTimeout(() => {
            launchBtn.classList.remove('active');
        }, 1500);
    }

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateButtonState('prev');
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateButtonState('next');
    });

    // Initialize the first state
    launchBtn.classList.add(buttonStates[0].class);
}); 