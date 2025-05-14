import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat)

export const formatDate = ( date ) => {
    return dayjs(date, "MM/DD/YYYY HH:mm:ss").format("MMMM D, YYYY h:mm A")
}