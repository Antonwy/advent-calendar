import Link from 'next/link';
import { CalendarApi } from '../firebase/api/calendars';
import { Calendar } from '../firebase/calendar';

async function getCalendars(): Promise<Calendar[]> {
  return await CalendarApi.getCalendars();
}

export default async function Page() {
  const calendars = await getCalendars();

  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
      {calendars.map((calendar) => (
        <Link
          key={calendar.id}
          type="button"
          className="w-36 text-center rounded-lg bg-green-light p-4 text-green hover:bg-green hover:text-white transition-all outline-none ease-in-out"
          href={`/${calendar.id}`}
        >
          {calendar.name}
        </Link>
      ))}
    </div>
  );
}
