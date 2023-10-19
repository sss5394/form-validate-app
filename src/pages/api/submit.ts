import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  //const id = await createItem(data);
  //console.log(data);
  res.status(200).json({ data });
}
