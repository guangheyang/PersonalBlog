const blogDetail = new Vue({
    el: '#blog_detail',
    data: {
        title: '',
        content: '',
        ctime: '',
        tags: '',
        views: ''
    },
    computed: {

    },
    created: function() {
        const params = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
        if (params === '') return
        let bid = -1;
        for(let i = 0; i < params.length; i++) {
            console.log(params[i].split('=')[0] === 'bid')
            if(params[i].split('=')[0] === 'bid') {
                try {
                    bid = parseInt(params[i].split('=')[1])
                }catch (e) {
                    console.log(e)
                }
            }
        }
        axios({
            method: 'get',
            url: '/queryBlogId?bid=' + bid
        }).then(res => {
            console.log(res)
            const result = res.data.data[0]
            blogDetail.title = result.title
            blogDetail.content = result.content
            blogDetail.tags = result.tags
            blogDetail.ctime = result.ctime
            blogDetail.views = result.views
        }).catch(err => {
            console.log('请求失败');
        })
    }
});
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
                const params = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
                if (params === '') return
                let bid = -1;
                for(let i = 0; i < params.length; i++) {
                    console.log(params[i].split('=')[0] === 'bid')
                    if(params[i].split('=')[0] === 'bid') {
                        try {
                            bid = parseInt(params[i].split('=')[1])
                        }catch (e) {
                            console.log(e)
                        }
                    }
                }
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
        const params = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
        if (params === '') return
        let bid = -1;
        for(let i = 0; i < params.length; i++) {
            if(params[i].split('=')[0] === 'bid') {
                try {
                    bid = parseInt(params[i].split('=')[1])
                }catch (e) {
                    console.log(e)
                }
            }
        }
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
                console.log('over')
                document.getElementById('comment_reply').value = id;
                document.getElementById('parent_name').value = name;
                location.href = '#send_comments';
            }
        }
    }
});
