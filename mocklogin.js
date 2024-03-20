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

	// 等待登录成功后的页面加载
	await page.waitForNavigation()

	// 等待 id 为 fx_checkin_b 的按钮出现
	await page.waitForSelector('#fx_checkin_b')

	// 点击 id 为 fx_checkin_b 的按钮
	await page.click('#fx_checkin_b')

	// 在点击按钮后，等待一段时间以确保页面的某些操作完成
	await page.waitForNavigation({ timeout: 60000 })

	// 获取签到结果
	const result = await page.evaluate(() => {
		return document.querySelector('#fx_checkin_b').textContent
	})

	console.log('签到结果:', result)
	await browser.close()
})()
