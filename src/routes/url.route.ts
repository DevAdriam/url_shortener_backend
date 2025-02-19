import { Router } from "express";
import { URLController } from "../controllers/url.controller";
import { URLService } from "../services/url.service";
import { URLRepository } from "../repositories/url.repository";

const urlRouter: Router = Router();

const urlRepository = new URLRepository();
const urlService = new URLService(urlRepository);
export const urlController = new URLController(urlService);

urlRouter.post("/", (req, res) => {
  urlController.createShortenURL(req, res);
});

export default urlRouter;
