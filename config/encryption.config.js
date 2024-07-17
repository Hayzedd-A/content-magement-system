const encrypt = require("bcryptjs");

const hashPassword = password => {
  const salt = encrypt.genSaltSync(10);
  return encrypt.hashSync(password, salt);
};

const validatePassword = (password, hashedPassword) => {
  return encrypt.compareSync(password, hashedPassword);
};

module.exports = {
  hashPassword,
  validatePassword,
};
