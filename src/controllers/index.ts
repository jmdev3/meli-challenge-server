import { Router, Request, Response, NextFunction } from 'express';

import { parseItems, getCategories } from '../utils';
import { searchItems, getItem, getItemDescription, getItemCategories } from '../service';

const router = Router();

/**
 * api que devuelve los primeros 4 items en caso de matchear
 * o una lista vacía
 */
router.get('/items', async (req: Request, res: Response, next: NextFunction ) => {
  const { search } = req.query;

  if (!search) {
    res.status(404).send({ error: 'Busqueda incorrecta' });
    return next();
  }

  try {
    const { results, filters } = await searchItems(search as string);
    const firstFourItems = results.slice(0, 4);
    const categories = filters.find((f: any) => f.id === "category");

    res.status(200).send({
      author: {
        name: 'Juan Manuel',
        lastname: 'Villarraza'
      },
      categories: getCategories(categories.values[0].path_from_root),
      items: parseItems(firstFourItems),
    });
    next();
  } catch (error) {
    res.sendStatus(500);
    next(error);
  }
});

/**
 * api que dado un item id retorna la información relacionada
 * o falla en caso de no encontrar
 */
router.get('/items/:id', async (req: Request, res: Response, next: NextFunction ) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).send({ error: 'Busqueda incorrecta' });
    return next();
  }

  try {
    const item = await getItem(id);
    const description = await getItemDescription(id);
    const categories = await getItemCategories(item.category_id);

    res.status(200).send({
      author: {
        name: 'Juan Manuel',
        lastname: 'Villarraza'
      },
      item: {
        ...parseItems([item])[0],
        sold_quantity: item.sold_quantity,
        description,
      },
      categories: getCategories(categories),
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