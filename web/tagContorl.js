const blogDao = require("../dao/blogDao");
const tagsDao = require("../dao/tagDao");
const tagBlogMappingDao = require('../dao/tagBlogMappingDao');
const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/RespUtil");
const url = require("url");

const path = new Map();
function queryRandomTags(request, response) {
    tagsDao.queryAllTag(function (result) {
        result.sort(function () {
            return Math.random() > 0.5
        })
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    })
}
path.set('/queryRandomTags', queryRandomTags);
function queryByTag(request, response) {
    const params = url.parse(request.url, true).query
    tagsDao.queyrTag(params.tag, function (result) {
        if (result == null || result.length === 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "评论成功", result));
            response.end();
        } else {
            tagBlogMappingDao.queryByTag(result[0].id, parseInt(params.page), parseInt(params.pageSize), function (result) {
                const blogList = [];
                for (let i = 0; i < result.length; i++) {
                    console.log(result[i].blog_id)
                    blogDao.queryBlogId(result[i].blog_id, function(result) {
                        console.log(result, 'result')
                        blogList.push(result[0])
                    })
                }
                getResult(blogList, result.length, response);
            })
        }
    })
}
path.set('/queryByTag', queryByTag);
function getResult(blogList, len, response) {
    if (blogList.length < len) {
        setTimeout(function(){
            getResult(blogList, len, response);
        }, 10)
    } else {
        for (let i = 0; i < blogList.length; i++) {
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*/g, '');
            blogList[i].content = blogList[i].content.replace(/\w\W[1,5]/g, '');
            blogList[i].content = blogList[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", blogList));
        response.end();
    }
}
function queryByTagCount(request, response) {
    const params = url.parse(request.url ,true).query;
    tagsDao.queyrTag(params.tag, function(result) {
        tagBlogMappingDao.queryByTagCount(result[0].id, function(result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "评论成功", result));
            response.end();
        })
    })
}
path.set('/queryByTagCount', queryByTagCount);
module.exports.path = path;
