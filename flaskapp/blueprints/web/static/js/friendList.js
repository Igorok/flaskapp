webpackJsonp([6],{352:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var a=r(1),s=n(a),o=r(10),i=r(6);r(14),r(15);var u=r(7),l=r(353),c=n(l),f=r(16),p=n(f),d=r(354),h=n(d),g=r(17),E=(0,g.configureStore)({auth:p.default,friendList:h.default}),v=(0,u.layout)({comp:c.default,forAuth:!0});(0,o.render)(s.default.createElement(i.Provider,{store:E},s.default.createElement(v,null)),document.getElementById("root"))},353:function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),u=r(1),l=function(e){return e&&e.__esModule?e:{default:e}}(u),c=r(6),f=r(20),p=r(22),d=r(7),h=function(e){function t(e){n(this,t);var r=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.state={start:r.props.friendList.start,friends:r.props.friendList.friends},r}return s(t,e),i(t,[{key:"componentWillMount",value:function(){this.changePage(this.props.friendList.start)}},{key:"changePage",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.props.dispatch((0,f.graphql)({type:"FRIEND_LIST",start:e,perpage:this.props.friendList.perpage}))}},{key:"friendRequest",value:function(e){this.props.dispatch((0,f.graphql)({type:"FRIEND_REQUEST",id:e}))}},{key:"friendRemove",value:function(e){this.props.dispatch((0,f.graphql)({type:"FRIEND_REMOVE",id:e}))}},{key:"getUserItems",value:function(){var e=this,t=(0,p.map)(this.props.friendList.users,function(t){return l.default.createElement(UserItemComp,{user:t,friendRequest:e.friendRequest.bind(e),friendRemove:e.friendRemove.bind(e)})});return l.default.createElement("table",{className:"table table-hover"},l.default.createElement("tbody",null,t))}},{key:"render",value:function(){var e=null;"error"==this.props.friendList.status?e={className:"danger",text:this.props.friendList.error}:"send"===this.props.friendList.status&&(e={className:"info",text:"Loading, please wait"});var t={start:this.props.friendList.start,perpage:this.props.friendList.perpage,count:this.props.friendList.count,items:this.getUserItems(),changePage:this.changePage.bind(this)};return l.default.createElement("div",null,l.default.createElement(d.AlertMessage,{opts:e}),l.default.createElement("p",null,"qwe"),"// ",l.default.createElement(d.PaginatorLayout,{param:t}))}}]),t}(l.default.Component),g=function(e){return o({},e)};h=(0,c.connect)(g)(h),t.default=h},354:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},a=(r(22),{start:window.localParams.start?parseInt(window.localParams.start):0,perpage:window.localParams.perpage?parseInt(window.localParams.perpage):9,friends:[],count:0,status:null,error:null}),s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,t=arguments[1],r=n({},e);switch(t.type){case"FRIEND_LIST_SEND":return r.start=t.start,r.status="send",r;case"FRIEND_LIST_SUCCESS":return r.status="success",r.friends=t.data.getUserList.friends,r.count=t.data.getUserList.count,r;case"FRIEND_LIST_ERROR":return r.status="error",r.error=t.error,r;case"FRIEND_REMOVE_SEND":return r.status="send",r;case"FRIEND_REMOVE_SUCCESS":return r.status="success",r;case"FRIEND_REMOVE_ERROR":return r.status="error",r;default:return e}};t.default=s}},[352]);