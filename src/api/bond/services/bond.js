'use strict';

/**
 * bond service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bond.bond');
