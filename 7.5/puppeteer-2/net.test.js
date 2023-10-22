const {clickElement, isButtonEnabled} = require("./lib/commands.js");
const {expect} = require('chai');

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Booking movies tests", () => {
  beforeEach(async () => {
      await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  test("Happy Path 1: Бронирование одного билета", async () => {
      await clickElement(page, 'body > nav > a:nth-child(2)');
      await clickElement(page, 'body > main > section:nth-child(3) > div:nth-child(2) > ul > li > a');
      await page.waitForSelector('body > main > section > div.buying-scheme > div.buying-scheme__wrapper');
      await clickElement(page, '.buying-scheme__wrapper > div:nth-child(2) > span:nth-child(1)');
      const isButtonActive = await isButtonEnabled(page, 'body > main > section > button', 'disabled');
      expect(isButtonActive).to.be.false;
  });

  test("Happy Path 2: Бронирование нескольких билетов", async () => {

      await clickElement(page, 'body > nav > a:nth-child(7)');
      await clickElement(page, 'body > main > section:nth-child(1) > div.movie-seances__hall > ul > li > a');
      await page.waitForSelector('body > main > section > div.buying-scheme > div.buying-scheme__wrapper');
      await clickElement(page, '.buying-scheme__wrapper > div:nth-child(5) > span:nth-child(4)');
      await clickElement(page, '.buying-scheme__wrapper > div:nth-child(5) > span:nth-child(5)');
      const isButtonActive = await isButtonEnabled(page, 'body > main > section > button', 'disabled');
      expect(isButtonActive).to.be.false;
  });

  test("Sad Path 3: Бронирование забронированного места", async () => {

      await clickElement(page, 'body > nav > a:nth-child(3)');
      await clickElement(page, 'body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a');
      await page.waitForSelector('body > main > section > div.buying-scheme > div.buying-scheme__wrapper');
      await page.waitForSelector('.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken');

      const isButtonActive = await isButtonEnabled(page, 'body > main > section > button', 'disabled');
      expect(isButtonActive).to.be.true;
  });

});