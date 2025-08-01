# Car Rental Management System 🚗

Built during my **2-month internship at Hexaware**.  
Full-stack web application to browse, lease, and manage car rentals.

## Tech Stack
- Frontend: ReactJS, Bootstrap, HTML, CSS  
- Backend: Flask (Python)  
- Database: MySQL  

## Features
- Responsive UI for vehicle browsing and leasing  
- REST APIs with CRUD operations (Flask)  
- MySQL backend for customers, vehicles, and leases  

## Setup

### 1. Clone
git clone https://github.com/Nithya-Bala/CarRental-System.git
cd [CarRental-System]

### 2. Database
Connect to MySQL and run:

- CREATE DATABASE CarRentalManagement;
USE CarRentalManagement;

- CREATE TABLE Customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255)
);

-CREATE TABLE VEHICLES (
    vehicleID INT AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(30),
    model VARCHAR(30),
    releaseyear YEAR,
    dailyRate INT,
    vehicleStatus ENUM('available','notAvailable'),
    passengerCapacity INT,
    engineCapacity VARCHAR(20),
    image LONGBLOB
);

-CREATE TABLE LEASE (
    leaseID INT AUTO_INCREMENT PRIMARY KEY,
    customerID INT,
    vehicleID INT,
    startdate DATE,
    enddate DATE,
    leaseType ENUM('dailyLease','weeklyLease'),
    duration INT,
    totalAmount INT,
    FOREIGN KEY (customerID) REFERENCES Customer(id),
    FOREIGN KEY (vehicleID) REFERENCES VEHICLES(vehicleID)
);

### 3. Backend (Flask + MySQL)

config.py (database credentials)

Host = 'localhost'
User = 'root'
Password = 'Your Password of MySQL'
DataBase = 'CarRentalManagement'

cd car-rental-backend
pip install -r requirements.txt

Run the backend:
python app.py

### 4. Frontend (React)
In a new terminal:

cd car-rental-frontend
npm install
npm start
The frontend will typically run on http://localhost:3000

## Project Structure (example)

/car-rental-backend    # Flask API, config.py, app.py, requirements.txt
/car-rental-frontend   # ReactJS frontend, package.json

## Author
[Nithya B]
GitHub: https://github.com/Nithya-Bala
LinkedIn: www.linkedin.com/in/nithyabala

Email: nithyabala2005@gmail.com
