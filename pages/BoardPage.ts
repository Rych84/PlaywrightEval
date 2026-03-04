import { type Page, expect, type Locator } from '@playwright/test';

export class BoardPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    
      //Navigate to a project from the left sidebar
     
    async navigateToProject(projectName: string) {
        const sidebar = this.page.getByRole('navigation');

        await sidebar
            .getByRole('button', {
                name: new RegExp(`^${projectName}`) 
            })
            .click();

        // Ensure page header updated
        await expect(
            this.page.getByRole('heading', { level: 1, name: projectName })
        ).toBeVisible();
    }

    
     // Return a column container by column title
     
    private getColumn(columnName: string): Locator {
        return this.page
            .getByRole('heading', { level: 2, name: new RegExp(`^${columnName}`) })
            .locator('..'); 
    }

    
      //Verify task exists inside correct column
     
    async verifyTaskInColumn(taskName: string, columnName: string) {
        const column = this.getColumn(columnName);

        await expect(
            column.getByRole('heading', { level: 3, name: taskName })
        ).toBeVisible();
    }

    
      //Verify all expected tags exist on the task card
    
    async verifyTags(taskName: string, tags: string[]) {
        const taskCard = this.page
            .getByRole('heading', { level: 3, name: taskName })
            .locator('..');

        for (const tag of tags) {
            await expect(
                taskCard.getByText(tag, { exact: true })
            ).toBeVisible();
        }
    }
}