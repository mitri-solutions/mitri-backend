import * as Joi from "joi";

import * as dotenv from "dotenv";

const envConfig = dotenv.config().parsed;
export { envConfig };


export interface AppConfiguration {
  API_PORT: number;
  REDIS_HOST: string;
  REDIS_PORT: number;
  MONGODB_URL: string;
}

const env: AppConfiguration = {
  API_PORT: +envConfig.API_PORT,
  REDIS_HOST: envConfig.REDIS_HOST,
  REDIS_PORT: +envConfig.REDIS_PORT,
  MONGODB_URL: envConfig.MONGODB_URL
};

// validate config if invalid throw error
export const validationSchema = Joi.object({
  API_PORT: Joi.number().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  MONGODB_URL: Joi.string().required(),
});

export default (): AppConfiguration => {
  const { error } = validationSchema.validate(env);
  if (error) {
    throw new Error(error.message);
  }
  return env;
};
