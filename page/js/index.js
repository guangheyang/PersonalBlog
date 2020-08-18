const everyDay = new Vue({
    el:"#every_day",
    data:{
        content:'世间也有人喜好孤独，但没人能一直忍受住孤独'
    },
    computed:{
        getContent:function () {
            return this.content;
        }
    },
    created:function() {
            axios({
                method:'get',
                url:'/queryEveryDay'
            }).then(function (resp) {
                everyDay.content = resp.data.data[0].content;
            }).catch(function (resp) {
                console.log("请求失败")
            })
        }
});

const articleList = new Vue({
    el:'#article_list',
    data:{
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
        articleList:[]
    },
    computed: {
        getPage() {
            return function(page, pageSize) {
                const params = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
                let tag = '';
                for(let i = 0; i < params.length; i++) {
                    console.log(params[i].split('=')[0] === 'bid')
                    if(params[i].split('=')[0] === 'tag') {
                        try {
                            tag = params[i].split('=')[1]
                        }catch (e) {
                            console.log(e)
                        }
                    }
                }
                if (tag === '') {
                    axios({
                        method: 'get',
                        url: '/queryBlogPage?page=' + (page - 1) + '&pageSize=' + pageSize
                    }).then(res => {
                        console.log(res)
                        const result = res.data.data
                        const list = [];
                        for(let i = 0; i < result.length; i++) {
                            const temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(err => {
                        console.log('请求错误')
                    });
                } else {
                    axios({
                        method: 'get',
                        url: '/queryByTag?page=' + (page - 1) + '&pageSize=' + pageSize + '&tag=' + tag
                    }).then(res => {
                        const result = res.data.data
                        const list = [];
                        for(let i = 0; i < result.length; i++) {
                            const temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(err => {
                        console.log('请求错误')
                    });
                }

                axios({
                    method: 'get',
                    url: '/queryBlogCount'
                }).then(res => {
                    articleList.count = res.data.data[0].count
                    articleList.generatePageTool;
                });

                axios({
                    method: 'get',
                    url: '/queryByTagCount?tag=' + tag
                }).then(res => {
                    console.log(res)

                })
            }
        },
        generatePageTool() {
            const { page: nowPage, pageSize, count: total } = this;
            const result = [];
            result.push({text: '<<', page: 1});
            if (nowPage > 2) {
                result.push({text: nowPage - 2, page: nowPage - 2})
            }
            if (nowPage > 1) {
                result.push({text: nowPage - 1, page: nowPage - 1})
            }
            result.push({text: nowPage, page: nowPage});
            if (nowPage + 1 <= (total + pageSize - 1) / pageSize) {
                result.push({text: nowPage + 1, page: nowPage + 1})
            }
            if (nowPage + 2 <= (total + pageSize - 1) / pageSize) {
                result.push({text: nowPage + 2, page: nowPage + 2})
            }
            result.push({text:'>>',page:parseInt(total + pageSize - 1) / pageSize})
            this.pageNumList = result;
            return result;
        },
        jumpTo() {
            return page => {
                this.getPage(page, this.pageSize)
            }
        }
    },
    created: function() {
        this.getPage(this.page, this.pageSize);
    }
});
