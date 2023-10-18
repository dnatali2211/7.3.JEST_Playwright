let page;

describe("Github page tests", () => {

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });
  
  afterEach(() => {
    page.close();
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1', { timeout: 10000 });
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Let’s build from here · GitHub');
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  });
});

describe("Github page title tests", () => {

  afterEach(() => {
    page.close();
  });

  test("The h1 title content'", async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/features/actions");

    const link = await page.$("main div div a");
    await link.click();
    await page.waitForSelector('main h1');

    const title = "body > div.logged-out.env-production.page-responsive > div.application-main > main > div.p-responsive.container-xl.text-center.mt-12.mb-6 > h1";
    const actual = await page.$eval(title, link => link.textContent);
    expect(actual).toContain("The tools you need to build what you want.")
  }, 10000);

  test("The second link attribute", async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/solutions/ci-cd/");

    const links = await page.$$("a");
    expect(links.length).toBeGreaterThanOrEqual(2);   

    const secondLink = links[1];
    const actual = await page.evaluate(link => link.getAttribute('href'), secondLink);
        expect(actual).toEqual("https://github.com/");
      });

      test("The h1 title content at the sponsor's page", async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/sponsors");

    const link = await page.$("main div div a");
    await link.click();
    await page.waitForSelector('main h1');
    const title1 = await page.title();
    expect(title1).toEqual('Explore GitHub Sponsors · GitHub');
  }, 10000);
});
