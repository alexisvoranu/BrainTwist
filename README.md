# BrainTwist - E-Commerce Platform

**BrainTwist** is a full-stack B2C e-commerce application engineered for puzzle enthusiasts. Built from the ground up, it leverages a decoupled Client-Server architecture to deliver high performance, real-time data synchronization, and secure payment processing.

---

## Technology Stack

### Core Architecture
* **Frontend:** React.js (Virtual DOM), Bootstrap (Responsive UI)
* **Backend:** Node.js, Express.js (RESTful API)
* **Database:** Google Firebase Firestore (NoSQL, Real-time)
* **Payments:** Stripe API (PCI-DSS compliant)

### DevOps & Deployment
* **Frontend Hosting:** Vercel (CI/CD integration)
* **Backend Hosting:** Render (Auto-scaling)
* **Version Control:** Git & GitHub

---

## Technical Highlights

### Smart Data Synchronization
* **Hybrid Cart System:** Implements local storage for guest users and Firestore for authenticated users.
* **Auto-Merge Logic:** Custom algorithms automatically merge local guest cart/wishlist data with the user's persistent database record upon successful login/registration.

### Secure Payment Flow
* **Stripe Integration:** Utilizes Stripe Checkout/Elements for handling sensitive card data.
* **Server-Side Processing:** Backend validates cart totals and inventory before creating Payment Intents to prevent client-side manipulation.

### Real-Time Inventory Management
* **Firestore Listeners:** The Admin Dashboard utilizes Firestore's real-time capabilities to reflect stock changes instantly without page reloads.
* **Dynamic UI:** Frontend components react immediately to backend state changes (e.g., "Last item in stock" indicators).

---

## Performance Metrics

Optimized for low latency and high SEO rankings.
* **Desktop Performance:** 97/100
* **SEO:** 100/100
* **Best Practices:** 96/100
*(Audited via PageSpeed Insights, March 2025)*.
