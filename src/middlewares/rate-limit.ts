import {RateLimit} from "koa2-ratelimit";
import type {Core} from "@strapi/strapi";
import {Context, Next} from "koa";

export default (_config: any, {}: { strapi: Core.Strapi }) => {
    return async (ctx: Context, next: Next) => {
        return RateLimit.middleware({
            interval: {min: Number(process.env.RATE_LIMIT_INTERVAL_IN_MINUTES || 5)},
            max: Number(process.env.RATE_LIMIT_THRESHOLD || 100),
            message: "Too many requests, please try again later.",
            headers: true,
        })(ctx, next);
    };
};
