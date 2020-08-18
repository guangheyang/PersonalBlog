const blogDao = require("../dao/blogDao");
const tagsDao = require("../dao/tagDao");
const commentDao = require("../dao/commentDao");
const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/RespUtil");
const url = require("url");

const captcha = require('svg-captcha');

const path = new Map();

function addComment(request, response) {
    const params = url.parse(request.url, true).query;
    commentDao.insertComment(parseInt(params.bid),parseInt(params.parent), params.userName, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(), params.parentName,function(result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", null));
        response.end();
    })
}
path.set('/addComment', addComment);

function queryRandomCode(request, response) {
    const img = captcha.create({fontSize: 50, width: 100, height:34});
    // response.writeHead(200, {"Content-type": 'image/svg+xml'});
    // response.write(img.data);
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "评论成功", img));
    response.end();
}
path.set('/queryRandomCode', queryRandomCode);
function queryCommentByBlogId(request, response) {
    const params = url.parse(request.url, true).query;
    commentDao.queryCommentByBlogId(parseInt(params.bid), function(result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    })
}
path.set('/queryCommentByBlogId', queryCommentByBlogId);

function queryCommentsCountByBlogId(requset, response) {
    const params = url.parse(requset.url, true).query;
    commentDao.queryCommentsCountByBlogId(params.bid,function(result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    })
}
path.set('/queryCommentsCountByBlogId', queryCommentsCountByBlogId);

function queryNewComments(requset, response) {
    commentDao.queryNewComments(5,function(result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    })
}
path.set('/queryNewComments', queryNewComments);
module.exports.path = path;
