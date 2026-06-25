# 🛒 ResellHub Client

The modern, responsive frontend application for the **ResellHub Marketplace**. Built with Next.js 15, Tailwind CSS, and Better Auth, this application features full Role-Based Access Control (RBAC) to offer dedicated, tailored experiences for **Buyers**, **Sellers**, and **Admins**.

🌐 **[Live Demo](https://your-live-site.vercel.app)**

---

## ✨ Features

### 🔐 Authentication & Security
* **Better Auth Integration:** Secure credential login and Next.js middleware protection.
* **Social Login:** Single-click authentication with Google OAuth.
* **Role-Based Access Control (RBAC):** Automatic dashboard routing according to user role permissions.

### 🛍️ Buyer Experience
* **Product Discovery:** Seamlessly browse globally approved marketplace items.
* **Dynamic Wishlists:** Keep track of desired products before moving to checkout.
* **Secure Stripe Payments:** Integrated Stripe checkout pipeline complete with persistent order and payment history.

### 💼 Seller Features
* **Inventory Management:** Effortlessly add products, track listings, and update stock status.
* **Order Tracking:** Keep real-time tabs on customer orders pending fulfillment.
* **Sales Analytics:** Visual summaries of earnings and sales performance.

### 🛡️ Admin Management
* **Moderation Pipeline:** Review, approve, or reject incoming seller product submissions.
* **User Management:** Full platform oversight to view and manage user roles.
* **Platform Metrics:** Deep analytics dashboard displaying overarching marketplace health.

### 🎨 UI/UX Essentials
* **Framer Motion Animations:** Smooth dynamic transitions and responsive item animations.
* **Toast Notifications:** Immediate, non-intrusive feedback for critical user interactions via React Toastify.
* **Fully Responsive:** Beautifully adaptive interface built for mobile, tablet, and desktop viewports.

---

## 🛠️ Technologies Used

* **Core Framework:** Next.js 15 (App Router) & React
* **Styling:** Tailwind CSS & React Icons
* **Animations:** Framer Motion
* **Charts & Data:** Recharts
* **Authentication:** Better Auth & Google OAuth
* **Payments:** Stripe Client SDK

---

## 📁 Folder Structure

```text
src/
│
├── app/
│   ├── dashboard/           # Role-segmented user panels
│   │   ├── admin/
│   │   ├── seller/
│   │   └── buyer/
│   ├── login/
│   ├── register/
│   ├── products/            # Dynamic marketplace feeds and details
│   ├── success/             # Stripe checkout success landing page
│   └── page.jsx             # Home landing page
│
├── components/              # Shared global UI components
├── lib/                     # Service initializations (Auth, Stripe)
│   ├── auth.js
│   ├── auth-client.js
│   └── stripe.js
├── hooks/                   # Reusable custom React hooks
└── middleware.js            # Global edge route protection