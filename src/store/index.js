import {createStore} from 'vuex'

export default createStore({
    state: {
        tagsList: [],
        collapse: false,
        baseUrl:"http://127.0.0.1:4523/mock/985489",
        bookUrl:"/manage/insert/book",
        vrUrl:"/manage/insert/vrList",
        newsUrl:"/manage/insert/dynamic", 
        updateUserUrl:"/manage/update/user", 
        delUserUrl:"/manage/delete/user", 
        userUrl:"/manage/insert/user", 
        delNewUrl:"/manage/delete/news", 
        delFeedbackUrl:"/manage/delete/feedback", 
        selectNewUrl:"/manage/select/AllNews", 
        selectuserUrl:"/manage/select/Alluser", 
        selectFeedBackUrl:"/manage/select/AllFeedBack", 
    },
    mutations: {
        delTagsItem(state, data) {
            state
                .tagsList
                .splice(data.index, 1);
        },
        setTagsItem(state, data) {
            state
                .tagsList
                .push(data)
        },
        clearTags(state) {
            state.tagsList = []
        },
        closeTagsOther(state, data) {
            state.tagsList = data;
        },
        closeCurrentTag(state, data) {
            for (let i = 0, len = state.tagsList.length; i < len; i++) {
                const item = state.tagsList[i];
                if (item.path === data.$route.fullPath) {
                    if (i < len - 1) {
                        data
                            .$router
                            .push(state.tagsList[i + 1].path);
                    } else if (i > 0) {
                        data
                            .$router
                            .push(state.tagsList[i - 1].path);
                    } else {
                        data
                            .$router
                            .push("/");
                    }
                    state
                        .tagsList
                        .splice(i, 1);
                    break;
                }
            }
        },
        // 侧边栏折叠
        hadndleCollapse(state, data) {
            state.collapse = data;
        }
    },
    actions: {},
    modules: {}
})