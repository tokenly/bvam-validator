"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _ajv = require("ajv");

var _ajv2 = _interopRequireDefault(_ajv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Validator = {};

Validator.init = function (opts) {
    var validator = {};

    opts = opts || {};
    var ajv = (0, _ajv2.default)({ allErrors: true });

    // schema: a javascript object
    // returns {
    //   "valid": true,
    //   "errorsText": "No errors", // a string of all errors
    // }
    validator.validateSchema = function (schema) {
        var result = {};

        try {
            var compiledValidator = ajv.compile(schema);
            result.valid = true;
            result.compiledValidator = compiledValidator;
            result.errorsText = "No errors";
        } catch (e) {
            result.valid = false;
            result.compiledValidator = null;
            result.errorsText = "" + e;
        }

        return result;
    };

    // jsonData: a javascript object
    // schema: a javascript object, a compiled validator or the result of validateSchema
    // returns {
    //   "valid": true,
    //   "errors": null, // or array of error objects
    //   "errorsText": "No errors", // a string of all errors
    // }
    validator.validateData = function (jsonData, schema) {
        var result = {};

        var compiledValidator = void 0;

        var schemaObjType = schema === null ? 'null' : typeof schema === "undefined" ? "undefined" : _typeof(schema);
        if (schemaObjType === 'function') {
            compiledValidator = schema;
        } else {
            var validateSchemaResult = void 0;
            if (schemaObjType === 'object' && schema.valid != null && schema.errorsText != null) {
                // result of validateSchema
                validateSchemaResult = schema;
            } else {
                // plain object
                validateSchemaResult = validator.validateSchema(schema);
            }

            var errorMsg = null;
            if (validateSchemaResult == null) {
                errorMsg = "Invalid schema type";
            } else {
                if (!validateSchemaResult.valid) {
                    errorMsg = validateSchemaResult.errorsText;
                }
            }
            if (errorMsg !== null) {
                return {
                    valid: false,
                    errors: [{ message: errorMsg }],
                    errorsText: errorMsg
                };
            }
            compiledValidator = validateSchemaResult.compiledValidator;
        }

        result.valid = compiledValidator(jsonData);
        result.errors = compiledValidator.errors;
        result.errorsText = ajv.errorsText(compiledValidator.errors);

        return result;
    };

    // ------------------------------------------------------------------------
    return validator;
};

exports.default = Validator;