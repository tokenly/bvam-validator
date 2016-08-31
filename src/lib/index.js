import Ajv from 'ajv';


let Validator = {};

Validator.init = (opts)=>{
    let validator = {}

    opts = opts || {}
    let ajv = Ajv({allErrors: true});


    // schema: a javascript object
    // returns {
    //   "valid": true,
    //   "errorsText": "No errors", // a string of all errors
    // }
    validator.validateSchema = (schema) => {
        let result = {}

        try {
            let compiledValidator = ajv.compile(schema);
            result.valid = true
            result.compiledValidator = compiledValidator
            result.errorsText = "No errors"
        } catch (e) {
            result.valid = false
            result.compiledValidator = null
            result.errorsText = ""+e
        }

        return result
    }

    // jsonData: a javascript object
    // schema: a javascript object, a compiled validator or the result of validateSchema
    // returns {
    //   "valid": true,
    //   "errors": null, // or array of error objects
    //   "errorsText": "No errors", // a string of all errors
    // }
    validator.validateData = (jsonData, schema) => {
        let result = {}

        let compiledValidator;

        let schemaObjType = schema === null ? 'null' : typeof(schema);
        if (schemaObjType === 'function') {
            compiledValidator = schema;
        } else {
            let validateSchemaResult
            if (schemaObjType === 'object' && schema.valid != null && schema.errorsText != null) {
                // result of validateSchema
                validateSchemaResult = schema
            } else {
                // plain object
                validateSchemaResult = validator.validateSchema(schema)
            }

            let errorMsg = null
            if (validateSchemaResult == null) {
                errorMsg = "Invalid schema type"
            } else {
                if (!validateSchemaResult.valid) {
                    errorMsg = validateSchemaResult.errorsText
                }
            }
            if (errorMsg !== null) {
                return {
                    valid: false,
                    errors: [{message: errorMsg}],
                    errorsText: errorMsg
                }
            }
            compiledValidator = validateSchemaResult.compiledValidator
        }

        result.valid = compiledValidator(jsonData);
        result.errors = compiledValidator.errors;
        result.errorsText = ajv.errorsText(compiledValidator.errors);


        return result
    }

    // ------------------------------------------------------------------------
    return validator;
}


export default Validator;