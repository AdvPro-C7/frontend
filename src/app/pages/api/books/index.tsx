import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

const cors = Cors({
    methods: ['GET', 'OPTIONS'], 
    origin: '*', 
    optionsSuccessStatus: 200, 
  });
  
  function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
  }

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await runMiddleware(req, res, cors);
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const response = await axios.get('http://localhost:8080/api/book-details/');
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
