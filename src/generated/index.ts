/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { ApiError } from "./core/ApiError";
export { CancelablePromise, CancelError } from "./core/CancelablePromise";
export { OpenAPI } from "./core/OpenAPI";
export type { OpenAPIConfig } from "./core/OpenAPI";

export type { Item } from "./models/Item";
export type { Receipt } from "./models/Receipt";

export { DefaultService } from "./services/DefaultService";

import app from "../app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
