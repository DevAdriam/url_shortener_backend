import { Router } from "express";
import urlRoutes from "./url.route";

const mainRouter = Router();

mainRouter.use("/urls", urlRoutes);

export default mainRouter;
