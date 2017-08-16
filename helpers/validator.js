var rules    = require('../helpers/validationrules'),
    validate = require('validate.js');

exports.scrubAndValidate = function(payload, callback){
  if(payload.firstname){
      payload.firstname = payload.firstname.trim();
  }

  if(payload.lastname){
      payload.lastname = payload.lastname.trim();
  }

  callback(payload, validate(payload, rules.returnRuleSet()))
};
