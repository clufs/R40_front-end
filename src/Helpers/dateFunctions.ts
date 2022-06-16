import {format, formatDistanceToNow, } from 'date-fns'
import {es} from 'date-fns/locale'

export const getFormatDistanceToNow = (date: number) => {

  const fromNow = formatDistanceToNow(date , {locale: es}); //esto de locale: es para cambiar el idioma

  return `hace ${fromNow}`
};


export const setDateFormat = (date: number) => {

  const newDate = format( date, 'MM/yyyy', {locale: es}).toString();
  return newDate

}