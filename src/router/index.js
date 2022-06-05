import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: "/",
        redirect: "/dashboard",
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: "系统首页",
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */
                        "../views/Dashboard.vue"
                    ),
            },
            {
                path: "/table",
                name: "basetable",
                meta: {
                    title: "用户表格",
                },
                component: () =>
                    import(
                        /* webpackChunkName: "table" */
                        "../views/BaseTableV2.vue"
                    ),
            },
            {
                path: "/table2",
                name: "basetable2",
                meta: {
                    title: "新闻表格",
                },
                component: () =>
                    import(
                        /* webpackChunkName: "table" */
                        "../views/BaseTableV3.vue"
                    ),
            },
            {
                path: "/table3",
                name: "basetable3",
                meta: {
                    title: "反馈表格",
                },
                component: () =>
                    import(
                        /* webpackChunkName: "table" */
                        "../views/BaseTableV4.vue"
                    ),
            },
            {
                path: "/table4",
                name: "basetable4",
                meta: {
                    title: "心声表格",
                },
                component: () =>
                    import(
                        /* webpackChunkName: "table" */
                        "../views/BaseTableV5.vue"
                    ),
            },
            {
                path: "/table5",
                name: "basetable5",
                meta: {
                    title: "图书表格",
                },
                component: () =>
                    import(
                        /* webpackChunkName: "table" */
                        "../views/BaseTableV6.vue"
                    ),
            },
            {
                path: "/table6",
                name: "basetable6",
                meta: {
                    title: "vr表格",
                },
                component: () =>
                    import(
                        /* webpackChunkName: "table" */
                        "../views/BaseTableV7.vue"
                    ),
            },
            {
                path: "/table7",
                name: "basetable7",
                meta: {
                    title: "题库表格",
                },
                component: () =>
                    import(
                        /* webpackChunkName: "table" */
                        "../views/BaseTableV8.vue"
                    ),
            },
            {
                path: "/table8",
                name: "basetable8",
                meta: {
                    title: "会议表格",
                },
                component: () =>
                    import(
                        /* webpackChunkName: "table" */
                        "../views/BaseTableV9.vue"
                    ),
            },
            {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: "图表",
                },
                component: () =>
                    import(
                        /* webpackChunkName: "charts" */
                        "../views/BaseCharts.vue"
                    ),
            },
            {
                path: "/form",
                name: "baseform",
                meta: {
                    title: "表单",
                },
                component: () =>
                    import(
                        /* webpackChunkName: "form" */
                        "../views/BaseForm.vue"
                    ),
            },
            {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: "tab标签",
                },
                component: () =>
                    import(
                        /* webpackChunkName: "tabs" */
                        "../views/Tabs.vue"
                    ),
            },
            
            {
                path: "/permission",
                name: "permission",
                meta: {
                    title: "权限管理",
                    permission: true,
                },
                component: () =>
                    import(
                        /* webpackChunkName: "permission" */
                        "../views/Permission.vue"
                    ),
            },
            {
                path: "/upload",
                name: "upload",
                meta: {
                    title: "批量上传",
                },
                component: () =>
                    import(
                        /* webpackChunkName: "upload" */
                        "../views/Upload.vue"
                    ),
            },
            {
                path: "/icon",
                name: "icon",
                meta: {
                    title: "自定义图标",
                },
                component: () =>
                    import(
                        /* webpackChunkName: "icon" */
                        "../views/Icon.vue"
                    ),
            },
            {
                path: "/404",
                name: "404",
                meta: {
                    title: "找不到页面",
                },
                component: () =>
                    import(/* webpackChunkName: "404" */ "../views/404.vue"),
            },
            {
                path: "/403",
                name: "403",
                meta: {
                    title: "没有权限",
                },
                component: () =>
                    import(/* webpackChunkName: "403" */ "../views/403.vue"),
            },
        ],
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            title: "登录",
        },
        component: () =>
            import(
                /* webpackChunkName: "login" */
                "../views/Login.vue"
            ),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 监察中心`;
    const role = localStorage.getItem("ms_username");
    if (!role && to.path !== "/login") {
        next("/login");
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === "admin" ? next() : next("/403");
    } else {
        next();
    }
});

export default router;
