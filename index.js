const puppeteer = require('puppeteer')

;(async () => {
	const browser = await puppeteer.launch({ headless: true })
	const page = await browser.newPage()

	await page.goto('https://www.ruike1.com/')
	await page.waitForSelector('body')

	const username = process.argv[2]
	const password = process.argv[3]

	await page.type('#ls_username', username)
	await page.type('#ls_password', password)

	await page.evaluate(() => {
		document.querySelector('#fx_checkin_b').click()
	})

	// await page.waitForTimeout(1000) // 等待一秒钟
	console.log(page)

	await page.goto('https://www.ruike1.com/k_misign-sign.html')
	await page.waitForSelector('body')

	const result = await page.evaluate(() => {
		return document.querySelector('#fx_checkin_b').innerText
	})

	console.log(`签到结果：${result}`)

	await browser.close()
})()
