# BrainTwist - Advanced E-Commerce Platform

**BrainTwist** is a robust, full-stack B2C e-commerce solution designed specifically for the niche market of mechanical puzzles (Jigsaw, Rubik's, and IQ Puzzles).

Unlike standard CMS-based stores, BrainTwist is architected from scratch to demonstrate a high-performance, scalable, and fully customizable implementation using **React**, **Node.js**, and **Firebase**. It features real-time data synchronization, secure payment processing via Stripe, and a complex loyalty system.

**Live Demo:** [https://[brain-twist-frontend.vercel.app](https://braintwist.vercel.app/)]

---

## Technical Architecture

The application follows a decoupled **Client-Server** architecture, ensuring separation of concerns and independent scalability.

### 1. Backend (Node.js & Express)
* **RESTful API:** Built with Express.js to handle business logic, routing, and middleware.
* **Performance:** Leverages Node.js's non-blocking I/O to handle concurrent requests efficiently, essential for variable traffic.
* **Stripe Integration:** Server-side handling of secure transactions without storing sensitive card data.

### 2. Database (Google Firebase Firestore)
* **Real-time Capabilities:** Utilizes Firestore to instantly update stock levels and order statuses without requiring page reloads.
* **Scalability:** Automatically handles data growth and user traffic.
* **Security:** Integrated rules to protect user transactions and data.

### 3. Frontend (React)
* **Component-Based:** Modular architecture allows for reusable elements like product cards and filters.
* **Virtual DOM:** Ensures fast rendering and a smooth user experience.
* **Bootstrap:** Utilized for a fully responsive, mobile-first design.

### 4. Hosting & DevOps
* **Frontend:** Deployed on **Vercel** for fast content delivery.
* **Backend:** Hosted on **Render**, benefiting from auto-scaling capabilities.

---

## Key Features

### 1. Smart Shopping Cart & Wishlist
One of the core innovations of BrainTwist is its hybrid cart system:
* **Guest Access:** Unauthenticated users can add items to their cart and wishlist (stored locally).
* **Auto-Merge:** Upon logging in, the local cart is automatically synchronized and merged with the user's persistent database cart. This ensures a seamless transition from browsing to purchasing.

<img width="882" height="408" alt="image" src="https://github.com/user-attachments/assets/74d588cc-1637-4975-89ba-765c0acaa0fe" />

### 2. Advanced Product Discovery
Users can easily find products using dynamic filters tailored to specific categories:
* **Global Filters:** Price range.
* **Category Specific:**
    * *Rubik's:* Filter by **Magnet Strength**.
    * *IQ Puzzles:* Filter by **Difficulty Level**.
    * *Jigsaw:* Filter by **Piece Count**.

<img width="243" height="489" alt="image" src="https://github.com/user-attachments/assets/d8ee3471-e52a-4dc5-a124-0a6d87c49773" />

### 3. Loyalty & Gamification System
To encourage retention, the platform implements a tiered reward system based on order history:
* **Order #3:** Unlocks **Free Shipping**.
* **Order #5:** Unlocks a **25% Discount Voucher**.
* **Order #10:** Unlocks a massive **40% Discount**.
* **Set Completion:** 20% discount applied when buying one product from each category (Jigsaw + Rubik + IQ).

<img width="961" height="576" alt="image" src="https://github.com/user-attachments/assets/7fff21ec-62c0-49ae-9f1f-d63f6811688c" />

### 4. Comprehensive Order Management
* **User Dashboard:** Full history of past orders with status tracking (Confirmed, Preparing, Shipped).
* **PDF Invoicing:** Users can generate and download official PDF invoices for every completed order directly from their dashboard.
* **Email Notifications:** Automated confirmation emails containing order details, applied discounts, and shipping info.

<img width="940" height="390" alt="image" src="https://github.com/user-attachments/assets/c883002f-d989-4705-b87a-8454ddbc987e" />

### 5. Admin Dashboard
A restricted area for administrators to manage the business in real-time:
* **Live Inventory:** Monitor stock levels; low-stock items are highlighted.
* **Order Processing:** Update order statuses (e.g., mark as "Shipped").
* **Product Management:** Add or edit product details, prices, images, and descriptions instantly.

<img width="940" height="441" alt="image" src="https://github.com/user-attachments/assets/ea76a859-234d-46d3-bee3-3f7e908d1a3c" />

### 6. Reviews & Ratings
Authenticated users can leave detailed reviews based on multiple criteria:
* Difficulty Perceived
* Material Quality
* Solving Experience
* Value for Money

<img width="940" height="286" alt="image" src="https://github.com/user-attachments/assets/e0921b88-9d3c-4a84-a458-5e19731fcc55" />

---

## Performance

The application is optimized for speed and SEO, achieving high scores in Google PageSpeed Insights:

* **Performance:** 97/100 
* **SEO:** 100/100 
* **Best Practices:** 96/100 

---
