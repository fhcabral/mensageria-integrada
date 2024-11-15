import moment from "moment"

export const formatDateForDDmmYYYY = (date: string) => {
    moment(date).format('dd/mm/yyyy')
}