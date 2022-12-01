import { NextApiRequest, NextApiResponse } from 'next/types';
import { CalendarFirebase } from '../../../firebase/calendar';
import { CalendarDayFirebase } from '../../../firebase/calendar_day';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const { calendarId } = req.query;

      if (typeof calendarId !== 'string') {
        return res.status(400).json({ message: 'Bad request' });
      }

      const ds = await CalendarFirebase.getById(calendarId);

      const calendar = ds.data();

      const daysDs = await CalendarDayFirebase.getAllByCalendarId(calendarId);

      calendar?.days?.push(...daysDs.docs.map((d) => d.data()));

      return res.status(200).json(calendar);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}
