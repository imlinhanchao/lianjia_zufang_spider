const { JSDOM } = require("jsdom");

const req = require('../lib/req');
const model = require('../model');
const App = require('./app');

let _error = Object.assign({}, App.error);

let House = model.house;
let Price = model.price;

class HouseApp extends App {
    constructor() {
        super();
    }

    static get error() {
        return _error;
    }

    static async insert(data) {
        try {
            let house_keys = House.keys();
            let price_keys = Price.keys();

            let house_data = App.filter(data, house_keys);
            let price_data = App.filter(data, price_keys);

            let house = await House.findOne({
                where: {
                    id: data.id
                }
            });

            let price = await Price.create(price_data);
            
            if (house) {
                for (let i = 0; i < house_keys.length; i++) {
                    house[house_keys[i]] = data[house_keys[i]]
                }
                house.save();
                return true;
            }

            house = await House.create(house_data);

            return true;
        } catch (err) {
            if (err.isdefine) throw (err);
            throw (App.error.db(err));
        }
    }

    static async getSummarys(page) {
        let infos = [];
        let rsp = await req.get(`https://sz.lianjia.com/zufang/pg${page}/`);
        const window = new JSDOM(rsp.body).window;
        const document = window.document;
        let panel = document.getElementsByClassName("info-panel");
        for (let i = 0; i < panel.length; i++) {
            let title = panel[i].getElementsByTagName("a")[0];
            let link = title.href;
            let name = title.innerHTML;
            let price = panel[i].getElementsByClassName("num");
            price = price[0].innerHTML;
            let looktimes = price[1].innerHTML;
            infos.push({
                name: name,
                id: link.match(/\/(\d+)\.html/)[1],
                price: price,
                looktimes: looktimes
            })
        }

        return infos;
    }

    static async getDetail(id) {
        let rsp = await req.get(`https://sz.lianjia.com/zufang/${id}.html`);
        const window = new JSDOM(rsp.body).window;
        const document = window.document;
        let content = document.getElementsByClassName('content-wrapper')[0];
        let title = content.getElementsByClassName('title')[0];
        let description = title.getElementsByClassName('sub')[0].textContent;
        let middleman = document.getElementsByClassName('brokerName')[0].getElementsByTagName('a')[0].textContent;
        let phone = content.getElementsByClassName("phone")[0].textContent;
        phone = phone.replace(/\s*转\s*/g, '-').replace(/^\s*|\s*$/g, '')
        // let thumbnail = content.getElementsByClassName('thumbnail')[0]
        // let imgs = thumbnail.getElementsByTagName('img');
        // imgs = Array.from(imgs).map(x => x.src);
        let regexps = {
            community: /<i>小区：<\/i><a href="[^"]*?">([^<]*?)<\/a>/,
            location: /<i>位置：<\/i>(.*?)<\/p>/,
            score: /评分:([\d.]*?)\//,
            comment: /(\d*?)人评价/,
            area: /<i>面积：<\/i>([\d.]*?)平米/,
            huxing: /<i>房屋户型：<\/i>([^<]*?)</,
            floor: /<i>楼层：<\/i>([^<]*?)</,
            face: /<i>房屋朝向：<\/i>([^<]*?)</,
            subway: /<i>地铁：<\/i>([^<]*?)</,
            postdate: /<i>时间：<\/i>(\d*?)天前发布/,
            housecode: /<i>房源编码：<\/i>([\w\d]*?)</,
            lianjiacode: /houseNum">链家编号：(\d*?)</
        }
        let info = {
            description: description,
            middleman: middleman,
            phone: phone
        }
        for (let k in regexps) {
            let mat = rsp.body.match(regexps[k]);
            if (mat && mat[1]) {
                info[k] = mat[1].replace(/<(\/|)[^>]*?>/g, "");
            }
        }
        info.postdate = info.postdate * 24 * 3600 * 1000 + (new Date()).valueOf();
        return info;
   }
}

module.exports = HouseApp;
