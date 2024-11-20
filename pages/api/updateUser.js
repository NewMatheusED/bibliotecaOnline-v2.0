import { updateUser } from '../../lib/queries';
import multer from 'multer';
import { uploadImageToStorage } from '../../lib/uploadImageToStorage';
import mime from 'mime-types';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadMiddleware = upload.single('profilePicture');

export const config = {
  api: {
    bodyParser: false,
  },
};

const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    await runMiddleware(req, res, uploadMiddleware);

    const { userId, name, email } = req.body;
    let profilePictureUrl = null;

    if (req.file) {
      const fileName = `${userId}-${Date.now()}.${mime.extension(req.file.mimetype)}`;
      profilePictureUrl = await uploadImageToStorage(req.file.buffer, fileName);
    }

    const updatedUser = await updateUser(userId, name, email, profilePictureUrl);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user: ' + error.message });
  }
}