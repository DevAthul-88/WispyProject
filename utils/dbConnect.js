import mongoose from "mongoose";

const connection = {};

async function connect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGO_DB_URL);

  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected);
  return db;
}

export default connect;
