import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  SnapshotOptions,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from './app';

export type CalendarDay = {
  id: string;
  date: number;
  imageUrl: string;
  dayNumber: number;
  isLocked: boolean;
};

export namespace CalendarDayFirebase {
  export const unlockCalendarDay = (calendarId: string, dayId: string) => {
    const ref = doc(db, `calendars/${calendarId}/days/${dayId}`);

    return updateDoc(ref, {
      is_locked: false,
    });
  };

  export const lockCalendarDay = (calendarId: string, dayId: string) => {
    const ref = doc(db, `calendars/${calendarId}/days/${dayId}`);

    return updateDoc(ref, {
      is_locked: true,
    });
  };

  export const getAllByCalendarId = (
    calendarId: string
  ): Promise<QuerySnapshot<CalendarDay>> => {
    const ref = collection(db, `calendars/${calendarId}/days`).withConverter(
      calendarDayConverter
    );

    const q = query(ref, orderBy('date', 'asc'));

    return getDocs(q);
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
        isLocked: data.is_locked ?? true,
      };
    },
  };
}
