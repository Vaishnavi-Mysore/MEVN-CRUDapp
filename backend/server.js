import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cors from "cors";


import moduleRoutes from "./routes/module.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import topicRoutes from "./routes/topic.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use('/module', moduleRoutes);
app.use('/category', categoryRoutes);
app.use('/module/:id/topic', topicRoutes);

// Start the server
app.listen(PORT, () => {
    connectToMongoDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});