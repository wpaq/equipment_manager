"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config();

var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

const port = process.env.APP_PORT;
_app2.default.listen(port, "0.0.0.0", function() {
    console.log(`Listening on Port ${port}`);
});
