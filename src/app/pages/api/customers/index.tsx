import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const response = await axios.get('http://localhost:8080/api/customer/');
                res.status(200).json(response.data);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching customers' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};
