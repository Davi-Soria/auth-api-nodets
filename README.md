User Authentication API with Avatar Upload

This project is a Node.js + Express API that allows users to register, log in, and upload a profile picture (avatar). It uses JWT for authentication and stores user data in MongoDB. Uploaded images are processed with Sharp and saved locally.

🚀 Features

✅ User registration with hashed password

🔐 Login with JWT authentication

🧠 Protected routes using Passport.js

📸 Avatar upload and resizing with Multer and Sharp

🗃️ User data stored in MongoDB

🛠️ Technologies Used

Node.js + Express

TypeScript

MongoDB + Mongoose

Passport.js + passport-jwt

JWT (jsonwebtoken)

bcryptjs

dotenv

Multer

Sharp

📦 Installation

Clone the repository:

git clone https://github.com/Davi-Soria/auth-api-nodets.git
cd auth-api-nodets

Install dependencies:

npm install

Set up environment variables:
Create a .env file in the root with the following:

PORT=4000
MONGO_URI=mongodb://localhost:27017/your-db
JWT_SECRET=your_jwt_secret

Run the project:

npm run start

🧪 Example Routes

POST /register – Register a new user

POST /login – Login and receive a token

POST /upload-avatar – Upload profile picture (requires auth)

📁 Project Structure

├── src
│   ├── controller
│   ├── middleware
│   ├── model.schema
│   ├── routers
│   └── server.ts
├── uploads
└── .env

🙌 Author

Feito com 💻 por Davi Soria – Esse projeto faz parte do meu aprendizado em Node.js, JWT e upload de arquivos com segurança.

Você pode contribuir, sugerir melhorias ou usar como base para projetos mais complexos!

Licença: MIT

