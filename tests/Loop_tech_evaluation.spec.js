const { test, expect } = require('@playwright/test');

const testCases = [
  {
    "id": 1,
    "name": "Test Case 1",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Draft project brief",
  },
  {
    "id": 2,
    "name": "Test Case 2",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Schedule kickoff meeting",
  },
  {
    "id": 3,
    "name": "Test Case 3",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Share timeline with teammates",
  },
  {
    "id": 4,
    "name": "Test Case 4",
    "leftNav": "Work Requests",
    "column": "New Requests",
    "card_title": "[Example] Laptop setup for new hire",
  },
  {
    "id": 5,
    "name": "Test Case 5",
    "leftNav": "Work Requests",
    "column": "In Progress",
    "card_title": "[Example] Password not working",
  },
  {
    "id": 6,
    "name": "Test Case 6",
    "leftNav": "Work Requests",
    "column": "Completed",
    "card_title": "[Example] New keycard for Daniela V",
  }
];

test.describe('Asana Data-Driven Tests', () => {
  testCases.forEach((data) => {
    test(`Loop technical evaluation ${data.id}`, async ({ page }) => {
      await test.step('Login to Asana', async () => {
        // Login to Asana
        await page.goto("https://app.asana.com/-/login");
        await expect(page).toHaveTitle('Log in - Asana');
        await page.click('[type="email"]');
        await page.locator('[type="email"]').fill('ben+pose@workwithloop.com');
        await page.click('//div[text()="Continue"]');
        await page.click('[type="password"]');
        await page.locator('[name="p"]').fill('Password123');
        await page.click('//div[text()="Log in"]');
      });

      await test.step(`Navigate to the project page ${data.leftNav}`, async () => {
        // Navigate to the project page
        await page.click(`text="${data.leftNav}"`);
      });

      await test.step('Verify the card is within the right column', async () => {
        // Verify the card is within the right column
        await page.waitForSelector(`text="${data.column}"`);
        await expect(page.locator(`text="${data.card_title}"`)).toBeVisible();
      });
      
    });
  });
});