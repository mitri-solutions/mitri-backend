import * as Joi from "joi";

import * as dotenv from "dotenv";

const envConfig = dotenv.config().parsed;
export { envConfig };

export interface AppConfiguration {
  API_PORT: number;
}

const env: AppConfiguration = {
  API_PORT: +envConfig.API_PORT
};

// validate config if invalid throw error
export const validationSchema = Joi.object({
  API_PORT: Joi.number().required()
});

export default (): AppConfiguration => {
  const { error } = validationSchema.validate(env);
  if (error) {
    throw new Error(error.message);
  }
  return env;
};
