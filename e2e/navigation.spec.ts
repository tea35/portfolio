import { test, expect } from "@playwright/test";
import { routing } from "../src/i18n/routing";

const locale = routing.defaultLocale;
test.describe("ナビゲーション", () => {
  test("トップページが表示される", async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page).toHaveTitle(/tea/);
  });

  test("/worksからHomeをクリックするとトップに戻る", async ({ page }) => {
    await page.goto(`/${locale}/works`);
    await page.getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL(`/${locale}#home`);
  });

  test("/worksからWorksをクリックするとworksセクションに遷移する", async ({
    page,
  }) => {
    await page.goto(`/${locale}/works`);
    await page.getByRole("link", { name: "Works" }).click();
    await expect(page).toHaveURL(`/${locale}#works`);
  });

  test("/worksからAboutをクリックするとaboutセクションに遷移する", async ({
    page,
  }) => {
    await page.goto(`/${locale}/works`);
    await page.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(`/${locale}#about`);
  });

  test("/worksページが表示される", async ({ page }) => {
    await page.goto(`/${locale}/works`);
    await expect(page).toHaveTitle(/tea/);
  });

  test("See moreをクリックすると/worksに遷移する", async ({ page }) => {
    await page.goto(`/${locale}`);
    await page.click("text=SEE MORE");
    await expect(page).toHaveURL(`/${locale}/works`);
  });

  test("/worksページのBackリンクでトップに戻る", async ({ page }) => {
    await page.goto(`/${locale}/works`);
    await page.getByRole("link", { name: /Back/i }).click();
    await expect(page).toHaveURL(`/${locale}`);
  });

  test("ヘッダーのWorksリンクが機能する", async ({ page }) => {
    await page.goto(`/${locale}/works`);
    await page.click("text=Home");
    await expect(page).toHaveURL(`/${locale}#home`);
  });

  test("404ページが表示される", async ({ page }) => {
    await page.goto(`/${locale}/hogehoge`);
    await expect(page.locator("text=404")).toBeVisible();
  });

  test("404ページのBack to Homeでトップに戻る", async ({ page }) => {
    await page.goto(`/${locale}/hogehoge`);
    await page.getByRole("link", { name: /Back to Home/i }).click();
    await expect(page).toHaveURL(`/${locale}`);
  });
});
