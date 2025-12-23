# Pimp Your Grill 🍖🔥

This is a MERN stack web application designed to help students discover and prioritize the best barbecues in town. Users can register, post their own grill recipes, and vote for others using the "MICI" (Making It Crispy Instantly) rating system.

## 🚀 Features

* **User Authentication:** Register and Login securely (Passwords hashed with bcrypt).
* **Profile Management:** View personal details and user-specific grill history.
* **Grill Dashboard:** Browse all posted grills.
* **The Leaderboard:** A "Best Grills" section showing the top-rated recipes.
* **Voting System:** Interactive "MICI" (likes) system.

## 🛠 Tech Stack

* **Frontend:** React
* **Backend:** Node.js
* **Database:** MongoDB

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone [https://github.com/YOUR_USERNAME/pimp-your-grill.git](https://github.com/YOUR_USERNAME/pimp-your-grill.git)
```
```bash
cd pimp-your-grill
```

### 2. Run the setup script:
```bash
npm run setup
```

### 3. Go to the "backend" folder and add the link to you mongo database:
```ini
MONGO_URL = "mongodb+srv://<username>:<password>@<cluster-url>/<database-name>"
```

### 4. Run the server
```bash
npm start
```