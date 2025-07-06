        // Mobile Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });
        
        // Header Shrink on Scroll
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('shrink');
            } else {
                header.classList.remove('shrink');
            }
        });
        
        // Back to Top Button
        const backToTopBtn = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('opacity-0', 'invisible');
                backToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                backToTopBtn.classList.remove('opacity-100', 'visible');
                backToTopBtn.classList.add('opacity-0', 'invisible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // GSAP Animations
        gsap.from(".header", {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: "power3.out"
        });
        
        // FAQ Accordion
        document.querySelectorAll('[data-faq]').forEach(item => {
            item.querySelector('.faq-header').addEventListener('click', () => {
                item.classList.toggle('open');
                feather.replace();
            });
        });
        
        // Quiz Logic
        const steps = document.querySelectorAll('.quiz-step');
        let currentStep = 0;
        const quizData = [];

        document.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const value = btn.dataset.value;
                if (value) quizData.push(value);

                steps[currentStep].classList.add('hidden');
                currentStep++;

                if (currentStep < steps.length) {
                    steps[currentStep].classList.remove('hidden');
                } else {
                    document.getElementById('cta-container')?.classList.remove('hidden');
                    console.log('Quiz terminé ! Réponses :', quizData);
                }
            });
        });
        
        // Contact Form Submission
        const form = document.getElementById('contactForm');
        const confirmation = document.getElementById('confirmationMessage');
        const submitBtn = document.getElementById('submitBtn');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = "Envoi en cours...";

            // Simulate network delay
            setTimeout(() => {
                form.reset();
                submitBtn.textContent = "Réserver mon premier rendez-vous";
                submitBtn.disabled = false;

                // Show confirmation with animation
                confirmation.classList.remove('hidden');
                gsap.fromTo(confirmation, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.7, ease: "power2.out"});

                // Hide confirmation after 4 seconds
                setTimeout(() => {
                    gsap.to(confirmation, {
                        opacity: 0,
                        y: 20,
                        duration: 0.7,
                        ease: "power2.in",
                        onComplete: () => confirmation.classList.add('hidden')
                    });
                }, 4000);
            }, 1800);
        });
        
        // Carousel Auto Scroll
        const carousel = document.getElementById('carousel');
        let index = 0;
        const slideCount = carousel.children.length;

        setInterval(() => {
            index = (index + 1) % slideCount;
            carousel.style.transform = `translateX(-${index * 100}%)`;
        }, 6000);
        
        // GSAP Scroll Animations
        gsap.registerPlugin(ScrollTrigger);

        // Animation on scroll for various elements
        gsap.utils.toArray("[data-animate]").forEach(elem => {
            gsap.fromTo(elem,
                {opacity: 0, y: 40},
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    }
                }
            );
        });

        // Image slide-in gauche
        gsap.to("#portrait", {
            scrollTrigger: {
                trigger: "#portrait",
                start: "top 80%",
            },
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out"
        });

        // Texte slide-in droite
        gsap.to("#text-content", {
            scrollTrigger: {
                trigger: "#text-content",
                start: "top 80%",
            },
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out"
        });

        // Puces animation pop-up
        ScrollTrigger.batch("#bullet-list li", {
            onEnter: batch => {
                anime({
                    targets: batch,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    delay: anime.stagger(200),
                    duration: 600,
                    easing: 'easeOutQuad'
                });
            },
            start: "top 85%"
        });

        // Animation for service items
        gsap.utils.toArray(".service-item").forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.2,
                ease: "power2.out",
            });
        });

        // Animation for steps
        gsap.utils.toArray(".step-item").forEach((item, index) => {
            gsap.from(item, {
                opacity: 0,
                y: 50,
                duration: 1,
                delay: index * 0.3,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                }
            });
        });

        // Animation for fade-slide elements
        gsap.utils.toArray('.fade-slide').forEach((elem) => {
            gsap.fromTo(elem, 
                { opacity: 0, x: -30 }, 
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Initialize feather icons
        feather.replace();
    