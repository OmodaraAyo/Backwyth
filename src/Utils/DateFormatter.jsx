import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDateTime = (date) => {
  return dayjs.utc(date, "MM/DD/YYYY HH:mm:ss").tz(dayjs.tz.guess()).format("MMMM D, YYYY h:mm A")
};
