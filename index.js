var express = require('express');
var globarConfig = require('./config');
var loader = require("./loader");

var app = new express;

app.use(express.static("./page/"));

app.post("/editEveryDay",loader.get('/editEveryDay'));
app.get('/queryEveryDay',loader.get("/queryEveryDay"));

app.post("/editBlog",loader.get("/editBlog"));
app.get('/queryBlogPage', loader.get('/queryBlogPage'));
app.get('/queryBlogCount', loader.get('/queryBlogCount'));
app.get('/queryBlogId', loader.get('/queryBlogId'));
app.post('/addComment', loader.get('/addComment'));
app.get('/queryRandomCode', loader.get('/queryRandomCode'));
app.get('/queryCommentByBlogId', loader.get('/queryCommentByBlogId'));
app.get('/queryCommentsCountByBlogId', loader.get('/queryCommentsCountByBlogId'));
app.get('/queryAllBlog', loader.get('/queryAllBlog'));
app.get('/queryRandomTags', loader.get('/queryRandomTags'));
app.get('/queryHotBlog', loader.get('/queryHotBlog'));
app.get('/queryNewComments', loader.get('/queryNewComments'));
app.get('/queryByTag', loader.get('/queryByTag'));
app.get('/queryByTagCount', loader.get('/queryByTagCount'));
app.listen(globarConfig.port,function () {
    console.log("服务器已启动");
})
