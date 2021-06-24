const Joi = require("@hapi/joi");

module.exports.validateRegister = (data) => {
  // schema
  const schema = Joi.object({
    name: Joi.string().required().min(6).max(255),
    email: Joi.string().required().min(6).email(),
    phone: Joi.string().required().min(9).max(255),
    password: Joi.string()
      .required()
      .min(6)
      .max(255)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirmPassword: Joi.ref("password"),
  });

  return schema.validate(data);
};

module.exports.validateLogin = (data) => {
  //schema
  const schema = Joi.object({
    email: Joi.string().required().min(6).max(255).email(),
    password: Joi.string().required().min(6).max(255),
  });

  return schema.validate(data);
};
