import express from 'express';
import { catalog, getCatalogDetails } from './catalog.controller';
import { protect } from '../auth/auth.controller';

const router = express.Router();

router.route('/').post(protect, catalog);
router.route('/details/:id').get(protect, getCatalogDetails);

export default router;