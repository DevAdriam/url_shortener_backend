import request from "supertest";
import { strict as assert } from "assert";
import app from "../app";
import { IResponse } from "../utils/types/response.format";
import { url } from "@prisma/client";

describe("GET /", () => {
  it('should return a 200 status and "hello world" message', async () => {
    const res = await request(app).get("/");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.text, "hello world");
  });
});

describe("GET /invalidURL", () => {
  it("should return a 400 status and success must be false", async () => {
    const res = await request(app).get("/invalidURL");
    const { _succes, _message } = res.body as IResponse<url | null>;
    assert.strictEqual(res.status, 400);
    assert.strictEqual(_succes, false);
    assert.strictEqual(_message, "URL not found");
  });
});

describe("POST /api/v1/urls", () => {
  it("should return a 201 status and 'success' must be true", async () => {
    const payload = {
      url: "https://daily.dev",
    };
    const res = await request(app).post("/api/v1/urls").send(payload);
    const { _succes, _message } = res.body as IResponse<url | null>;
    assert.strictEqual(res.status, 201);
    assert.strictEqual(_succes, true);
    assert.strictEqual(_message, "Successfully created shorten URL");
  });
});

describe("POST /api/v1/urls", () => {
  it("should return a 400 status and throw error with message 'URL body is required'", async () => {
    const payload = {};
    const res = await request(app).post("/api/v1/urls").send(payload);
    const { _succes, _message } = res.body as IResponse<url | null>;
    assert.strictEqual(res.status, 400);
    assert.strictEqual(_succes, false);
    assert.strictEqual(_message, "URL body is required");
  });
});
