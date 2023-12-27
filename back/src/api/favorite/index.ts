import { Router } from 'express';
import { putFavorite } from './putFavorite';
import { getFavorites } from './getFavorites';
import { deleteFavorite } from './deleteFavorite';

export const favoriteRouter = Router().use(putFavorite).use(getFavorites).use(deleteFavorite);
