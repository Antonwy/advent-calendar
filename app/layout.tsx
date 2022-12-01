import CalendarHeader from '../components/calendar_header';
import { CalendarApi } from '../firebase/api/calendars';
import { Calendar } from '../firebase/calendar';
import '../styles/globals.css';

type PageParams = {
  params?: { slug: string };
  children: React.ReactNode;
};

async function getCalendarBySlug(slug: string): Promise<Calendar> {
  return CalendarApi.getCalendarById(slug);
}

export default async function CalendarLayout({ params, children }: PageParams) {
  const calendar = params?.slug
    ? await getCalendarBySlug(params.slug)
    : undefined;

  return (
    <html>
      <body className="w-screen h-screen flex flex-col">
        <div className="flex h-20 mt-2 md:mt-6 lg:h-36 items-center justify-start">
          <CalendarHeader calendar={calendar} />
        </div>

        <section className="flex-1 px-8 md:px-16 overflow-auto">
          {children}
        </section>
      </body>
    </html>
  );
}
