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

### 2. Install dependencies:
```bash
npm run setup
```

### 3. Create your `.env` file in the root directory and add the following secrets:
```ini
MONGO_URI = mongodb+srv://<user>:<password>@cluster.mongodb.net/grillApp PORT=5000
```
```ini
ACCESS_TOKEN_SECRET = <See key generation below>
```

#### Generate a secure random token by running this command in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Run the server
```bash
npm start
```