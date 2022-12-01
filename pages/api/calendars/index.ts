import type { NextApiRequest, NextApiResponse } from 'next';
import { CalendarApi } from '../../../firebase/api/calendars';
import { Calendar, CalendarFirebase } from '../../../firebase/calendar';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const qs = await CalendarFirebase.getAll();

      return res.status(200).json(qs.docs.map((doc) => doc.data()));
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}
