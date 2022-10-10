import { orderBy } from 'lodash';

export const getSeasons = (seasons) => {
  return orderBy(Array.from(new Set(seasons)), 'asc');
}