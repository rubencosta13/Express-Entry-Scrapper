describe("Can the scrapper go to https://google.com", () => {
    beforeAll(async () => {
        await page.goto('https://google.com')
    })
    it('Google\'s Webpage Title should be "Google"', async () => {
        await expect(page.title()).resolves.toMatch("Google")
    })
})
