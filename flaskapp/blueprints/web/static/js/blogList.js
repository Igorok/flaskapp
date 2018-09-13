webpackJsonp([3],{318:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var n=r(6),o=a(n),s=r(16),l=r(11);r(27),r(28);var u=r(14),i=r(319),c=a(i),p=r(29),f=a(p),d=r(320),g=a(d),h=r(30),m=(0,h.configureStore)({auth:f.default,blogList:g.default}),b=(0,u.layout)({comp:c.default,forAuth:!0});(0,s.render)(o.default.createElement(l.Provider,{store:m},o.default.createElement(b,null)),document.getElementById("root"))},319:function(e,t,r){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},l=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),u=r(6),i=function(e){return e&&e.__esModule?e:{default:e}}(u),c=r(11),p=r(39),f=r(144),d=r(14),g=function(e){function t(e){a(this,t);var r=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.state={start:r.props.blogList.start,blogs:r.props.blogList.blogs},r}return o(t,e),l(t,[{key:"componentWillMount",value:function(){this.props.dispatch((0,p.graphql)({type:"BLOG_LIST",start:this.props.blogList.start,perpage:this.props.blogList.perpage}))}},{key:"changePage",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.props.dispatch((0,p.graphql)({type:"BLOG_LIST",start:e,perpage:this.props.blogList.perpage}))}},{key:"getBlogItems",value:function(){var e=(0,f.chunk)(this.props.blogList.blogs,3);return(0,f.map)(e,function(e){var t=(0,f.map)(e,function(e){return i.default.createElement("div",{className:"col-md-4"},i.default.createElement("div",{className:"panel panel-default"},i.default.createElement("div",{className:"panel-heading"},i.default.createElement("h4",{className:"panel-title"},i.default.createElement("a",{href:"/blog-detail/"+e.id},e.title))),i.default.createElement("div",{className:"panel-body"},i.default.createElement("div",{dangerouslySetInnerHTML:{__html:e.text}}),i.default.createElement("p",null,e.userName," ",e.date))))});return i.default.createElement("div",{className:"row"},t)})}},{key:"render",value:function(){var e=null;console.log("this.props",this.props),"error"==this.props.blogList.status?e={className:"danger",text:this.props.blogList.error}:"send"===this.props.blogList.status&&(e={className:"info",text:"Loading, please wait"});var t={start:this.props.blogList.start,perpage:this.props.blogList.perpage,count:this.props.blogList.count,items:this.getBlogItems(),changePage:this.changePage.bind(this)};return console.log("alertOpts",e),i.default.createElement("div",null,i.default.createElement(d.AlertMessage,{opts:e}),i.default.createElement(d.PaginatorLayout,{param:t}))}}]),t}(i.default.Component),h=function(e){return s({},e)};g=(0,c.connect)(h)(g),t.default=g},320:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},n={userId:window.localParams.userId?parseInt(window.localParams.userId):null,start:window.localParams.start?parseInt(window.localParams.start):0,perpage:window.localParams.perpage?parseInt(window.localParams.perpage):9,blogs:[],count:0,status:null,error:null},o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n,t=arguments[1],r=a({},e);switch(t.type){case"BLOG_LIST_SEND":return r.start=t.start,r.status="send",r;case"BLOG_LIST_SUCCESS":return r.status="success",r.blogs=t.data.getBlogList.blogs,r.count=t.data.getBlogList.count,r;case"BLOG_LIST_ERROR":return r.status="error",r.error=t.error,r;default:return e}};t.default=o}},[318]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vYmxvZ0xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljX3NyYy9ibG9nTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWNfc3JjL2Jsb2cvTGlzdENvbXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljX3NyYy9ibG9nL0xpc3RSZWQuanMiXSwibmFtZXMiOlsid2VicGFja0pzb25wIiwiMzE4IiwibW9kdWxlIiwiZXhwb3J0cyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJfcmVhY3QiLCJfcmVhY3QyIiwiX3JlYWN0RG9tIiwiX3JlYWN0UmVkdXgiLCJfY29tcG9uZW50IiwiX0xpc3RDb21wIiwiX0xpc3RDb21wMiIsIl9Mb2dpblJlZCIsIl9Mb2dpblJlZDIiLCJfTGlzdFJlZCIsIl9MaXN0UmVkMiIsIl9jb25maWd1cmVTdG9yZSIsInN0b3JlIiwiY29uZmlndXJlU3RvcmUiLCJhdXRoIiwiYmxvZ0xpc3QiLCJDb21wIiwibGF5b3V0IiwiY29tcCIsIkxpc3RDb21wIiwiZm9yQXV0aCIsInJlbmRlciIsImNyZWF0ZUVsZW1lbnQiLCJQcm92aWRlciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCIzMTkiLCJfY2xhc3NDYWxsQ2hlY2siLCJpbnN0YW5jZSIsIkNvbnN0cnVjdG9yIiwiVHlwZUVycm9yIiwiX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4iLCJzZWxmIiwiY2FsbCIsIlJlZmVyZW5jZUVycm9yIiwiX2luaGVyaXRzIiwic3ViQ2xhc3MiLCJzdXBlckNsYXNzIiwicHJvdG90eXBlIiwiT2JqZWN0IiwiY3JlYXRlIiwiY29uc3RydWN0b3IiLCJ2YWx1ZSIsImVudW1lcmFibGUiLCJ3cml0YWJsZSIsImNvbmZpZ3VyYWJsZSIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiZGVmaW5lUHJvcGVydHkiLCJfZXh0ZW5kcyIsImFzc2lnbiIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIl9jcmVhdGVDbGFzcyIsImRlZmluZVByb3BlcnRpZXMiLCJwcm9wcyIsImRlc2NyaXB0b3IiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJfYWN0aW9uIiwiX2xvZGFzaCIsIkJsb2dMaXN0Q29tcCIsIl9SZWFjdCRDb21wb25lbnQiLCJ0aGlzIiwiX3RoaXMiLCJnZXRQcm90b3R5cGVPZiIsInN0YXRlIiwic3RhcnQiLCJibG9ncyIsImRpc3BhdGNoIiwiZ3JhcGhxbCIsInR5cGUiLCJwZXJwYWdlIiwidW5kZWZpbmVkIiwiY2h1bmtlZEl0ZW1zIiwiY2h1bmsiLCJtYXAiLCJwYXJ0aXRpb24iLCJibG9nIiwiY2xhc3NOYW1lIiwiaHJlZiIsImlkIiwidGl0bGUiLCJkYW5nZXJvdXNseVNldElubmVySFRNTCIsIl9faHRtbCIsInRleHQiLCJ1c2VyTmFtZSIsImRhdGUiLCJhbGVydE9wdHMiLCJjb25zb2xlIiwibG9nIiwic3RhdHVzIiwiZXJyb3IiLCJwYWdlclBhcmFtIiwiY291bnQiLCJpdGVtcyIsImdldEJsb2dJdGVtcyIsImNoYW5nZVBhZ2UiLCJiaW5kIiwiQWxlcnRNZXNzYWdlIiwib3B0cyIsIlBhZ2luYXRvckxheW91dCIsInBhcmFtIiwiUmVhY3QiLCJDb21wb25lbnQiLCJtYXBTdGF0ZVRvUHJvcHMiLCJjb25uZWN0IiwiMzIwIiwiaW5pdFN0YXRlIiwidXNlcklkIiwid2luZG93IiwibG9jYWxQYXJhbXMiLCJwYXJzZUludCIsImFjdGlvbiIsImRhdGEiLCJnZXRCbG9nTGlzdCJdLCJtYXBwaW5ncyI6IkFBQUFBLGNBQWMsSUFFUkMsSUFDQSxTQUFVQyxFQUFRQyxFQUFTQyxHQUVqQyxZQStCQSxTQUFTQyxHQUF1QkMsR0FBTyxNQUFPQSxJQUFPQSxFQUFJQyxXQUFhRCxHQUFRRSxRQUFTRixHQ3BDdkYsR0FBQUcsR0FBQUwsRUFBQSxH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R0FBSSxFQUFHQSxFQUFJQyxVQUFVQyxPQUFRRixJQUFLLENBQUUsR0FBSUcsR0FBU0YsVUFBVUQsRUFBSSxLQUFLLEdBQUlJLEtBQU9ELEdBQWNoQixPQUFPRCxVQUFVbUIsZUFBZXhCLEtBQUtzQixFQUFRQyxLQUFRTCxFQUFPSyxHQUFPRCxFQUFPQyxJQUFZLE1BQU9MLElHdk9uUDhELEdBQ0FDLE9BQVFDLE9BQU9DLFlBQVlGLE9BQVNHLFNBQVNGLE9BQU9DLFlBQVlGLFFBQVUsS0FDMUUxQyxNQUFPMkMsT0FBT0MsWUFBWTVDLE1BQVE2QyxTQUFTRixPQUFPQyxZQUFZNUMsT0FBUyxFQUN2RUssUUFBU3NDLE9BQU9DLFlBQVl2QyxRQUFVd0MsU0FBU0YsT0FBT0MsWUFBWXZDLFNBQVcsRUFDN0VKLFNBQ0EwQixNQUFPLEVBQ1BILE9BQVEsS0FDUkMsTUFBTyxNQUVMbEYsRUFBVyxXQUErQixHQUE5QndELEdBQThCbEIsVUFBQUMsT0FBQSxPQUFBd0IsS0FBQXpCLFVBQUEsR0FBQUEsVUFBQSxHQUF0QjRELEVBQVdLLEVBQVdqRSxVQUFBLEdBQ3hDa0UsT0FBV2hELEVBQ2YsUUFBUStDLEVBQU8xQyxNQUNYLElBQUssaUJBR0QsTUFGQTJDLEdBQUsvQyxNQUFROEMsRUFBTzlDLE1BQ3BCK0MsRUFBS3ZCLE9BQVMsT0FDUHVCLENBQ1gsS0FBSyxvQkFJRCxNQUhBQSxHQUFLdkIsT0FBUyxVQUNkdUIsRUFBSzlDLE1BQVE2QyxFQUFPQyxLQUFLQyxZQUFZL0MsTUFDckM4QyxFQUFLcEIsTUFBUW1CLEVBQU9DLEtBQUtDLFlBQVlyQixNQUM5Qm9CLENBQ1gsS0FBSyxrQkFHRCxNQUZBQSxHQUFLdkIsT0FBUyxRQUNkdUIsRUFBS3RCLE1BQVFxQixFQUFPckIsTUFDYnNCLENBQ1gsU0FDSSxNQUFPaEQsSUhnUG5CN0UsR0FBUUssUUc1T09nQixLSGdQWiIsImZpbGUiOiJibG9nTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIndlYnBhY2tKc29ucChbM10se1xuXG4vKioqLyAzMTg6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBfcmVhY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdERvbSA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpO1xuXG52YXIgX3JlYWN0UmVkdXggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXygyNyk7XG5cbl9fd2VicGFja19yZXF1aXJlX18oMjgpO1xuXG52YXIgX2NvbXBvbmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpO1xuXG52YXIgX0xpc3RDb21wID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMTkpO1xuXG52YXIgX0xpc3RDb21wMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0xpc3RDb21wKTtcblxudmFyIF9Mb2dpblJlZCA9IF9fd2VicGFja19yZXF1aXJlX18oMjkpO1xuXG52YXIgX0xvZ2luUmVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0xvZ2luUmVkKTtcblxudmFyIF9MaXN0UmVkID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMjApO1xuXG52YXIgX0xpc3RSZWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTGlzdFJlZCk7XG5cbnZhciBfY29uZmlndXJlU3RvcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMwKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHN0b3JlID0gKDAsIF9jb25maWd1cmVTdG9yZS5jb25maWd1cmVTdG9yZSkoe1xuXHRhdXRoOiBfTG9naW5SZWQyLmRlZmF1bHQsXG5cdGJsb2dMaXN0OiBfTGlzdFJlZDIuZGVmYXVsdFxufSk7XG5cbnZhciBDb21wID0gKDAsIF9jb21wb25lbnQubGF5b3V0KSh7IGNvbXA6IF9MaXN0Q29tcDIuZGVmYXVsdCwgZm9yQXV0aDogdHJ1ZSB9KTtcbigwLCBfcmVhY3REb20ucmVuZGVyKShfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcblx0X3JlYWN0UmVkdXguUHJvdmlkZXIsXG5cdHsgc3RvcmU6IHN0b3JlIH0sXG5cdF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KENvbXAsIG51bGwpXG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcblxuLyoqKi8gfSksXG5cbi8qKiovIDMxOTpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RSZWR1eCA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpO1xuXG52YXIgX2FjdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oMzkpO1xuXG52YXIgX2xvZGFzaCA9IF9fd2VicGFja19yZXF1aXJlX18oMTQ0KTtcblxudmFyIF9jb21wb25lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgQmxvZ0xpc3RDb21wID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoQmxvZ0xpc3RDb21wLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIEJsb2dMaXN0Q29tcChwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQmxvZ0xpc3RDb21wKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQmxvZ0xpc3RDb21wLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQmxvZ0xpc3RDb21wKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc3RhcnQ6IF90aGlzLnByb3BzLmJsb2dMaXN0LnN0YXJ0LFxuICAgICAgICAgICAgYmxvZ3M6IF90aGlzLnByb3BzLmJsb2dMaXN0LmJsb2dzXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoQmxvZ0xpc3RDb21wLCBbe1xuICAgICAgICBrZXk6ICdjb21wb25lbnRXaWxsTW91bnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCgoMCwgX2FjdGlvbi5ncmFwaHFsKSh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ0JMT0dfTElTVCcsXG4gICAgICAgICAgICAgICAgc3RhcnQ6IHRoaXMucHJvcHMuYmxvZ0xpc3Quc3RhcnQsXG4gICAgICAgICAgICAgICAgcGVycGFnZTogdGhpcy5wcm9wcy5ibG9nTGlzdC5wZXJwYWdlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NoYW5nZVBhZ2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY2hhbmdlUGFnZSgpIHtcbiAgICAgICAgICAgIHZhciBzdGFydCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogMDtcblxuICAgICAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCgoMCwgX2FjdGlvbi5ncmFwaHFsKSh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ0JMT0dfTElTVCcsXG4gICAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgICAgIHBlcnBhZ2U6IHRoaXMucHJvcHMuYmxvZ0xpc3QucGVycGFnZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRCbG9nSXRlbXMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QmxvZ0l0ZW1zKCkge1xuICAgICAgICAgICAgdmFyIGNodW5rZWRJdGVtcyA9ICgwLCBfbG9kYXNoLmNodW5rKSh0aGlzLnByb3BzLmJsb2dMaXN0LmJsb2dzLCAzKTtcbiAgICAgICAgICAgIHZhciBibG9ncyA9ICgwLCBfbG9kYXNoLm1hcCkoY2h1bmtlZEl0ZW1zLCBmdW5jdGlvbiAoYmxvZ3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFydGl0aW9uID0gKDAsIF9sb2Rhc2gubWFwKShibG9ncywgZnVuY3Rpb24gKGJsb2cpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2NvbC1tZC00JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdwYW5lbCBwYW5lbC1kZWZhdWx0JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdwYW5lbC1oZWFkaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdoNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ3BhbmVsLXRpdGxlJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaHJlZjogXCIvYmxvZy1kZXRhaWwvXCIgKyBibG9nLmlkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvZy50aXRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAncGFuZWwtYm9keScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IHsgX19odG1sOiBibG9nLnRleHQgfSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvZy51c2VyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcXHhBMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9nLmRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAncm93JyB9LFxuICAgICAgICAgICAgICAgICAgICBwYXJ0aXRpb25cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBibG9ncztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHZhciBhbGVydE9wdHMgPSBudWxsLFxuICAgICAgICAgICAgICAgIGJsb2dzID0gbnVsbDtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoaXMucHJvcHMnLCB0aGlzLnByb3BzKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYmxvZ0xpc3Quc3RhdHVzID09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgICBhbGVydE9wdHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2RhbmdlcicsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMucHJvcHMuYmxvZ0xpc3QuZXJyb3JcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmJsb2dMaXN0LnN0YXR1cyA9PT0gJ3NlbmQnKSB7XG4gICAgICAgICAgICAgICAgYWxlcnRPcHRzID0ge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdpbmZvJyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0xvYWRpbmcsIHBsZWFzZSB3YWl0J1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBwYWdlclBhcmFtID0ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB0aGlzLnByb3BzLmJsb2dMaXN0LnN0YXJ0LFxuICAgICAgICAgICAgICAgIHBlcnBhZ2U6IHRoaXMucHJvcHMuYmxvZ0xpc3QucGVycGFnZSxcbiAgICAgICAgICAgICAgICBjb3VudDogdGhpcy5wcm9wcy5ibG9nTGlzdC5jb3VudCxcbiAgICAgICAgICAgICAgICBpdGVtczogdGhpcy5nZXRCbG9nSXRlbXMoKSxcbiAgICAgICAgICAgICAgICBjaGFuZ2VQYWdlOiB0aGlzLmNoYW5nZVBhZ2UuYmluZCh0aGlzKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FsZXJ0T3B0cycsIGFsZXJ0T3B0cyk7XG4gICAgICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfY29tcG9uZW50LkFsZXJ0TWVzc2FnZSwgeyBvcHRzOiBhbGVydE9wdHMgfSksXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudC5QYWdpbmF0b3JMYXlvdXQsIHsgcGFyYW06IHBhZ2VyUGFyYW0gfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQmxvZ0xpc3RDb21wO1xufShfcmVhY3QyLmRlZmF1bHQuQ29tcG9uZW50KTtcblxudmFyIG1hcFN0YXRlVG9Qcm9wcyA9IGZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSkge1xuICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RhdGUpO1xufTtcbkJsb2dMaXN0Q29tcCA9ICgwLCBfcmVhY3RSZWR1eC5jb25uZWN0KShtYXBTdGF0ZVRvUHJvcHMpKEJsb2dMaXN0Q29tcCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEJsb2dMaXN0Q29tcDtcblxuLyoqKi8gfSksXG5cbi8qKiovIDMyMDpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgaW5pdFN0YXRlID0ge1xuICAgIHVzZXJJZDogd2luZG93LmxvY2FsUGFyYW1zLnVzZXJJZCA/IHBhcnNlSW50KHdpbmRvdy5sb2NhbFBhcmFtcy51c2VySWQpIDogbnVsbCxcbiAgICBzdGFydDogd2luZG93LmxvY2FsUGFyYW1zLnN0YXJ0ID8gcGFyc2VJbnQod2luZG93LmxvY2FsUGFyYW1zLnN0YXJ0KSA6IDAsXG4gICAgcGVycGFnZTogd2luZG93LmxvY2FsUGFyYW1zLnBlcnBhZ2UgPyBwYXJzZUludCh3aW5kb3cubG9jYWxQYXJhbXMucGVycGFnZSkgOiA5LFxuICAgIGJsb2dzOiBbXSxcbiAgICBjb3VudDogMCxcbiAgICBzdGF0dXM6IG51bGwsXG4gICAgZXJyb3I6IG51bGxcbn07XG52YXIgYmxvZ0xpc3QgPSBmdW5jdGlvbiBibG9nTGlzdCgpIHtcbiAgICB2YXIgc3RhdGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGluaXRTdGF0ZTtcbiAgICB2YXIgYWN0aW9uID0gYXJndW1lbnRzWzFdO1xuXG4gICAgdmFyIGRhdGEgPSBfZXh0ZW5kcyh7fSwgc3RhdGUpO1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnQkxPR19MSVNUX1NFTkQnOlxuICAgICAgICAgICAgZGF0YS5zdGFydCA9IGFjdGlvbi5zdGFydDtcbiAgICAgICAgICAgIGRhdGEuc3RhdHVzID0gJ3NlbmQnO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIGNhc2UgJ0JMT0dfTElTVF9TVUNDRVNTJzpcbiAgICAgICAgICAgIGRhdGEuc3RhdHVzID0gJ3N1Y2Nlc3MnO1xuICAgICAgICAgICAgZGF0YS5ibG9ncyA9IGFjdGlvbi5kYXRhLmdldEJsb2dMaXN0LmJsb2dzO1xuICAgICAgICAgICAgZGF0YS5jb3VudCA9IGFjdGlvbi5kYXRhLmdldEJsb2dMaXN0LmNvdW50O1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIGNhc2UgJ0JMT0dfTElTVF9FUlJPUic6XG4gICAgICAgICAgICBkYXRhLnN0YXR1cyA9ICdlcnJvcic7XG4gICAgICAgICAgICBkYXRhLmVycm9yID0gYWN0aW9uLmVycm9yO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gYmxvZ0xpc3Q7XG5cbi8qKiovIH0pXG5cbn0sWzMxOF0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBibG9nTGlzdC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5jc3MnO1xuaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5zY3NzJ1xuXG5pbXBvcnQge2xheW91dH0gZnJvbSAnLi9oZWxwZXJzL2NvbXBvbmVudCdcbmltcG9ydCBMaXN0Q29tcCBmcm9tICcuL2Jsb2cvTGlzdENvbXAnXG5cbmltcG9ydCBhdXRoIGZyb20gJy4vYXV0aC9Mb2dpblJlZCdcbmltcG9ydCBibG9nTGlzdCBmcm9tICcuL2Jsb2cvTGlzdFJlZCdcblxuaW1wb3J0IHtjb25maWd1cmVTdG9yZX0gZnJvbSAnLi9oZWxwZXJzL2NvbmZpZ3VyZVN0b3JlJ1xuXG5sZXQgc3RvcmUgPSBjb25maWd1cmVTdG9yZSh7XG5cdGF1dGg6IGF1dGgsXG5cdGJsb2dMaXN0OiBibG9nTGlzdCxcbn0pO1xuXG5sZXQgQ29tcCA9IGxheW91dCh7Y29tcDogTGlzdENvbXAsIGZvckF1dGg6IHRydWV9KTtcbnJlbmRlcihcblx0PFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG5cdFx0PENvbXAgLz5cblx0PC9Qcm92aWRlcj4sXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JylcbilcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zdGF0aWNfc3JjL2Jsb2dMaXN0LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBncmFwaHFsIH0gZnJvbSAnLi4vaGVscGVycy9hY3Rpb24nO1xuaW1wb3J0IHtmb3JFYWNoLCBjaHVuaywgbWFwfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtBbGVydE1lc3NhZ2UsIFBhZ2luYXRvckxheW91dH0gZnJvbSAnLi4vaGVscGVycy9jb21wb25lbnQnO1xuXG5jbGFzcyBCbG9nTGlzdENvbXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc3RhcnQ6IHRoaXMucHJvcHMuYmxvZ0xpc3Quc3RhcnQsXG4gICAgICAgICAgICBibG9nczogdGhpcy5wcm9wcy5ibG9nTGlzdC5ibG9ncyxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goZ3JhcGhxbCh7XG4gICAgICAgICAgICB0eXBlOiAnQkxPR19MSVNUJyxcbiAgICAgICAgICAgIHN0YXJ0OiB0aGlzLnByb3BzLmJsb2dMaXN0LnN0YXJ0LCBcbiAgICAgICAgICAgIHBlcnBhZ2U6IHRoaXMucHJvcHMuYmxvZ0xpc3QucGVycGFnZSwgXG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VQYWdlIChzdGFydCA9IDApIHtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChncmFwaHFsKHtcbiAgICAgICAgICAgIHR5cGU6ICdCTE9HX0xJU1QnLFxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LCBcbiAgICAgICAgICAgIHBlcnBhZ2U6IHRoaXMucHJvcHMuYmxvZ0xpc3QucGVycGFnZSwgXG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBnZXRCbG9nSXRlbXMgKCkge1xuICAgICAgICBsZXQgY2h1bmtlZEl0ZW1zID0gY2h1bmsodGhpcy5wcm9wcy5ibG9nTGlzdC5ibG9ncywgMyk7XG4gICAgICAgIGxldCBibG9ncyA9IG1hcChjaHVua2VkSXRlbXMsIGJsb2dzID0+IHtcbiAgICAgICAgICAgIGxldCBwYXJ0aXRpb24gPSBtYXAoYmxvZ3MsIGJsb2cgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWYgPSB7XCIvYmxvZy1kZXRhaWwvXCIgKyBibG9nLmlkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtibG9nLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17e19faHRtbDogYmxvZy50ZXh0fX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2Jsb2cudXNlck5hbWV9Jm5ic3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtibG9nLmRhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PiBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJyb3dcIj57cGFydGl0aW9ufTwvZGl2PlxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYmxvZ3M7XG4gICAgfVxuXG4gICAgXG5cbiAgICByZW5kZXIgKCkge1xuICAgICAgICBsZXQgYWxlcnRPcHRzID0gbnVsbCxcbiAgICAgICAgICAgIGJsb2dzID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGlzLnByb3BzJywgdGhpcy5wcm9wcyk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYmxvZ0xpc3Quc3RhdHVzID09ICdlcnJvcicpIHtcbiAgICAgICAgICAgIGFsZXJ0T3B0cyA9IHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMucHJvcHMuYmxvZ0xpc3QuZXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmJsb2dMaXN0LnN0YXR1cyA9PT0gJ3NlbmQnKSB7XG4gICAgICAgICAgICBhbGVydE9wdHMgPSB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnaW5mbycsXG4gICAgICAgICAgICAgICAgdGV4dDogJ0xvYWRpbmcsIHBsZWFzZSB3YWl0JyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYWdlclBhcmFtID0ge1xuICAgICAgICAgICAgc3RhcnQ6IHRoaXMucHJvcHMuYmxvZ0xpc3Quc3RhcnQsXG4gICAgICAgICAgICBwZXJwYWdlOiB0aGlzLnByb3BzLmJsb2dMaXN0LnBlcnBhZ2UsXG4gICAgICAgICAgICBjb3VudDogdGhpcy5wcm9wcy5ibG9nTGlzdC5jb3VudCxcbiAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmdldEJsb2dJdGVtcygpLFxuICAgICAgICAgICAgY2hhbmdlUGFnZTogOjp0aGlzLmNoYW5nZVBhZ2UsXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2FsZXJ0T3B0cycsYWxlcnRPcHRzKTtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8QWxlcnRNZXNzYWdlIG9wdHM9e2FsZXJ0T3B0c30gLz5cbiAgICAgICAgICAgIDxQYWdpbmF0b3JMYXlvdXQgcGFyYW09e3BhZ2VyUGFyYW19IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICB9XG59XG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICByZXR1cm4gey4uLnN0YXRlfVxufVxuQmxvZ0xpc3RDb21wID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMpKEJsb2dMaXN0Q29tcClcblxuZXhwb3J0IGRlZmF1bHQgQmxvZ0xpc3RDb21wXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3RhdGljX3NyYy9ibG9nL0xpc3RDb21wLmpzIiwibGV0IGluaXRTdGF0ZSA9IHtcbiAgICB1c2VySWQ6IHdpbmRvdy5sb2NhbFBhcmFtcy51c2VySWQgPyBwYXJzZUludCh3aW5kb3cubG9jYWxQYXJhbXMudXNlcklkKSA6IG51bGwsXG4gICAgc3RhcnQ6IHdpbmRvdy5sb2NhbFBhcmFtcy5zdGFydCA/IHBhcnNlSW50KHdpbmRvdy5sb2NhbFBhcmFtcy5zdGFydCkgOiAwLFxuICAgIHBlcnBhZ2U6IHdpbmRvdy5sb2NhbFBhcmFtcy5wZXJwYWdlID8gcGFyc2VJbnQod2luZG93LmxvY2FsUGFyYW1zLnBlcnBhZ2UpIDogOSxcbiAgICBibG9nczogW10sXG4gICAgY291bnQ6IDAsXG4gICAgc3RhdHVzOiBudWxsLFxuICAgIGVycm9yOiBudWxsLFxufTtcbmNvbnN0IGJsb2dMaXN0ID0gKHN0YXRlID0gaW5pdFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICBsZXQgZGF0YSA9IHsuLi5zdGF0ZX07XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlICdCTE9HX0xJU1RfU0VORCc6XG4gICAgICAgICAgICBkYXRhLnN0YXJ0ID0gYWN0aW9uLnN0YXJ0O1xuICAgICAgICAgICAgZGF0YS5zdGF0dXMgPSAnc2VuZCc7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgY2FzZSAnQkxPR19MSVNUX1NVQ0NFU1MnOlxuICAgICAgICAgICAgZGF0YS5zdGF0dXMgPSAnc3VjY2Vzcyc7XG4gICAgICAgICAgICBkYXRhLmJsb2dzID0gYWN0aW9uLmRhdGEuZ2V0QmxvZ0xpc3QuYmxvZ3M7XG4gICAgICAgICAgICBkYXRhLmNvdW50ID0gYWN0aW9uLmRhdGEuZ2V0QmxvZ0xpc3QuY291bnQ7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgY2FzZSAnQkxPR19MSVNUX0VSUk9SJzpcbiAgICAgICAgICAgIGRhdGEuc3RhdHVzID0gJ2Vycm9yJztcbiAgICAgICAgICAgIGRhdGEuZXJyb3IgPSBhY3Rpb24uZXJyb3I7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYmxvZ0xpc3RcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zdGF0aWNfc3JjL2Jsb2cvTGlzdFJlZC5qcyJdLCJzb3VyY2VSb290IjoiIn0=