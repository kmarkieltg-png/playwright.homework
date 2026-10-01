import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('Update pet type', async ({ page }) => {
    await expect(page.locator('.title')).toHaveText('Welcome to Petclinic')
    await page.getByText('Pet Types').click()
    await expect(page.getByRole('heading', { name: 'Pet Types' })).toBeVisible()
    const tableRowByPetCat = page.getByRole('row', { name: 'cat' })
    await tableRowByPetCat.getByRole('button', { name: 'Edit' }).click()
    await page.getByRole('textbox').click()
    await page.getByRole('textbox').fill('rabbit')
    await page.getByRole('button', { name: 'Update' }).click()
    const firstTableRow = page.locator('tbody tr').getByRole('textbox').first()
    await expect(firstTableRow).toHaveValue('rabbit')
    const tableRowByPetRabbit = page.getByRole('row', { name: 'rabbit' })
    await tableRowByPetRabbit.getByRole('button', { name: 'Edit' }).click()
    await page.getByRole('textbox').click()
    await page.getByRole('textbox').fill('cat')
    await page.getByRole('button', { name: 'Update' }).click()
    await expect(firstTableRow).toHaveValue('cat')



});