import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
  QuerySnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import { db } from './app';
import { CalendarDay } from './calendar_day';

export type Calendar = {
  id: string;
  name: string;
  days: CalendarDay[];
  type: CalendarType;
  startDate: number;
};

export enum CalendarType {
  advent = 'advent',
}

export namespace CalendarFirebase {
  export const getById = (id: string): Promise<DocumentSnapshot<Calendar>> => {
    const ref = doc(db, 'calendars', id).withConverter(calendarConverter);

    return getDoc(ref);
  };

  export const getAll = (): Promise<QuerySnapshot<Calendar>> => {
    const ref = collection(db, 'calendars').withConverter(calendarConverter);

    return getDocs(ref);
  };

  const calendarConverter = {
    toFirestore: (calendar: Calendar) => calendar,
    fromFirestore: (snap: QueryDocumentSnapshot, options: SnapshotOptions) => {
      const data = snap.data(options);

      return {
        id: snap.id,
        name: data.name,
        type: data.type,
        days: data.days ?? [],
        startDate: data.start_date.toDate(),
      };
    },
  };
}
