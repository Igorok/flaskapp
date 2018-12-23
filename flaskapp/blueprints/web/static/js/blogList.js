webpackJsonp([8],{352:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var n=r(1),o=a(n),l=r(10),s=r(7);r(16),r(17);var u=r(8),i=r(353),c=a(i),p=r(18),f=a(p),d=r(354),g=a(d),m=r(19),h=(0,m.configureStore)({auth:f.default,blogList:g.default}),b=(0,u.layout)({comp:c.default,forAuth:!0});(0,l.render)(o.default.createElement(s.Provider,{store:h},o.default.createElement(b,null)),document.getElementById("root"))},353:function(e,t,r){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},s=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),u=r(1),i=function(e){return e&&e.__esModule?e:{default:e}}(u),c=r(7),p=r(21),f=r(26),d=r(8),g=function(e){function t(e){a(this,t);var r=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.state={start:r.props.blogList.start,blogs:r.props.blogList.blogs},r}return o(t,e),s(t,[{key:"componentWillMount",value:function(){this.props.dispatch((0,p.graphql)({type:"BLOG_LIST",start:this.props.blogList.start,perpage:this.props.blogList.perpage}))}},{key:"changePage",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.props.dispatch((0,p.graphql)({type:"BLOG_LIST",start:e,perpage:this.props.blogList.perpage}))}},{key:"getBlogItems",value:function(){var e=(0,f.chunk)(this.props.blogList.blogs,3);return(0,f.map)(e,function(e){var t=(0,f.map)(e,function(e){return i.default.createElement("div",{className:"col-md-4"},i.default.createElement("div",{className:"panel panel-default"},i.default.createElement("div",{className:"panel-heading"},i.default.createElement("h4",{className:"panel-title"},i.default.createElement("a",{href:"/blog/"+e.id},e.title))),i.default.createElement("div",{className:"panel-body"},e.text),i.default.createElement("div",{className:"panel-footer"},i.default.createElement("p",null,i.default.createElement("span",{className:"glyphicon glyphicon-user"})," ",e.userName),i.default.createElement("p",null,i.default.createElement("span",{className:"glyphicon glyphicon-time"})," ",e.date))))});return i.default.createElement("div",{className:"row"},t)})}},{key:"render",value:function(){var e=null;"error"==this.props.blogList.status?e={className:"danger",text:this.props.blogList.error}:"send"===this.props.blogList.status&&(e={className:"info",text:"Loading, please wait"});var t={start:this.props.blogList.start,perpage:this.props.blogList.perpage,count:this.props.blogList.count,items:this.getBlogItems(),changePage:this.changePage.bind(this)};return i.default.createElement("div",null,i.default.createElement(d.AlertMessage,{opts:e}),i.default.createElement(d.PaginatorLayout,{param:t}))}}]),t}(i.default.Component),m=function(e){return l({},e)};g=(0,c.connect)(m)(g),t.default=g},354:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},n={userId:window.localParams.userId?parseInt(window.localParams.userId):null,start:window.localParams.start?parseInt(window.localParams.start):0,perpage:window.localParams.perpage?parseInt(window.localParams.perpage):9,blogs:[],count:0,status:null,error:null},o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n,t=arguments[1],r=a({},e);switch(t.type){case"BLOG_LIST_SEND":return r.start=t.start,r.status="send",r;case"BLOG_LIST_SUCCESS":return r.status="success",r.blogs=t.data.getBlogList.blogs,r.count=t.data.getBlogList.count,r;case"BLOG_LIST_ERROR":return r.status="error",r.error=t.error,r;default:return e}};t.default=o}},[352]);