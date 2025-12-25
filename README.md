# Pimp Your Grill 🍖🔥

This is a MERN stack web application designed to help students discover and prioritize the best barbecues in town. Users can register, post their own grill recipes, and vote for others using the "MICI" (Making It Crispy Instantly) rating system.

## 🗺️ Features Roadmap

- [x] **User Authentication:** Register and Login securely (Passwords hashed with bcrypt).
- [x] **Profile Management:** View personal details and user-specific grill history.
- [x] **Grill Dashboard:** Browse all posted grills.
- [x] **The Leaderboard:** A "Leaderboard" section showing the top-rated grills.
- [x] **Voting System:** Interactive "MICI" (likes) system.

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

### 2. Run the setup script
```bash
npm run setup
```

### 3. Go to the "backend" folder and add the link to your mongo database
```ini
MONGO_URL = "mongodb+srv://<username>:<password>@<cluster-url>/<database-name>"
```

### 4. Run the server
```bash
npm start
```