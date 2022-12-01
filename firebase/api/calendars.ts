import { Calendar } from '../calendar';
import { fetchApi } from './api';

export namespace CalendarApi {
  export const getCalendars = async (): Promise<Calendar[]> => {
    return fetchApi<Calendar[]>('calendars');
  };

  export const getCalendarById = async (id: string): Promise<Calendar> => {
    return fetchApi<Calendar>(`calendars/${id}`, (res) => {
      return {
        ...res,
        startDate: new Date(res.startDate).getTime(),
        days: res.days.map((day, index) => {
          return {
            ...day,
            date: new Date(day.date).getTime(),
            dayNumber: index + 1,
          };
        }),
      };
    });
  };
}
