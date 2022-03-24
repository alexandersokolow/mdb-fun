const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

function makeFunctions(database) {

  const doFind = async (collection, query) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db(database);
        dbo.collection(collection).find(query).toArray((err, result) => {
          db.close();
          if (err) reject(err);
          resolve(result);
        });
      });
    });
  }

  const doFindOne = async (collection, query) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db(database);
        dbo.collection(collection).findOne(query, (err, result) => {
          db.close();
          if (err) reject(err);
          resolve(result);
        });
      });
    });
  }

  const doFindSort = async (collection, query, sort) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db(database);
        dbo.collection(collection).find(query, sort).toArray((err, result) => {
          db.close();
          if (err) reject(err);
          resolve(result);
        });
      });
    });
  }

  const doUpdate = async (collection, query, setter) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db(database);
        dbo.collection(collection).updateOne(query, setter, { multi: true }, (err, result) => {
          db.close();
          if (err) reject(err)
          resolve(result);
        });
      });
    });
  }

  const doUpdateOne = async (collection, query, setter) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db(database);
        dbo.collection(collection).updateOne(query, setter, (err, result) => {
          db.close();
          if (err) reject(err)
          resolve(result);
        });
      });
    });
  }

  const doInsert = async (collection, values) => {
    return new Promise((resolve,reject) => {
      MongoClient.connect(url, (err, db) => {
        if (err) reject(err);
        var dbo = db.db(database);
        dbo.collection(collection).insertOne(values, (err, result) => {
          db.close();
          if (err) reject(err);
          resolve(result);
        });
      });
    });
  }

  const doDelete = async (collection, query) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db(database);
        dbo.collection(collection).deleteMany(query, (err, result) => {
          db.close();
          if (err) reject(err)
          resolve(result);
        });
      });
    });
  }

  return {
    doFind,
    doFindSort,
    doFindOne,
    doUpdate,
    doUpdateOne,
    doInsert,
    doDelete
  }
}

module.exports = makeFunctions;
