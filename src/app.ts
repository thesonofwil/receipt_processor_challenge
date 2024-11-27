import express, { Application } from "express";
import bodyParser from "body-parser";
import { receiptRoutes } from "./routes/receiptRoutes";

const app: Application = express();

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Add routes
app.use(bodyParser.json()); // Parses JSON request bodies
app.use("/receipts", receiptRoutes); // base path

export default app;
