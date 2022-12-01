'use client';

import { useState } from 'react';
import { CalendarDay } from '../firebase/calendar_day';
import Modal from './calendar-day-modal';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import CalendarDayModal from './calendar-day-modal';

type CalendarDayItemProps = {
  day: CalendarDay;
};

export default function CalendarDayItem({ day }: CalendarDayItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const today = new Date();
  const date = new Date(day.date);
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const isBeforeToday = date < today;

  let classToAdd = '';

  if (isToday) {
    classToAdd += 'calendar-is-today';
  }

  return (
    <>
      <div
        className={`calendar-day-item ${classToAdd}`}
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
      </div>
      <CalendarDayModal closeModal={closeModal} isOpen={isOpen} day={day} />
    </>
  );
}
