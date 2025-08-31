# Expense Tracker

A full-stack expense tracking application built with **React**, **Tailwind CSS**, and **Node.js/Express** with **MongoDB** as the database. This app allows users to manage their expenses efficiently, view analytics, and maintain a personal profile.

---

## Features

### 1. Authentication & Authorization

* **Register & Login:** Secure authentication with JWT tokens.
* **Role-based access:** User roles like `user` and `admin`.
* **Profile:** View logged-in user's profile information.
* **Logout:** Clears session and redirects to login.

### 2. Expense Management

* **Create Expense:** Add new expenses with title, amount, category, date, and payment method.
* **Edit Expense:** Modify existing expense records.
* **Delete Expense:** Remove expenses securely.
* **Monthly & All Records:** View all expenses or filter by current month.

### 3. Dashboard Views

* **Accordion View:** Organize sections into collapsible accordions.
* **Tab View:** Switch between summary, all records, monthly records, and analytics.
* **Toggle View:** Easily switch between accordion and tab view from the Navbar.

### 4. Analytics

* **Charts:**

  * **Line Chart:** Trends over time
  * **Bar Chart:** Category-wise expense comparison
  * **Pie Chart:** Distribution of expenses
* **Summary Cards:** Total expenses, monthly expenses, and category-wise totals.


### 5. Modals

* Create and edit expenses via a modal form for smooth UX.

---

## Tech Stack

* **Frontend:** React, Tailwind CSS, React Router DOM
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Authentication:** JWT
* **Charts & Analytics:** Recharts (Line, Bar, Pie)
* **Modal:** Custom Modal component

---
## Auth View
![Register Page](assets/ExpenseTracker_Register.png)
![Login Page](assets/ExpenseTracker_Login.png)

## Dashboard View
![Dashboard Main](assets/ExpenseTracker_Dashboard.png)
![Analytics View](assets/ExpenseTracker_Analytics.png)
![Create Expense Modal](assets/ExpenseTracker_Modal.png)
![Summary Cards](assets/ExpenseTracker_SummaryCards.png)

## Tabs View
![Tabs View](assets/ExpenseTracker_TabsView.png)

## User Profile
![User Profile](assets/ExpenseTracker_Profile.png)


## Project Structure

```
/client
 ├─ /components
 │   ├─ Navbar.jsx
 │   ├─ Footer.jsx
 │   ├─ SummaryCard.jsx
 │   ├─ ExpenseTable.jsx
 │   ├─ LineChart.jsx
 │   ├─ BarChart.jsx
 │   ├─ PieChart.jsx
 │   ├─ Accordion.jsx
 │   ├─ CreateExpenseForm.jsx
 │   ├─ Button.jsx
 │   └─ DashboardTabs.jsx
 /pages
 │   └─ UserProfile.jsx
 └─ App.jsx
/backend
 ├─ /models
 │   └─ Expense.js, User.js
 ├─ /routes
 │   └─ expenseRoutes.js, authRoutes.js
 ├─ /controllers
 │   └─ expenseController.js, authController.js
 └─ server.js
```

---

## Installation

### Backend

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create `.env` file and add:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start server:

   ```
   npm run dev
   ```

### Frontend

1. Navigate to the client folder:

   ```bash
   cd client
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the app:

   ```bash
   npm start
   ```

---

## Usage

1. Register or login as a user.
2. Add new expenses using the "+ Create Expense" button in the navbar.
3. View expense summaries, monthly records, and analytics in the dashboard.
4. Edit or delete expenses directly from the tables.
5. Switch between **Accordion** and **Tabs** view using the toggle button in the navbar.
6. Access your profile by clicking the profile icon in the navbar.

---

## Future Enhancements

* Export expenses to CSV or PDF.
* Add notifications for high expenses.
* Multi-user collaboration for shared expenses.
* Dark mode support.
* Mobile app version using React Native.

---

## Author

**Chetan Gosavi**
[GitHub](https://github.com/chetangosavi) 

---

## License

This project is licensed under the MIT License.





