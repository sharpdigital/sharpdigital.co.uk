// Sharp Digital - Interactive JavaScript
// Handles all interactive elements, animations, and form validation

class SharpDigital {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 3;
        this.slideInterval = null;
        this.autoplayDelay = 8000;
        this.isPlaying = true;
        this.formValidator = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeCarousel();
        this.initializeNavigation();
        this.initializeFormValidation();
        this.initializeScrollEffects();
        this.initializeAnimations();
        this.initializeAccessibility();
    }

    setupEventListeners() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.bindEvents();
            });
        } else {
            this.bindEvents();
        }
    }

    bindEvents() {
        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Carousel navigation
        const carouselPrev = document.querySelector('.carousel-prev');
        const carouselNext = document.querySelector('.carousel-next');
        const carouselIndicators = document.querySelectorAll('.carousel-indicator');

        if (carouselPrev) {
            carouselPrev.addEventListener('click', () => {
                this.previousSlide();
            });
        }

        if (carouselNext) {
            carouselNext.addEventListener('click', () => {
                this.nextSlide();
            });
        }

        carouselIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        // Form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                this.handleFormSubmission(e);
            });
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                this.smoothScrollToSection(e);
            });
        });

        // Scroll to top button
        const scrollToTopBtn = this.createScrollToTopButton();
        window.addEventListener('scroll', () => {
            this.handleScrollToTop(scrollToTopBtn);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleWindowResize();
        });

        // Intersection Observer for animations
        this.setupIntersectionObserver();
    }

    // Mobile Navigation
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        
        if (mobileMenu && mobileMenuButton) {
            const isOpen = !mobileMenu.classList.contains('hidden');
            
            if (isOpen) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            } else {
                mobileMenu.classList.remove('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'true');
            }
        }
    }

    // Carousel Functionality
    initializeCarousel() {
        this.updateCarouselSlide();
        this.startAutoplay();
        
        // Pause on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                this.pauseAutoplay();
            });
            
            carouselContainer.addEventListener('mouseleave', () => {
                this.startAutoplay();
            });
        }
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarouselSlide();
    }

    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarouselSlide();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarouselSlide();
    }

    updateCarouselSlide() {
        const carouselSlides = document.querySelector('.carousel-slides');
        const indicators = document.querySelectorAll('.carousel-indicator');
        
        if (carouselSlides) {
            const translateX = -this.currentSlide * 100;
            carouselSlides.style.transform = `translateX(${translateX}%)`;
        }
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === this.currentSlide) {
                indicator.classList.add('active');
                indicator.classList.remove('bg-white', 'bg-opacity-60');
                indicator.classList.add('bg-primary');
            } else {
                indicator.classList.remove('active');
                indicator.classList.remove('bg-primary');
                indicator.classList.add('bg-white', 'bg-opacity-60');
            }
        });
    }

    startAutoplay() {
        if (!this.isPlaying) return;
        
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }

    pauseAutoplay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    // Navigation
    initializeNavigation() {
        // Add active class to current section
        this.updateActiveNavigation();
        
        // Update navigation on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveNavigation();
        });
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('text-primary');
                    link.classList.add('text-charcoal');
                    
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-primary');
                        link.classList.remove('text-charcoal');
                    }
                });
            }
        });
    }

    // Form Validation
    initializeFormValidation() {
        this.formValidator = new FormValidator();
    }

    handleFormSubmission(e) {
        e.preventDefault();
        
        const form = e.target;
        const isValid = this.formValidator.validateForm(form);
        
        if (isValid) {
            this.submitForm(form);
        }
    }

    async submitForm(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.button-text');
        const buttonIcon = submitButton.querySelector('.button-icon');
        
        // Show loading state
        submitButton.disabled = true;
        buttonText.textContent = 'Sending...';
        buttonIcon.style.display = 'none';
        
        try {
            // Simulate form submission (replace with actual API call)
            await this.simulateFormSubmission(form);
            
            // Show success message
            this.showMessage('success', 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
            form.reset();
            
        } catch (error) {
            // Show error message
            this.showMessage('error', 'Sorry, there was an error sending your message. Please try again or contact us directly.');
            
        } finally {
            // Reset button state
            submitButton.disabled = false;
            buttonText.textContent = 'Send Message';
            buttonIcon.style.display = 'inline';
        }
    }

    async simulateFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Log form data (in production, send to server)
        console.log('Form submission data:', data);
        
        // Simulate random success/failure for demo
        if (Math.random() > 0.1) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('Submission failed'));
        }
    }

    showMessage(type, message) {
        const messageContainer = document.createElement('div');
        messageContainer.className = `message message-${type} animate-slide-up`;
        
        const iconSvg = this.getMessageIcon(type);
        
        messageContainer.innerHTML = `
            <div class="message-icon">${iconSvg}</div>
            <div>${message}</div>
        `;
        
        // Insert message at the top of the contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.insertBefore(messageContainer, contactForm.firstChild);
            
            // Auto-remove message after 5 seconds
            setTimeout(() => {
                if (messageContainer.parentNode) {
                    messageContainer.remove();
                }
            }, 5000);
        }
    }

    getMessageIcon(type) {
        const icons = {
            success: '<svg class="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>',
            error: '<svg class="w-5 h-5 text-error" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>',
            warning: '<svg class="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>',
            info: '<svg class="w-5 h-5 text-info" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>'
        };
        
        return icons[type] || icons.info;
    }

    // Smooth Scrolling
    smoothScrollToSection(e) {
        e.preventDefault();
        
        const href = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(href);
        
        if (targetSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Scroll Effects
    initializeScrollEffects() {
        // Sticky header
        const header = document.getElementById('header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 0) {
                    header.classList.add('header-shadow');
                } else {
                    header.classList.remove('header-shadow');
                }
            });
        }
    }

    // Scroll to Top Button
    createScrollToTopButton() {
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>';
        button.setAttribute('aria-label', 'Scroll to top');
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(button);
        return button;
    }

    handleScrollToTop(button) {
        if (window.scrollY > 300) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    }

    // Keyboard Navigation
    handleKeyboardNavigation(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                this.toggleMobileMenu();
            }
        }
        
        // Arrow keys for carousel navigation
        if (e.key === 'ArrowLeft') {
            this.previousSlide();
        } else if (e.key === 'ArrowRight') {
            this.nextSlide();
        }
    }

    // Window Resize
    handleWindowResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 768) {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                this.toggleMobileMenu();
            }
        }
    }

    // Animations
    initializeAnimations() {
        // Add fade-in class to elements for initial animation
        const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
        });
    }

    // Intersection Observer for scroll animations
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    if (element.classList.contains('animate-fade-in')) {
                        element.style.opacity = '1';
                        element.style.animation = 'fadeIn 0.5s ease-in-out forwards';
                    }
                    
                    if (element.classList.contains('animate-slide-up')) {
                        element.style.opacity = '1';
                        element.style.animation = 'slideUp 0.5s ease-out forwards';
                    }
                    
                    // Remove observer after animation
                    observer.unobserve(element);
                }
            });
        }, options);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Accessibility
    initializeAccessibility() {
        // Add focus indicators
        this.addFocusIndicators();
        
        // Add ARIA labels
        this.addAriaLabels();
        
        // Add keyboard support
        this.addKeyboardSupport();
    }

    addFocusIndicators() {
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('focus-visible');
            });
            
            element.addEventListener('blur', () => {
                element.classList.remove('focus-visible');
            });
        });
    }

    addAriaLabels() {
        // Add ARIA labels to carousel
        const carouselSlides = document.querySelectorAll('.carousel-slide');
        carouselSlides.forEach((slide, index) => {
            slide.setAttribute('aria-label', `Slide ${index + 1} of ${this.totalSlides}`);
        });
    }

    addKeyboardSupport() {
        // Add keyboard support to carousel indicators
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.goToSlide(index);
                }
            });
        });
    }
}

// Form Validator Class
class FormValidator {
    constructor() {
        this.rules = {
            required: (value) => value.trim() !== '',
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            minLength: (value, length) => value.length >= length,
            maxLength: (value, length) => value.length <= length
        };
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const fieldType = field.type;
        const isRequired = field.hasAttribute('required');
        
        // Clear previous errors
        this.clearFieldError(field);
        
        // Required field validation
        if (isRequired && !this.rules.required(value)) {
            this.showFieldError(field, `${this.getFieldLabel(field)} is required.`);
            return false;
        }
        
        // Email validation
        if (fieldType === 'email' && value && !this.rules.email(value)) {
            this.showFieldError(field, 'Please enter a valid email address.');
            return false;
        }
        
        // Checkbox validation (privacy policy)
        if (fieldType === 'checkbox' && isRequired && !field.checked) {
            this.showFieldError(field, 'You must agree to the privacy policy.');
            return false;
        }
        
        return true;
    }

    getFieldLabel(field) {
        const label = document.querySelector(`label[for="${field.id}"]`);
        return label ? label.textContent.replace('*', '').trim() : field.name;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.preloadCriticalAssets();
        this.optimizeScrolling();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalAssets() {
        // Preload critical CSS
        const criticalCSS = document.createElement('link');
        criticalCSS.rel = 'preload';
        criticalCSS.href = 'styles.css';
        criticalCSS.as = 'style';
        document.head.appendChild(criticalCSS);

        // Preload fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = './font/frutiger-light.woff';
        fontLink.as = 'font';
        fontLink.type = 'font/woff';
        fontLink.crossOrigin = 'anonymous';
        document.head.appendChild(fontLink);
    }

    optimizeScrolling() {
        let ticking = false;

        function updateScrollPosition() {
            // Scroll-based animations and effects
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollPosition);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const app = new SharpDigital();
    const optimizer = new PerformanceOptimizer();
    
    // Service Worker Registration (if available)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker registered successfully');
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed');
            });
    }
});

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // In production, send error to monitoring service
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // In production, send error to monitoring service
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SharpDigital, FormValidator, PerformanceOptimizer };
}