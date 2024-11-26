import express, { Application } from "express";
import bodyParser from "body-parser";

const app: Application = express();

app.use(bodyParser.json());

// Add routes
import { receiptRoutes } from "./routes/receiptRoutes";
app.use("/receipts", receiptRoutes);

export default app;
