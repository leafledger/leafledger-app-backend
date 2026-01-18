import express from 'express';
import { catalog, getCatalogDetails, getS3Images } from './catalog.controller';
import { protect } from '../auth/auth.controller';

const router = express.Router();

router.route('/').get(protect, catalog);
router.route('/details/:id').get(protect, getCatalogDetails);
router.route('/s3-images').get(protect, getS3Images);

export default router;
