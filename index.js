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
		document
			.querySelector(
				'#lsform > div > div.y.pns > table > tbody > tr:nth-child(2) > td.fastlg_l > button'
			)
			.click()
	})

	await page.goto('https://www.ruike1.com/k_misign-sign.html')
	await page.waitForSelector('body')
	const result1 = await page.evaluate(() => {
		return document.querySelector('#wp div.paiming.cl .font').innerHTML
	})
	console.log(`登陆结果：${result1}`)

	await page.evaluate(() => {
		const JD_sign = document.getElementById('JD_sign')
		if (JD_sign) {
			// 手动触发 onclick 事件
			JD_sign.click()
			// 执行 onclick 中的函数
			ajaxget(JD_sign.href, JD_sign.id, '', '', '', 'window.location.reload();')
		}
	})

	const result = await page.evaluate(() => {
		return document.querySelector('#wp div.paiming.cl .font').innerHTML
	})

	console.log(`签到结果：${result}`)

	await browser.close()
})()
