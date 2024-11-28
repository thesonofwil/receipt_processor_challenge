import express, { Application } from "express";
import * as OpenApiValidator from "express-openapi-validator";
import bodyParser from "body-parser";
import { receiptRoutes } from "./routes/receiptRoutes";
import path from "path";

const app: Application = express();

app.use((req, res, next) => {
  next();
});

// Add routes
app.use(bodyParser.json()); // Parses JSON request bodies

// Add OpenAPI validation middleware
app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, "../spec/api.yaml"),
    validateRequests: true,
    validateResponses: false,
  })
);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(err.status || 400).json({
      message: err.message,
      errors: err.errors,
    });
  }
);

app.use("/receipts", receiptRoutes); // base path

export default app;
