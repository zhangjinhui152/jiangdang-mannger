import {createStore} from 'vuex'

export default createStore({
    state: {
        tagsList: [],
        collapse: false,
        baseUrl:"http://127.0.0.1:8081/zhdj-boot",
        bookUrl:"/manage/insert/book",
        vrUrl:"/manage/insert/vrList",
        newsUrl:"/manage/insert/dynamic", 
        userUrl:"/manage/insert/user", 
        selectNewUrl:"/manage/select/AllNews", 
        selectuserUrl:"/manage/select/Alluser", 
        selectHeartUrl:"/manage/select/AllHeart", 
        selectFeedBackUrl:"/manage/select/AllFeedBack", 
        
        selectbookUrl:"/manage/select/book", 
        selectVrUrl:"/manage/select/vr", 
        selecBankkUrl:"/manage/select/bank", 
        selectMettingUrl:"/manage/select/meeting", 
        selecMessageUrl:"/manage/select/message", 

        updateUserUrl:"/manage/update/user", 
        updatebookUrl:"/manage/update/book", 
        updatevrUrl:"/manage/update/vr", 
        updatemettingUrl:"/manage/update/metting", 
        updateexamUrl:"/manage/update/exam", 


        delUserUrl:"/manage/delete/user", 
        delNewUrl:"/manage/delete/news", 
        delFeedbackUrl:"/manage/delete/feedback", 
        delheartUrl:"/manage/delete/heart", 

        delbooktUrl:"/manage/delete/book", 
        delVrUrl:"/manage/delete/vr", 
        delMettingUrl:"/manage/delete/metting", 
        delBankUrl:"/manage/delete/bank", 

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