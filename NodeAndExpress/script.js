// Handle form submission

const form = document.getElementById('contactForm');
const message = document.getElementById('submitConfirmation}');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    message.style.display = 'block';

    form.reset();
});