const Ajv = require("ajv");

const ajv = new Ajv({ strict: false });


function errorResponse(schemaErrors) {
    let errors = schemaErrors.map((error) => {
      return {
        path: error.dataPath,
        message: error.message,
        additionalProperty: error.params.additionalProperty
      }
    })
    return {
      status: 'failed',
      errors: errors
    }
  }


function validateSchema(schema) {
    return (req, res, next) => {
        //const schema = require(`../schema/${schemaName}.json`);
        const validate = ajv.compile(schema);
        const valid = validate(req.body);
        if (!valid) {
            res.status(400).json(errorResponse(validate.errors));
        } else {
            next();
        }
    }
}

module.exports = {validateSchema};