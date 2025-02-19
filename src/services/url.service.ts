import { url } from "@prisma/client";
import { URLRepository } from "../repositories/url.repository";

export class URLService {
  private urlRepository: URLRepository;
  constructor(urlRepository: URLRepository) {
    this.urlRepository = urlRepository;
  }

  public async saveURL(originalURL: string): Promise<url> {
    const urlAlreadyExists = await this.urlRepository.findURLByOriginalURL(
      originalURL
    );
    if (!!urlAlreadyExists) {
      return urlAlreadyExists;
    }

    const shortenURL = this.generateShortUrl();
    return this.urlRepository.save({ originalURL, shortenURL });
  }

  public async getOriginalURL(shortenURL: string) {
    const originalURL = await this.urlRepository.findURLByShortenURL(
      shortenURL
    );

    return originalURL;
  }

  private generateShortUrl(length: number = 8): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
