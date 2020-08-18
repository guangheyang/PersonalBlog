const sendComment = new Vue({
    el: '#send_comments',
    data: {
        vcode: '',
        rightCode: ''
    },
    computed: {
        changeCode() {
            return function(){
                axios({
                    method: 'get',
                    url: '/queryRandomCode'
                }).then(res => {
                    sendComment.vcode = res.data.data.data;
                    sendComment.rightCode = res.data.data.text;
                })
            }
        },
        sendComment() {
            return function () {
                const code = document.getElementById('comment_code').value;
                if (code !== sendComment.rightCode) {
                    alert("验证码不正确");
                    this.changeCode();
                    return;
                }
                const bid = -10;
                const reply = document.getElementById('comment_reply').value;
                const parentName = document.getElementById('parent_name').value;
                const name = document.getElementById('comment_name').value;
                const email = document.getElementById('comment_email').value;
                const content = document.getElementById('comment_content').value;
                axios({
                    method: 'post',
                    url: '/addComment?bid=' + bid + '&parent=' + reply + '&userName=' + name + '&email=' + email + '&content=' + content + '&parentName=' + parentName
                }).then(res => {
                    console.log(res)
                    alert(res.data.msg);
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    },
    created: function() {
        this.changeCode()
    }
});
const blogComments = new Vue({
    el: '#blog_comments',
    data: {
        count: 0,
        comments: []
    },
    created: function () {
        const bid = -10;
        axios({
            method: 'get',
            url: '/queryCommentByBlogId?bid=' + bid
        }).then(res => {
            blogComments.comments = res.data.data
            for (let i = 0; i < blogComments.comments.length; i++) {
                if (blogComments.comments[i].parent > -1) {
                    blogComments.comments[i].options = '回复@' + blogComments.comments[i].parent_name
                }
            }
        });
        axios({
            method: 'get',
            url: '/queryCommentsCountByBlogId?bid=' + bid
        }).then(res => {
            blogComments.count = res.data.data[0].count
        })
    },
    computed: {
        reply() {
            return function(id, name) {
                document.getElementById('comment_reply').value = id;
                document.getElementById('parent_name').value = name;
                location.href = '#send_comments';
            }
        }
    }
});
