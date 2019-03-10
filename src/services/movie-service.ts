import * as movieDao from '../dao/movie-dao';

export function findAllByYear(year: number) {
  return movieDao.findAllByYear(year);
}

export function findByYearAndTitle(year: number, title: string) {
  return movieDao.findByYearAndTitle(year, title);
}

export function update(movie) {
  return movieDao.update(movie);
}

export function save(movie) {
  return movieDao.saveMovie(movie);
}