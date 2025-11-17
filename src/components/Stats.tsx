import { useMemo, useState, useEffect } from "react";
import { calculateStreak, calculateMonthProgress } from "../utils/calculation";
import { MOTIVATIONAL_QUOTES } from "../data/quotes";
import { FireIcon, TrophyIcon } from "./icon";

interface StatsProps {
  selectedDates: Set<string>;
}

function Stats({ selectedDates }: StatsProps) {
  const [currentQuote, setCurrentQuote] = useState("");

  const { currentStreak, longestStreak } = useMemo(
    () => calculateStreak(selectedDates),
    [selectedDates]
  );

  const monthProgress = useMemo(
    () => calculateMonthProgress(selectedDates),
    [selectedDates]
  );

  useEffect(() => {
    const updateQuote = () => {
      const randomIndex = Math.floor(
        Math.random() * MOTIVATIONAL_QUOTES.length
      );
      setCurrentQuote(MOTIVATIONAL_QUOTES[randomIndex]);
    };

    updateQuote();
    const interval = setInterval(updateQuote, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="bg-white dark:bg-darkCard rounded-3xl shadow-xl hover:shadow-2xl 
                    transition-all duration-500 p-6 sm:p-8 flex-1 w-full
                    backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90
                    border border-border dark:border-darkBorder
                    animate-slide-up"
      style={{ animationDelay: "0.1s" }}
    >
      {/* Progress Section */}
      <div
        className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 
                      rounded-2xl p-5 sm:p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-textPrimary dark:text-white">
            Progress Bulan Ini
          </h3>
          <span className="text-2xl sm:text-3xl font-bold text-primary dark:text-accent">
            {Math.round(monthProgress)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner mb-5">
          <div
            className="absolute h-full bg-gradient-to-r from-primary via-primaryDark to-accent 
                       rounded-full transition-all duration-700 ease-out shadow-lg"
            style={{ width: `${monthProgress}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-30 animate-pulse-slow"></div>
          </div>
        </div>

        {/* Streak Cards */}
        <div className="space-y-3">
          <div
            className="group relative overflow-hidden bg-white dark:bg-darkCard rounded-xl p-4 
                          shadow-md hover:shadow-lg transition-all duration-300
                          border border-border dark:border-darkBorder"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg group-hover:scale-110 transition-transform">
                  <FireIcon className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                </div>
                <span className="font-medium text-textSecondary dark:text-gray-300 text-sm sm:text-base">
                  Streak Saat Ini
                </span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-textPrimary dark:text-white">
                {currentStreak}
                <span className="text-sm ml-1 text-textSecondary dark:text-gray-400">
                  hari
                </span>
              </span>
            </div>
          </div>

          <div
            className="group relative overflow-hidden bg-white dark:bg-darkCard rounded-xl p-4 
                          shadow-md hover:shadow-lg transition-all duration-300
                          border border-border dark:border-darkBorder"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg group-hover:scale-110 transition-transform">
                  <TrophyIcon className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                </div>
                <span className="font-medium text-textSecondary dark:text-gray-300 text-sm sm:text-base">
                  Streak Terpanjang
                </span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-textPrimary dark:text-white">
                {longestStreak}
                <span className="text-sm ml-1 text-textSecondary dark:text-gray-400">
                  hari
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Motivation Quote */}
      <div
        className="relative overflow-hidden bg-gradient-to-br from-accent to-primary 
                      dark:from-purple-600 dark:to-indigo-600
                      rounded-2xl p-5 sm:p-6 shadow-lg"
      >
        <div className="relative z-10">
          <p className="text-white font-semibold italic text-sm sm:text-base leading-relaxed text-center">
            "{currentQuote}"
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
      </div>
    </div>
  );
}

export default Stats;
