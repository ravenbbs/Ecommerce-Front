const { MongoClient } = require("mongodb");

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // En modo desarrollo, usa una variable global para que el valor
  // se preserve en recargas de módulo causadas por HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En modo producción, es mejor no usar una variable global.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Exporta una promesa MongoClient con ámbito de módulo. Al hacer esto en un
// módulo separado, el cliente se puede compartir entre funciones.
module.exports = clientPromise;