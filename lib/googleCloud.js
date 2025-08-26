import { Storage } from '@google-cloud/storage';
import path from 'path';

const storage = new Storage({
  keyFilename: path.join(process.cwd(), process.env.GOOGLE_CLOUD_KEY),
  projectId: process.env.GOOGLE_PROJECT_ID,
});

export const bucket = storage.bucket(process.env.BUCKET_NAME);
