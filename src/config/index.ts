import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  jwt_refresh_key: process.env.JWT_REFRESH_KEY,
  cloudinary_api_key :process.env.Cloudinary_API_KEY,
  cloudinary_api_secret: process.env.Cloudinary_API_SECRET
};
