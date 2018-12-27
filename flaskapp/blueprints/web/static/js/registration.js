webpackJsonp([10],{198:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var s=r(1),n=a(s),o=r(11),l=r(7);r(16),r(17);var i=r(8),u=r(332),c=a(u),d=r(18),f=a(d),p=r(338),m=a(p),h=r(19),g=(0,h.configureStore)({auth:f.default,registration:m.default}),b=(0,i.layout)({comp:c.default});(0,o.render)(n.default.createElement(l.Provider,{store:g},n.default.createElement(b,null)),document.getElementById("root"))},332:function(e,t,r){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},l=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),i=r(1),u=function(e){return e&&e.__esModule?e:{default:e}}(i),c=r(7),d=r(21),f=r(8),p=function(e){function t(e){a(this,t);var r=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.state={email:null,password:null,confirmPassword:null},r}return n(t,e),l(t,[{key:"formSubmit",value:function(e){return e.preventDefault(),!this.state.email||this.state.email.length<1||!this.state.password||this.state.password.length<1?void this.props.dispatch({type:"REG_ERROR",error:"Email and password are required!"}):this.state.password!==this.state.confirmPassword?void this.props.dispatch({type:"REG_ERROR",error:"Please confirm password!"}):void this.props.dispatch((0,d.graphql)({type:"REG",email:this.state.email,password:this.state.password,confirmPassword:this.state.confirmPassword}))}},{key:"componentDidUpdate",value:function(){"success"===this.props.registration.status&&setTimeout(function(){return window.location="/login"},1e3)}},{key:"fieldChange",value:function(e){e.preventDefault();var t={};t[e.target.id]=e.target.value?e.target.value.toString().trim():null,this.setState(t)}},{key:"render",value:function(){var e=null,t=null;return"error"===this.props.registration.status?t={className:"danger",text:this.props.registration.error||"Error, wrong email or password"}:"send"===this.props.registration.status?(e="disabled",t={className:"info",text:"Loading, please wait"}):"success"===this.props.registration.status&&(t={className:"success",text:"Registration is successfully, please login."}),u.default.createElement("div",{className:"row"},u.default.createElement("div",{className:"col-lg-offset-3 col-lg-6"},u.default.createElement("div",{className:"panel panel-default"},u.default.createElement("div",{className:"panel-heading"},u.default.createElement("h3",{className:"panel-title"},"Registration")),u.default.createElement("div",{className:"panel-body"},u.default.createElement("form",{onSubmit:this.formSubmit.bind(this)},u.default.createElement("div",{className:"form-group"},u.default.createElement("label",{htmlFor:"email"},"Email"),u.default.createElement("input",{type:"email",required:!0,className:"form-control",id:"email",placeholder:"Email",defaultValue:this.props.registration.email,onChange:this.fieldChange.bind(this),disabled:e})),u.default.createElement("div",{className:"form-group"},u.default.createElement("label",{htmlFor:"password"},"Password"),u.default.createElement("input",{type:"password",required:!0,className:"form-control",id:"password",placeholder:"Password",defaultValue:this.props.registration.password,onChange:this.fieldChange.bind(this),disabled:e})),u.default.createElement("div",{className:"form-group"},u.default.createElement("label",{htmlFor:"confirmPassword"},"Confirm password"),u.default.createElement("input",{type:"password",required:!0,className:"form-control",id:"confirmPassword",placeholder:"Confirm password",defaultValue:this.props.registration.confirmPassword,onChange:this.fieldChange.bind(this),disabled:e})),u.default.createElement(f.AlertMessage,{opts:t}),u.default.createElement("button",{type:"submit",className:"btn btn-default btn-block",disabled:e},"Registration")),u.default.createElement("br",null),u.default.createElement("p",{className:"text-center"},u.default.createElement("a",{href:"/login"},"Login"))))))}}]),t}(u.default.Component),m=function(e){return o({},e)};p=(0,c.connect)(m)(p),t.default=p},338:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},s={login:null,password:null,confirmPassword:null,status:null,error:null},n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,t=arguments[1],r=a({},e);switch(t.type){case"REG_SEND":return r.status="send",r;case"REG_SUCCESS":return r.status="success",r;case"REG_ERROR":return r.status="error",r.error=t.error,r;default:return e}};t.default=n}},[198]);