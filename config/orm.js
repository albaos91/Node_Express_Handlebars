const connection = require("../config/connection.js");

function printQuestionMarks(num) {
  const arr = [];

  for (const i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function objToSql(ob) {
  const arr = [];

  for (const key in ob) {
    const value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf("") >= 0) {
        value = " ' " + value + " ' ";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

const orm = {
  selectAll: function (tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, results) {
      if (err) {
        throw err;
      }
      cb(results);
    });
  },

  insertOne: function (table, cols, vals, cb) {
    const queryString = "INSERT INTO " + table;

    queryString += "(";
    queryString += cols.toString();
    queryString += ")";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ")";

    console.log(queryString);

    connection.query(queryString, vals, function (err, results) {
      if (err) {
        throw err;
      }
      cb(results);
    });
  },

  updateOne: function (table, objColVals, condition, cb) {
    const queryString = "UPDATE " + table;
    queryString += "SET";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function (err, results) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
};

module.exports = orm;
