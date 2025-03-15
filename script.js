// KuzaDada Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Offset for fixed header
                    const headerOffset = 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Scroll-triggered animations
    const animatedElements = document.querySelectorAll('.feature-card, .about-img, .testimonial-card, .involvement-card');
    
    // Observer for animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Apply observer to each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add active class to current nav item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavItem() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavItem);
    
    // Form validation for contact forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formElements = form.elements;
            let isValid = true;
            
            // Basic validation
            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i];
                
                if (element.hasAttribute('required') && element.value.trim() === '') {
                    isValid = false;
                    element.classList.add('error');
                    
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.innerText = 'This field is required';
                    
                    // Remove existing error messages
                    const existingError = element.parentNode.querySelector('.error-message');
                    if (existingError) {
                        element.parentNode.removeChild(existingError);
                    }
                    
                    element.parentNode.appendChild(errorMessage);
                } else {
                    element.classList.remove('error');
                    const existingError = element.parentNode.querySelector('.error-message');
                    if (existingError) {
                        element.parentNode.removeChild(existingError);
                    }
                }
            }
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerText = 'Form submitted successfully!';
                
                // Remove existing messages
                const existingSuccess = form.querySelector('.success-message');
                if (existingSuccess) {
                    form.removeChild(existingSuccess);
                }
                
                form.appendChild(successMessage);
                
                // Reset form
                form.reset();
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                    if (successMessage.parentNode) {
                        successMessage.parentNode.removeChild(successMessage);
                    }
                }, 3000);
            }
        });
    });
    
    // Dynamic counter animation for stats section
    const statNumbers = document.querySelectorAll('.stat-item h3');
    let hasAnimated = false;
    
    // Function to animate counting
    function animateCounters() {
        if (hasAnimated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.innerText);
            const suffix = stat.innerText.match(/[^0-9]/g)?.join('') || '';
            let count = 0;
            const duration = 2000; // ms
            const increment = target / (duration / 16);
            
            stat.innerText = '0' + suffix;
            
            const counter = setInterval(() => {
                count += increment;
                if (count >= target) {
                    stat.innerText = target + suffix;
                    clearInterval(counter);
                } else {
                    stat.innerText = Math.floor(count) + suffix;
                }
            }, 16);
        });
        
        hasAnimated = true;
    }
    
    // Intersection observer for the stats section
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                statsObserver.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // Add animation classes to CSS elements
    const addAnimationStyles = () => {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .feature-card, .testimonial-card, .involvement-card, .about-img {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .feature-card.animate, .testimonial-card.animate, .involvement-card.animate, .about-img.animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            .active-link {
                position: relative;
            }
            
            .active-link::after {
                content: '';
                position: absolute;
                bottom: -4px;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: white;
                transform: scaleX(1);
            }
            
            .error {
                border: 1px solid red !important;
            }
            
            .error-message {
                color: red;
                font-size: 0.8rem;
                margin-top: 5px;
            }
            
            .success-message {
                color: green;
                background-color: rgba(0, 128, 0, 0.1);
                padding: 10px;
                border-radius: 5px;
                margin-top: 10px;
                text-align: center;
            }
        `;
        document.head.appendChild(styleSheet);
    };
    
    addAnimationStyles();
    
    // Testimonial slider functionality
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    const totalTestimonials = testimonials.length;
    
    // Only initialize if there are multiple testimonials
    if (totalTestimonials > 1) {
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonial-dots';
        
        for (let i = 0; i < totalTestimonials; i++) {
            const dot = document.createElement('span');
            dot.className = 'testimonial-dot';
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToTestimonial(i);
            });
            
            dotsContainer.appendChild(dot);
        }
        
        // Add dots to the testimonials section
        const testimonialsSection = document.querySelector('.testimonials .container');
        if (testimonialsSection) {
            testimonialsSection.appendChild(dotsContainer);
        }
        
        // Function to go to a specific testimonial
        function goToTestimonial(index) {
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            
            document.querySelectorAll('.testimonial-dot').forEach(dot => {
                dot.classList.remove('active');
            });
            
            testimonials[index].style.display = 'block';
            document.querySelectorAll('.testimonial-dot')[index].classList.add('active');
            currentTestimonial = index;
        }
        
        // Function to go to the next testimonial
        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            goToTestimonial(currentTestimonial);
        }
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(nextTestimonial, 5000);
        
        // Initialize the slider
        goToTestimonial(0);
    }
    
    // Newsletter subscription form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email === '') {
                // Show error
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.innerText = 'Please enter your email';
                
                // Remove existing error
                const existingError = newsletterForm.querySelector('.error-message');
                if (existingError) {
                    newsletterForm.removeChild(existingError);
                }
                
                newsletterForm.appendChild(errorMsg);
            } else {
                // Success
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.innerText = 'Thank you for subscribing to our newsletter!';
                
                // Remove existing messages
                const existingError = newsletterForm.querySelector('.error-message');
                const existingSuccess = newsletterForm.querySelector('.success-message');
                
                if (existingError) newsletterForm.removeChild(existingError);
                if (existingSuccess) newsletterForm.removeChild(existingSuccess);
                
                newsletterForm.appendChild(successMsg);
                emailInput.value = '';
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    if (successMsg.parentNode) {
                        successMsg.parentNode.removeChild(successMsg);
                    }
                }, 3000);
            }
        });
    }
});