import axios from 'axios';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import Cors from 'cors';

const cors = Cors({
    methods: ['GET', 'OPTIONS'], 
    origin: '*', 
    optionsSuccessStatus: 200, 
  });
  
  function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: (req: NextApiRequest, res: NextApiResponse, callback: (err?: any) => void) => void) {
    return new Promise<void>((resolve, reject) => {
        fn(req, res, (err?: any) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await runMiddleware(req, res, cors);
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const response = await axios.get('http://localhost:8087/api/book-details/');
                res.status(200).json(response.data);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching books' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};
