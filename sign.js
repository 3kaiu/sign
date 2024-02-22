const axios = require('axios')

async function Sign_ruike() {
  const signUrl =
    'https://www.ruike1.com/k_misign-sign.html?operation=qiandao&format=global_usernav_extra&formhash=f9093311&inajax=1&ajaxtarget=k_misign_topb'
  const title = '瑞客论坛'

  const cookie =
    'zzhh_2132_saltkey=b2lg49Sd; zzhh_2132_lastvisit=1708495270; zzhh_2132_auth=d01f275qKU5C0KC5I%2B8MoI2B803mmGmxXR7DowhFTxNThZbvRRvs9Jql3A2sXai4Sp19S0TYNO4GWgG09BYrlr%2BZJQ; zzhh_2132_lastcheckfeed=42118%7C1708498953; zzhh_2132_connect_is_bind=0; zzhh_2132_nofavfid=1; zzhh_2132_myrepeat_rr=R0; zzhh_2132_ulastactivity=a6e1Sr0XUo3lLJjFrU3gGeD8MhiZQS15MTwCsGZGnM6LL6j%2FZtvZ; zzhh_2132_sid=ECRjlR; zzhh_2132_lip=172.183.91.165%2C1708619596; zzhh_2132_home_diymode=1; zzhh_2132_lastact=1708619661%09plugin.php%09; zzhh_2132_creditbase=0D930D29D491D0D0D0D0D0; zzhh_2132_creditrule=%E5%8F%91%E8%A1%A8%E5%9B%9E%E5%A4%8D; zzhh_2132_creditnotice=0D2D2D0D0D0D0D0D0D42118' // 从 Secrets 中读取 Cookie

  try {
    const response = await axios.get(signUrl, {
      headers: {
        Cookie: cookie // 设置 Cookie 头部
      }
    })
    if (response.data.includes(`alt="今日已签"`)) {
      console.log(`${title}🟢签到成功`)
    } else if (response.data.includes('CDATA[今日已签]')) {
      console.log(`${title}🟢重复签到`)
    } else {
      console.log(`${title}💢未知错误，请查看日志响应信息`)
      console.warn(`${title}💢未知错误 响应信息: ${response.data}`)
    }
  } catch (error) {
    console.error(`${title}💥请求失败: ${error.message}`)
  }
}

Sign_ruike()
