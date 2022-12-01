import { Calendar, CalendarType } from '../firebase/calendar';

type CalendarHeaderProps = {
  calendar?: Calendar;
};

export default function CalendarHeader({ calendar }: CalendarHeaderProps) {
  const prettyType = (type: CalendarType): string => {
    switch (type) {
      case CalendarType.advent:
        return 'Advent Calendar';
      default:
        return 'Unknown';
    }
  };

  return (
    <header className="flex gap-1 px-8 md:px-16">
      <h1 className="text-black font-semibold text-sm sm:text-base lg:text-xl">
        {calendar?.name ?? 'Advent'}
      </h1>
      <h1 className="text-gray font-semibold text-sm sm:text-base lg:text-xl">
        {calendar ? prettyType(calendar?.type) : 'Calendar'}
      </h1>
    </header>
  );
}
