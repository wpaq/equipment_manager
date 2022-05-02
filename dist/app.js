"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config();

var _expresssession = require('express-session'); var _expresssession2 = _interopRequireDefault(_expresssession);
var _cookieparser = require('cookie-parser'); var _cookieparser2 = _interopRequireDefault(_cookieparser);
var _connectflash = require('connect-flash'); var _connectflash2 = _interopRequireDefault(_connectflash);
var _csurf = require('csurf'); var _csurf2 = _interopRequireDefault(_csurf);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);

require('./database/index');

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _homeRoutes = require('./routes/homeRoutes'); var _homeRoutes2 = _interopRequireDefault(_homeRoutes);
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _loginRoutes = require('./routes/loginRoutes'); var _loginRoutes2 = _interopRequireDefault(_loginRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _equipmentRoutes = require('./routes/equipmentRoutes'); var _equipmentRoutes2 = _interopRequireDefault(_equipmentRoutes);
var _qrcodeRoutes = require('./routes/qrcodeRoutes'); var _qrcodeRoutes2 = _interopRequireDefault(_qrcodeRoutes);
var _middleware = require('./middlewares/middleware');

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, ));
    this.app.use(_helmet2.default.call(void 0, ));

    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());    
    this.app.use(_cookieparser2.default.call(void 0, ));
    this.app.use(_express2.default.static('public'));
    this.app.use(_expresssession2.default.call(void 0, {
        secret: process.env.TOKEN_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { 
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true 
        }
    }));
    this.app.use(_connectflash2.default.call(void 0, ));
    this.app.use(_csurf2.default.call(void 0, ));
    this.app.use(_middleware.middlewareGlobal);
    this.app.use(_middleware.checkCsrfError);
    this.app.use(_middleware.csrfMiddleware);

    this.app.use(_express2.default.static('public'));
    this.app.set('view engine', 'ejs');
    this.app.set('views', './src/views');
  }

  routes() {
    this.app.use('/', _homeRoutes2.default);
    this.app.use('/user/', _userRoutes2.default);
    this.app.use('/login/', _loginRoutes2.default);
    this.app.use('/token/', _tokenRoutes2.default);
    this.app.use('/equipment/', _equipmentRoutes2.default);
    this.app.use('/qrcode/', _qrcodeRoutes2.default);
    this.app.use('*', function (req, res) {
        res.render('404', { title:'404' });
    });    
  }
}

exports. default = new App().app;
