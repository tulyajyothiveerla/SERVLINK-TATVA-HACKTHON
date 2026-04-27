const serviceData = {
    plumbing: {
        title: "Plumbing Services",
        icon: "bx-water",
        description: "Need emergency leak repair, a new faucet installation, or drain cleaning? Our community-vetted plumbers are available for fast, reliable service. Trust is built on local reputation and quality work."
    },
    electrical: {
        title: "Certified Electrical Work",
        icon: "bx-bolt-circle",
        description: "From fixing faulty wiring and upgrading circuit panels to installing new lights and outlets, connect with certified electricians who keep your home safe and powered efficiently."
    },
    tutoring: {
        title: "Academic Tutoring",
        icon: "bx-book-reader",
        description: "Find local educators for personalized academic support in Math, Science, languages, and more. All tutors are background-checked and rated by local families to ensure learning excellence."
    },
    cleaning: {
        title: "Professional Home Cleaning",
        icon: "bx-home-alt",
        description: "Book trusted professionals for routine cleaning, deep cleaning, and specialized sanitation services for your home or small business. Flexible schedules and transparent pricing."
    },
    cooking: {
        title: "Private Cooking & Meal Prep",
        icon: "bx-restaurant",
        description: "Hire a local chef for weekly meal preparation, dinner parties, or cooking lessons. Enjoy healthy, custom meals tailored to your dietary needs right in your own kitchen."
    },
    handyman: {
        title: "General Handyman Services",
        icon: "bx-wrench",
        description: "For small jobs, repairs, and general maintenance around the house—from assembling furniture to hanging pictures. Reliable local help for all your general home repair needs."
    },
    petcare: {
        title: "Trusted Pet Care",
        icon: "bx-walk",
        description: "Find local pet sitters and dog walkers. Our community of animal lovers provides reliable care, ensuring your pets are happy and safe while you're away."
    },
    gardening: {
        title: "Gardening & Lawn Care",
        icon: "bx-leaf",
        description: "Professional mowing, landscaping, garden design, and yard cleanup. Get local experts to keep your outdoor spaces beautiful and well-maintained throughout the year."
    },
    techrepair: {
        title: "IT & Tech Repair",
        icon: "bx-desktop",
        description: "Quick and reliable repair for computers, laptops, and mobile devices. Get help with software issues, hardware replacement, and network troubleshooting from verified tech pros."
    },
    transport: {
        title: "Local Transport & Errand",
        icon: "bx-car",
        description: "Need reliable driving service, local errands, or assistance with small moves? Find trustworthy local drivers who know the area and offer safe, prompt service."
    }
};

// --- NEW DATA BLOCK: Simulated Provider Contact Information ---
const providerContacts = {
    // This maps provider names to unique phone numbers (for demo purposes)
    "Visakhapatnam Tutoring Hub": "+91 98765 43210",
    "Vijayawada Tech Repair Hub": "+91 99887 76655",
    "Guntur Cleaning Hub": "+91 88888 11111",
    "Nellore Plumbing Hub": "+91 77777 22222",
    "Kurnool Tutoring Hub": "+91 90000 33333",
    // Add more providers here if needed for testing other locations
};

function getProviderContact(providerName) {
    return providerContacts[providerName] || 'Contact Not Available';
}
// --- END NEW DATA BLOCK ---


window.onload = () => {
    document.documentElement.classList.add('dark');
    const modal = document.getElementById('service-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeServiceModal();
            }
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && modal && modal.style.display === 'flex') {
            closeServiceModal();
        }
    });
};

function openServiceModal(category) {
    const data = serviceData[category];
    if (!data) return;

    const modal = document.getElementById('service-modal');
    
    // CRITICAL FIX: Explicitly set the display property to 'flex'
    if (modal) {
        modal.style.display = 'flex';
    }

    document.getElementById('modal-icon').className = `bx ${data.icon} text-6xl text-red-400 mb-4`;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-description').textContent = data.description;
    
    document.getElementById('find-providers-btn').setAttribute('data-category', category);
    document.getElementById('find-providers-btn').onclick = () => findProviders(category);
}

function closeServiceModal() {
    const modal = document.getElementById('service-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function findProviders(category) {
    window.location.href = 'providerscs.html?category=' + category;
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    // Simplified toggle for pages that use 'hidden' or 'hidden-dropdown'
    if(menu) {
        if(menu.classList.contains('hidden-dropdown')) {
            menu.classList.remove('hidden-dropdown');
        } else if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
        } else {
            // Apply the appropriate class to hide it again
            menu.classList.add('hidden-dropdown') || menu.classList.add('hidden');
        }
    }
}

function setRole(role) {
    const statusElement = document.getElementById('role-status');
    
    if (role === 'customer') {
        statusElement.textContent = 'Launching Customer Dashboard...';
        window.location.href = 'homecs.html';
    } else if (role === 'provider') {
        statusElement.textContent = 'Launching Provider Authentication...';
        window.location.href = 'loginpr.html'; // Use the new combined page
    }
}

// --- GENERAL AUTH HELPERS ---

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
  }
  return false;
}


// --- CUSTOMER AUTH LOGIC (From loginsignupcs.html) ---

function getStoredUsers() {
    const users = localStorage.getItem('servlinkUsers');
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem('servlinkUsers', JSON.stringify(users));
}

// NOTE: handleSignup and handleLogin functions for CUSTOMERS are defined inline in loginsignupcs.html
// because they are highly coupled to the error message elements on that specific page.


// --- PROVIDER AUTH LOGIC (Used by homepr.html and loginpr.html) ---

function getStoredProviders() {
    const providers = localStorage.getItem('servlinkProviders');
    return providers ? JSON.parse(providers) : [];
}

function saveProviders(providers) {
    localStorage.setItem('servlinkProviders', JSON.stringify(providers));
}

function validateProviderCode(code) {
    // Requires PRV- followed by 8 alphanumeric characters
    const regex = /^PRV-[A-Z0-9]{8}$/i; 
    return regex.test(code);
}

/**
 * Handles Provider Registration (Signup).
 */
function handleProviderSignup(event) {
    event.preventDefault();
    clearProviderErrors();
    
    // Retrieve elements using their IDs from the HTML
    const name = document.getElementById('provider-signup-name').value.trim();
    const email = document.getElementById('provider-signup-email').value.trim();
    const password = document.getElementById('provider-signup-password').value;
    const confirmPassword = document.getElementById('provider-signup-confirm-password').value;
    const code = document.getElementById('provider-auth-code').value.toUpperCase().trim();
    const messageElement = document.getElementById('provider-auth-message');

    let isValid = true;
    let errorId;

    // Validation checks
    if (name.length < 3) isValid = (errorId = 'provider-signup-name-error', false);
    else if (!isValidEmail(email)) isValid = (errorId = 'provider-signup-email-error', false);
    else if (password.length < 6) isValid = (errorId = 'provider-signup-password-error', false);
    else if (password !== confirmPassword) isValid = (errorId = 'provider-signup-confirm-password-error', false);
    else if (!validateProviderCode(code)) isValid = (errorId = 'provider-auth-code-error', false);
    
    // Display specific errors if validation fails
    if (!isValid) {
        let msg = 'Please correct the errors before creating an account.';
        if (errorId === 'provider-signup-name-error') showError('provider-signup-name-error', 'Name must be at least 3 characters.');
        else if (errorId === 'provider-signup-email-error') showError('provider-signup-email-error', 'Please enter a valid email address.');
        else if (errorId === 'provider-signup-password-error') showError('provider-signup-password-error', 'Password must be at least 6 characters.');
        else if (errorId === 'provider-signup-confirm-password-error') showError('provider-signup-confirm-password-error', 'Passwords do not match.');
        else if (errorId === 'provider-auth-code-error') showError('provider-auth-code-error', 'Invalid code (PRV-XXXXXXXX required).');
        
        messageElement.textContent = msg;
        messageElement.classList.remove('hidden', 'text-yellow-400', 'text-green-400');
        messageElement.classList.add('text-red-400');
        return;
    }

    // Local Storage Check
    let providers = getStoredProviders();

    if (providers.some(p => p.email === email)) {
        messageElement.textContent = 'This email is already registered. Please login.';
        messageElement.classList.remove('hidden', 'text-red-400', 'text-green-400');
        messageElement.classList.add('text-yellow-400');
        showError('provider-signup-email-error', 'Email already exists.');
        return;
    }

    if (providers.some(p => p.code === code)) {
        messageElement.textContent = 'This Provider Code is already in use. Please check your code.';
        messageElement.classList.remove('hidden', 'text-red-400', 'text-green-400');
        messageElement.classList.add('text-yellow-400');
        showError('provider-auth-code-error', 'Code already in use.');
        return;
    }


    // Store new provider
    const newProvider = {
        name: name,
        email: email,
        password: password, 
        code: code
    };
    
    providers.push(newProvider);
    saveProviders(providers);

    messageElement.textContent = `🎉 Provider account created! Welcome, ${name}. Please log in now.`;
    messageElement.classList.remove('hidden', 'text-yellow-400', 'text-red-400');
    messageElement.classList.add('text-green-400');

    // Switch to login after a delay
    setTimeout(() => {
        document.getElementById('provider-signup-form').reset();
        switchProviderForm('login');
        document.getElementById('provider-login-email').value = email; 
        document.getElementById('provider-auth-message').textContent = 'Account created. Please log in.';
        document.getElementById('provider-auth-message').classList.remove('hidden', 'text-red-400');
        document.getElementById('provider-auth-message').classList.add('text-green-400');
    }, 1500);
}

/**
 * Handles Provider Login.
 */
function handleProviderLogin(event) {
    event.preventDefault();
    clearProviderErrors();
    
    const email = document.getElementById('provider-login-email').value.trim();
    const password = document.getElementById('provider-login-password').value;
    const messageElement = document.getElementById('provider-auth-message');

    messageElement.classList.remove('hidden', 'text-red-400', 'text-green-400');
    messageElement.classList.add('text-yellow-400');
    messageElement.textContent = 'Verifying credentials...';
    
    const providers = getStoredProviders();
    const provider = providers.find(p => p.email === email && p.password === password);

    if (provider) {
        messageElement.textContent = `👋 Welcome back, ${provider.name}! Accessing Dashboard...`;
        messageElement.classList.remove('text-yellow-400');
        messageElement.classList.add('text-green-400');
        
        // Store active provider session
        localStorage.setItem('servlinkActiveProvider', JSON.stringify({ 
            email: provider.email, 
            name: provider.name,
            code: provider.code
        }));
        
        // Redirect to a placeholder provider dashboard
        setTimeout(() => {
            window.location.href = 'providerdashboardpr.html'; // Assumed dashboard page
        }, 1000);
        
    } else {
        messageElement.textContent = '❌ Invalid email or password. Access Denied.';
        messageElement.classList.remove('text-yellow-400');
        messageElement.classList.add('text-red-400');
    }
}

// Helper to clear errors specific to provider forms
function clearProviderErrors() {
    const messageElement = document.getElementById('provider-auth-message');
    if (messageElement) messageElement.classList.add('hidden');
    // Clear all error spans with this class (defined in loginpr.html)
    document.querySelectorAll('.provider-error-message').forEach(el => el.classList.add('hidden')); 
}

/**
 * Function to switch between Provider Login/Signup forms (called inline in loginpr.html)
 */
function switchProviderForm(formType) {
    const loginForm = document.getElementById('provider-login-form');
    const signupForm = document.getElementById('provider-signup-form');
    const loginTab = document.getElementById('provider-login-tab');
    const signupTab = document.getElementById('provider-signup-tab');
    const formTitle = document.getElementById('auth-title');

    clearProviderErrors();
    
    if (formType === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        formTitle.textContent = 'Provider Login';
    } else {
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        formTitle.textContent = 'Register as a Provider';
    }
}

// --- NEW FUNCTION: Check for Active Customer Session ---
function getActiveCustomer() {
    const activeUserJSON = localStorage.getItem('servlinkActiveUser');
    if (activeUserJSON) {
        try {
            return JSON.parse(activeUserJSON);
        } catch (e) {
            console.error("Error parsing customer session:", e);
            return null;
        }
    }
    return null;
}

// --- NEW FUNCTION: Booking Guard ---
function checkAuthAndBook(providerName, service, location) {
    if (!getActiveCustomer()) {
        // Store intended booking URL in session storage before redirecting
        sessionStorage.setItem('pendingBooking', JSON.stringify({ 
            provider: providerName, 
            service: service, 
            location: location 
        }));
        alert("You must be logged in to book a service. Please log in or sign up.");
        window.location.href = 'loginsignupcs.html';
        return false;
    }
    // Proceed to payment page if authenticated
    const url = `paymentsummarycs.html?provider=${encodeURIComponent(providerName)}&service=${encodeURIComponent(service)}&location=${encodeURIComponent(location)}`;
    window.location.href = url;
    return true;
}

// --- NEW FUNCTION: Post-Login Redirect ---
function checkPendingBooking() {
    if (window.location.pathname.includes('homecs.html')) {
        const pendingBookingJSON = sessionStorage.getItem('pendingBooking');
        if (getActiveCustomer() && pendingBookingJSON) {
            sessionStorage.removeItem('pendingBooking');
            try {
                const booking = JSON.parse(pendingBookingJSON);
                
                // Immediately redirect to the payment flow
                const url = `paymentsummarycs.html?provider=${encodeURIComponent(booking.provider)}&service=${encodeURIComponent(booking.service)}&location=${encodeURIComponent(booking.location)}`;
                window.location.href = url;
            } catch (e) {
                console.error("Error redirecting to pending booking:", e);
            }
        }
    }
}

// --- NEW FUNCTION: Order History Functions ---

function getCustomerOrders() {
    const customer = getActiveCustomer();
    if (!customer) return [];
    
    const allOrders = JSON.parse(localStorage.getItem('servlinkAllOrders') || '[]');
    return allOrders.filter(order => order.customerEmail === customer.email);
}

function saveCustomerOrder(orderData) {
    const customer = getActiveCustomer();
    if (!customer) return;

    let allOrders = JSON.parse(localStorage.getItem('servlinkAllOrders') || '[]');
    
    // Add customer email to the order before saving
    const newOrder = { ...orderData, customerEmail: customer.email, dateBooked: new Date().toISOString() };
    
    allOrders.unshift(newOrder); // Add to the beginning for "Recent"
    localStorage.setItem('servlinkAllOrders', JSON.stringify(allOrders));
}

function displayRecentOrdersOnHome() {
    if (window.location.pathname.includes('homecs.html')) {
        const orders = getCustomerOrders();
        const container = document.getElementById('recent-orders-container');
        
        if (!container) return; // Exit if the element is not on the page

        if (getActiveCustomer() && orders.length > 0) {
            container.innerHTML = ''; // Clear loading message

            orders.slice(0, 3).forEach(order => {
                const orderDate = new Date(order.dateBooked).toLocaleDateString();
                const element = document.createElement('div');
                element.className = 'glass-box p-4 rounded-xl shadow-md';
                element.innerHTML = `
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-red-400">${order.service}</span>
                        <span class="text-sm text-yellow-300">${orderDate}</span>
                    </div>
                    <p class="text-sm text-gray-300 mt-1">Provider: ${order.providerName}</p>
                    <p class="text-sm text-gray-400">Total: ${order.totalAmount ? '₹' + parseFloat(order.totalAmount).toFixed(2) : 'N/A'}</p>
                `;
                container.appendChild(element);
            });
        } else if (getActiveCustomer()) {
            container.innerHTML = '<p class="text-gray-400 p-4">You have no recent bookings. Find a service to get started!</p>';
        } else {
             // Hide the section completely if not logged in (handled by homecs.html structure)
             const section = document.getElementById('recent-orders-section');
             if (section) section.classList.add('hidden');
        }
    }
}

// --- DYNAMIC HEADER LOGIC (FOR LOGOUT) ---

/**
 * Handles the logout process by clearing local storage and redirecting.
 */
function handleLogout() {
    localStorage.removeItem('servlinkActiveUser');
    localStorage.removeItem('servlinkActiveProvider'); // Also clear provider session
    sessionStorage.removeItem('pendingBooking'); // Clear any pending booking
    // Redirect to the role selection page
    window.location.href = 'index.html'; 
}

/**
 * Checks local storage for an active user session (Customer or Provider)
 * and replaces the 'Login/Signup' element with the user's name and a logout option.
 */
function updateHeaderForLoggedInUser() {
    const activeUserJSON = localStorage.getItem('servlinkActiveUser');
    const activeProviderJSON = localStorage.getItem('servlinkActiveProvider'); // Check for provider session too
    
    let user = null;
    let role = null;

    if (activeUserJSON) {
        user = JSON.parse(activeUserJSON);
        role = 'Customer';
    } else if (activeProviderJSON) {
        user = JSON.parse(activeProviderJSON);
        role = 'Provider';
    }

    if (user) {
        try {
            // Target the specific wrapper div used in all customer-side headers
            const loginSignupGroup = document.querySelector('.relative.group');
            
            if (loginSignupGroup) {
                // 1. Create the new personalized element
                const welcomeElement = document.createElement('div');
                welcomeElement.className = 'flex items-center space-x-4';
                
                // 2. Welcome Name (e.g., "Hello, [Name] (Role)")
                const nameSpan = document.createElement('span');
                nameSpan.className = 'text-yellow-300 font-bold px-3 py-2 rounded-lg bg-gray-800/50';
                // Use first name only, or full name if no space
                nameSpan.textContent = `Hello, ${user.name.split(' ')[0] || user.name} (${role})`; 
                
                // 3. Logout Button
                const logoutButton = document.createElement('button');
                logoutButton.className = 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-200 flex items-center';
                logoutButton.innerHTML = "<i class='bx bx-log-out mr-2'></i> Logout";
                logoutButton.onclick = handleLogout;

                welcomeElement.appendChild(nameSpan);
                welcomeElement.appendChild(logoutButton);
                
                // 4. Replace the old element with the new one
                loginSignupGroup.replaceWith(welcomeElement);
            }
        } catch (e) {
            console.error("Error parsing user data from localStorage:", e);
        }
    }
}


// --- ORDER CONFIRMATION & HISTORY LOGIC ---

/**
 * Checks for booking parameters on the order confirmation page and displays them.
 */
function displayOrderConfirmation() {
    // Check if we are on the confirmation page AND the necessary elements exist
    if (window.location.pathname.includes('orderconfirmationcs.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        
        const providerName = urlParams.get('provider');
        const service = urlParams.get('service');
        const location = urlParams.get('location');
        const paymentMethod = urlParams.get('method');
        const totalAmount = urlParams.get('total');
        const bookingDateTime = urlParams.get('time'); 
        
        // Get Contact Info
        const contactNumber = getProviderContact(providerName);
        
        if (providerName) {
            
            // --- SAVE ORDER TO HISTORY ---
            saveCustomerOrder({
                providerName: providerName,
                service: service,
                location: location,
                paymentMethod: paymentMethod,
                totalAmount: totalAmount,
                bookingDateTime: bookingDateTime,
                status: 'Confirmed'
            });
            // -----------------------------
            
            document.getElementById('order-provider-name').textContent = providerName;
            document.getElementById('order-service-category').textContent = service || 'Unknown Service';
            document.getElementById('order-location').textContent = location || 'Unknown Location';
            document.getElementById('order-provider-contact').textContent = contactNumber;
            
            // Format time display
            let timeDisplay = 'N/A';
            if (bookingDateTime) {
                const [datePart, timePart] = decodeURIComponent(bookingDateTime).split(' ');
                
                const [year, month, day] = datePart.split('-');
                
                const startHour = parseInt(timePart.split(':')[0]);
                const startMinute = timePart.split(':')[1];
                let endHour = startHour + 1;
                if (endHour === 24) endHour = 0;
                
                const startTimeStr = `${String(startHour).padStart(2, '0')}:${startMinute}`;
                const endTimeStr = `${String(endHour).padStart(2, '0')}:${startMinute}`;
                
                timeDisplay = `${day}/${month} | ${startTimeStr} - ${endTimeStr}`;
            }

            // Populate fields
            document.getElementById('order-booking-time').textContent = timeDisplay;
            
            const methodDisplay = paymentMethod ? (paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)) : 'N/A';
            const totalDisplay = totalAmount ? `₹${parseFloat(totalAmount).toFixed(2)}` : 'N/A';
            
            document.getElementById('order-payment-method').textContent = methodDisplay;
            document.getElementById('order-total-amount').textContent = totalDisplay;

        } else {
            // Handle case where URL params are missing
            document.getElementById('order-provider-name').textContent = 'N/A';
            document.getElementById('order-service-category').textContent = 'Booking Not Found';
            document.getElementById('order-location').textContent = 'Please return to the Providers page.';
            document.getElementById('order-booking-time').textContent = 'N/A';
            document.getElementById('order-provider-contact').textContent = 'N/A';
            document.getElementById('order-payment-method').textContent = 'N/A';
            document.getElementById('order-total-amount').textContent = 'N/A';
        }
    }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', updateHeaderForLoggedInUser);
document.addEventListener('DOMContentLoaded', displayOrderConfirmation);
document.addEventListener('DOMContentLoaded', checkPendingBooking); // Run post-login redirect check
document.addEventListener('DOMContentLoaded', displayRecentOrdersOnHome); // Run order history check

// Specific initialization for the Provider Login/Signup page
if (document.getElementById('provider-login-form')) {
    document.addEventListener('DOMContentLoaded', () => {
        switchProviderForm('login');
    });
}