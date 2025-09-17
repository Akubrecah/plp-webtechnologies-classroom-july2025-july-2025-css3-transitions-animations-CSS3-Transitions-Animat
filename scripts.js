// ========== PART 1: JavaScript Event Handling and Interactive Elements ==========

// Variable declarations
let visitorCount = 0;
let counterValue = 0;
const businessName = "Akubrecah Entertainment";
const printingRate = 5; // KES per page for black and white
const colorPrintingRate = 20; // KES per page for color
const businessHours = {
    weekdays: { open: 8, close: 20 },
    sunday: { open: 10, close: 16 }
};

// Loading screen functionality
function setupLoadingScreen() {
    const loadingOverlay = document.getElementById('loading-overlay');
    
    // Show loading screen
    loadingOverlay.style.display = 'flex';
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }, 2000);
}

// Dark Mode Toggle
function setupDarkModeToggle() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const icon = darkModeToggle.querySelector('i');
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            localStorage.setItem('darkMode', 'disabled');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// Counter Game
function setupCounterGame() {
    const counterDisplay = document.getElementById('counter-value');
    const incrementBtn = document.getElementById('increment-btn');
    const decrementBtn = document.getElementById('decrement-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    // Update counter display
    function updateCounter() {
        counterDisplay.textContent = counterValue;
        
        // Change color based on value
        if (counterValue > 0) {
            counterDisplay.style.color = '#5cb85c'; // Green
        } else if (counterValue < 0) {
            counterDisplay.style.color = '#d9534f'; // Red
        } else {
            counterDisplay.style.color = '#4a6491'; // Default blue
        }
    }
    
    incrementBtn.addEventListener('click', function() {
        counterValue++;
        updateCounter();
        // Add animation effect
        counterDisplay.classList.add('pulse');
        setTimeout(() => counterDisplay.classList.remove('pulse'), 500);
    });
    
    decrementBtn.addEventListener('click', function() {
        counterValue--;
        updateCounter();
        // Add animation effect
        counterDisplay.classList.add('pulse');
        setTimeout(() => counterDisplay.classList.remove('pulse'), 500);
    });
    
    resetBtn.addEventListener('click', function() {
        counterValue = 0;
        updateCounter();
        // Add animation effect
        counterDisplay.classList.add('pulse');
        setTimeout(() => counterDisplay.classList.remove('pulse'), 500);
    });
    
    // Initialize
    updateCounter();
}

// FAQ Accordion
function setupFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle answer visibility
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                answer.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });
}

// ========== PART 2: Building Interactive Elements ==========

// Conditional example - Check business status
function checkBusinessStatus() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    let statusMessage = "";
    
    if (currentDay === 0) { // Sunday
        if (currentHour >= businessHours.sunday.open && currentHour < businessHours.sunday.close) {
            statusMessage = "We're open today! Come visit us.";
        } else {
            statusMessage = "We're closed now. We open at 10:00 AM on Sundays.";
        }
    } else if (currentDay >= 1 && currentDay <= 5) { // Weekdays
        if (currentHour >= businessHours.weekdays.open && currentHour < businessHours.weekdays.close) {
            statusMessage = "We're open today! Come visit us.";
        } else {
            statusMessage = "We're closed now. We open at 8:00 AM on weekdays.";
        }
    } else { // Saturday
        statusMessage = "We're closed on Saturdays.";
    }
    
    return statusMessage;
}

// Function 1: Calculate printing cost (with parameters and return value)
function calculatePrintingCost(pages, isColor = false) {
    // Validate input
    if (pages <= 0 || typeof pages !== 'number') {
        return "Please enter a valid number of pages.";
    }
    
    const rate = isColor ? colorPrintingRate : printingRate;
    let totalCost = pages * rate;
    
    // Apply discount for large orders
    if (pages > 50) {
        const discount = totalCost * 0.1; // 10% discount
        totalCost = totalCost - discount;
        return { 
            cost: totalCost, 
            message: `Total cost: KES ${totalCost} (including 10% discount for bulk printing)` 
        };
    }
    
    return { 
        cost: totalCost, 
        message: `Total cost: KES ${totalCost}` 
    };
}

// Function 2: Format currency (demonstrates local scope and return value)
function formatCurrency(amount) {
    // Local scope variable
    const formattedAmount = new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES'
    }).format(amount);
    
    return formattedAmount;
}

// Function 3: Animate element (demonstrates parameters and CSS manipulation)
function animateElement(elementId, animationClass, duration = 1000) {
    const element = document.getElementById(elementId);
    
    if (!element) {
        console.error(`Element with ID ${elementId} not found`);
        return false;
    }
    
    // Add animation class
    element.classList.add(animationClass);
    
    // Remove animation class after duration
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, duration);
    
    return true;
}

// ========== PART 3: Form Validation with JavaScript ==========

// Form validation
function setupFormValidation() {
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    
    // Validate name
    nameInput.addEventListener('blur', function() {
        if (this.value.length < 2) {
            document.getElementById('name-error').style.display = 'block';
            this.style.borderColor = '#d9534f';
            animateElement('name-error', 'shake');
        } else {
            document.getElementById('name-error').style.display = 'none';
            this.style.borderColor = '#5cb85c';
        }
    });
    
    // Validate email
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            document.getElementById('email-error').style.display = 'block';
            this.style.borderColor = '#d9534f';
            animateElement('email-error', 'shake');
        } else {
            document.getElementById('email-error').style.display = 'none';
            this.style.borderColor = '#5cb85c';
        }
    });
    
    // Validate phone (optional)
    phoneInput.addEventListener('blur', function() {
        if (this.value && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(this.value)) {
            document.getElementById('phone-error').style.display = 'block';
            this.style.borderColor = '#d9534f';
            animateElement('phone-error', 'shake');
        } else {
            document.getElementById('phone-error').style.display = 'none';
            this.style.borderColor = this.value ? '#5cb85c' : '#ddd';
        }
    });
    
    // Validate message
    messageInput.addEventListener('blur', function() {
        if (this.value.length < 10) {
            document.getElementById('message-error').style.display = 'block';
            this.style.borderColor = '#d9534f';
            animateElement('message-error', 'shake');
        } else {
            document.getElementById('message-error').style.display = 'none';
            this.style.borderColor = '#5cb85c';
        }
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        
        if (nameInput.value.length < 2) {
            document.getElementById('name-error').style.display = 'block';
            nameInput.style.borderColor = '#d9534f';
            animateElement('name-error', 'shake');
            isValid = false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            document.getElementById('email-error').style.display = 'block';
            emailInput.style.borderColor = '#d9534f';
            animateElement('email-error', 'shake');
            isValid = false;
        }
        
        if (messageInput.value.length < 10) {
            document.getElementById('message-error').style.display = 'block';
            messageInput.style.borderColor = '#d9534f';
            animateElement('message-error', 'shake');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            document.getElementById('form-success').style.display = 'block';
            animateElement('form-success', 'fadeIn');
            
            // Reset form
            contactForm.reset();
            
            // Reset border colors
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.style.borderColor = '#ddd';
            });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                document.getElementById('form-success').style.display = 'none';
            }, 5000);
        }
    });
}

// ========== Animation Controls ==========

function setupAnimationControls() {
    const bounceBtn = document.getElementById('bounce-btn');
    const spinBtn = document.getElementById('spin-btn');
    const colorCycleBtn = document.getElementById('color-cycle-btn');
    const resetAnimationBtn = document.getElementById('reset-animation-btn');
    const animatedBox = document.getElementById('animated-box');
    
    bounceBtn.addEventListener('click', function() {
        animateElement('animated-box', 'bounce');
    });
    
    spinBtn.addEventListener('click', function() {
        animateElement('animated-box', 'spin');
    });
    
    colorCycleBtn.addEventListener('click', function() {
        animatedBox.classList.toggle('color-cycle');
    });
    
    resetAnimationBtn.addEventListener('click', function() {
        animatedBox.classList.remove('bounce', 'spin', 'color-cycle');
        // Reset to original styles
        animatedBox.style.transform = '';
        animatedBox.style.animation = '';
    });
}

// ========== Existing JavaScript Functionality ==========

// Loop 1: For loop to update visitor count
function simulateVisitors() {
    for (let i = 0; i < 5; i++) {
        visitorCount++;
    }
    document.getElementById('visitor-count').textContent = visitorCount;
}

// Loop 2: ForEach loop to add interaction to all service cards
function setupServiceDetails() {
    const detailButtons = document.querySelectorAll('.detail-button');
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const detail = this.nextElementSibling;
            if (detail.style.display === 'block') {
                detail.style.display = 'none';
                this.textContent = 'Show Details';
            } else {
                detail.style.display = 'block';
                this.textContent = 'Hide Details';
            }
        });
    });
}

// DOM Interaction 1: Change welcome message
function setupWelcomeMessageToggle() {
    const welcomeButton = document.getElementById('welcome-button');
    const welcomeHeading = document.getElementById('welcome-heading');
    
    welcomeButton.addEventListener('click', function() {
        if (welcomeHeading.textContent === 'Welcome to Akubrecah Entertainment') {
            welcomeHeading.textContent = 'Experience Quality Digital Services';
            welcomeHeading.style.color = '#4a6491';
        } else {
            welcomeHeading.textContent = 'Welcome to Akubrecah Entertainment';
            welcomeHeading.style.color = '';
        }
    });
}

// DOM Interaction 2: Toggle background color
function setupBackgroundColorToggle() {
    const colorButton = document.getElementById('color-button');
    let isOriginalColor = true;
    
    colorButton.addEventListener('click', function() {
        document.body.style.backgroundColor = isOriginalColor ? '#e8f4f8' : '';
        isOriginalColor = !isOriginalColor;
    });
}

// DOM Interaction 3: Show special offer banner
function setupDiscountBanner() {
    const discountButton = document.getElementById('discount-button');
    const discountBanner = document.getElementById('discount-banner');
    
    discountButton.addEventListener('click', function() {
        if (discountBanner.style.display === 'block') {
            discountBanner.style.display = 'none';
        } else {
            discountBanner.style.display = 'block';
            animateElement('discount-banner', 'slideIn');
            
            // Hide banner after 5 seconds
            setTimeout(() => {
                discountBanner.style.display = 'none';
            }, 5000);
        }
    });
}

// Additional DOM interactions
function setupPrintCostCalculator() {
    const calculateButton = document.getElementById('calculate-print');
    calculateButton.addEventListener('click', function() {
        const pages = parseInt(document.getElementById('print-pages').value) || 0;
        const isColor = document.getElementById('print-type').value === 'color';
        const result = calculatePrintingCost(pages, isColor);
        document.getElementById('calculation-result').textContent = result.message;
        
        // Add animation to result
        animateElement('calculation-result', 'fadeIn');
    });
}

function setupBusinessStatusCheck() {
    const statusButton = document.getElementById('check-status');
    statusButton.addEventListener('click', function() {
        const status = checkBusinessStatus();
        document.getElementById('status-message').textContent = status;
        animateElement('status-message', 'fadeIn');
    });
}

function setupShowAllDetails() {
    const showButton = document.getElementById('show-all-details');
    const hideButton = document.getElementById('hide-all-details');
    const details = document.querySelectorAll('.service-detail');
    const buttons = document.querySelectorAll('.detail-button');
    
    showButton.addEventListener('click', function() {
        details.forEach(detail => {
            detail.style.display = 'block';
        });
        buttons.forEach(button => {
            button.textContent = 'Hide Details';
        });
    });
    
    hideButton.addEventListener('click', function() {
        details.forEach(detail => {
            detail.style.display = 'none';
        });
        buttons.forEach(button => {
            button.textContent = 'Show Details';
        });
    });
}

function setupHighlightStudents() {
    const highlightButton = document.getElementById('highlight-students');
    const listItems = document.querySelectorAll('#target-market li');
    
    highlightButton.addEventListener('click', function() {
        listItems.forEach(item => {
            if (item.textContent.includes('Students')) {
                item.style.backgroundColor = '#ffe6b3';
                item.style.padding = '8px';
                item.style.borderRadius = '4px';
                // Custom function call for specific element
                item.classList.add('pulse');
                setTimeout(() => item.classList.remove('pulse'), 1000);
            }
        });
    });
}

function setupAddCustomerType() {
    const addButton = document.getElementById('add-customer-type');
    const marketList = document.getElementById('target-market');
    
    addButton.addEventListener('click', function() {
        const newItem = document.createElement('li');
        newItem.textContent = 'Educational Institutions: For printing educational materials and exam papers.';
        marketList.appendChild(newItem);
        // Add animation to new item
        newItem.style.opacity = '0';
        setTimeout(() => {
            newItem.style.transition = 'opacity 0.5s';
            newItem.style.opacity = '1';
        }, 10);
    });
}

// Initialize all functionality when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen
    setupLoadingScreen();
    
    // Part 1: Initialize visitor count
    simulateVisitors();
    
    // Part 2 & 3: Setup functions and loops
    setupServiceDetails();
    
    // Part 4: Setup DOM interactions
    setupWelcomeMessageToggle();
    setupBackgroundColorToggle();
    setupDiscountBanner();
    setupPrintCostCalculator();
    setupBusinessStatusCheck();
    setupShowAllDetails();
    setupHighlightStudents();
    setupAddCustomerType();
    
    // New interactive elements
    setupDarkModeToggle();
    setupCounterGame();
    setupFAQAccordion();
    
    // Form validation
    setupFormValidation();
    
    // Animation controls
    setupAnimationControls();
    
    console.log("All JavaScript functionality initialized successfully!");
});