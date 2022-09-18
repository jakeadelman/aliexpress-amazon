const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs')
const phantom = require("phantom")

const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36';


const AliexScrape = async (searchterm)=>{
    const data= {}
    const options = {
    url: `https://aliexpress.com`,
    headers: {
		accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
		'accept-language': 'en',
		'cache-control': 'max-age=0',
		'sec-ch-ua': '"(Not(A:Brand";v="8", "Chromium";v="99", "Google Chrome";v="99"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"macOS"',
		'sec-fetch-dest': 'document',
		'sec-fetch-mode': 'navigate',
		'sec-fetch-site': 'same-origin',
		'sec-fetch-user': '?1',
		'upgrade-insecure-requests': '1',
		cookie:
			'ali_apache_id=11.10.85.103.164892640536.187464.2; xman_f=VjHVs3oVgqNBuK1Np0ZMV6QH8emRx/SHuuUn9k1bG3GCtxSo4xe+u9OW7Tkp82Z7PRIKTO+uGTvPvGC9MboJysjyi/q+fl2FbcMkeU4yQI4uG7v42J3hoQ==; acs_usuc_t=x_csrf=agw901gas1m2&acs_rt=aef5a6d67f3940be95885bf80e211c59; xman_t=j3NzMSiph1vhpGAHZu0+JfXAUoQa0TtLTBlropJLxdFU5PggmCL9PXhiGi+hq0xe; AKA_A2=A; _m_h5_tk=84aa0ed8a6d670b1033ae833eb09f91c_1648928479773; _m_h5_tk_enc=7edf1d6dc3ab91c3593932c2e803b5e0; cna=yYzPGtBm03QCAdUH3+7lyLx/; xlly_s=1; ali_apache_track=; ali_apache_tracktmp=; e_id=pt100; xman_us_f=x_locale=en_US&x_l=0&x_c_chg=0&x_as_i=%7B%22aeuCID%22%3A%22%22%2C%22cookieCacheEffectTime%22%3A1648926705067%2C%22isCookieCache%22%3A%22Y%22%2C%22ms%22%3A%220%22%7D&acs_rt=aef5a6d67f3940be95885bf80e211c59; XSRF-TOKEN=cc12469d-e5fe-4ddc-89cd-80655cce769d;  JSESSIONID=E751396108089180B33488399396739D; intl_common_forever=CrH21EmtdqxGxFIPVY9GuP9J2+lOIGbLdTIldJLfDVqIASxYzbPSjQ==; isg=BJOTxn-u9fJP0LmmqymaRcMXIhG9SCcKnsbv5UWw77LpxLNmzRi3WvEW_iyq_38C; l=eBrI2zfmLUjKn-6BBOfanurza77OSIRYYuPzaNbMiOCP9_1B5E2lW6V9U-T6C3MNh68yR3lqBTYpBeYBcQAonxvOSWcKFYMmn; tfstk=cYFPB_qk8XqbYYGCBbGFVjZg75URw2P3ZT3KE8BdTS1L94fDqH3cSsq8YE-nE; aep_usuc_f=site=glo&c_tp=EUR&ups_d=&ups_u_t=&region=CY&b_locale=en_US&ae_u_p_s=1; RT="z=1&dm=aliexpress.com&si=d10dbed7-e219-447e-8c1c-9f7a09601219&ss=l1i87g5o&sl=3&tt=7ot&obo=1&rl=1&ld=m9v&r=143jpohnh&ul=m9v"',
		Referer: 'https://www.aliexpress.com/',
		'Referrer-Policy': 'strict-origin-when-cross-origin',
	}
    }
    // const proxiedRequest = rp.defaults({proxy: "http://45.162.75.194:999"})

    // const url = "https://www.aliexpress.com/";
    // const instance = await phantom.create(['--ignore-ssl-errors=yes', '--load-images=yes']);
    // const page = await instance.createPage();
    // const status = await page.open(url);

    // if (status !== 'success') {
    //   console.error(status);
    //   await instance.exit();
    //   return;
    // }

    return rp(options)
    .then(response=>{
            console.log(response)
            fs.writeFile("output1.html", response, (res)=>{
                    console.log(res)
                })
    
            const $ = cheerio.load(response);
            
            data.searchterm = searchterm;
            console.log($('div .JIIxO').html())
    
            fs.writeFile("output1.html",response, (res,err)=>{
                if(res){console.log('sucess')}
            })
           
            console.log($('div[class=root]').html())
        
            })

}
AliexScrape("Ipad")