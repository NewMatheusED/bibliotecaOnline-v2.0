import { updateUser } from '../../lib/queries';
import multer from 'multer';
import path from 'path';

// Configuração do Multer
const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(process.cwd(), 'public/images'), // Pasta onde as imagens serão salvas
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName); // Define o novo nome para o arquivo
    },
  }),
});

const uploadMiddleware = upload.single('profilePicture');

export const config = {
  api: {
    bodyParser: false, // Desativa o bodyParser para lidar com FormData
  },
};

// Helper para usar middlewares em rotas Next.js
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
    // Processa o upload com Multer
    await runMiddleware(req, res, uploadMiddleware);

    // Dados do usuário
    const { userId, name, email } = req.body;

    // Nome do arquivo enviado
    const profilePicture = req.file ? req.file.filename : null; // `req.file.filename` contém o novo nome gerado

    console.log('Uploaded profilePicture:', profilePicture);

    // Atualiza o usuário no banco de dados
    const updatedUser = await updateUser(userId, name, email, profilePicture);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user: ' + error.message });
  }
}