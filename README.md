# Eat Chic

A full-stack restaurant ordering website. Customers can browse a 50-dish menu of Lebanese mezze, grill plates, burgers, pizza and pasta, add dishes to a cart, place an order and track it through the kitchen. The site also has user accounts and a contact form that sends a confirmation email.

![Eat Chic home page](docs/screenshots/home.png)

## Features

- **Menu with categories:** 50 dishes in 10 categories (appetizers, plates, burgers, sandwiches, salads, pizza, pasta, sauces, drinks), loaded from the database, with a filter bar that stays on screen while you scroll.
- **Cart:** add dishes, change quantities, remove items and see a live total. The item count shows in the navigation bar.
- **Checkout and order tracking:** placing an order saves it to MySQL and returns an order ID. The tracking page shows its progress from *Order Placed* to *Preparing*, *Ready for Delivery* and *Delivered*.
- **Accounts:** sign up, sign in and change your password (the current password is required). Passwords are hashed with bcrypt and sessions use JWT.
- **Contact form:** messages go through the backend and are emailed to the restaurant's inbox, via Gmail locally or Brevo's email API in production.
- **Responsive design:** works on phones, tablets and desktops.

## Screenshots

| Menu | Cart |
| --- | --- |
| ![Menu page](docs/screenshots/menu.png) | ![Cart page](docs/screenshots/cart.png) |

| Order tracking | Sign in |
| --- | --- |
| ![Order tracking page](docs/screenshots/order-tracking.png) | ![Sign-in page](docs/screenshots/login.png) |

| Contact |
| --- |
| ![Contact page](docs/screenshots/contact.png) |

**On mobile**

<p>
  <img src="docs/screenshots/mobile-home.png" alt="Home page on a phone" width="280" />
  &nbsp;&nbsp;
  <img src="docs/screenshots/mobile-menu.png" alt="Menu page on a phone" width="280" />
</p>

## Tech stack

| Part | Built with |
| --- | --- |
| Frontend | React 19, React Router 7, CSS (custom design system in `src/index.css`) |
| Backend | Node.js, Express 5 |
| Database | MySQL with Sequelize |
| Auth | bcrypt and JSON Web Tokens |
| Email | Nodemailer (Gmail) or Resend API |
| Hosting | Clever Cloud (one app plus a MySQL add-on) |

## Project structure

```
resturantWebsite/
├── backend/
│   ├── models/        # MenuItem, Order, User (Sequelize)
│   ├── routes/        # auth, menu, orders, contact
│   ├── utils/         # sendEmail.js
│   ├── db.js          # MySQL connection
│   ├── seed.js        # fills the database with the menu
│   └── server.js      # Express app (port 5000)
├── frontend/
│   ├── public/
│   └── src/
│       ├── Components/  # NavBar, Footer, CartContext, OrderTracker
│       ├── pages/       # Home, Menu, About, Cart, Contact, Login
│       ├── images/      # dish photos
│       └── index.css    # colors, fonts and all page styles
└── docs/screenshots/
```

## Running it locally

You need **Node.js 18 or newer** and **MySQL**.

### 1. Set up the database

Create an empty database in MySQL:

```sql
CREATE DATABASE restaurant_db;
```

### 2. Start the backend

```bash
cd backend
npm install
```

Copy `backend/.env.example` to `backend/.env` and fill in your own values. Locally you only need the database settings, `JWT_SECRET` (any long random value), `CONTACT_TO`, and `EMAIL_USER` / `EMAIL_PASS`. `EMAIL_PASS` must be a Gmail [app password](https://support.google.com/accounts/answer/185833), not your normal Gmail password.

Load the menu into the database, then start the server. `seed.js` deletes and recreates all tables, so run it only once on an empty database:

```bash
node seed.js
npm start
```

The API runs at `http://localhost:5000`.

### 3. Start the frontend

In a second terminal:

```bash
cd frontend
npm install
npm start
```

The site opens at `http://localhost:3000`.

## API

| Method | Endpoint | What it does |
| --- | --- | --- |
| `GET` | `/api/menu` | List all menu items |
| `POST` | `/api/orders` | Place an order, returns the order ID |
| `GET` | `/api/orders/:orderId` | Get an order and its status |
| `POST` | `/api/auth/signup` | Create an account |
| `POST` | `/api/auth/login` | Sign in, returns a token |
| `POST` | `/api/auth/reset-password` | Change password (needs the current password) |
| `POST` | `/api/contact/send-message` | Email a contact message to the restaurant |

## Deployment

The whole site runs as **one app on [Clever Cloud](https://www.clever.cloud)**: the Express server serves both the API and the React website, and a Clever Cloud MySQL add-on holds the data.

- `package.json` at the project root installs both parts, builds the website into `frontend/build`, and starts `backend/server.js`.
- The backend reads the database settings that the MySQL add-on provides (`MYSQL_ADDON_HOST`, `MYSQL_ADDON_PORT` and so on), so there's nothing to copy by hand.
- The website calls the API at `/api/...` on the same address. Locally, `npm start` in `frontend` forwards those calls to port 5000.

After the first setup, every `git push` to GitHub redeploys the site.

## Author

Maryam Fakih
