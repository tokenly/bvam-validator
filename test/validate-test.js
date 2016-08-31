import should    from 'should';
import sinon     from 'sinon';
import Validator from '..';
import helpers   from './helpers';

describe('The Validator', () => {
    it('exists', () => {
        let validator = Validator.init();
        validator.should.not.be.null();
    });

    it('validates a simple schema', () => {
        let validator = Validator.init();

        let result = validator.validateSchema(helpers.getSimpleSchemaWithErrors())
        result.valid.should.be.false();
        result.errorsText.should.match(/schema is invalid/);
    });

    it('validates a simple schema when validating data', () => {
        let validator = Validator.init();

        let result = validator.validateData({foo: "abc", bar: 2}, helpers.getSimpleSchemaWithErrors())
        result.valid.should.be.false();
        result.errors.should.not.be.null();
        result.errorsText.should.match(/schema is invalid/);
    });

    it('validates data with the result of validate schema', () => {
        let validator = Validator.init();

        let result = validator.validateSchema(helpers.getSimpleSchema())
        result.valid.should.be.true();
        
        let resultWithErrors = validator.validateSchema(helpers.getSimpleSchemaWithErrors())
        resultWithErrors.valid.should.be.false();

        validator.validateData({foo: "abc", bar: 2}, result.compiledValidator).valid.should.be.true();
        validator.validateData({foo: "abc", bar: 2}, result).valid.should.be.true();

        validator.validateData({foo: "abc", bar: 2}, resultWithErrors.compiledValidator).valid.should.be.false();
        validator.validateData({foo: "abc", bar: 2}, resultWithErrors).valid.should.be.false();
    });

    it('validates simple data against a schema', () => {
        let validator = Validator.init();

        let result = validator.validateData({foo: "abc", bar: 2}, helpers.getSimpleSchema())
        result.valid.should.be.true();
        should.equal(result.errors, null);
        result.errorsText.should.eql('No errors');

        let result2 = validator.validateData({foo: 5, bar: 6}, helpers.getSimpleSchema());
        // console.log('result'+JSON.stringify(result2.errors,null,2));
        result2.valid.should.be.false();
        result2.errors.should.not.be.null();
        result2.errorsText.should.equal("data.foo should be string, data.bar should be <= 3");
    });

});

