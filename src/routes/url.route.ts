import { Router } from "express";
import { URLController } from "../controllers/url.controller";
import { URLService } from "../services/url.service";
import { URLRepository } from "../repositories/url.repository";

const router: Router = Router();

const urlRepository = new URLRepository();
const urlService = new URLService(urlRepository);
export const urlController = new URLController(urlService);

router.post("/", (req, res) => {
  urlController.createShortenURL(req, res);
});

export default router;
