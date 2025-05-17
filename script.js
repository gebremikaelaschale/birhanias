document.addEventListener('DOMContentLoaded', () => {

    // --- Responsive Navigation Menu ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }

    // --- Smooth Scroll for Navigation Links (alternative to CSS scroll-behavior) ---
    // This is already handled by `html { scroll-behavior: smooth; }` in CSS.
    // If you prefer JS control or need wider browser support for smooth scroll:
    /*
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    */

    // --- Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-menu .nav-link");

    function changeNavOnScroll() {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust offset if you have a fixed header
            if (pageYOffset >= (sectionTop - sectionHeight / 3 - 70)) { // 70 is navbar height
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
         // Default to home if no section is active (e.g. at the very top or bottom beyond sections)
        if (!current && navLinks.length > 0) {
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }
    window.addEventListener("scroll", changeNavOnScroll);
    changeNavOnScroll(); // Initial call

    // --- Contact Form Submission (Front-end simulation) ---
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual submission

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Basic validation (can be more complex)
            if (name && email && subject && message) {
                formMessage.textContent = `Thank you, ${name}! Your message about "${subject}" has been "sent" (this is a demo).`;
                formMessage.style.color = 'var(--accent-color)';
                contactForm.reset(); // Clear the form
            } else {
                formMessage.textContent = 'Please fill out all fields.';
                formMessage.style.color = 'red';
            }

            // To make this REAL, you'd use fetch() or XMLHttpRequest to send data to a server endpoint.
            // Example:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message })
            })
            .then(response => response.json())
            .then(data => {
                formMessage.textContent = data.message; // Message from server
                if (data.success) contactForm.reset();
            })
            .catch(error => {
                formMessage.textContent = 'An error occurred. Please try again.';
                console.error('Error:', error);
            });
            */
        });
    }

    // --- Comment Section (Front-end simulation) ---
    const addCommentBtn = document.getElementById('addCommentBtn');
    const newCommentTextarea = document.getElementById('newComment');
    const commentsList = document.getElementById('commentsList');

    if (addCommentBtn && newCommentTextarea && commentsList) {
        addCommentBtn.addEventListener('click', () => {
            const commentText = newCommentTextarea.value.trim();
            if (commentText) {
                const commentItem = document.createElement('div');
                commentItem.classList.add('comment-item');

                const author = document.createElement('p');
                author.classList.add('comment-author');
                author.textContent = 'Anonymous User'; // In a real app, this would be the logged-in user

                const text = document.createElement('p');
                text.classList.add('comment-text');
                text.textContent = commentText;

                const date = document.createElement('p');
                date.classList.add('comment-date');
                date.textContent = `Posted on: ${new Date().toLocaleDateString()}`;

                commentItem.appendChild(author);
                commentItem.appendChild(text);
                commentItem.appendChild(date);

                // Add to the top of the list
                commentsList.insertBefore(commentItem, commentsList.firstChild);

                newCommentTextarea.value = ''; // Clear textarea

                // Note: These comments are temporary and will disappear on page reload.
                // Real comments need a backend and database.
            }
        });
    }

    // --- Update Footer Year ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

}); // End DOMContentLoaded