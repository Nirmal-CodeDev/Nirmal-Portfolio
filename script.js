// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header & Scroll Spy ---
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Scroll Spy
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- Typing Animation ---
    const texts = ["Product Engineer", "Front-End Developer", "Angular Enthusiast", "Web Developer"];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-text');

    function type() {
        if (!typingElement) return;

        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];

        if (isDeleting) {
            letter = currentText.slice(0, --index);
        } else {
            letter = currentText.slice(0, ++index);
        }

        typingElement.textContent = letter;

        let typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && letter.length === currentText.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && letter.length === 0) {
            isDeleting = false;
            count++;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // --- Fade-in Animation on Scroll ---
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');

                // If it's the skills section, animate progress bars
                if (entry.target.closest('#skills')) {
                    const progressBars = document.querySelectorAll('.progress-bar');
                    progressBars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- Scroll to Top Button ---
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // --- Set Current Year in Footer ---
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- Basic Form Validation ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;

            // Get fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            // Reset errors
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

            // Validate Name
            if (name.value.trim() === '') {
                document.getElementById('nameError').textContent = 'Name is required';
                isValid = false;
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                document.getElementById('emailError').textContent = 'Please enter a valid email';
                isValid = false;
            }

            // Validate Subject
            if (subject.value.trim() === '') {
                document.getElementById('subjectError').textContent = 'Subject is required';
                isValid = false;
            }

            // Validate Message
            if (message.value.trim() === '') {
                document.getElementById('messageError').textContent = 'Message is required';
                isValid = false;
            }

            if (isValid) {
                const btn = contactForm.querySelector('button[type="submit"]');
                const originalText = btn.textContent;
                btn.textContent = 'Sending...';
                btn.disabled = true;

                // Send email directly to the provided email using FormSubmit
                fetch("https://formsubmit.co/ajax/nirmal270805@gmail.com", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name.value,
                        email: email.value,
                        subject: subject.value,
                        message: message.value
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('formSuccess').style.display = 'block';
                        contactForm.reset();
                    })
                    .catch(error => {
                        alert("Something went wrong!");
                    })
                    .finally(() => {
                        btn.textContent = originalText;
                        btn.disabled = false;

                        setTimeout(() => {
                            document.getElementById('formSuccess').style.display = 'none';
                        }, 5000);
                    });
            }
        });
    }
});
