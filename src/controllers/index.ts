import { Router, Request, Response, NextFunction } from 'express';

import { parseItems, getCategories } from '../utils';
import { searchItems, getItem, getItemDescription } from '../service';

const router = Router();

router.get('/items', async (req: Request, res: Response, next: NextFunction ) => {
  const { search } = req.query;

  if (!search) {
    res.status(404).send({ error: 'Busqueda incorrecta' });
    return next();
  }

  try {
    const items = await searchItems(search as string);
    const firstFourItems = items.slice(0, 4);

    res.status(200).send({
      data: {
        author: {
          name: 'Juan Manuel',
          lastname: 'Villarraza'
        },
        categories: getCategories(firstFourItems),
        items: parseItems(firstFourItems),
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
    const item = await getItem(id);
    const description = await getItemDescription(id);

    res.status(200).send({
      data: {
        item: {
          author: {
            name: 'Juan Manuel',
            lastname: 'Villarraza'
          },
          ...parseItems([item])[0],
          sold_quantity: item.sold_quantity,
          description,
        },
      } 
    });
    next();
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).send({ error: 'Busqueda incorrecta' });
      return next(error);
    }
    res.sendStatus(500);
    next(error);
  }
});

export default router;