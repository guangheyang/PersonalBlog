var dbutil = require("./dbutil");

function insertTagBlogMapping(tagId, blogId, ctime, utime, success) {
    var insertSql = "insert into tag_blog_maping (`tag_id`, `blog_id`, `ctime`, `utime`) values (?, ?, ?, ?)";
    var params = [tagId, blogId, ctime, utime];

    var connection = dbutil.createConnection();
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

function queryByTag(tagId, page, pageSize, success) {
    const insertSql = "select * from tag_blog_maping where tag_id = ? limit ?, ? ;";
    const params = [tagId, page * pageSize, pageSize];

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
function queryByTagCount(tagId, success) {
    const insertSql = 'select count(1) as count from tag_blog_maping where tag_id = ?'
    const params = [tagId];

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

module.exports = {
    insertTagBlogMapping,
    queryByTag,
    queryByTagCount
}
