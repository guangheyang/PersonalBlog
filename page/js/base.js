var randomTags = new Vue({
    el:'#random_tags',
    data:{
        tags:[]
    },
    computed:{
        randomColor:function () {
            return function () {
                var red = Math.floor(Math.random() * 255);
                var green =  Math.floor(Math.random() * 255);
                var blue = Math.floor(Math.random() * 255);
                // return "rgb("+red+","+green+","+blue+")";
                return "rgb("+ red +","+ green +","+ blue +")";
            }
        },
        randomSize:function () {
            return function () {
                var size = Math.floor(Math.random() * 20 + 12) + 'px';
                return size;
            }
        }
    },
    created:function () {
        axios({
            method: 'get',
            url: '/queryRandomTags'
        }).then(res => {
            const result = [];
            for (let i = 0; i < res.data.data.length; i++) {
                result.push({title: res.data.data[i].tag, link: '/?tag=' + res.data.data[i].tag})
            }
            randomTags.tags = result
        })
    }
})

var newHot = new Vue({
    el:"#new_hot",
    data:{
        titleList:[]
    },
    created: function () {
        axios({
            method: 'get',
            url: '/queryHotBlog'
        }).then(res => {
            const result = []
            for(let i = 0; i < res.data.data.length; i++) {
                const temp = {}
                temp.title = res.data.data[i].title
                temp.link = '/blog_detail.html?bid=' + res.data.data[i].id
                result.push(temp)
            }
            newHot.titleList = result
        })
    }
})

var newConmetns = new Vue({
    el:"#new_conments",
    data:{
        commentList:[]
    },
    created: function() {
        axios({
            method: 'get',
            url: '/queryNewComments'
        }).then(res => {
            console.log(res)
            const result = []
            for(let i = 0; i < res.data.data.length; i++) {
                const temp = {}
                temp.name = res.data.data[i].username
                temp.date = res.data.data[i].ctime
                temp.comment = res.data.data[i].comments
                result.push(temp)
            }
            newConmetns.commentList = result
        })
    }
})
