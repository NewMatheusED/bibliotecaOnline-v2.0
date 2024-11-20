import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import mime from 'mime-types';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadImageToStorage = async (buffer, fileName) => {
  const contentType = mime.lookup(fileName) || 'application/octet-stream';

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `uploads/${fileName}`,
    Body: buffer,
    ContentType: contentType,
    ACL: 'public-read',
  };

  const command = new PutObjectCommand(params);
  const data = await s3Client.send(command);
  return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`; // URL da imagem no S3
};