import express from 'express';
import { catalog, getCatalogDetails } from './catalog.controller';
import { protect } from '../auth/auth.controller';

const router = express.Router();

router.route('/').get(protect, catalog);
router.route('/details/:id').get(protect, getCatalogDetails);

export default router;