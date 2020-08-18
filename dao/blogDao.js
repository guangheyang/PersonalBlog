const dbutil = require("./dbutil");

function insertBlog(title, content, tags, views, ctime, utime, success) {
    const insertSql = "insert into blog (`title`, `content`, `tags`, `views`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?)";
    const params = [title, content, tags, views, ctime, utime];

    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queryBlogPage(page, pageSize, success) {
    var querySql = "select * from blog order by id desc limit ?, ?";
    var params = [page * pageSize, pageSize];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queryBlogCount(success) {
    var querySql = "select count(1) as count from blog";
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queryBlogId(id, success) {
    const querySql = "select * from blog where id = ?";
    const params = [id];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queryAllBlog(success) {
    const querySql = "select * from blog order by id desc";
    const params = [];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}
function addViews(id, success) {
    const querySql = "update blog set views = views + 1 where id = ?";
    const params = [id];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}
function queryHotBlog(size, success) {
    const querySql = "select * from blog order by views desc limit ?";
    const params = [size];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}
module.exports = {
    insertBlog,
    queryBlogPage,
    queryBlogCount,
    queryBlogId,
    queryAllBlog,
    addViews,
    queryHotBlog
};
