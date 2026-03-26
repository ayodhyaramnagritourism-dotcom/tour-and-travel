const API_URL = "http://localhost:8000"; // deploy क बद Railway URL डलन

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

async function apiRequest(endpoint, method = 'GET', body) {
    const res = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.detail || 'API request failed');
    }

    return data;
}

function initDestinationAutoSelect() {
    const params = new URLSearchParams(window.location.search);
    const dest = params.get('destination');
    if (!dest) return;

    const dropdown = document.getElementById('destination');
    if (dropdown) dropdown.value = dest;
}

function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email')?.value.trim();
        const password = document.getElementById('password')?.value.trim();

        const messageEl = document.getElementById('message');
        if (!email || !password) {
            if (messageEl) messageEl.innerText = 'Please enter email and password';
            return;
        }

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json().catch(() => ({}));

            if (response.ok) {
                if (messageEl) messageEl.innerText = 'Login Successful ';
                window.location.href = 'booking.html';
            } else {
                if (messageEl) messageEl.innerText = result.detail || 'Login failed';
            }
        } catch (error) {
            if (messageEl) messageEl.innerText = 'Server Error ';
        }
    });
}

function initSignupForm() {
    const signupForm = document.getElementById('signupForm');
    if (!signupForm) return;

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();
        const password = document.getElementById('password')?.value.trim();

        if (!name || !email || !phone || !password) {
            alert('Please fill all fields');
            return;
        }

        try {
            await apiRequest('/signup', 'POST', { name, email, phone, password });
            alert('Signup successful!');
            window.location.href = 'login.html';
        } catch (err) {
            alert('Signup failed');
        }
    });
}

function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    if (!bookingForm) return;

    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();
        const destination = document.getElementById('destination')?.value;
        const date = document.getElementById('date')?.value;
        const guests = document.getElementById('guests')?.value;

        if (!name || !phone || !destination || !date || !guests) {
            alert('Please fill all details');
            return;
        }

        if (phone.length !== 10) {
            alert('Enter valid phone number');
            return;
        }

        try {
            await apiRequest('/booking', 'POST', { name, phone, destination, date, guests });

            const message = `New Booking Request:\nName: ${name}\nPhone: ${phone}\nDestination: ${destination}\nDate: ${date}\nGuests: ${guests}`;
            const whatsappURL = `https://wa.me/917607745628?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');

            alert('Booking saved successfully!');
        } catch (err) {
            alert('Booking failed');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initDestinationAutoSelect();
    initLoginForm();
    initSignupForm();
    initBookingForm();
});
