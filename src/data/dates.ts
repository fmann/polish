// Polish date learning data

export interface DateItem {
  id: number;
  polish: string;
  english: string;
  dayOfWeek: string;
  dayNumber: number;
  month: string;
}

// Polish days of the week
const polishDays = [
  "poniedziałek",
  "wtorek",
  "środa",
  "czwartek",
  "piątek",
  "sobota",
  "niedziela",
];

const englishDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Polish months
const polishMonths = [
  "stycznia",
  "lutego",
  "marca",
  "kwietnia",
  "maja",
  "czerwca",
  "lipca",
  "sierpnia",
  "września",
  "października",
  "listopada",
  "grudnia",
];

const englishMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Generate sample dates
export const generateRandomDates = (count: number = 50): DateItem[] => {
  const dates: DateItem[] = [];

  for (let i = 0; i < count; i++) {
    const dayOfWeekIndex = Math.floor(Math.random() * 7);
    const monthIndex = Math.floor(Math.random() * 12);
    const dayNumber = Math.floor(Math.random() * 28) + 1; // Keep it simple, avoid month-end issues

    const polishDay = polishDays[dayOfWeekIndex];
    const englishDay = englishDays[dayOfWeekIndex];
    const polishMonth = polishMonths[monthIndex];
    const englishMonth = englishMonths[monthIndex];

    dates.push({
      id: i + 1,
      polish: `${polishDay} ${dayNumber} ${polishMonth}`,
      english: `${englishDay} ${dayNumber} ${englishMonth}`,
      dayOfWeek: polishDay,
      dayNumber,
      month: polishMonth,
    });
  }

  return dates;
};

export const sampleDates = generateRandomDates();
