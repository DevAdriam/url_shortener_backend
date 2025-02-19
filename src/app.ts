import express from "express";
import LOGGER from "./config/logger/winston";
import logRequests from "./common/middlewares/logger";
import { verifyConnection } from "./common/services/database.service";
import mainRoute from "./routes/main.route";
import cors from "cors";
import { urlController } from "./routes/url.route";
const app = express();

app.use(cors());
app.use(express.json());
app.use(logRequests);
app.use(`/api/${process.env.API_VERSION || "v1"}`, mainRoute);
app.get("/", (_, res) => {
  res.status(200).send("hello world");
});
app.get("/:shortenURL", (req, res) => {
  urlController.getOriginalURL(req, res);
});

verifyConnection();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  LOGGER.info(`Server is running on port ${PORT}`);
});

export default app;
