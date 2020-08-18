var fs = require('fs');
var globarConfig = require('./config');

var contorllerSet = [];
var pathMap = new Map();

var files = fs.readdirSync(globarConfig["web_path"]);
for(var i = 0; i < files.length;i++) {
    var temp = require("./" + globarConfig["web_path"] + "/" + files[i]);
    if(temp.path) {
        for(var [key,value] of temp.path) {
            if(pathMap.get(key) == null) {
                pathMap.set(key,value) ;
            }else{
                throw new Error('url path 异常，url:' + key);
            }
        }
        contorllerSet.push(temp);
    }
}

module.exports = pathMap;
