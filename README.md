# E-commerce Puzzle Platform

## Overview  
This application is a full-featured B2C e-commerce platform for selling puzzles, developed from scratch using Node.js and Express.js for the backend and React for the frontend. The app integrates Firebase for real-time data storage and user authentication, and is fully deployed. Users can add products to their cart or favorites without logging in and place orders as guests, receiving confirmation via email and registered ones get access to additional features like order history, downloadable PDF invoices, product reviews, and exclusive discounts. Also, the platform supports both traditional and Stripe-based online payments.

## Technologies Used  

### Backend (Node.js)  
- **Express.js** – RESTful API development  
- **Firebase Firestore** – Cloud NoSQL database for products, users, and orders  
- **Stripe API** – Secure online payment processing  
- **PDFKit** – Generating order invoices in PDF format  
- **Nodemailer** – Sending email confirmations for guest and registered users  
- **Dotenv** – Environment variable management  

### Frontend (React)  
- **React.js** – Component-based UI development  
- **React Router** – Client-side routing  
- **Firebase SDK** – Authentication and Firestore integration  
- **Bootstrap** – Responsive and modern UI design  

## Features  

### Product Catalog & Cart  
- Rich product catalog with categories for puzzle types  
- Add to cart and favorites functionality, even for guest users  
- Live cart syncing and local storage persistence  
- Guest checkout available with email confirmation  

### Order Management  
- Secure checkout with traditional and Stripe-based payments  
- Real-time order confirmation via email  
- PDF invoice generation for each completed order  
- Order history accessible from the user profile  
- Automatic and code-based discounts for registered users  

### User Experience  
- Fully responsive design optimized for desktop and mobile  
- Smooth navigation between catalog, product details, cart, and checkout  
- Persistent cart and favorites without requiring login  
- Clean and intuitive interface with fast loading times  

### Reviews & User Engagement  
- Role-based logic to differentiate between guest and authenticated users  
- Product review system available for authenticated users  
- Exclusive discount codes and dynamic cart-based promotions  
- Email notifications for order status and promotions  

### Error Handling & Validation  
- Server-side validation for product, cart, and order operations  
- Client-side input validation with clear user feedback  
- Standardized HTTP status codes and error messaging  
