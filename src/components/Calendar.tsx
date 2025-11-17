import { useMemo } from "react";

interface CalendarProps {
  currentDate: Date;
  selectedDates: Set<string>;
  onToggleDate: (dateString: string) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

function Calendar({
  currentDate,
  selectedDates,
  onToggleDate,
  onPreviousMonth,
  onNextMonth,
}: CalendarProps) {
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay();
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();

    const days: (number | null)[] = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      days.push(day);
    }

    return days;
  }, [currentDate]);

  const getDateString = (day: number): string => {
    return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
  };

  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === currentDate.getMonth() &&
    today.getFullYear() === currentDate.getFullYear();

  return (
    <div
      className="bg-white dark:bg-darkCard rounded-3xl shadow-xl hover:shadow-2xl 
                    transition-all duration-500 p-6 sm:p-8 flex-[2] w-full 
                    backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90
                    border border-border dark:border-darkBorder
                    animate-slide-up"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={onPreviousMonth}
          className="group relative bg-gradient-to-br from-primary to-primaryDark text-white 
                     text-xl font-bold w-12 h-12 rounded-xl
                     hover:scale-110 active:scale-95 
                     transition-all duration-300 shadow-lg hover:shadow-xl
                     flex items-center justify-center"
          aria-label="Previous month"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-300">
            ←
          </span>
        </button>

        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-textPrimary dark:text-white">
            {MONTHS[currentDate.getMonth()]}
          </div>
          <div className="text-sm text-textSecondary dark:text-gray-400 font-medium mt-1">
            {currentDate.getFullYear()}
          </div>
        </div>

        <button
          onClick={onNextMonth}
          className="group relative bg-gradient-to-br from-primary to-primaryDark text-white 
                     text-xl font-bold w-12 h-12 rounded-xl
                     hover:scale-110 active:scale-95 
                     transition-all duration-300 shadow-lg hover:shadow-xl
                     flex items-center justify-center"
          aria-label="Next month"
        >
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {/* Day Names */}
        {DAY_NAMES.map((day) => (
          <div
            key={day}
            className="text-center font-bold text-primary dark:text-accent py-3 text-sm sm:text-base"
          >
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} />;
          }

          const dateString = getDateString(day);
          const isSelected = selectedDates.has(dateString);
          const isToday = isCurrentMonth && day === today.getDate();

          return (
            <button
              key={dateString}
              onClick={() => onToggleDate(dateString)}
              className={`
                relative py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base
                transition-all duration-300 transform
                ${
                  isSelected
                    ? "bg-gradient-to-br from-primary to-primaryDark text-white shadow-lg scale-105 hover:scale-110"
                    : "bg-gray-50 dark:bg-darkBg text-textPrimary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105"
                }
                ${
                  isToday && !isSelected
                    ? "ring-2 ring-primary dark:ring-accent ring-offset-2 dark:ring-offset-darkCard"
                    : ""
                }
                active:scale-95 hover:shadow-md
              `}
              aria-label={`${isSelected ? "Unselect" : "Select"} ${day}`}
            >
              <span className={isSelected ? "" : ""}>{day}</span>
              {isSelected && (
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg animate-scale-in">
                  ✓
                </span>
              )}
              {isToday && !isSelected && (
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary dark:bg-accent rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
