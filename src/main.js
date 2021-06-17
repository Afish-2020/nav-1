const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
let x = localStorage.getItem('x')
let xObject = JSON.parse(x)
const hashMap = xObject || [{ logo: 'M', url: 'https://developer.mozilla.org' }, { logo: 'B', url: 'https://v3.bootcss.com' }, { logo: 'G', url: 'https://github.com' }, { logo: 'I', url: 'https://www.iconfont.cn' }, { logo: 'S', url: 'https://stackoverflow.com' }, { logo: 'S', url: 'https://stackoverflow.com/' }, { logo: 'J', url: 'https://www.jikexueyuan.com/' }]

let simplifyUrl = (url) => {
    return url.replace('https://', '').replace('https://', '').replace('www.', '').replace(/\/.*/, '')
}

let render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
          <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link"> ${simplifyUrl(node.url)} </div>
            <div class="close">
              <svg class="icon">
                <use xlink:href="#icon-close"></use>
              </svg>
            </div>  
          </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url, '_self')
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$(".addButton")
    .on('click', () => {
        let url = window.prompt('请输入网址')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            url: url
        })
        render()
    })

window.onbeforeunload = () => {
    let string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    const key = e.key
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url, '_self')
        }
    }
})