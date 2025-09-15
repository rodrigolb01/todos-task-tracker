# TODOS Task Tracker

A full-stack application for managing tasks and reminders, built with Node.js, Express, React, Redux, and MongoDB.

## Features

- User authentication (register, login, logout)
- Create, update, and delete goals/tasks
- Password reset via email
- Responsive UI

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB cluster (local or cloud)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/todos-task-tracker.git
   cd todos-task-tracker
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Setup the `.env` file:**

   Create a `.env` file inside the `backend/` directory with the following content:

   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret
   ```

   - Replace `your_mongodb_connection_string` with your MongoDB URI.
   - Replace `your_jwt_secret` with a strong secret key for JWT signing.

   If you want to enable password reset via email, you may also need to add email service credentials (see the code and documentation for details).

4. **Start the application:**
   ```sh
   npm start
   ```

   This will start both the backend server and the React frontend.

## License

This project is licensed under the MIT License.
