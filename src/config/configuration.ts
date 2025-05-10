const configuration = () => {
  return {
    jwt: {
      secret: process.env.JWT_SECRET,
      exp: process.env.JWT_EXP,
    },
    database: {
      name: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      user: process.env.DATABASE_USER,
      port: process.env.DATABASE_PORT,
      host: process.env.DATABASE_HOST,
    },
  };
};

export default configuration;
