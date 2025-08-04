// TODO: add config for the api

export const config = {
  port: process.env.PORT || 3001,
  db: {
    url: process.env.DATABASE_URL,
  },
};
