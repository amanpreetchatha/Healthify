import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login","routes/login.tsx"),
    route("register","routes/register.tsx"),
    route("forgotpassword","routes/forgotPassword.tsx"),
    route("repcounter","routes/rep-counter.tsx")


] satisfies RouteConfig;
