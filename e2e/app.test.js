import puppeteer from "puppeteer";
import { fork } from "child_process";

describe("E2E Popover test", () => {
  let browser;
  let page;
  let server;
  let timeout = 30000;

  beforeAll(async () => {
    server = fork("./e2e/test-server.js");
    await new Promise((resolve, reject) => {
      server.on("error", (err) => {
        reject(err);
      });

      server.on("message", (message) => {
        if (message == "ok") {
          resolve();
        }
      });
    });

    console.log("Launching the browser...");
    browser = await puppeteer.launch({
      args: process.env.CI ? ["--no-sandbox", "--disable-setuid-sandbox"] : [],
      //   headless: false,
      //   slowMo: 50,
      //   devtools: true,
    });
    console.log("Launched browser");
  }, timeout);

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test(
    "Clicking image causes a popover with correct text to appear",
    async () => {
      page = await browser.newPage();
      await page.goto("http://localhost:9000", {
        timeout: timeout,
        waitUntil: "domcontentloaded",
      });

      const tooltippedImg = await page.$(".contents__wrapper .netology-img");
      console.log(tooltippedImg);
      let expectedTitle = await page.evaluate(
        (el) => el.dataset.tooltiptitle,
        tooltippedImg,
      );
      let expectedText = await page.evaluate(
        (el) => el.dataset.tooltiptext,
        tooltippedImg,
      );

      await tooltippedImg.click();

      const tooltipWrapper = await page.$(".tooltip__wrapper");
      const tooltipTitle = await tooltipWrapper.$(".tooltip__title");
      const tooltipText = await tooltipWrapper.$(".tooltip__text");
      let tooltipTitleValue = await page.evaluate(
        (el) => el.textContent,
        tooltipTitle,
      );
      let tooltipTextValue = await page.evaluate(
        (el) => el.textContent,
        tooltipText,
      );

      expect(tooltipTitleValue).toBe(expectedTitle);
      expect(tooltipTextValue).toBe(expectedText);
    },
    timeout,
  );

  test(
    "Clicking black square causes a popover with correct text to appear",
    async () => {
      page = await browser.newPage();
      await page.goto("http://localhost:9000", {
        timeout: timeout,
        waitUntil: "domcontentloaded",
      });

      const tooltippedSquare = await page.$(".contents__wrapper .SQUARE");
      let expectedTitle = await page.evaluate(
        (el) => el.dataset.tooltiptitle,
        tooltippedSquare,
      );
      let expectedText = await page.evaluate(
        (el) => el.dataset.tooltiptext,
        tooltippedSquare,
      );

      await tooltippedSquare.click();

      const tooltipWrapper = await page.$(".tooltip__wrapper");
      const tooltipTitle = await tooltipWrapper.$(".tooltip__title");
      const tooltipText = await tooltipWrapper.$(".tooltip__text");
      let tooltipTitleValue = await page.evaluate(
        (el) => el.textContent,
        tooltipTitle,
      );
      let tooltipTextValue = await page.evaluate(
        (el) => el.textContent,
        tooltipText,
      );

      expect(tooltipTitleValue).toBe(expectedTitle);
      expect(tooltipTextValue).toBe(expectedText);
    },
    timeout,
  );

  test(
    "Clicking the button causes a popover with correct text to appear",
    async () => {
      page = await browser.newPage();
      await page.goto("http://localhost:9000", {
        timeout: timeout,
        waitUntil: "domcontentloaded",
      });

      const tooltipButton = await page.$(".contents__wrapper .tooltip-button");
      let expectedTitle = "The button was clicked";
      let expectedText = "It called a function that made this tooltip appear";

      await tooltipButton.click();

      const tooltipWrapper = await page.$(".tooltip__wrapper");
      const tooltipTitle = await tooltipWrapper.$(".tooltip__title");
      const tooltipText = await tooltipWrapper.$(".tooltip__text");
      let tooltipTitleValue = await page.evaluate(
        (el) => el.textContent,
        tooltipTitle,
      );
      let tooltipTextValue = await page.evaluate(
        (el) => el.textContent,
        tooltipText,
      );

      expect(tooltipTitleValue).toBe(expectedTitle);
      expect(tooltipTextValue).toBe(expectedText);
    },
    timeout,
  );
});
