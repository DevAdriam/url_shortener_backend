import { Request, Response } from "express";
import { URLService } from "../services/url.service";
import Responser from "../utils/responser";
import LOGGER from "../config/logger/winston";
import { url } from "inspector";

export class URLController {
  private urlService: URLService;
  constructor(urlService: URLService) {
    this.urlService = urlService;
  }

  public async createShortenURL(
    req: Request<{}, {}, { url: string }, {}>,
    res: Response
  ): Promise<Response<IResponse<typeof url>>> {
    const { url } = req.body;
    try {
      if (!url) {
        return res.status(400).json(
          Responser({
            status: 400,
            data: null,
            message: "URL body is required",
          })
        );
      }
      const createdURL = await this.urlService.saveURL(url);
      return res.status(201).json(
        Responser({
          data: {
            ...createdURL,
            shortenURL: `${process.env.BASE_URL}/${createdURL.shortenURL}`,
          },
          message: "Successfully created shorten URL",
          status: 201,
        })
      );
    } catch (error) {
      LOGGER.error(error);
      return res.status(500).json(
        Responser({
          data: null,
          message: "Something went wrong",
          status: 500,
        })
      );
    }
  }

  public async getOriginalURL(
    req: Request,
    res: Response
  ): Promise<Response<IResponse<typeof url>> | void> {
    try {
      const { shortenURL } = req.params;
      if (!shortenURL) {
        return res.status(400).json(
          Responser({
            status: 400,
            data: null,
            message: "Shorten URL is required",
          })
        );
      }
      const foundURL = await this.urlService.getOriginalURL(shortenURL);
      if (!foundURL) {
        return res.status(400).json(
          Responser({
            status: 400,
            data: null,
            message: "URL not found",
          })
        );
      }
      res.redirect(301, `${foundURL.originalURL.toString().trimEnd()}`);
    } catch (error) {
      LOGGER.error(error);
      return res.status(500).json(
        Responser({
          data: null,
          message: "Something went wrong",
          status: 500,
        })
      );
    }
  }
}
