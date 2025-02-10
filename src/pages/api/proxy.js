/* eslint-disable @typescript-eslint/no-unused-vars */

export default async function handler(req, res) {
    const { query } = req;
    const url = `https://sandbox.cruisebound-qa.com/sailings`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}