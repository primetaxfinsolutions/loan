// ============================================
// PRIME TAXFIN SOLUTIONS - PREMIUM LOAN WEBSITE
// Premium JavaScript with Animations & Interactivity
// ============================================

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoadingScreen();
    initNavigation();
    initScrollEffects();
    initEMICalculator();
    initLoanCards();
    initContactForm();
    initAnimations();
    initChart();
    
    console.log('%c🏢 PRIME TAXFIN SOLUTIONS', 'color: #4f46e5; font-size: 24px; font-weight: bold;');
    console.log('%c📱 Premium Loan Website Initialized', 'color: #10b981; font-size: 16px;');
    console.log('%c📞 Contact: +91 98933 30505 | +91 94240 06220 | +91 94250 70241', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c📍 Location: Indore, Madhya Pradesh', 'color: #4f46e5; font-size: 14px;');
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        loadingProgress.style.width = `${Math.min(progress, 100)}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }
    }, 100);
}

// Update the initNavigation function in script.js:

// Navigation
function initNavigation() {
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Active navigation based on scroll position
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;
        
        // Update header on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active navigation link
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
}
    


// Scroll Effects
function initScrollEffects() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.loan-card, .step, .team-card, .info-card').forEach(el => {
        observer.observe(el);
    });
}

// EMI Calculator
function initEMICalculator() {
    // Elements
    const loanAmountInput = document.getElementById('loanAmountInput');
    const loanAmountSlider = document.getElementById('loanAmountSlider');
    const interestRateInput = document.getElementById('interestRateInput');
    const interestRateSlider = document.getElementById('interestRateSlider');
    const loanTenureInput = document.getElementById('loanTenureInput');
    const loanTenureSlider = document.getElementById('loanTenureSlider');
    const loanTypeBtns = document.querySelectorAll('.loan-type-btn');
    
    // Display elements
    const loanAmountDisplay = document.getElementById('loanAmountDisplay');
    const interestRateDisplay = document.getElementById('interestRateDisplay');
    const loanTenureDisplay = document.getElementById('loanTenureDisplay');
    const loanTypeDisplay = document.getElementById('loanTypeDisplay');
    const emiResult = document.getElementById('emiResult');
    const totalAmount = document.getElementById('totalAmount');
    const totalInterest = document.getElementById('totalInterest');
    const principalAmount = document.getElementById('principalAmount');
    const displayTenure = document.getElementById('displayTenure');
    
    // Format Indian Number
    function formatIndianNumber(num) {
        const numStr = Math.round(num).toString();
        const lastThree = numStr.substring(numStr.length - 3);
        const otherNumbers = numStr.substring(0, numStr.length - 3);
        
        if (otherNumbers !== '') {
            return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
        }
        return lastThree;
    }
    
    // Format with decimal for interest rate
    function formatDecimal(num) {
        return parseFloat(num).toFixed(1);
    }
    
    // Calculate EMI
    function calculateEMI() {
        const principal = parseFloat(loanAmountInput.value) || 500000;
        const rate = (parseFloat(interestRateInput.value) || 12.5) / 12 / 100;
        const tenure = (parseFloat(loanTenureInput.value) || 5) * 12;
        
        // EMI Formula
        const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
        const totalPayment = emi * tenure;
        const totalInterestPayable = totalPayment - principal;
        
        // Update Display Values
        loanAmountDisplay.textContent = formatIndianNumber(principal);
        interestRateDisplay.textContent = formatDecimal(interestRateInput.value || 12.5) + '%';
        loanTenureDisplay.textContent = `${loanTenureInput.value || 5} Years`;
        displayTenure.textContent = `${loanTenureInput.value || 5} Years (${tenure} Months)`;
        
        // Update Results
        emiResult.textContent = `₹${formatIndianNumber(Math.round(emi))}`;
        totalAmount.textContent = `₹${formatIndianNumber(Math.round(totalPayment))}`;
        totalInterest.textContent = `₹${formatIndianNumber(Math.round(totalInterestPayable))}`;
        principalAmount.textContent = `₹${formatIndianNumber(Math.round(principal))}`;
        
        // Update Chart
        updateChart(principal, totalInterestPayable);
    }
    
    // Update Chart
    function updateChart(principal, interest) {
        const ctx = document.getElementById('emiChart').getContext('2d');
        
        if (window.emiChartInstance) {
            window.emiChartInstance.destroy();
        }
        
        window.emiChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Principal Amount', 'Interest Amount'],
                datasets: [{
                    data: [principal, interest],
                    backgroundColor: [
                        '#4f46e5',
                        '#10b981'
                    ],
                    borderWidth: 0,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ₹${formatIndianNumber(value)} (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }
    
    // Loan Type Selection
    loanTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            loanTypeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update loan type display
            const loanType = btn.querySelector('span').textContent;
            loanTypeDisplay.textContent = `${loanType} Loan`;
            
            // Update interest rate
            const newRate = parseFloat(btn.dataset.rate);
            interestRateInput.value = newRate;
            interestRateSlider.value = newRate;
            
            // Recalculate EMI
            calculateEMI();
        });
    });
    
    // Sync Inputs and Sliders
    function syncInputs() {
        // Loan Amount
        loanAmountInput.addEventListener('input', () => {
            loanAmountSlider.value = loanAmountInput.value;
            calculateEMI();
        });
        
        loanAmountSlider.addEventListener('input', () => {
            loanAmountInput.value = loanAmountSlider.value;
            calculateEMI();
        });
        
        // Interest Rate
        interestRateInput.addEventListener('input', () => {
            interestRateSlider.value = interestRateInput.value;
            calculateEMI();
        });
        
        interestRateSlider.addEventListener('input', () => {
            interestRateInput.value = interestRateSlider.value;
            calculateEMI();
        });
        
        // Loan Tenure
        loanTenureInput.addEventListener('input', () => {
            loanTenureSlider.value = loanTenureInput.value;
            calculateEMI();
        });
        
        loanTenureSlider.addEventListener('input', () => {
            loanTenureInput.value = loanTenureSlider.value;
            calculateEMI();
        });
        
        // Format loan amount on blur
        loanAmountInput.addEventListener('blur', () => {
            const value = loanAmountInput.value.replace(/,/g, '');
            if (!isNaN(value) && value !== '') {
                loanAmountInput.value = parseInt(value).toLocaleString('en-IN');
            }
        });
        
        loanAmountInput.addEventListener('focus', () => {
            loanAmountInput.value = loanAmountInput.value.replace(/,/g, '');
        });
    }
    
    // Initialize sync and calculate
    syncInputs();
    calculateEMI();
}

// Loan Cards
function initLoanCards() {
    const loanCards = document.querySelectorAll('.loan-card');
    
    loanCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            const icon = card.querySelector('.loan-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            const icon = card.querySelector('.loan-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
        
        // Click to apply
        const cta = card.querySelector('.loan-cta');
        if (cta) {
            cta.addEventListener('click', (e) => {
                e.preventDefault();
                const loanType = card.dataset.loan;
                const loanTypes = {
                    'personal': 'Personal Loan',
                    'home': 'Home Loan',
                    'business': 'Business Loan',
                    'education': 'Education Loan',
                    'vehicle': 'Vehicle Loan',
                    'gold': 'Gold Loan'
                };
                
                // Scroll to contact form and set loan type
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const contactPosition = contactSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: contactPosition,
                        behavior: 'smooth'
                    });
                    
                    // Highlight in contact form after scroll
                    setTimeout(() => {
                        const loanSelect = document.querySelector('#loanEnquiryForm select');
                        if (loanSelect) {
                            loanSelect.value = loanType;
                            loanSelect.style.borderColor = '#4f46e5';
                            loanSelect.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
                            
                            setTimeout(() => {
                                loanSelect.style.borderColor = '';
                                loanSelect.style.boxShadow = '';
                            }, 2000);
                        }
                    }, 1000);
                }
            });
        }
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('loanEnquiryForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate
            if (!data.phone || data.phone.length < 10) {
                showNotification('Please enter a valid phone number', 'error');
                return;
            }
            
            // Create WhatsApp message
            const whatsappMessage = `*🏢 PRIME TAXFIN SOLUTIONS - Loan Enquiry*\n\n` +
                `*👤 Name:* ${data.name || 'Not provided'}\n` +
                `*📱 Phone:* ${data.phone}\n` +
                `*📧 Email:* ${data.email || 'Not provided'}\n` +
                `*💰 Loan Type:* ${data['loan-type'] || 'Not specified'}\n` +
                `*💵 Loan Amount:* ${data['loan-amount'] || 'Not specified'}\n` +
                `*📝 Additional Info:* ${data['additional-info'] || 'None'}\n\n` +
                `_Enquiry submitted on: ${new Date().toLocaleString('en-IN')}_`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/919893330505?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Show success message
            showNotification('Opening WhatsApp to send your enquiry...', 'success');
            
            // Reset form after delay
            setTimeout(() => {
                this.reset();
            }, 1000);
        });
    }
    
    // Notification function
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Animations
function initAnimations() {
    // Add animation classes on scroll
    const animatedElements = document.querySelectorAll('.loan-card, .step, .team-card, .info-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .loan-card, .step, .team-card, .info-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .loan-card.animate-in,
        .step.animate-in,
        .team-card.animate-in,
        .info-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .loan-card:nth-child(1) { transition-delay: 0.1s; }
        .loan-card:nth-child(2) { transition-delay: 0.2s; }
        .loan-card:nth-child(3) { transition-delay: 0.3s; }
        .loan-card:nth-child(4) { transition-delay: 0.4s; }
        .loan-card:nth-child(5) { transition-delay: 0.5s; }
        .loan-card:nth-child(6) { transition-delay: 0.6s; }
        
        .step:nth-child(1) { transition-delay: 0.1s; }
        .step:nth-child(2) { transition-delay: 0.2s; }
        .step:nth-child(3) { transition-delay: 0.3s; }
        .step:nth-child(4) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(style);
}

// Chart Initialization
function initChart() {
    // Chart will be initialized by the EMI calculator
    window.emiChartInstance = null;
}

// Window Load
window.addEventListener('load', () => {
    // Add loaded class for final animations
    document.body.classList.add('loaded');
    
    // Initialize any additional components
    setTimeout(() => {
        // Update stats animation
        const stats = document.querySelectorAll('.stat h3');
        stats.forEach(stat => {
            const originalText = stat.textContent;
            let count = 0;
            const target = parseInt(originalText.replace(/[^0-9]/g, ''));
            const duration = 2000;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    count = target;
                    clearInterval(timer);
                }
                stat.textContent = originalText.replace(/[0-9]+/, Math.floor(count));
            }, 16);
        });
    }, 1000);
});

// Handle Window Resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate any layout-dependent values
        if (window.emiChartInstance) {
            window.emiChartInstance.resize();
        }
    }, 250);
});

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Website Error:', e.message);
});

// Service Worker Registration (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
