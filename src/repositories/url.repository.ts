import { Prisma, url } from "@prisma/client";
import prisma from "../common/services/database.service";

interface IURLRepository {
  findURLById(id: string): Promise<url | null>;
  findURLByOriginalURL(originalURL: string): Promise<url | null>;
  save(dto: Prisma.urlCreateInput): Promise<url>;
}

export class URLRepository implements IURLRepository {
  async findURLById(id: string): Promise<url | null> {
    return prisma.url.findFirst({ where: { id } });
  }

  async findURLByShortenURL(shortenURL: string): Promise<url | null> {
    return prisma.url.findFirst({ where: { shortenURL } });
  }

  async findURLByOriginalURL(originalURL: string): Promise<url | null> {
    return prisma.url.findFirst({ where: { originalURL } });
  }

  async save(dto: Prisma.urlCreateInput): Promise<url> {
    return prisma.url.create({
      data: { originalURL: dto.originalURL, shortenURL: dto.shortenURL },
    });
  }
}
