"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vueRouter = require("vue-router");

var _Home = _interopRequireDefault(require("../views/Home.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var routes = [{
  path: "/",
  redirect: "/dashboard"
}, {
  path: "/",
  name: "Home",
  component: _Home["default"],
  children: [{
    path: "/dashboard",
    name: "dashboard",
    meta: {
      title: "系统首页"
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/Dashboard.vue"));
      });
    }
  }, {
    path: "/table",
    name: "basetable",
    meta: {
      title: "用户表格"
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/BaseTableV2.vue"));
      });
    }
  }, {
    path: "/table2",
    name: "basetable2",
    meta: {
      title: "新闻表格"
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/BaseTableV3.vue"));
      });
    }
  }, {
    path: "/table3",
    name: "basetable3",
    meta: {
      title: "新闻表格"
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/BaseTableV4.vue"));
      });
    }
  }, {
    path: "/table4",
    name: "basetable4",
    meta: {
      title: "心声表格"
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/BaseTableV5.vue"));
      });
    }
  }, {
    path: "/charts",
    name: "basecharts",
    meta: {
      title: "图表"
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/BaseCharts.vue"));
      });
    }
  }, {
    path: "/form",
    name: "baseform",
    meta: {
      title: "表单"
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/BaseForm.vue"));
      });
    }
  }, {
    path: "/tabs",
    name: "tabs",
    meta: {
      title: "tab标签"
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/Tabs.vue"));
      });
    }
  }, {
    path: "/permission",
    name: "permission",
    meta: {
      title: "权限管理",
      permission: true
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/Permission.vue"));
      });
    }
  }, {
    path: "/upload",
    name: "upload",
    meta: {
      title: "批量上传"
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/Upload.vue"));
      });
    }
  }, {
    path: "/icon",
    name: "icon",
    meta: {
      title: "自定义图标"
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/Icon.vue"));
      });
    }
  }, {
    path: "/404",
    name: "404",
    meta: {
      title: "找不到页面"
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/404.vue"));
      });
    }
  }, {
    path: "/403",
    name: "403",
    meta: {
      title: "没有权限"
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/403.vue"));
      });
    }
  }]
}, {
  path: "/login",
  name: "Login",
  meta: {
    title: "登录"
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/Login.vue"));
    });
  }
}];
var router = (0, _vueRouter.createRouter)({
  history: (0, _vueRouter.createWebHistory)(process.env.BASE_URL),
  routes: routes
});
router.beforeEach(function (to, from, next) {
  document.title = "".concat(to.meta.title, " | \u76D1\u5BDF\u4E2D\u5FC3");
  var role = localStorage.getItem("ms_username");

  if (!role && to.path !== "/login") {
    next("/login");
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === "admin" ? next() : next("/403");
  } else {
    next();
  }
});
var _default = router;
exports["default"] = _default;