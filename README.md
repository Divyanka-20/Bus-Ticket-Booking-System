# 🚌Bus Ticket Booking System (C)

A console-based Bus Ticket Booking System built in C that supports login, bus listing, ticket booking, seat cancellation, and seat status tracking. Data is stored using file handling (TXT files).

## ✨ Features
- User login authentication
- View bus list
- Book tickets with name and seat number
- Cancel booking and refund
- Check real-time bus status
- Persistent data via `.txt` files

## 💻 Technologies
- C Programming
- File Handling

## 💼Project Structure
src<br>
  ├── tr1.txt        # Available seats for Bus 1 (Cardiff Express)<br>
  ├── tr2.txt        # Available seats for Bus 2 (Belfast Express)<br>
  ├── tr3.txt        # Available seats for Bus 3 (Derby Express)<br>
  ├── tr4.txt        # Available seats for Bus 4 (Chester Express)<br>
  ├── tr5.txt        # Available seats for Bus 5 (Newport Express)<br>
  ├── status1.txt    # Passenger names booked on Bus 1<br>
  ├── status2.txt    # Passenger names booked on Bus 2<br>
  ├── status3.txt    # Passenger names booked on Bus 3<br>
  ├── status4.txt    # Passenger names booked on Bus 4<br>
  ├── status5.txt    # Passenger names booked on Bus 5<br>
  ├── number1.txt    # Seat numbers booked on Bus 1<br>
  ├── number2.txt    # Seat numbers booked on Bus 2<br>
  ├── number3.txt    # Seat numbers booked on Bus 3<br>
  ├── number4.txt    # Seat numbers booked on Bus 4<br>
  ├── number5.txt    # Seat numbers booked on Bus 5<br>
  ├── main.c         # Main source code of the program

## 🛠️ How to Run
1. Compile the code:
   ```bash
   gcc main.c -o booking_system

## 👤Login Credentials
- Username: user
- Password: pass
