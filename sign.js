const axios = require('axios')

async function Sign_ruike() {
  const signUrl =
    'https://www.ruike1.com/k_misign-sign.html?operation=qiandao&format=global_usernav_extra&formhash=f9093311&inajax=1&ajaxtarget=k_misign_topb'
  const title = '瑞客论坛'

  const cookie = process.env.COOKIE // 从 Secrets 中读取 Cookie

  try {
    const response = await axios.get(signUrl, {
      headers: {
        Cookie: cookie // 设置 Cookie 头部
      }
    })
    console.log(response)
    // if (response.data.includes(`alt="今日已签"`)) {
    //   console.log(`${title}🟢签到成功`)
    // } else if (response.data.includes('CDATA[今日已签]')) {
    //   console.log(`${title}🟢重复签到`)
    // } else {
    //   console.log(`${title}💢未知错误，请查看日志响应信息`)
    //   console.warn(`${title}💢未知错误 响应信息: ${response.data}`)
    // }
  } catch (error) {
    console.error(`${title}💥请求失败: ${error.message}`)
  }
}

Sign_ruike()
