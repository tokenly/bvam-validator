'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sha = require('crypto-js/sha256');

var _sha2 = _interopRequireDefault(_sha);

var _ripemd = require('crypto-js/ripemd160');

var _ripemd2 = _interopRequireDefault(_ripemd);

var _bs = require('bs58');

var _bs2 = _interopRequireDefault(_bs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hasher = {};

Hasher.buildBVAMHash = function (jsonString) {
    var suffix = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    return buildBVAM("T", jsonString, suffix);
};

Hasher.buildBVAMCategorySchemaHash = function (jsonString) {
    var suffix = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    return buildBVAM("S", jsonString, suffix);
};

Hasher.buildBase58 = function (source) {
    var sha256Data = (0, _sha2.default)(source);
    var hash160Data = (0, _ripemd2.default)(sha256Data);
    return _bs2.default.encode(new Buffer(hash160Data.toString(), 'hex'));
};

// ------------------------------------------------------------------------

function appendSuffix(jsonString) {
    var suffix = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    return '' + jsonString + (suffix == null ? '' : suffix);
}

function buildBVAM(prefix, jsonString) {
    var suffix = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    var source = appendSuffix(jsonString, suffix);
    var base58EncodedString = Hasher.buildBase58(source);
    return prefix + base58EncodedString;
}

exports.default = Hasher;