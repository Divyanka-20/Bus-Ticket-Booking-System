# 🚌 Bus Ticket Booking System

A responsive and interactive **Bus Ticket Booking System** built with HTML, CSS, JavaScript, and Bootstrap. It allows users to log in, view available buses, select seats, book tickets, cancel bookings, and view booking status — all in a clean, user-friendly interface.

🌐 **Live Demo**: [Bus Ticket Booking Web App](https://bus-ticket-booking-system-m044.onrender.com/)

📱 Fully responsive — works seamlessly across desktop, tablet, and mobile devices.

---

## 🔐 User Credentials

- Username - user
- Password - pass
> *(Stored in `localStorage`; feel free to modify `script.js` for new users.)*


## 🚀 Features

- 🔐 **User Login System**
  - Basic authentication with a 3-attempt limit

- 🚌 **Bus Listing Page**
  - Displays available buses with clickable "Book Now" buttons

- 🎟️ **Seat Selection Interface**
  - Responsive seat layout
  - Visual indicators for empty, selected, and occupied seats

- 🧑‍💼 **Passenger Details Form**
  - Collects name, age, and gender for each selected seat
  - Validation included

- 📋 **Booking Summary**
  - Real-time summary of selected passengers and seat numbers

- ❌ **Cancellation**
  - Cancel selected bookings
  - Refund status is shown

- ✅ **Booking Status View**
  - Displays current seat-wise occupancy and passenger details

- 💾 **Data Persistence**
  - Uses `localStorage` to maintain state across page refresh

---

## 📁 Project Structure

├── index.html<br>
├── style.css<br>
├── script.js<br>
├── assets/<br>
│ ├── main.c # Original C-based version<br>
│ ├── main.exe # Executable (optional)<br>


## 🎨 UI Highlights

- Modern gradient background
- Smooth transitions and hover effects
- Seat status colors:
  - 🟢 `.empty` – Available
  - 🔴 `.occupied` – Booked
  - 🔵 `.selected` – Chosen by user

- Responsive grid layout for seat arrangement
- Interactive card and button styles using Bootstrap + custom CSS

## 🛠️ Technologies Used

- **HTML5**
- **CSS3** with custom styling and gradients
- **JavaScript (ES6)**
- **Bootstrap 5**
- **Font Awesome** (for icons)
- **C Programming** (original base logic ported from C)

---

## 📱 Responsive Design

- Optimized for both desktop and mobile views
- Media queries for smaller screens (adjusts seat size/layout)


