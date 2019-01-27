import { pbkdf2Sync, randomBytes } from "crypto";

export default {
  parseInt(string: any) {
    if (typeof string === "number") {
      return string;
    }
    if (!string) {
      return string;
    }
    return parseInt(string, 10) || 0;
  },

  parseFloat(string: any) {
    if (typeof string === "number") {
      return string;
    }
    if (!string) {
      return string;
    }
    return parseFloat(string) || 0;
  },

  parseBool(bool: any) {
    if (typeof bool === "boolean") {
      return bool;
    }
    return bool === "true";
  },

  parseJson(json: any) {
    if (typeof json === "object") {
      return json;
    }
    return JSON.parse(decodeURIComponent(json));
  },

  hash(string: string, salt: string = "", iterations: number = 12000, length: number = 32) {
    return pbkdf2Sync(string, salt, iterations, length, "sha256")
      .toString("base64");
  },

  salt(length: number = 32) {
    return randomBytes(length).toString("base64");
  },
};
