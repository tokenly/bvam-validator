import should    from 'should';
import sinon     from 'sinon';
import Hasher    from '../lib/hasher';
import helpers   from './helpers';

describe('The Hasher', () => {
    it('computes hash', () => {
        let hashString;

        hashString = Hasher.buildBVAMHash('TestString');
        hashString.should.eql('TffXnKGm269CScPAfRWhNXgTj7pN')

        hashString = Hasher.buildBVAMHash('TestString', undefined);
        hashString.should.eql('TffXnKGm269CScPAfRWhNXgTj7pN')

        hashString = Hasher.buildBVAMHash('TestString', 'TheSuffix');
        hashString.should.eql('T34W3m89gMaPGXvYzbhrcsUbrigdk')

        hashString = Hasher.buildBVAMCategorySchemaHash('TestString');
        hashString.should.eql('SffXnKGm269CScPAfRWhNXgTj7pN')
    });





});

