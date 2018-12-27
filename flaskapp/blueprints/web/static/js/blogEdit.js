webpackJsonp([9],{364:function(t,e,a){"use strict";function l(t){return t&&t.__esModule?t:{default:t}}var r=a(1),i=l(r),n=a(11),o=a(7);a(16),a(95),a(17);var s=a(8),u=a(366),c=l(u),d=a(18),f=l(d),p=a(367),b=l(p),h=a(19),g=(0,h.configureStore)({auth:f.default,blogEdit:b.default}),m=(0,s.layout)({comp:c.default,forAuth:!0});(0,n.render)(i.default.createElement(o.Provider,{store:g},i.default.createElement(m,null)),document.getElementById("root"))},366:function(t,e,a){"use strict";function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(t[l]=a[l])}return t},o=function(){function t(t,e){for(var a=0;a<e.length;a++){var l=e[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(t,l.key,l)}}return function(e,a,l){return a&&t(e.prototype,a),l&&t(e,l),e}}(),s=a(1),u=function(t){return t&&t.__esModule?t:{default:t}}(s),c=a(7),d=a(21),f=a(8),p=function(t){function e(t){l(this,e);var a=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return a.state=n({},t.blogEdit),a}return i(e,t),o(e,[{key:"componentWillMount",value:function(){-1!==this.state.id&&this.props.dispatch((0,d.graphql)({type:"BLOG_GET",id:this.state.id}))}},{key:"componentWillReceiveProps",value:function(t){"success_get"==t.blogEdit.status&&this.setState({title:t.blogEdit.title,text:t.blogEdit.text,public:t.blogEdit.public,date:t.blogEdit.date})}},{key:"fieldChange",value:function(t){var e={},a="public"==t.target.id?t.target.checked:t.target.value;e[t.target.id]=a,this.setState(e)}},{key:"formSubmit",value:function(t){if(t.preventDefault(),text&&text.length>512)return this.props.dispatch({type:"BLOG_EDIT_ERROR",error:"Text is too long!"});this.props.dispatch((0,d.graphql)({type:"BLOG_EDIT",id:this.state.id,title:this.state.title,text:this.state.text,public:this.state.public}))}},{key:"render",value:function(){var t=this,e=null;return"error"===this.props.blogEdit.status?e={className:"danger",text:this.props.blogEdit.error||"Error, wrong blog data"}:"send"===this.props.blogEdit.status?e={className:"info",text:"Loading, please wait"}:"success_edit"===this.props.blogEdit.status&&(e={className:"success",text:"Blog saved successfully"},setTimeout(function(){window.location="/blog-edit/"+t.props.blogEdit.id},1e3)),u.default.createElement("div",null,u.default.createElement("ol",{className:"breadcrumb"},u.default.createElement("li",null,u.default.createElement("a",{href:"/my-blogs"},"My Blogs")),u.default.createElement("li",{className:"active"},this.state.title?this.state.title:null)),u.default.createElement("form",{onSubmit:this.formSubmit.bind(this)},u.default.createElement("div",{className:"form-group"},u.default.createElement("label",{htmlFor:"title"},"Title"),u.default.createElement("input",{required:!0,type:"text",className:"form-control",id:"title",placeholder:"Title",onChange:this.fieldChange.bind(this),value:this.state.title})),u.default.createElement("div",{className:"form-group"},u.default.createElement("label",{htmlFor:"text"},"Text"),u.default.createElement("textarea",{required:!0,className:"form-control",id:"text",placeholder:"Text",onChange:this.fieldChange.bind(this),value:this.state.text})),u.default.createElement("div",{className:"checkbox"},u.default.createElement("label",null,u.default.createElement("input",{type:"checkbox",id:"public",onChange:this.fieldChange.bind(this),checked:!!this.state.public})," Public")),u.default.createElement(f.AlertMessage,{opts:e}),u.default.createElement("hr",null),u.default.createElement("div",null,u.default.createElement("button",{type:"submit",className:"btn btn-primary"},u.default.createElement("span",{className:"glyphicon glyphicon-floppy-disk"}),"  Save")),u.default.createElement("br",null)))}}]),e}(u.default.Component),b=function(t){return n({},t)};p=(0,c.connect)(b)(p),e.default=p},367:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(t[l]=a[l])}return t},r=window.localParams.blogId||"-1",i={id:parseInt(r),user_id:0,user_name:"",title:"",text:"",date:"",public:!1,status:null},n=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,e=arguments[1],a=null;switch(e.type){case"BLOG_GET_SEND":return l({status:"send"},t);case"BLOG_GET_SUCCESS":return a=l({},t),a.status="success_get",a.id=e.data.getBlog.id,a.user_id=e.data.getBlog.userId,a.user_name=e.data.getBlog.userName,a.text=e.data.getBlog.text,a.title=e.data.getBlog.title,a.date=e.data.getBlog.date,a.public=!!e.data.getBlog.public,a;case"BLOG_GET_ERROR":return l({status:"error",error:e.error},t);case"BLOG_EDIT_SEND":return a=l({},t),a.status="send",a.id=e.id,a.text=e.text,a.title=e.title,a.public=e.public,a;case"BLOG_EDIT_SUCCESS":return a=l({},t),a.status="success_edit",a.id=e.data.editBlog.id,a.text=e.data.editBlog.text,a.title=e.data.editBlog.title,a.public=e.data.editBlog.public,a;case"BLOG_EDIT_ERROR":return a=l({},t),a.status="error",a.error=e.error,a;default:return t}};e.default=n}},[364]);