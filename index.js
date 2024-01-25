const { MongoClient } = require("mongodb");
const uri = "mongodb://0.0.0.0:27017/";

function makeFunctions(database) {
  const doFind = async (collection, query) => {
    const client = new MongoClient(uri);
    try {
      console.log("trying to connect...");
      await client.connect();
      console.log("connected!");
      var dbo = client.db(database);
      const result = await dbo.collection(collection).find(query).toArray();
      return result;
    } catch (err) {
      console.log("err: ", err);
    } finally {
      client.close();
    }
  };

  const doFindOne = async (collection, query) => {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      var dbo = client.db(database);
      const result = await dbo.collection(collection).findOne(query);
      return result;
    } catch (err) {
      console.log("err: ", err);
    } finally {
      client.close();
    }
  };

  const doUpdate = async (collection, query, setter) => {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      var dbo = client.db(database);
      const result = await dbo
        .collection(collection)
        .updateOne(query, setter, { multi: true });
      return result;
    } catch (err) {
      console.log("err: ", err);
    } finally {
      client.close();
    }
  };

  const doUpdateOne = async (collection, query, setter) => {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      var dbo = client.db(database);
      const result = await dbo.collection(collection).updateOne(query, setter);
      return result;
    } catch (err) {
      console.log("err: ", err);
    } finally {
      client.close();
    }
  };

  const doInsert = async (collection, values) => {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      var dbo = client.db(database);
      const result = await dbo.collection(collection).insertOne(values);
      return result;
    } catch (err) {
      console.log("err: ", err);
    } finally {
      client.close();
    }
  };

  const doDelete = async (collection, query) => {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      var dbo = client.db(database);
      const result = await dbo.collection(collection).deleteMany(query);
      return result;
    } catch (err) {
      console.log("err: ", err);
    } finally {
      client.close();
    }
  };

  return {
    doFind,
    doFindOne,
    doUpdate,
    doUpdateOne,
    doInsert,
    doDelete,
  };
}

module.exports = makeFunctions;
