/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { ApiError } from "./generated/core/ApiError";
export {
  CancelablePromise,
  CancelError,
} from "./generated/core/CancelablePromise";
export { OpenAPI } from "./generated/core/OpenAPI";
export type { OpenAPIConfig } from "./generated/core/OpenAPI";

export type { Item } from "./generated/models/Item";
export type { Receipt } from "./generated/models/Receipt";

export { DefaultService } from "./generated/services/DefaultService";

import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
