import dotenv from 'dotenv';
import path from 'path';

// Solo usar dotenv si NO estamos en Railway

if (!process.env.RAILWAY_ENVIRONMENT) {
    dotenv.config({ path: path.resolve(__dirname, '../../.env') });
}