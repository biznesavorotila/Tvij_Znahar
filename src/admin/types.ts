import { Request as ExpressRequest } from "express";

export type Request<T> = ExpressRequest<{}, {}, T>;
export type RequestParams<T> = ExpressRequest<T, {}, {}>;