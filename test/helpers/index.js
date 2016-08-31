let helpers = {}

helpers.getSimpleSchema = ()=>{
    let schema = {
      "properties": {
        "foo": { "type": "string" },
        "bar": { "type": "number", "maximum": 3 }
      }
    };
    return schema;
}

helpers.getSimpleSchemaWithErrors = ()=>{
    let schema = {
      "properties": {
        "foo": { "type": "unknown" },
        "bar": { "type": "number", "maximum": 3 }
      }
    };
    return schema;
}


export default helpers