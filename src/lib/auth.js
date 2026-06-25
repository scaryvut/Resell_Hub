import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(
  process.env.MONGODB_URI
);

await client.connect();

const db = client.db(
  process.env.AUTH_DB_NAME
);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId:
        process.env.GOOGLE_CLIENT_ID,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECREAT,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "buyer",
      },
    },
  },
});