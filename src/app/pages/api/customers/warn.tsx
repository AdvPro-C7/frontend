import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'POST':
            try {
                const response = await axios.post(`http://localhost:8080/api/customer/warn/${id}`);
                res.status(200).json(response.data);
            } catch (error) {
                res.status(500).json({ message: 'Error warning customer' });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};
