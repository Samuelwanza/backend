'use strict';

/**
 * visa router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::visa.visa');
