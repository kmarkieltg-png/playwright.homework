import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('Update pet type', async ({ page }) => {
    await expect(page.locator('.title')).toHaveText('Welcome to Petclinic')
    await page.getByText('Pet Types').click()
    await expect(page.getByRole('heading')).toHaveText('Pet Types')
    await page.getByRole('row', { name: 'cat' }).getByRole('button', { name: 'Edit' }).click()
    await expect(page.getByRole('textbox')).toHaveValue('cat')
    await page.getByRole('textbox').fill('rabbit')
    await page.getByRole('button', { name: 'Update' }).click()
    const firstPetTypeInputField = page.locator('tbody tr').getByRole('textbox').first()
    await expect(firstPetTypeInputField).toHaveValue('rabbit')
    await page.getByRole('row', { name: 'rabbit' }).getByRole('button', { name: 'Edit' }).click()
    await expect(page.getByRole('textbox')).toHaveValue('rabbit')
    await page.getByRole('textbox').fill('cat')
    await page.getByRole('button', { name: 'Update' }).click()
    await expect(firstPetTypeInputField).toHaveValue('cat')
});