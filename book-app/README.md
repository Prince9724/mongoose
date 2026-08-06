OUTPUT ::https://drive.google.com/file/d/1sXI4pKIrFgMQl_Us156Bl8wHFy6FxV5g/view?usp=sharing



# 📚 Book Management System (MERN Stack)

A full-stack **Book Management System** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. This project allows users to securely manage books with complete CRUD functionality and user authentication.

---

## 🚀 Features

- 🔐 User Authentication (Sign Up & Login)
- 📖 Add New Books
- ✏️ Update Book Details
- ❌ Delete Books
- 📋 View All Books
- 🖼️ Book Cover Image Support
- 💰 Book Price Management
- 📂 Book Category
- 📅 Publish Year
- 🔒 Protected Routes
- 🌐 REST API Integration
- 💾 MongoDB Database

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS / Bootstrap (or Tailwind CSS)

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT (JSON Web Token)
- bcrypt.js

---

## 📂 Project Structure

```
Book-Management-System/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 📸 Application Flow

### 1️⃣ User Registration
New users can create an account by entering:
- Name
- Email
- Password

---

### 2️⃣ User Login

Registered users can log in securely using their email and password.

---

### 3️⃣ Add Book

Users can add a new book by entering:

- Book Title
- Author Name
- Image URL
- Price
- Category
- Publish Year

The data is sent to the backend through a REST API and stored in MongoDB.

---

### 4️⃣ Update Book

Users can edit any existing book.

The selected book details are automatically loaded into the form, allowing users to update the required information.

---

### 5️⃣ Delete Book

Users can remove books from the database with a single click.

The UI updates instantly after successful deletion.

---

## 📚 What I Learned

Through this project, I gained hands-on experience with:

- CRUD Operations
- React Components
- React Hooks
- State Management
- REST APIs
- Axios
- Express.js
- MongoDB
- Mongoose
- User Authentication
- JWT Authentication
- Password Hashing using bcrypt
- Frontend & Backend Communication
- Error Handling
- Full Stack Application Development

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/book-management-system.git
```

### Go to Project Folder

```bash
cd book-management-system
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Start Backend

```bash
npm run dev
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Start Frontend

```bash
npm run dev
```

---

## 🌐 Environment Variables

Create a `.env` file inside the backend folder.

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## 🎯 Future Improvements

- Search Books
- Pagination
- Book Sorting
- Book Filtering
- Dark Mode
- User Profile
- Book Reviews
- Wishlist
- Admin Dashboard

---

## 👨‍💻 Author

**Prince Gond**

📧 Email: your-email@example.com

🔗 GitHub: https://github.com/Prince9724

🔗 LinkedIn: https://www.linkedin.com/in/prince-gond-69090b375/

---

## ⭐ If you like this project

Please give this repository a ⭐ on GitHub.

It motivates me to build more real-world projects.

Thank You ❤️
