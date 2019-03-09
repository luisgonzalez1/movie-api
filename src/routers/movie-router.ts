import express, { Response } from 'express';
import * as movieService from '../services/movie-service';
import { authMiddleware } from '../security/auth-middleware';

export const movieRouter = express.Router();

movieRouter.get('/title/:title/year/:year', (req, resp) => {
  movieService.findByYearAndTitle(parseInt(req.params.year), req.params.title)
    .then(data => {
      resp.json(data.Item);
    })
    .catch(err => {
      console.log(err);
      resp.sendStatus(500);
    });
});

movieRouter.get('/year/:year', [
  authMiddleware('admin', 'employee'),
  (req, resp: Response, next) => {
    movieService.findAllByYear(parseInt(req.params.year))
      .then(data => {
        resp.json(data.Items);
      })
      .catch(err => {
        console.log(err);
        resp.sendStatus(500);
      });
  }
]);

movieRouter.put('', (req, resp) => {
  movieService.update(req.body)
    .then(data => {
      resp.json(data);
    })
    .catch(err => {
      console.log(err);
      resp.sendStatus(500);
    });
});

movieRouter.post('', [
  authMiddleware('admin'),
  (req, resp) => {
    console.log(req.body);
    movieService.save(req.body)
    .then(data => {
      resp.json(data);
    })
    .catch(err => {
      console.log(err);
      resp.sendStatus(500);
    });
}]);
