import { Then } from "@cucumber/cucumber";
import path from "path";
import { promises as fs } from "fs";

Then(
  "the messages should only contain a single {string} and a single {string}",
  async function (a, b) {
    const absoluteMessagesPath = path.join(
      this.tmpDir,
      "cucumber-messages.ndjson"
    );

    const messages = (await fs.readFile(absoluteMessagesPath))
      .toString()
      .trim()
      .split("\n")
      .map((string) => JSON.parse(string));

    const aCount = messages.filter((m) => m[a]).length;
    const bCount = messages.filter((m) => m[b]).length;

    if (aCount !== 1) {
      throw new Error(`Expected to find a single "${a}", but found ${aCount}`);
    }

    if (bCount !== 1) {
      throw new Error(`Expected to find a single "${b}", but found ${bCount}`);
    }
  }
);
