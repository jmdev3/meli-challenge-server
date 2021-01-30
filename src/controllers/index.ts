import { Router, Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { parseItems, getCategories } from '../utils';

const router = Router();

router.get('/items', async (req: Request, res: Response, next: NextFunction ) => {
  const { search } = req.query;

  if (!search) {
    res.status(404).send({ error: 'Busqueda incorrecta' });
    return next();
  }

  try {
    const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=:${search}`);
    const firstFourItems = response.data.results.slice(0, 4);

    res.status(200).send({
      data: {
        author: {
          name: 'Juan Manuel',
          lastname: 'Villarraza'
        },
        categories: getCategories(firstFourItems),
        items: parseItems(firstFourItems),
        firstItem: response.data.results[0],
      }
    });
    next();
  } catch (error) {
    res.sendStatus(500);
    next(error);
  }
});

router.get('/items/:id', async (req: Request, res: Response, next: NextFunction ) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).send({ error: 'Busqueda incorrecta' });
    return next();
  }

  try {
    const response = await axios.get(`https://api.mercadolibre.com/items/${id}`);
    const responseDesc = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);

    res.status(200).send({
      data: {
        item: {
          author: {
            name: 'Juan Manuel',
            lastname: 'Villarraza'
          },
          ...parseItems([response.data])[0],
          sold_quantity: response.data.sold_quantity,
          description: responseDesc.data.plain_text,
        },
      } 
    });
    next();
  } catch (error) {
    if (error.response!.status === 404) {
      res.status(404).send({ error: 'Busqueda incorrecta' });
      return next(error);
    }
    res.sendStatus(500);
    next(error);
  }
});

export default router;