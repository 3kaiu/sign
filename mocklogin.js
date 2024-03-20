const puppeteer = require('puppeteer')

;(async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto('http://www.ruike1.com')

	// 等待页面加载完毕
	await page.waitForSelector('#ls_username')

	// 输入账号密码并点击登录
	await page.type('#ls_username', 'wennn')
	await page.type('#ls_password', '123456')
	await page.click('button[type="submit"].pn.vm')

	// 监听页面的网络请求和响应
	page.on('response', async response => {
		console.log('Response URL:', response.url())
		if (response.url().includes('login')) {
			// 处理响应
			const responseBody = await response.text()
			console.log('Response Body:', responseBody)
			await page.waitForSelector('#fx_checkin_b')
			await page.click('#fx_checkin_b')
		}
	})
	// 获取签到结果
	const result = await page.evaluate(() => {
		return document.querySelector('#fx_checkin_b').textContent
	})

	console.log('签到结果:', result)

	await browser.close()
})()
