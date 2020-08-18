const dbutil = require("./dbutil");

function insertComment(blogId, parent, username, email, comments, ctime, utime, parentName, success) {
    const insertSql = "insert into comments (`blog_id`, `parent`, `username`, `email`, `comments`, `ctime`, `utime`, `parent_name`) values (?, ?, ?, ?, ?, ?, ?, ?)";
    const params = [blogId, parent, username, email, comments, ctime, utime, parentName];

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
function queryCommentByBlogId(blogId, success) {
    const querySql = "select * from comments where blog_id = ?";
    const params = [blogId];
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


function queryCommentsCountByBlogId(blogId, success) {
    const querySql = "select count(1) as count from comments where blog_id = ?";
    const params = [blogId];

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
function queryNewComments(size, success) {
    const querySql = "select * from comments order by id desc limit ?";
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
    insertComment,
    queryCommentByBlogId,
    queryCommentsCountByBlogId,
    queryNewComments
}
