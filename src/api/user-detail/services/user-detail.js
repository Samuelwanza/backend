'use strict';

/**
 * user-detail service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-detail.user-detail');
