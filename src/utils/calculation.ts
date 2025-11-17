export function calculateStreak(selectedDates: Set<string>): {
  currentStreak: number;
  longestStreak: number;
} {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  for (let i = 0; i < 365; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    if (selectedDates.has(dateString)) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      if (i === 0) {
        currentStreak = tempStreak;
      }
      tempStreak = 0;
    }
  }

  return { currentStreak, longestStreak };
}

export function calculateMonthProgress(selectedDates: Set<string>): number {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const selectedThisMonth = Array.from(selectedDates).filter((date) => {
    const [year, month] = date.split("-").map(Number);
    return year === currentYear && month === currentMonth + 1;
  });

  return (selectedThisMonth.length / daysInMonth) * 100;
}
