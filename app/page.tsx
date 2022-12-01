import Link from 'next/link';
import { CalendarApi } from '../firebase/api/calendars';
import { Calendar } from '../firebase/calendar';

async function getCalendars(): Promise<Calendar[]> {
  return await CalendarApi.getCalendars();
}

export default async function Page() {
  const calendars = await getCalendars();

  return (
    <div className="">
      {calendars.map((calendar) => (
        <Link
          key={calendar.id}
          type="button"
          className="rounded-md bg-green-light p-2 text-green transition-all outline-none ease-in-out"
          href={`/${calendar.id}`}
        >
          {calendar.name}
        </Link>
      ))}
    </div>
  );
}
