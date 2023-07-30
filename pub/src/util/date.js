import dayjs from 'dayjs';

export const DEFAULT_FORMAT = 'MMMM D YYYY'

export const formatDate = (date, format = DEFAULT_FORMAT) => {
    return dayjs(date).format(format)
}