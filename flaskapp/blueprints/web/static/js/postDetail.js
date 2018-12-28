webpackJsonp([4],{459:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}var r=a(1),s=l(r),o=a(10),n=a(6);a(14),a(15);var i=a(7),u=a(460),c=l(u),p=a(16),d=l(p),f=a(461),m=l(f),h=a(17),g=(0,h.configureStore)({auth:d.default,postDetail:m.default}),b=(0,i.layout)({comp:c.default,forAuth:!1});(0,o.render)(s.default.createElement(n.Provider,{store:g},s.default.createElement(b,null)),document.getElementById("root"))},460:function(e,t,a){"use strict";function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},n=function(){function e(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,a,l){return a&&e(t.prototype,a),l&&e(t,l),t}}(),i=a(1),u=function(e){return e&&e.__esModule?e:{default:e}}(i),c=a(6),p=a(20),d=a(7),f=function(e){function t(e){l(this,t);var a=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state=o({},e.postDetail),a}return s(t,e),n(t,[{key:"componentWillMount",value:function(){-1!==this.state.id&&this.props.dispatch((0,p.graphql)({type:"POST_GET",id:this.state.id,blogId:this.state.blogId}))}},{key:"componentWillReceiveProps",value:function(e){"success_get"==e.postDetail.status&&this.setState({userId:e.postDetail.userId,userName:e.postDetail.userName,userEmail:e.postDetail.userEmail,title:e.postDetail.title,description:e.postDetail.description,text:e.postDetail.text,date:e.postDetail.date,public:e.postDetail.public})}},{key:"render",value:function(){var e=null;return"error"===this.props.postDetail.status?e={className:"danger",text:this.props.postDetail.error||"Error, wrong post data"}:"send"===this.props.postDetail.status&&(e={className:"info",text:"Loading, please wait"}),u.default.createElement("div",null,u.default.createElement("ol",{className:"breadcrumb"},u.default.createElement("li",null,u.default.createElement("a",{href:"/blogs"},"Blogs")),u.default.createElement("li",null,u.default.createElement("a",{href:"/blog/"+this.props.postDetail.blogId},"Blog")),u.default.createElement("li",{className:"active"},this.state.title||"Post detail")),u.default.createElement(d.AlertMessage,{opts:e}),u.default.createElement("div",{className:"panel panel-default"},u.default.createElement("div",{className:"panel-heading"},u.default.createElement("h4",{className:"panel-title"},this.props.postDetail.title)),u.default.createElement("div",{className:"panel-body"},u.default.createElement("p",null,u.default.createElement("span",{className:"glyphicon glyphicon-user"})," ",this.props.postDetail.userName," | ",u.default.createElement("span",{className:"glyphicon glyphicon-time"})," ",this.props.postDetail.date),u.default.createElement("p",null,u.default.createElement("em",null,this.props.postDetail.description)),u.default.createElement("br",null),u.default.createElement("div",{dangerouslySetInnerHTML:{__html:this.props.postDetail.text}}))))}}]),t}(u.default.Component),m=function(e){return o({},e)};f=(0,c.connect)(m)(f),t.default=f},461:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},r=window.localParams.blogId,s=window.localParams.postId||"-1",o={id:parseInt(s),blogId:parseInt(r),userId:0,userName:"",userEmail:"",title:"",description:"",text:"",date:"",public:!1,status:null},n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,t=arguments[1],a=null;switch(t.type){case"POST_GET_SEND":return a=l({},e),a.status="send",a;case"POST_GET_SUCCESS":return a=l({},e),a.status="success",a.id=t.data.getPost.id,a.blogId=t.data.getPost.blogId,a.userId=t.data.getPost.userId,a.userName=t.data.getPost.userName,a.userEmail=t.data.getPost.userEmail,a.title=t.data.getPost.title,a.description=t.data.getPost.description,a.text=t.data.getPost.text,a.date=t.data.getPost.date,a.public=!!t.data.getPost.public,a;case"POST_GET_ERROR":return a=l({},e),a.status="error",a.error=t.error,a;default:return e}};t.default=n}},[459]);