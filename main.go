package main

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/chromedp/chromedp"
)

func main() {
	opts := append(chromedp.DefaultExecAllocatorOptions[:],
		chromedp.Flag("headless", true),
	)

	allocCtx, cancel := chromedp.NewExecAllocator(context.Background(), opts...)
	defer cancel()

	// 创建一个上下文和取消函数
	ctx, cancel := chromedp.NewContext(allocCtx)
	defer cancel()

	// 设置超时时间
	ctx, cancel = context.WithTimeout(ctx, 20*time.Second)
	defer cancel()

	// 创建一个空白的结果变量，用于接收Navigate的结果
	var res string

	// 执行任务列表
	err := chromedp.Run(ctx,
		chromedp.Navigate("https://www.ruike1.com/"),
		chromedp.WaitVisible("body", chromedp.ByQuery),
		chromedp.SetValue("//*[@id='ls_username']", os.Args[1]),
		chromedp.SetValue("//*[@id='ls_password']", os.Args[2]),
		// chromedp.SetValue("//*[@id='ls_username']", "notepad++"),
		// chromedp.SetValue("//*[@id='ls_password']", "12345678"),
		chromedp.Click("document.querySelector(\"#lsform > div > div.y.pns > table > tbody > tr:nth-child(2) > td.fastlg_l > button\")", chromedp.ByJSPath),
		chromedp.Sleep(time.Second*1),
		chromedp.Navigate("https://www.ruike1.com/k_misign-sign.html"),
		chromedp.WaitVisible("body", chromedp.ByQuery),
		chromedp.Text(`#wp > div.wp.cl > div.lineB.cl > div.qdleft > div > div.font`, &res, chromedp.NodeVisible),
	)
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("签到结果：%s", res)
}
