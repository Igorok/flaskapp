webpackJsonp([4],{459:function(module,exports,__webpack_require__){"use strict";eval("\n\nvar _react = __webpack_require__(1);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(11);\n\nvar _reactRedux = __webpack_require__(6);\n\n__webpack_require__(14);\n\n__webpack_require__(15);\n\nvar _component = __webpack_require__(7);\n\nvar _DetailComp = __webpack_require__(460);\n\nvar _DetailComp2 = _interopRequireDefault(_DetailComp);\n\nvar _LoginRed = __webpack_require__(16);\n\nvar _LoginRed2 = _interopRequireDefault(_LoginRed);\n\nvar _DetailRed = __webpack_require__(461);\n\nvar _DetailRed2 = _interopRequireDefault(_DetailRed);\n\nvar _configureStore = __webpack_require__(17);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar store = (0, _configureStore.configureStore)({\n\tauth: _LoginRed2.default,\n\tpostDetail: _DetailRed2.default\n});\n\nvar Comp = (0, _component.layout)({ comp: _DetailComp2.default, forAuth: false });\n(0, _reactDom.render)(_react2.default.createElement(\n\t_reactRedux.Provider,\n\t{ store: store },\n\t_react2.default.createElement(Comp, null)\n), document.getElementById('root'));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDU5LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3N0YXRpY19zcmMvcG9zdERldGFpbC5qcz9lYzQ5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5jc3MnO1xuaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5zY3NzJ1xuXG5pbXBvcnQge2xheW91dH0gZnJvbSAnLi9oZWxwZXJzL2NvbXBvbmVudCdcbmltcG9ydCBEZXRhaWxDb21wIGZyb20gJy4vcG9zdC9EZXRhaWxDb21wJ1xuXG5pbXBvcnQgYXV0aCBmcm9tICcuL2F1dGgvTG9naW5SZWQnXG5pbXBvcnQgcG9zdERldGFpbCBmcm9tICcuL3Bvc3QvRGV0YWlsUmVkJ1xuXG5pbXBvcnQge2NvbmZpZ3VyZVN0b3JlfSBmcm9tICcuL2hlbHBlcnMvY29uZmlndXJlU3RvcmUnXG5cblxubGV0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoe1xuXHRhdXRoOiBhdXRoLFxuXHRwb3N0RGV0YWlsOiBwb3N0RGV0YWlsLFxufSk7XG5cbmxldCBDb21wID0gbGF5b3V0KHtjb21wOiBEZXRhaWxDb21wLCBmb3JBdXRoOiBmYWxzZX0pO1xucmVuZGVyKFxuXHQ8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cblx0XHQ8Q29tcCAvPlxuXHQ8L1Byb3ZpZGVyPixcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKVxuKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHN0YXRpY19zcmMvcG9zdERldGFpbC5qcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///459\n")},460:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(1);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(6);\n\nvar _action = __webpack_require__(20);\n\nvar _component = __webpack_require__(7);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar DetailComp = function (_React$Component) {\n    _inherits(DetailComp, _React$Component);\n\n    function DetailComp(props) {\n        _classCallCheck(this, DetailComp);\n\n        var _this = _possibleConstructorReturn(this, (DetailComp.__proto__ || Object.getPrototypeOf(DetailComp)).call(this, props));\n\n        _this.state = _extends({}, props.postDetail);\n        return _this;\n    }\n\n    _createClass(DetailComp, [{\n        key: 'componentWillMount',\n        value: function componentWillMount() {\n            if (this.state.id === -1) {\n                return;\n            }\n\n            this.props.dispatch((0, _action.graphql)({\n                type: 'POST_GET',\n                id: this.state.id,\n                blogId: this.state.blogId\n            }));\n        }\n    }, {\n        key: 'componentWillReceiveProps',\n        value: function componentWillReceiveProps(nextProps) {\n            if (nextProps.postDetail.status == 'success_get') {\n                this.setState({\n                    userId: nextProps.postDetail.userId,\n                    userName: nextProps.postDetail.userName,\n                    userEmail: nextProps.postDetail.userEmail,\n                    title: nextProps.postDetail.title,\n                    description: nextProps.postDetail.description,\n                    text: nextProps.postDetail.text,\n                    date: nextProps.postDetail.date,\n                    public: nextProps.postDetail.public\n                });\n            }\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var alertOpts = null;\n\n            if (this.props.postDetail.status === 'error') {\n                alertOpts = {\n                    className: 'danger',\n                    text: this.props.postDetail.error || 'Error, wrong post data'\n                };\n            } else if (this.props.postDetail.status === 'send') {\n                alertOpts = {\n                    className: 'info',\n                    text: 'Loading, please wait'\n                };\n            }\n\n            return _react2.default.createElement(\n                'div',\n                null,\n                _react2.default.createElement(\n                    'ol',\n                    { className: 'breadcrumb' },\n                    _react2.default.createElement(\n                        'li',\n                        null,\n                        _react2.default.createElement(\n                            'a',\n                            { href: '/blogs' },\n                            'Blogs'\n                        )\n                    ),\n                    _react2.default.createElement(\n                        'li',\n                        null,\n                        _react2.default.createElement(\n                            'a',\n                            { href: \"/blog/\" + this.props.postDetail.blogId },\n                            'Blog'\n                        )\n                    ),\n                    _react2.default.createElement(\n                        'li',\n                        { className: 'active' },\n                        this.state.title || 'Post detail'\n                    )\n                ),\n                _react2.default.createElement(_component.AlertMessage, { opts: alertOpts }),\n                _react2.default.createElement(\n                    'div',\n                    { className: 'panel panel-default' },\n                    _react2.default.createElement(\n                        'div',\n                        { className: 'panel-heading' },\n                        _react2.default.createElement(\n                            'h4',\n                            { className: 'panel-title' },\n                            this.props.postDetail.title\n                        )\n                    ),\n                    _react2.default.createElement(\n                        'div',\n                        { className: 'panel-body' },\n                        _react2.default.createElement(\n                            'p',\n                            null,\n                            _react2.default.createElement('span', { className: 'glyphicon glyphicon-user' }),\n                            '\\xA0',\n                            this.props.postDetail.userName,\n                            '\\xA0|\\xA0',\n                            _react2.default.createElement('span', { className: 'glyphicon glyphicon-time' }),\n                            '\\xA0',\n                            this.props.postDetail.date\n                        ),\n                        _react2.default.createElement(\n                            'p',\n                            null,\n                            _react2.default.createElement(\n                                'em',\n                                null,\n                                this.props.postDetail.description\n                            )\n                        ),\n                        _react2.default.createElement('br', null),\n                        _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.props.postDetail.text } })\n                    )\n                )\n            );\n        }\n    }]);\n\n    return DetailComp;\n}(_react2.default.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n    return _extends({}, state);\n};\nDetailComp = (0, _reactRedux.connect)(mapStateToProps)(DetailComp);\nexports.default = DetailComp;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDYwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3N0YXRpY19zcmMvcG9zdC9EZXRhaWxDb21wLmpzPzJiNmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHthcGksIGdyYXBocWx9IGZyb20gJy4uL2hlbHBlcnMvYWN0aW9uJ1xuaW1wb3J0IHtBbGVydE1lc3NhZ2V9IGZyb20gJy4uL2hlbHBlcnMvY29tcG9uZW50J1xuXG5cbmNsYXNzIERldGFpbENvbXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsuLi5wcm9wcy5wb3N0RGV0YWlsfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQgKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pZCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChncmFwaHFsKHtcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUX0dFVCcsXG4gICAgICAgICAgICBpZDogdGhpcy5zdGF0ZS5pZCxcbiAgICAgICAgICAgIGJsb2dJZDogdGhpcy5zdGF0ZS5ibG9nSWRcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMucG9zdERldGFpbC5zdGF0dXMgPT0gJ3N1Y2Nlc3NfZ2V0Jykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdXNlcklkOiBuZXh0UHJvcHMucG9zdERldGFpbC51c2VySWQsXG4gICAgICAgICAgICAgICAgdXNlck5hbWU6IG5leHRQcm9wcy5wb3N0RGV0YWlsLnVzZXJOYW1lLFxuICAgICAgICAgICAgICAgIHVzZXJFbWFpbDogbmV4dFByb3BzLnBvc3REZXRhaWwudXNlckVtYWlsLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBuZXh0UHJvcHMucG9zdERldGFpbC50aXRsZSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogbmV4dFByb3BzLnBvc3REZXRhaWwuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgdGV4dDogbmV4dFByb3BzLnBvc3REZXRhaWwudGV4dCxcbiAgICAgICAgICAgICAgICBkYXRlOiBuZXh0UHJvcHMucG9zdERldGFpbC5kYXRlLFxuICAgICAgICAgICAgICAgIHB1YmxpYzogbmV4dFByb3BzLnBvc3REZXRhaWwucHVibGljLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIgKCkge1xuICAgICAgICBsZXQgYWxlcnRPcHRzID0gbnVsbDtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucG9zdERldGFpbC5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgIGFsZXJ0T3B0cyA9IHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMucHJvcHMucG9zdERldGFpbC5lcnJvciB8fCAnRXJyb3IsIHdyb25nIHBvc3QgZGF0YSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnBvc3REZXRhaWwuc3RhdHVzID09PSAnc2VuZCcpIHtcbiAgICAgICAgICAgIGFsZXJ0T3B0cyA9IHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdpbmZvJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiAnTG9hZGluZywgcGxlYXNlIHdhaXQnLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8b2wgY2xhc3NOYW1lPVwiYnJlYWRjcnVtYlwiPlxuICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiL2Jsb2dzXCI+QmxvZ3M8L2E+PC9saT5cbiAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj17XCIvYmxvZy9cIiArIHRoaXMucHJvcHMucG9zdERldGFpbC5ibG9nSWR9PkJsb2c8L2E+PC9saT5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiYWN0aXZlXCI+e3RoaXMuc3RhdGUudGl0bGUgfHwgJ1Bvc3QgZGV0YWlsJ308L2xpPlxuICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICAgIDxBbGVydE1lc3NhZ2Ugb3B0cz17YWxlcnRPcHRzfSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJwYW5lbC10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMucG9zdERldGFpbC50aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXVzZXJcIj48L3NwYW4+Jm5ic3A7XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5wb3N0RGV0YWlsLnVzZXJOYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgJm5ic3A7fCZuYnNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10aW1lXCI+PC9zcGFuPiZuYnNwO1xuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMucG9zdERldGFpbC5kYXRlfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnBvc3REZXRhaWwuZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2VtPlxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sOiB0aGlzLnByb3BzLnBvc3REZXRhaWwudGV4dH19IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICByZXR1cm4gey4uLnN0YXRlfVxufVxuRGV0YWlsQ29tcCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShEZXRhaWxDb21wKVxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsQ29tcFxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3RhdGljX3NyYy9wb3N0L0RldGFpbENvbXAuanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7Ozs7Ozs7OztBQUVBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQVVBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFIQTtBQUtBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQURBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFJQTtBQUpBO0FBS0E7QUFMQTtBQU9BO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFEQTtBQUtBO0FBQ0E7QUFkQTtBQU5BO0FBUEE7QUErQkE7Ozs7QUEvRUE7QUFDQTtBQWlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///460\n")},461:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar blogId = window.localParams.blogId;\nvar postId = window.localParams.postId || '-1';\nvar initState = {\n    id: parseInt(postId),\n    blogId: parseInt(blogId),\n    userId: 0,\n    userName: '',\n    userEmail: '',\n    title: '',\n    description: '',\n    text: '',\n    date: '',\n    public: false,\n\n    // technical info\n    status: null\n};\n\nvar postDetail = function postDetail() {\n    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;\n    var action = arguments[1];\n\n    var data = null;\n\n    switch (action.type) {\n        case 'POST_GET_SEND':\n            data = _extends({}, state);\n            data.status = 'send';\n            return data;\n\n        case 'POST_GET_SUCCESS':\n            data = _extends({}, state);\n            data.status = 'success';\n            data.id = action.data.getPost.id;\n            data.blogId = action.data.getPost.blogId;\n            data.userId = action.data.getPost.userId;\n            data.userName = action.data.getPost.userName;\n            data.userEmail = action.data.getPost.userEmail;\n            data.title = action.data.getPost.title;\n            data.description = action.data.getPost.description;\n            data.text = action.data.getPost.text;\n            data.date = action.data.getPost.date;\n            data.public = !!action.data.getPost.public;\n            return data;\n\n        case 'POST_GET_ERROR':\n            data = _extends({}, state);\n            data.status = 'error';\n            data.error = action.error;\n            return data;\n\n        default:\n            return state;\n    }\n};\n\nexports.default = postDetail;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDYxLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3N0YXRpY19zcmMvcG9zdC9EZXRhaWxSZWQuanM/MzQ4MSJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgYmxvZ0lkID0gd2luZG93LmxvY2FsUGFyYW1zLmJsb2dJZDtcbmxldCBwb3N0SWQgPSB3aW5kb3cubG9jYWxQYXJhbXMucG9zdElkIHx8ICctMSc7XG5sZXQgaW5pdFN0YXRlID0ge1xuICAgIGlkOiBwYXJzZUludChwb3N0SWQpLFxuICAgIGJsb2dJZDogcGFyc2VJbnQoYmxvZ0lkKSxcbiAgICB1c2VySWQ6IDAsXG4gICAgdXNlck5hbWU6ICcnLFxuICAgIHVzZXJFbWFpbDogJycsXG4gICAgdGl0bGU6ICcnLFxuICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICB0ZXh0OiAnJyxcbiAgICBkYXRlOiAnJyxcbiAgICBwdWJsaWM6IGZhbHNlLFxuXG4gICAgLy8gdGVjaG5pY2FsIGluZm9cbiAgICBzdGF0dXM6IG51bGwsXG59O1xuXG5cbmNvbnN0IHBvc3REZXRhaWwgPSAoc3RhdGUgPSBpbml0U3RhdGUsIGFjdGlvbikgPT4ge1xuICAgIGxldCBkYXRhID0gbnVsbDtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnUE9TVF9HRVRfU0VORCc6XG4gICAgICAgICAgICBkYXRhID0gey4uLnN0YXRlfTtcbiAgICAgICAgICAgIGRhdGEuc3RhdHVzID0gJ3NlbmQnO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG5cbiAgICAgICAgY2FzZSAnUE9TVF9HRVRfU1VDQ0VTUyc6XG4gICAgICAgICAgICBkYXRhID0gey4uLnN0YXRlfTtcbiAgICAgICAgICAgIGRhdGEuc3RhdHVzID0gJ3N1Y2Nlc3MnO1xuICAgICAgICAgICAgZGF0YS5pZCA9IGFjdGlvbi5kYXRhLmdldFBvc3QuaWQ7XG4gICAgICAgICAgICBkYXRhLmJsb2dJZCA9IGFjdGlvbi5kYXRhLmdldFBvc3QuYmxvZ0lkO1xuICAgICAgICAgICAgZGF0YS51c2VySWQgPSBhY3Rpb24uZGF0YS5nZXRQb3N0LnVzZXJJZDtcbiAgICAgICAgICAgIGRhdGEudXNlck5hbWUgPSBhY3Rpb24uZGF0YS5nZXRQb3N0LnVzZXJOYW1lO1xuICAgICAgICAgICAgZGF0YS51c2VyRW1haWwgPSBhY3Rpb24uZGF0YS5nZXRQb3N0LnVzZXJFbWFpbDtcbiAgICAgICAgICAgIGRhdGEudGl0bGUgPSBhY3Rpb24uZGF0YS5nZXRQb3N0LnRpdGxlO1xuICAgICAgICAgICAgZGF0YS5kZXNjcmlwdGlvbiA9IGFjdGlvbi5kYXRhLmdldFBvc3QuZGVzY3JpcHRpb247XG4gICAgICAgICAgICBkYXRhLnRleHQgPSBhY3Rpb24uZGF0YS5nZXRQb3N0LnRleHQ7XG4gICAgICAgICAgICBkYXRhLmRhdGUgPSBhY3Rpb24uZGF0YS5nZXRQb3N0LmRhdGU7XG4gICAgICAgICAgICBkYXRhLnB1YmxpYyA9ICEhIGFjdGlvbi5kYXRhLmdldFBvc3QucHVibGljO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG5cbiAgICAgICAgY2FzZSAnUE9TVF9HRVRfRVJST1InOlxuICAgICAgICAgICAgZGF0YSA9IHsuLi5zdGF0ZX07XG4gICAgICAgICAgICBkYXRhLnN0YXR1cyA9ICdlcnJvcic7XG4gICAgICAgICAgICBkYXRhLmVycm9yID0gYWN0aW9uLmVycm9yO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcG9zdERldGFpbDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3RhdGljX3NyYy9wb3N0L0RldGFpbFJlZC5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWJBO0FBQ0E7QUFnQkE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTVCQTtBQThCQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///461\n")}},[459]);