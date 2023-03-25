'use strict';

/**
 * visa service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::visa.visa');
