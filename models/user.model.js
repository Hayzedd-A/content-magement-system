const db_conn = require("../config/mysql.config");

const getEveryUsers = async () => {
  try {
    const db = await db_conn();
    let query = `SELECT * FROM users;`;
    let [result] = await db.execute(query);
    // console.log("result: ", result);
    return result;
  } catch (error) {
    console.log("error: ", error.message);
    return false;
  }
};

const retrieveUserById = async id => {
  try {
    const db = await db_conn();
    let query = `SELECT * FROM users WHERE id =?;`;
    let [result] = await db.execute(query, [id]);
    // console.log("result: ", result);
    return result;
  } catch (error) {
    console.log("error: ", error.message);
    return false;
  }
};

const insertNewUser = async userData => {
  try {
    let {
      id,
      firstname,
      lastname,
      email,
      password,
      password_hash,
      age,
      username,
      role,
    } = userData;

    let values = [
      password_hash,
      age,
      lastname,
      email,
      role,
      firstname,
      id,
      username,
      password,
    ];
    let query = `INSERT INTO users (password_hash, age, lastname, email, role, firstname, id, username, password ) VALUES (?,?,?,?,?,?,?,?,?)`;
    let db = await db_conn();
    let [result] = await db.execute(query, values);
    console.log("result: ", result);
    return result;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

const retrieveUserByEmail = async email => {
  try {
    const db = await db_conn();
    let query = `SELECT * FROM users WHERE email =?;`;
    let [result] = await db.execute(query, [email]);
    // console.log("result: ", result);
    return result;
  } catch (error) {
    console.log("error: ", error.message);
    return false;
  }
};

module.exports = {
  getEveryUsers,
  retrieveUserById,
  insertNewUser,
  retrieveUserByEmail,
};
