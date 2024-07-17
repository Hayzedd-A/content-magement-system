const {
  getEveryUsers,
  retrieveUserById,
  insertNewUser,
  retrieveUserByEmail,
} = require("../models/user.model");
const { createUserSchema } = require("../validations/user.validation");
const encrypt = require("../config/encryption.config");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = async (req, res) => {
  try {
    const users = await getEveryUsers();
    if (!users) throw new Error("There is an error resolving the request");
    if (!users.length) throw new Error("No users yet");
    delete users.password;
    delete users.password_hash;
    res.status(200).json({
      status: true,
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await retrieveUserById(id);
    if (!user) throw new Error("User not found");
    delete user.password;
    delete user.password_hash;
    res.status(200).json({
      status: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    let validation = createUserSchema.validate(req.body);
    if (validation.error) throw new Error(validation.error.details[0].message);
    const checkEmail = await retrieveUserByEmail(req.body.email);
    if (checkEmail.length)
      throw new Error("This email already exist, you can try signing in");
    const password_hash = encrypt.hashPassword(req.body.password);
    const id = uuidv4();
    const user = {
      id,
      ...req.body,
      password_hash,
    };
    const result = await insertNewUser(user);
    if (!result) throw new Error("Failed to create user");
    res.status(201).json({
      status: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { getAllUsers, getUserById, createUser };
