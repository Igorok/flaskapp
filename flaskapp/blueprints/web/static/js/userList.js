webpackJsonp([2],{350:function(module,exports,__webpack_require__){"use strict";eval("\n\nvar _react = __webpack_require__(1);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(11);\n\nvar _reactRedux = __webpack_require__(3);\n\n__webpack_require__(13);\n\n__webpack_require__(14);\n\nvar _component = __webpack_require__(6);\n\nvar _ListComp = __webpack_require__(351);\n\nvar _ListComp2 = _interopRequireDefault(_ListComp);\n\nvar _LoginRed = __webpack_require__(15);\n\nvar _LoginRed2 = _interopRequireDefault(_LoginRed);\n\nvar _ListRed = __webpack_require__(352);\n\nvar _ListRed2 = _interopRequireDefault(_ListRed);\n\nvar _configureStore = __webpack_require__(16);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar store = (0, _configureStore.configureStore)({\n\tauth: _LoginRed2.default,\n\tuserList: _ListRed2.default\n});\n\nvar Comp = (0, _component.layout)({ comp: _ListComp2.default, forAuth: true });\n(0, _reactDom.render)(_react2.default.createElement(\n\t_reactRedux.Provider,\n\t{ store: store },\n\t_react2.default.createElement(Comp, null)\n), document.getElementById('root'));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMzUwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3N0YXRpY19zcmMvdXNlckxpc3QuanM/ZThlOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1kb20nXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAuY3NzJztcbmltcG9ydCAnLi9zdHlsZXMvaW5kZXguc2NzcydcblxuaW1wb3J0IHtsYXlvdXR9IGZyb20gJy4vaGVscGVycy9jb21wb25lbnQnXG5pbXBvcnQgTGlzdENvbXAgZnJvbSAnLi91c2VyL0xpc3RDb21wJ1xuXG5pbXBvcnQgYXV0aCBmcm9tICcuL2F1dGgvTG9naW5SZWQnXG5pbXBvcnQgdXNlckxpc3QgZnJvbSAnLi91c2VyL0xpc3RSZWQnXG5cbmltcG9ydCB7Y29uZmlndXJlU3RvcmV9IGZyb20gJy4vaGVscGVycy9jb25maWd1cmVTdG9yZSdcblxubGV0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoe1xuXHRhdXRoOiBhdXRoLFxuXHR1c2VyTGlzdDogdXNlckxpc3QsXG59KTtcblxubGV0IENvbXAgPSBsYXlvdXQoe2NvbXA6IExpc3RDb21wLCBmb3JBdXRoOiB0cnVlfSk7XG5yZW5kZXIoXG5cdDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuXHRcdDxDb21wIC8+XG5cdDwvUHJvdmlkZXI+LFxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpXG4pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHN0YXRpY19zcmMvdXNlckxpc3QuanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///350\n")},351:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(1);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(3);\n\nvar _action = __webpack_require__(18);\n\nvar _lodash = __webpack_require__(21);\n\nvar _component = __webpack_require__(6);\n\nvar _UserModal = __webpack_require__(162);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n// one user row\nvar UserItemComp = function (_React$Component) {\n    _inherits(UserItemComp, _React$Component);\n\n    function UserItemComp() {\n        _classCallCheck(this, UserItemComp);\n\n        return _possibleConstructorReturn(this, (UserItemComp.__proto__ || Object.getPrototypeOf(UserItemComp)).apply(this, arguments));\n    }\n\n    _createClass(UserItemComp, [{\n        key: 'friendRequest',\n        value: function friendRequest(e) {\n            e.preventDefault();\n            return this.props.friendRequest(this.props.user.id);\n        }\n    }, {\n        key: 'friendRemove',\n        value: function friendRemove(e) {\n            e.preventDefault();\n            return this.props.friendRemove(this.props.user.id);\n        }\n    }, {\n        key: 'showRemove',\n        value: function showRemove(e) {\n            e.preventDefault();\n            return this.props.showRemove(this.props.user);\n        }\n    }, {\n        key: 'showAdd',\n        value: function showAdd(e) {\n            e.preventDefault();\n            return this.props.showAdd(this.props.user);\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var textClass = this.props.user.online ? 'success' : 'active';\n            var friendBtn = null;\n            var msgBtn = null;\n            // if both users sended friend requests\n            if (this.props.user.selfFriendId !== null && this.props.user.friendUserId !== null) {\n                friendBtn = _react2.default.createElement(\n                    'button',\n                    { className: 'btn btn-default', onClick: this.showRemove.bind(this) },\n                    _react2.default.createElement('span', { className: 'glyphicon glyphicon-minus' }),\n                    '\\xA0 Remove from friends'\n                );\n                msgBtn = _react2.default.createElement(\n                    'a',\n                    { className: 'btn btn-default', href: \"/chat-private/\" + this.props.user.id },\n                    _react2.default.createElement('span', { className: 'glyphicon glyphicon-envelope' }),\n                    '\\xA0 Send message'\n                );\n            }\n            // if this row sended request to current user\n            else if (this.props.user.selfFriendId !== null) {\n                    friendBtn = _react2.default.createElement(\n                        'button',\n                        { className: 'btn btn-default', onClick: this.showAdd.bind(this) },\n                        _react2.default.createElement('span', { className: 'glyphicon glyphicon-plus' }),\n                        '\\xA0 Approve friend'\n                    );\n                }\n                // if current user sended request to current row\n                else if (this.props.user.friendUserId !== null) {\n                        friendBtn = _react2.default.createElement(\n                            'button',\n                            { disabled: true, className: 'btn btn-default', onClick: this.showAdd.bind(this) },\n                            _react2.default.createElement('span', { className: 'glyphicon glyphicon-plus' }),\n                            '\\xA0 Add to friends'\n                        );\n                    } else {\n                        friendBtn = _react2.default.createElement(\n                            'button',\n                            { className: 'btn btn-default', onClick: this.showAdd.bind(this) },\n                            _react2.default.createElement('span', { className: 'glyphicon glyphicon-plus' }),\n                            '\\xA0 Add to friends'\n                        );\n                    }\n\n            return _react2.default.createElement(\n                'tr',\n                { className: textClass },\n                _react2.default.createElement(\n                    'td',\n                    null,\n                    _react2.default.createElement('span', { className: 'glyphicon glyphicon-user' }),\n                    '\\xA0',\n                    _react2.default.createElement(\n                        'span',\n                        null,\n                        this.props.user.login\n                    )\n                ),\n                _react2.default.createElement(\n                    'td',\n                    null,\n                    this.props.user.dtActive\n                ),\n                _react2.default.createElement(\n                    'td',\n                    { className: 'text-right' },\n                    friendBtn,\n                    '\\xA0',\n                    msgBtn\n                )\n            );\n        }\n    }]);\n\n    return UserItemComp;\n}(_react2.default.Component);\n\n// list of users\n\n\nvar UserListComp = function (_React$Component2) {\n    _inherits(UserListComp, _React$Component2);\n\n    function UserListComp(props) {\n        _classCallCheck(this, UserListComp);\n\n        var _this2 = _possibleConstructorReturn(this, (UserListComp.__proto__ || Object.getPrototypeOf(UserListComp)).call(this, props));\n\n        _this2.state = {\n            start: _this2.props.userList.start,\n            users: _this2.props.userList.users,\n            addUsr: null,\n            rmUsr: null\n        };\n        return _this2;\n    }\n\n    _createClass(UserListComp, [{\n        key: 'componentWillMount',\n        value: function componentWillMount() {\n            this.changePage(this.props.userList.start);\n        }\n    }, {\n        key: 'changePage',\n        value: function changePage() {\n            var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n\n            this.props.dispatch((0, _action.graphql)({\n                type: 'USER_LIST',\n                start: start,\n                perpage: this.props.userList.perpage\n            }));\n        }\n    }, {\n        key: 'showAdd',\n        value: function showAdd(u) {\n            this.setState({ addUsr: u });\n        }\n    }, {\n        key: 'showRemove',\n        value: function showRemove(u) {\n            this.setState({ rmUsr: u });\n        }\n    }, {\n        key: 'cancelAdd',\n        value: function cancelAdd(id) {\n            this.setState({ addUsr: null });\n        }\n    }, {\n        key: 'cancelRemove',\n        value: function cancelRemove(id) {\n            this.setState({ rmUsr: null });\n        }\n    }, {\n        key: 'approveAdd',\n        value: function approveAdd(id) {\n            this.props.dispatch((0, _action.graphql)({\n                type: 'FRIEND_REQUEST',\n                id: id\n            }));\n            this.setState({ addUsr: null });\n        }\n    }, {\n        key: 'approveRemove',\n        value: function approveRemove(id) {\n            this.props.dispatch((0, _action.graphql)({\n                type: 'FRIEND_REMOVE',\n                id: id\n            }));\n            this.setState({ rmUsr: null });\n        }\n    }, {\n        key: 'getUserItems',\n        value: function getUserItems() {\n            var _this3 = this;\n\n            var items = (0, _lodash.map)(this.props.userList.users, function (user) {\n                return _react2.default.createElement(UserItemComp, {\n                    user: user,\n                    showAdd: _this3.showAdd.bind(_this3),\n                    showRemove: _this3.showRemove.bind(_this3)\n                });\n            });\n\n            return _react2.default.createElement(\n                'table',\n                { className: 'table table-hover' },\n                _react2.default.createElement(\n                    'tbody',\n                    null,\n                    items\n                )\n            );\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var alertOpts = null;\n            var users = null;\n\n            if (this.props.userList.status == 'error') {\n                alertOpts = {\n                    className: 'danger',\n                    text: this.props.userList.error\n                };\n            } else if (this.props.userList.status === 'send') {\n                alertOpts = {\n                    className: 'info',\n                    text: 'Loading, please wait'\n                };\n            }\n\n            var pagerParam = {\n                start: this.props.userList.start,\n                perpage: this.props.userList.perpage,\n                count: this.props.userList.count,\n                items: this.getUserItems(),\n                changePage: this.changePage.bind(this)\n            };\n\n            return _react2.default.createElement(\n                'div',\n                null,\n                _react2.default.createElement(_component.AlertMessage, { opts: alertOpts }),\n                _react2.default.createElement(_component.PaginatorLayout, { param: pagerParam }),\n                _react2.default.createElement(_UserModal.UserApproveModal, {\n                    user: this.state.addUsr,\n                    cancelAdd: this.cancelAdd.bind(this),\n                    approveAdd: this.approveAdd.bind(this)\n                }),\n                _react2.default.createElement(_UserModal.UserRemoveModal, {\n                    user: this.state.rmUsr,\n                    cancelRemove: this.cancelRemove.bind(this),\n                    approveRemove: this.approveRemove.bind(this)\n                })\n            );\n        }\n    }]);\n\n    return UserListComp;\n}(_react2.default.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n    return _extends({}, state);\n};\nUserListComp = (0, _reactRedux.connect)(mapStateToProps)(UserListComp);\n\nexports.default = UserListComp;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMzUxLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3N0YXRpY19zcmMvdXNlci9MaXN0Q29tcC5qcz80YjA3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgZ3JhcGhxbCB9IGZyb20gJy4uL2hlbHBlcnMvYWN0aW9uJztcbmltcG9ydCB7bWFwLCBpc051bWJlcn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7QWxlcnRNZXNzYWdlLCBQYWdpbmF0b3JMYXlvdXR9IGZyb20gJy4uL2hlbHBlcnMvY29tcG9uZW50JztcbmltcG9ydCB7VXNlclJlbW92ZU1vZGFsLCBVc2VyQXBwcm92ZU1vZGFsfSBmcm9tICcuL1VzZXJNb2RhbCc7XG5cbi8vIG9uZSB1c2VyIHJvd1xuY2xhc3MgVXNlckl0ZW1Db21wIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBmcmllbmRSZXF1ZXN0IChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZnJpZW5kUmVxdWVzdCh0aGlzLnByb3BzLnVzZXIuaWQpO1xuICAgIH1cbiAgICBmcmllbmRSZW1vdmUgKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5mcmllbmRSZW1vdmUodGhpcy5wcm9wcy51c2VyLmlkKTtcbiAgICB9XG5cbiAgICBzaG93UmVtb3ZlIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2hvd1JlbW92ZSh0aGlzLnByb3BzLnVzZXIpO1xuICAgIH1cbiAgICBzaG93QWRkIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2hvd0FkZCh0aGlzLnByb3BzLnVzZXIpO1xuICAgIH1cblxuICAgIHJlbmRlciAoKSB7XG4gICAgICAgIGxldCB0ZXh0Q2xhc3MgPSB0aGlzLnByb3BzLnVzZXIub25saW5lID8gJ3N1Y2Nlc3MnIDogJ2FjdGl2ZSc7XG4gICAgICAgIGxldCBmcmllbmRCdG4gPSBudWxsO1xuICAgICAgICBsZXQgbXNnQnRuID0gbnVsbFxuICAgICAgICAvLyBpZiBib3RoIHVzZXJzIHNlbmRlZCBmcmllbmQgcmVxdWVzdHNcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VyLnNlbGZGcmllbmRJZCAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VyLmZyaWVuZFVzZXJJZCAhPT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGZyaWVuZEJ0biA9IDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17Ojp0aGlzLnNob3dSZW1vdmV9ID5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLW1pbnVzXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICZuYnNwO1xuICAgICAgICAgICAgICAgIFJlbW92ZSBmcm9tIGZyaWVuZHNcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgbXNnQnRuID0gPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgaHJlZj17XCIvY2hhdC1wcml2YXRlL1wiICsgdGhpcy5wcm9wcy51c2VyLmlkfT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLWVudmVsb3BlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICZuYnNwO1xuICAgICAgICAgICAgICAgIFNlbmQgbWVzc2FnZVxuICAgICAgICAgICAgPC9hPlxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHRoaXMgcm93IHNlbmRlZCByZXF1ZXN0IHRvIGN1cnJlbnQgdXNlclxuICAgICAgICBlbHNlIGlmICh0aGlzLnByb3BzLnVzZXIuc2VsZkZyaWVuZElkICE9PSBudWxsKSB7XG4gICAgICAgICAgICBmcmllbmRCdG4gPSA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9ezo6dGhpcy5zaG93QWRkfSA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICZuYnNwO1xuICAgICAgICAgICAgICAgIEFwcHJvdmUgZnJpZW5kXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgfVxuICAgICAgICAvLyBpZiBjdXJyZW50IHVzZXIgc2VuZGVkIHJlcXVlc3QgdG8gY3VycmVudCByb3dcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9wcy51c2VyLmZyaWVuZFVzZXJJZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZnJpZW5kQnRuID0gPGJ1dHRvbiBkaXNhYmxlZCBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIiBvbkNsaWNrPXs6OnRoaXMuc2hvd0FkZH0gPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tcGx1c1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAmbmJzcDtcbiAgICAgICAgICAgICAgICBBZGQgdG8gZnJpZW5kc1xuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcmllbmRCdG4gPSA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9ezo6dGhpcy5zaG93QWRkfSA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICZuYnNwO1xuICAgICAgICAgICAgICAgIEFkZCB0byBmcmllbmRzXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiA8dHIgY2xhc3NOYW1lPXt0ZXh0Q2xhc3N9PlxuICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdXNlclwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAmbmJzcDtcbiAgICAgICAgICAgICAgICA8c3Bhbj57dGhpcy5wcm9wcy51c2VyLmxvZ2lufTwvc3Bhbj5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMudXNlci5kdEFjdGl2ZX1cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgIHtmcmllbmRCdG59XG4gICAgICAgICAgICAgICAgJm5ic3A7XG4gICAgICAgICAgICAgICAge21zZ0J0bn1cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgfVxufVxuXG4vLyBsaXN0IG9mIHVzZXJzXG5jbGFzcyBVc2VyTGlzdENvbXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc3RhcnQ6IHRoaXMucHJvcHMudXNlckxpc3Quc3RhcnQsXG4gICAgICAgICAgICB1c2VyczogdGhpcy5wcm9wcy51c2VyTGlzdC51c2VycyxcbiAgICAgICAgICAgIGFkZFVzcjogbnVsbCxcbiAgICAgICAgICAgIHJtVXNyOiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQgKCkge1xuICAgICAgICB0aGlzLmNoYW5nZVBhZ2UodGhpcy5wcm9wcy51c2VyTGlzdC5zdGFydCk7XG4gICAgfVxuXG4gICAgY2hhbmdlUGFnZSAoc3RhcnQgPSAwKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goZ3JhcGhxbCh7XG4gICAgICAgICAgICB0eXBlOiAnVVNFUl9MSVNUJyxcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgIHBlcnBhZ2U6IHRoaXMucHJvcHMudXNlckxpc3QucGVycGFnZSxcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHNob3dBZGQgKHUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWRkVXNyOiB1fSk7XG4gICAgfVxuICAgIHNob3dSZW1vdmUgKHUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cm1Vc3I6IHV9KTtcbiAgICB9XG5cbiAgICBjYW5jZWxBZGQgKGlkKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FkZFVzcjogbnVsbH0pO1xuICAgIH1cbiAgICBjYW5jZWxSZW1vdmUgKGlkKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3JtVXNyOiBudWxsfSk7XG4gICAgfVxuXG4gICAgYXBwcm92ZUFkZCAoaWQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChncmFwaHFsKHtcbiAgICAgICAgICAgIHR5cGU6ICdGUklFTkRfUkVRVUVTVCcsXG4gICAgICAgICAgICBpZDogaWRcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHthZGRVc3I6IG51bGx9KTtcbiAgICB9XG5cbiAgICBhcHByb3ZlUmVtb3ZlIChpZCkge1xuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKGdyYXBocWwoe1xuICAgICAgICAgICAgdHlwZTogJ0ZSSUVORF9SRU1PVkUnLFxuICAgICAgICAgICAgaWQ6IGlkXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cm1Vc3I6IG51bGx9KTtcbiAgICB9XG5cbiAgICBnZXRVc2VySXRlbXMgKCkge1xuICAgICAgICBjb25zdCBpdGVtcyA9IG1hcCh0aGlzLnByb3BzLnVzZXJMaXN0LnVzZXJzLCB1c2VyID0+IHtcbiAgICAgICAgICAgIHJldHVybiA8VXNlckl0ZW1Db21wXG4gICAgICAgICAgICAgICAgdXNlcj17dXNlcn1cbiAgICAgICAgICAgICAgICBzaG93QWRkPXs6OnRoaXMuc2hvd0FkZH1cbiAgICAgICAgICAgICAgICBzaG93UmVtb3ZlPXs6OnRoaXMuc2hvd1JlbW92ZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLWhvdmVyXCI+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAge2l0ZW1zfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICB9XG4gICAgXG4gICAgcmVuZGVyICgpIHtcbiAgICAgICAgbGV0IGFsZXJ0T3B0cyA9IG51bGw7XG4gICAgICAgIGxldCB1c2VycyA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudXNlckxpc3Quc3RhdHVzID09ICdlcnJvcicpIHtcbiAgICAgICAgICAgIGFsZXJ0T3B0cyA9IHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMucHJvcHMudXNlckxpc3QuZXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnVzZXJMaXN0LnN0YXR1cyA9PT0gJ3NlbmQnKSB7XG4gICAgICAgICAgICBhbGVydE9wdHMgPSB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnaW5mbycsXG4gICAgICAgICAgICAgICAgdGV4dDogJ0xvYWRpbmcsIHBsZWFzZSB3YWl0JyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYWdlclBhcmFtID0ge1xuICAgICAgICAgICAgc3RhcnQ6IHRoaXMucHJvcHMudXNlckxpc3Quc3RhcnQsXG4gICAgICAgICAgICBwZXJwYWdlOiB0aGlzLnByb3BzLnVzZXJMaXN0LnBlcnBhZ2UsXG4gICAgICAgICAgICBjb3VudDogdGhpcy5wcm9wcy51c2VyTGlzdC5jb3VudCxcbiAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmdldFVzZXJJdGVtcygpLFxuICAgICAgICAgICAgY2hhbmdlUGFnZTogOjp0aGlzLmNoYW5nZVBhZ2UsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8QWxlcnRNZXNzYWdlIG9wdHM9e2FsZXJ0T3B0c30gLz5cbiAgICAgICAgICAgIDxQYWdpbmF0b3JMYXlvdXQgcGFyYW09e3BhZ2VyUGFyYW19IC8+XG4gICAgICAgICAgICA8VXNlckFwcHJvdmVNb2RhbCBcbiAgICAgICAgICAgICAgICB1c2VyPXt0aGlzLnN0YXRlLmFkZFVzcn0gXG4gICAgICAgICAgICAgICAgY2FuY2VsQWRkPXs6OnRoaXMuY2FuY2VsQWRkfVxuICAgICAgICAgICAgICAgIGFwcHJvdmVBZGQ9ezo6dGhpcy5hcHByb3ZlQWRkfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxVc2VyUmVtb3ZlTW9kYWwgXG4gICAgICAgICAgICAgICAgdXNlcj17dGhpcy5zdGF0ZS5ybVVzcn0gXG4gICAgICAgICAgICAgICAgY2FuY2VsUmVtb3ZlPXs6OnRoaXMuY2FuY2VsUmVtb3ZlfVxuICAgICAgICAgICAgICAgIGFwcHJvdmVSZW1vdmU9ezo6dGhpcy5hcHByb3ZlUmVtb3ZlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICByZXR1cm4gey4uLnN0YXRlfVxufVxuVXNlckxpc3RDb21wID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMpKFVzZXJMaXN0Q29tcClcblxuZXhwb3J0IGRlZmF1bHQgVXNlckxpc3RDb21wXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3RhdGljX3NyYy91c2VyL0xpc3RDb21wLmpzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7Ozs7Ozs7OztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUtBO0FBQ0E7QUFmQTtBQWlCQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFLQTtBQUNBO0FBUEE7QUFTQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUhBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUhBO0FBVEE7QUFlQTs7OztBQTdFQTtBQUNBO0FBK0VBO0FBQ0E7QUFDQTtBQURBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBSEE7QUFTQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBREE7QUFLQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBT0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBUkE7QUFjQTs7OztBQTVHQTtBQUNBO0FBOEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///351\n")},352:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _lodash = __webpack_require__(21);\n\nvar initState = {\n    userId: window.localParams.userId ? parseInt(window.localParams.userId) : null,\n    start: window.localParams.start ? parseInt(window.localParams.start) : 0,\n    perpage: window.localParams.perpage ? parseInt(window.localParams.perpage) : 9,\n    users: [],\n    count: 0,\n    status: null,\n    error: null\n};\nvar userList = function userList() {\n    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;\n    var action = arguments[1];\n\n    var data = _extends({}, state);\n    switch (action.type) {\n        case 'USER_LIST_SEND':\n            data.start = action.start;\n            data.status = 'send';\n            return data;\n        case 'USER_LIST_SUCCESS':\n            data.status = 'success';\n            data.users = action.data.getUserList.users;\n            data.count = action.data.getUserList.count;\n            return data;\n        case 'USER_LIST_ERROR':\n            data.status = 'error';\n            data.error = action.error;\n            return data;\n\n        case 'FRIEND_REQUEST_SEND':\n            data.status = 'send';\n            return data;\n        case 'FRIEND_REQUEST_SUCCESS':\n            data.status = 'success';\n            (0, _lodash.forEach)(data.users, function (u) {\n                if (parseInt(u.id) == action.data.friendRequest.friendId) {\n                    u.friendUserId = action.data.friendRequest.userId;\n                }\n            });\n            return data;\n        case 'FRIEND_REQUEST_ERROR':\n            data.status = 'error';\n            return data;\n\n        case 'FRIEND_REMOVE_SEND':\n            data.status = 'send';\n            return data;\n        case 'FRIEND_REMOVE_SUCCESS':\n            data.status = 'success';\n            (0, _lodash.forEach)(data.users, function (u) {\n                if (parseInt(u.id) == action.data.friendRemove.friendId) {\n                    u.friendUserId = null;\n                }\n            });\n            return data;\n        case 'FRIEND_REMOVE_ERROR':\n            data.status = 'error';\n            return data;\n\n        default:\n            return state;\n    }\n};\n\nexports.default = userList;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMzUyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3N0YXRpY19zcmMvdXNlci9MaXN0UmVkLmpzPzcyM2QiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtmb3JFYWNofSBmcm9tICdsb2Rhc2gnO1xubGV0IGluaXRTdGF0ZSA9IHtcbiAgICB1c2VySWQ6IHdpbmRvdy5sb2NhbFBhcmFtcy51c2VySWQgPyBwYXJzZUludCh3aW5kb3cubG9jYWxQYXJhbXMudXNlcklkKSA6IG51bGwsXG4gICAgc3RhcnQ6IHdpbmRvdy5sb2NhbFBhcmFtcy5zdGFydCA/IHBhcnNlSW50KHdpbmRvdy5sb2NhbFBhcmFtcy5zdGFydCkgOiAwLFxuICAgIHBlcnBhZ2U6IHdpbmRvdy5sb2NhbFBhcmFtcy5wZXJwYWdlID8gcGFyc2VJbnQod2luZG93LmxvY2FsUGFyYW1zLnBlcnBhZ2UpIDogOSxcbiAgICB1c2VyczogW10sXG4gICAgY291bnQ6IDAsXG4gICAgc3RhdHVzOiBudWxsLFxuICAgIGVycm9yOiBudWxsLFxufTtcbmNvbnN0IHVzZXJMaXN0ID0gKHN0YXRlID0gaW5pdFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICBsZXQgZGF0YSA9IHsuLi5zdGF0ZX07XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlICdVU0VSX0xJU1RfU0VORCc6XG4gICAgICAgICAgICBkYXRhLnN0YXJ0ID0gYWN0aW9uLnN0YXJ0O1xuICAgICAgICAgICAgZGF0YS5zdGF0dXMgPSAnc2VuZCc7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgY2FzZSAnVVNFUl9MSVNUX1NVQ0NFU1MnOlxuICAgICAgICAgICAgZGF0YS5zdGF0dXMgPSAnc3VjY2Vzcyc7XG4gICAgICAgICAgICBkYXRhLnVzZXJzID0gYWN0aW9uLmRhdGEuZ2V0VXNlckxpc3QudXNlcnM7XG4gICAgICAgICAgICBkYXRhLmNvdW50ID0gYWN0aW9uLmRhdGEuZ2V0VXNlckxpc3QuY291bnQ7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgY2FzZSAnVVNFUl9MSVNUX0VSUk9SJzpcbiAgICAgICAgICAgIGRhdGEuc3RhdHVzID0gJ2Vycm9yJztcbiAgICAgICAgICAgIGRhdGEuZXJyb3IgPSBhY3Rpb24uZXJyb3I7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcblxuICAgICAgICBjYXNlICdGUklFTkRfUkVRVUVTVF9TRU5EJzpcbiAgICAgICAgICAgIGRhdGEuc3RhdHVzID0gJ3NlbmQnO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIGNhc2UgJ0ZSSUVORF9SRVFVRVNUX1NVQ0NFU1MnOlxuICAgICAgICAgICAgZGF0YS5zdGF0dXMgPSAnc3VjY2Vzcyc7XG4gICAgICAgICAgICBmb3JFYWNoKGRhdGEudXNlcnMsIHUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludCh1LmlkKSA9PSBhY3Rpb24uZGF0YS5mcmllbmRSZXF1ZXN0LmZyaWVuZElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHUuZnJpZW5kVXNlcklkID0gYWN0aW9uLmRhdGEuZnJpZW5kUmVxdWVzdC51c2VySWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICBjYXNlICdGUklFTkRfUkVRVUVTVF9FUlJPUic6XG4gICAgICAgICAgICBkYXRhLnN0YXR1cyA9ICdlcnJvcic7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcblxuICAgICAgICBjYXNlICdGUklFTkRfUkVNT1ZFX1NFTkQnOlxuICAgICAgICAgICAgZGF0YS5zdGF0dXMgPSAnc2VuZCc7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgY2FzZSAnRlJJRU5EX1JFTU9WRV9TVUNDRVNTJzpcbiAgICAgICAgICAgIGRhdGEuc3RhdHVzID0gJ3N1Y2Nlc3MnO1xuICAgICAgICAgICAgZm9yRWFjaChkYXRhLnVzZXJzLCB1ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQodS5pZCkgPT0gYWN0aW9uLmRhdGEuZnJpZW5kUmVtb3ZlLmZyaWVuZElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHUuZnJpZW5kVXNlcklkID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICBjYXNlICdGUklFTkRfUkVNT1ZFX0VSUk9SJzpcbiAgICAgICAgICAgIGRhdGEuc3RhdHVzID0gJ2Vycm9yJztcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVzZXJMaXN0XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHN0YXRpY19zcmMvdXNlci9MaXN0UmVkLmpzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFTQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTlDQTtBQWdEQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///352\n")}},[350]);