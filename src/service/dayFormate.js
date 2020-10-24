import dayjs from 'dayjs'

// 預計打印格式：2020-07-01T12:00:00Z
export const displayDayElementUIDatePicker = (date) => dayjs(date).format('YYYY-MM-DD[T]HH:mm:ss[Z]')
