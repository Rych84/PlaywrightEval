import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BoardPage } from '../pages/BoardPage';
import testData from '../test-data/boardTestData.json';

test.describe('Asana Demo App - Data Driven Tests', () => {

    for (const data of testData) {

        test(`Validate: ${data.task}`, async ({ page }) => {

            const loginPage = new LoginPage(page);
            const boardPage = new BoardPage(page);

            // Step 1: Login
            await loginPage.navigate();
            await loginPage.login('admin', 'password123');

            // Step 2: Navigate to correct project
            await boardPage.navigateToProject(data.project);

            // Step 3: Verify task exists in correct column
            await boardPage.verifyTaskInColumn(data.task, data.column);

            // Step 4: Verify all expected tags
            await boardPage.verifyTags(data.task, data.tags);
        });

    }

});