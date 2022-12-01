import CalendarDayItem from '../../components/calendar_day_item';
import { CalendarApi } from '../../firebase/api/calendars';
import { Calendar } from '../../firebase/calendar';

type PageParams = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const res = await CalendarApi.getCalendars();

  return res.map((cal) => ({
    slug: cal.id,
  }));
}

async function getCalendarBySlug(slug: string): Promise<Calendar> {
  return CalendarApi.getCalendarById(slug);
}

export default async function Page({ params }: PageParams) {
  const calendar = await getCalendarBySlug(params.slug);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-4">
      {calendar.days.map((day) => (
        <CalendarDayItem key={day.id} day={day} calendarId={calendar.id} />
      ))}
    </div>
  );
}
