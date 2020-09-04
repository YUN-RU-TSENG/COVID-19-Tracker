import dayjs from 'dayjs'

export const displayDay = (date) => dayjs(date).format('MM月DD日 HH:mm')
