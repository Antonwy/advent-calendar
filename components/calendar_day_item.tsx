'use client';

import { useState } from 'react';
import { CalendarDay, CalendarDayFirebase } from '../firebase/calendar_day';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import CalendarDayModal from './calendar_day_modal';
import Image from 'next/image';

type CalendarDayItemProps = {
  day: CalendarDay;
  calendarId: string;
};

export default function CalendarDayItem({
  day,
  calendarId,
}: CalendarDayItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(day.isLocked);

  const openModal = () => {
    setIsLocked(false);
    CalendarDayFirebase.unlockCalendarDay(calendarId, day.id);
    return setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  const today = new Date();
  const date = new Date(day.date);
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const isBeforeToday = date < today;

  let classToAdd = '';

  if (isToday || isBeforeToday) {
    classToAdd += 'calendar-is-ready-but-locked';
  }

  return (
    <>
      <div
        className={`calendar-day-item ${classToAdd} relative overflow-clip`}
        onClick={isToday || isBeforeToday ? openModal : undefined}
      >
        <p className="font-bold text-3xl md:text-4xl lg:text-6xl ">
          {day.dayNumber}
        </p>
        {(isToday || isBeforeToday) && (
          <div className="flex gap-2 items-center">
            <LockClosedIcon className="h-4 w-4" />
            <p className="text-sm md:text-base lg:text-lg">Open Now</p>
          </div>
        )}
        {!isLocked && (
          <Image
            className="object-cover"
            src={day.imageUrl}
            alt="Calendar day image"
            fill={true}
          />
        )}
        {!isLocked && (
          <div className="absolute bottom-4 right-4 z-10">
            <p className="font-bold text-3xl md:text-4xl lg:text-6xl text-white">
              {day.dayNumber}
            </p>
          </div>
        )}
      </div>
      <CalendarDayModal closeModal={closeModal} isOpen={isOpen} day={day} />
    </>
  );
}
