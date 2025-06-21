// Bus routes data
const busRoutes = [
    "BlueOrbit Travels",
    "Bengal Express", 
    "Riverline Express",
    "FusionFleet",
    "Coastal Cruiser",
    "MetroLink Express"
];

// Global variables
let currentUser = null;
let loginAttempts = 0;
let selectedBus = null;
let selectedSeats = [];
let bookingData = {};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeStorage();
    setupEventListeners();
});

// Initialize local storage
function initializeStorage() {
    if (!localStorage.getItem('busBookingSystem')) {
        const initialData = {
            users: {
                'user': 'pass'
            },
            buses: {},
            bookings: {}
        };
        
        // Initialize each bus with 32 empty seats
        for (let i = 1; i <= 6; i++) {
            initialData.buses[i] = {
                name: busRoutes[i-1],
                seats: Array(32).fill('Empty'),
                availableSeats: 32
            };
            initialData.bookings[i] = {};
        }
        
        localStorage.setItem('busBookingSystem', JSON.stringify(initialData));
    }
}

// Get data from storage
function getStorageData() {
    return JSON.parse(localStorage.getItem('busBookingSystem'));
}

// Save data to storage
function saveStorageData(data) {
    localStorage.setItem('busBookingSystem', JSON.stringify(data));
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data = getStorageData();
    
    if (data.users[username] && data.users[username] === password) {
        currentUser = username;
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('mainApp').style.display = 'block';
        showMainMenu();
    } else {
        loginAttempts++;
        const errorDiv = document.getElementById('loginError');
        const attemptsDiv = document.getElementById('loginAttempts');
        
        if (loginAttempts >= 3) {
            errorDiv.textContent = 'Sorry, you have entered the wrong username and password three times! Please try again later.';
            errorDiv.style.display = 'block';
            document.getElementById('loginForm').style.display = 'none';
        } else {
            errorDiv.textContent = 'Sorry! LOGIN IS UNSUCCESSFUL. Please try again.';
            errorDiv.style.display = 'block';
            attemptsDiv.textContent = `Attempts remaining: ${3 - loginAttempts}`;
        }
    }
}

// Logout
function logout() {
    currentUser = null;
    loginAttempts = 0;
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('loginForm').reset();
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('loginAttempts').textContent = '';
    document.getElementById('loginForm').style.display = 'block';
}

// Show main menu
function showMainMenu() {
    hideAllSections();
    document.getElementById('mainMenu').style.display = 'block';
}

// Hide all sections
function hideAllSections() {
    const sections = ['mainMenu', 'busListSection', 'bookingSection', 'statusSection', 'cancellationSection'];
    sections.forEach(section => {
        document.getElementById(section).style.display = 'none';
    });
}

// Show bus list
function showBusList() {
    hideAllSections();
    document.getElementById('busListSection').style.display = 'block';
    
    const busListContainer = document.getElementById('busList');
    busListContainer.innerHTML = '';
    
    busRoutes.forEach((route, index) => {
        const busItem = document.createElement('div');
        busItem.className = 'list-group-item';
        busItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <span><strong>[${index + 1}]</strong> ${route}</span>
                <i class="fas fa-bus text-primary"></i>
            </div>
        `;
        busListContainer.appendChild(busItem);
    });
}

// Show booking section
function showBooking() {
    hideAllSections();
    document.getElementById('bookingSection').style.display = 'block';
    document.getElementById('busSelection').style.display = 'block';
    document.getElementById('seatSelection').style.display = 'none';
    document.getElementById('passengerDetails').style.display = 'none';
    
    const busListContainer = document.getElementById('bookingBusList');
    busListContainer.innerHTML = '';
    
    const data = getStorageData();
    
    busRoutes.forEach((route, index) => {
        const busNumber = index + 1;
        const busItem = document.createElement('div');
        busItem.className = 'list-group-item list-group-item-action';
        busItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <span><strong>[${busNumber}]</strong> ${route}</span>
                <span class="badge bg-info">${data.buses[busNumber].availableSeats} seats available</span>
            </div>
        `;
        busItem.onclick = () => selectBusForBooking(busNumber);
        busListContainer.appendChild(busItem);
    });
}

// Select bus for booking
function selectBusForBooking(busNumber) {
    selectedBus = busNumber;
    const data = getStorageData();
    const bus = data.buses[busNumber];
    
    if (bus.availableSeats <= 0) {
        alert('There are no vacant seats in this bus.');
        return;
    }
    
    document.getElementById('busSelection').style.display = 'none';
    document.getElementById('seatSelection').style.display = 'block';
    document.getElementById('availableSeats').textContent = bus.availableSeats;
    document.getElementById('ticketCount').max = bus.availableSeats;
    
    generateSeatLayout();
}

// Generate seat layout
function generateSeatLayout() {
    const data = getStorageData();
    const bus = data.buses[selectedBus];
    const seatLayoutContainer = document.getElementById('seatLayout');
    seatLayoutContainer.innerHTML = '';
    
    for (let i = 0; i < 32; i++) {
        const seat = document.createElement('div');
        seat.className = `seat ${bus.seats[i] === 'Empty' ? 'empty' : 'occupied'}`;
        seat.textContent = i + 1;
        seat.dataset.seatNumber = i + 1;
        
        if (bus.seats[i] === 'Empty') {
            seat.onclick = () => toggleSeatSelection(i + 1);
        }
        
        seatLayoutContainer.appendChild(seat);
    }
}

// Toggle seat selection
function toggleSeatSelection(seatNumber) {
    const seat = document.querySelector(`[data-seat-number="${seatNumber}"]`);
    const ticketCount = parseInt(document.getElementById('ticketCount').value) || 0;
    
    if (seat.classList.contains('selected')) {
        seat.classList.remove('selected');
        selectedSeats = selectedSeats.filter(s => s !== seatNumber);
    } else {
        if (selectedSeats.length < ticketCount) {
            seat.classList.add('selected');
            selectedSeats.push(seatNumber);
        } else {
            alert(`You can only select ${ticketCount} seats.`);
        }
    }
}

// Proceed to seat selection
function proceedToSeatSelection() {
    const ticketCount = parseInt(document.getElementById('ticketCount').value);
    
    if (!ticketCount || ticketCount <= 0) {
        alert('Please enter a valid number of tickets.');
        return;
    }
    
    if (selectedSeats.length !== ticketCount) {
        alert(`Please select exactly ${ticketCount} seats.`);
        return;
    }
    
    generatePassengerForms();
    document.getElementById('seatSelection').style.display = 'none';
    document.getElementById('passengerDetails').style.display = 'block';
}

// Generate passenger forms
function generatePassengerForms() {
    const formsContainer = document.getElementById('passengerForms');
    formsContainer.innerHTML = '';
    
    selectedSeats.forEach((seatNumber, index) => {
        const form = document.createElement('div');
        form.className = 'passenger-form';
        form.innerHTML = `
            <h6>Passenger ${index + 1} - Seat ${seatNumber}</h6>
            <div class="mb-3">
                <label class="form-label">Name:</label>
                <input type="text" class="form-control" id="passenger-${seatNumber}" required>
            </div>
        `;
        formsContainer.appendChild(form);
    });
}

// Confirm booking
function confirmBooking() {
    const passengerNames = {};
    let allFieldsFilled = true;
    
    selectedSeats.forEach(seatNumber => {
        const nameInput = document.getElementById(`passenger-${seatNumber}`);
        if (!nameInput.value.trim()) {
            allFieldsFilled = false;
            return;
        }
        passengerNames[seatNumber] = nameInput.value.trim();
    });
    
    if (!allFieldsFilled) {
        alert('Please fill in all passenger names.');
        return;
    }
    
    // Save booking
    const data = getStorageData();
    const bus = data.buses[selectedBus];
    
    selectedSeats.forEach(seatNumber => {
        bus.seats[seatNumber - 1] = passengerNames[seatNumber];
        data.bookings[selectedBus][seatNumber] = passengerNames[seatNumber];
    });
    
    bus.availableSeats -= selectedSeats.length;
    saveStorageData(data);
    
    // Show confirmation
    const totalAmount = selectedSeats.length * 200;
    alert(`Booking confirmed!\nBus: ${busRoutes[selectedBus - 1]}\nSeats: ${selectedSeats.join(', ')}\nTotal Amount: Rs.${totalAmount}`);
    
    // Reset booking data
    selectedSeats = [];
    selectedBus = null;
    showMainMenu();
}

// Show status section
function showStatus() {
    hideAllSections();
    document.getElementById('statusSection').style.display = 'block';
    document.getElementById('busStatusDisplay').style.display = 'none';
    
    const select = document.getElementById('statusBusSelect');
    select.innerHTML = '<option value="">Choose a bus...</option>';
    
    busRoutes.forEach((route, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = `[${index + 1}] ${route}`;
        select.appendChild(option);
    });
}

// Display bus status
function displayBusStatus() {
    const busNumber = parseInt(document.getElementById('statusBusSelect').value);
    
    if (!busNumber) {
        alert('Please select a bus.');
        return;
    }
    
    const data = getStorageData();
    const bus = data.buses[busNumber];
    
    document.getElementById('statusBusTitle').textContent = `Bus No. ${busNumber} - ${bus.name}`;
    document.getElementById('busStatusDisplay').style.display = 'block';
    
    const statusLayoutContainer = document.getElementById('statusSeatLayout');
    statusLayoutContainer.innerHTML = '';
    
    for (let i = 0; i < 32; i++) {
        const seat = document.createElement('div');
        seat.className = `seat status-seat ${bus.seats[i] === 'Empty' ? 'empty' : 'occupied'}`;
        seat.textContent = bus.seats[i] === 'Empty' ? `${i + 1}.Empty` : `${i + 1}.${bus.seats[i]}`;
        statusLayoutContainer.appendChild(seat);
    }
}

// Show cancellation section
function showCancellation() {
    hideAllSections();
    document.getElementById('cancellationSection').style.display = 'block';
    document.getElementById('cancellationResult').style.display = 'none';
    
    const select = document.getElementById('cancelBusSelect');
    select.innerHTML = '<option value="">Choose a bus...</option>';
    
    busRoutes.forEach((route, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = `[${index + 1}] ${route}`;
        select.appendChild(option);
    });
}

// Cancel booking
function cancelBooking() {
    const busNumber = parseInt(document.getElementById('cancelBusSelect').value);
    const seatNumber = parseInt(document.getElementById('cancelSeatNumber').value);
    
    if (!busNumber || !seatNumber) {
        alert('Please select a bus and enter a seat number.');
        return;
    }
    
    if (seatNumber < 1 || seatNumber > 32) {
        alert('Please enter a valid seat number (1-32).');
        return;
    }
    
    const data = getStorageData();
    const bus = data.buses[busNumber];
    
    if (bus.seats[seatNumber - 1] === 'Empty') {
        alert('This seat is not booked.');
        return;
    }
    
    // Cancel the booking
    const passengerName = bus.seats[seatNumber - 1];
    bus.seats[seatNumber - 1] = 'Empty';
    bus.availableSeats++;
    delete data.bookings[busNumber][seatNumber];
    
    saveStorageData(data);
    
    // Show cancellation result
    const resultDiv = document.getElementById('cancellationResult');
    resultDiv.innerHTML = `
        <div class="cancellation-success">
            <h5><i class="fas fa-check-circle"></i> Cancellation Successful</h5>
            <p><strong>Bus:</strong> ${bus.name}</p>
            <p><strong>Seat:</strong> ${seatNumber}</p>
            <p><strong>Passenger:</strong> ${passengerName}</p>
            <p><strong>Refund Amount:</strong> Rs. 200</p>
        </div>
    `;
    resultDiv.style.display = 'block';
    
    // Reset form
    document.getElementById('cancelBusSelect').value = '';
    document.getElementById('cancelSeatNumber').value = '';
}
