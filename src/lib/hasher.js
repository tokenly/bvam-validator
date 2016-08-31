import SHA256    from 'crypto-js/sha256';
import RIPEMD160 from 'crypto-js/ripemd160';
import bs58      from 'bs58';

let Hasher = {};

Hasher.buildBVAMHash = (jsonString, suffix=null)=>{
    return buildBVAM("T", jsonString, suffix);
}

Hasher.buildBVAMCategorySchemaHash = (jsonString, suffix=null)=>{
    return buildBVAM("S", jsonString, suffix);
}

Hasher.buildBase58 = (source)=>{
    let sha256Data = SHA256(source);
    let hash160Data = RIPEMD160(sha256Data);
    return bs58.encode(new Buffer(hash160Data.toString(), 'hex'));
}


// ------------------------------------------------------------------------

function appendSuffix(jsonString, suffix=null) {
    return '' + jsonString + (suffix == null ? '' : suffix);
}

function buildBVAM(prefix, jsonString, suffix=null) {
    let source = appendSuffix(jsonString, suffix);
    let base58EncodedString = Hasher.buildBase58(source)
    return prefix + base58EncodedString;
}

export default Hasher;
