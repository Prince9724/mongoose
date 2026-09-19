import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import Router from "./routes/routes.js";
import managerRoutes from "./routes/managerRoutes.js"
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/auth", Router);
app.use("/manager", managerRoutes);
const PORT = process.env.PORT || 3700;

app.listen(PORT, () => {
  console.log(`Server started successfully on port ${PORT}`);
});




// import express from "express";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";

// import connectDB from "./config/db.js";

// import Router from "./routes/routes.js";
// import managerRoutes from "./routes/managerRoutes.js";

// dotenv.config();

// const app = express();


// // Middleware
// app.use(express.json());
// app.use(cookieParser());


// // Database
// connectDB();


// // Routes
// app.use("/auth", Router);

// app.use("/manager", managerRoutes);


// // Server
// const PORT = process.env.PORT || 3700;

// app.listen(PORT, () => {
//     console.log(
//         `Server started successfully on port ${PORT}`
//     );
// });