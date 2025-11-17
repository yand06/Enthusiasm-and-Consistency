import { useState } from "react";
import Calendar from "./components/Calendar";
import Stats from "./components/Stats";
import Header from "./components/Header";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDates, setSelectedDates] = useLocalStorage<string[]>(
    "selectedDates",
    []
  );

  const selectedDatesSet = new Set(selectedDates);

  const toggleDate = (dateString: string) => {
    setSelectedDates((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dateString)) {
        newSet.delete(dateString);
      } else {
        newSet.add(dateString);
      }
      return Array.from(newSet);
    });
  };

  const previousMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const nextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-background via-gray-50 to-accentLight 
                    dark:from-darkBg dark:via-gray-900 dark:to-gray-800
                    flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8
                    transition-colors duration-500"
    >
      <Header />

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
        <Calendar
          currentDate={currentDate}
          selectedDates={selectedDatesSet}
          onToggleDate={toggleDate}
          onPreviousMonth={previousMonth}
          onNextMonth={nextMonth}
        />
        <Stats selectedDates={selectedDatesSet} />
      </div>
    </div>
  );
}

export default App;
