import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  QuerySnapshot,
  SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';
import { db } from './app';

export type CalendarDay = {
  id: string;
  date: number;
  imageUrl: string;
  dayNumber: number;
};

export namespace CalendarDayFirebase {
  export const getAllByCalendarId = (
    calendarId: string
  ): Promise<QuerySnapshot<CalendarDay>> => {
    const ref = collection(db, `calendars/${calendarId}/days`).withConverter(
      calendarDayConverter
    );

    return getDocs(ref);
  };

  const calendarDayConverter = {
    toFirestore: (calendar: CalendarDay) => {
      return {
        id: calendar.id,
        date: calendar.date,
        image_url: calendar.imageUrl,
      };
    },
    fromFirestore: (snap: QueryDocumentSnapshot, options: SnapshotOptions) => {
      const data = snap.data(options);

      return {
        id: snap.id,
        date: (data.date as Timestamp).toDate().getTime(),
        imageUrl: data.image_url,
        dayNumber: data.day_number ?? 0,
      };
    },
  };
}
