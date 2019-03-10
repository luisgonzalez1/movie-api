"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const movieDao = __importStar(require("../dao/movie-dao"));
function findAllByYear(year) {
    return movieDao.findAllByYear(year);
}
exports.findAllByYear = findAllByYear;
function findByYearAndTitle(year, title) {
    return movieDao.findByYearAndTitle(year, title);
}
exports.findByYearAndTitle = findByYearAndTitle;
function update(movie) {
    return movieDao.update(movie);
}
exports.update = update;
function save(movie) {
    return movieDao.saveMovie(movie);
}
exports.save = save;
//# sourceMappingURL=movie-service.js.map