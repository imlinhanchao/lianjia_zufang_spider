let req = require("./lib/req");
let fs = require("fs");
const { JSDOM } = require("jsdom");

let House = require("./app/house");

(async () => {
    let infos = [];
    let failed = {
        page: [],
        id: []
    }
    for (let j = 0; j < 100; j++) {
        try {
            console.log(`Get page ${j + 1} info ing...`);                        
            let infos = await House.getSummarys(j + 1);
            for (let i = 0; i < infos.length; i++) {
                try {
                    console.log(`Get id ${infos[i].id} info ing...`);                    
                    let info = await House.getDetail(infos[i].id);
                    info = Object.assign(infos[i], info);
                    await House.insert(info);
                    console.log(`Get id ${infos[i].id} info success!`);
                } catch (error) {
                    console.log(`Get id ${infos[i].id} info failed!`);
                    console.log(`error message:${error}`);
                    failed.id.push(infos[i].id);
                }
            }
            console.log(`Get page ${j + 1} info success!`);            
        } catch (error) {
            console.log(`Get page ${j + 1} info failed!`);            
            console.log(`error message:${error}`);
            failed.id.push(j + 1);            
        }
    }
    console.log(JSON.stringify(failed));
})();