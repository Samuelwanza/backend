'use strict';

/**
 * ggv-fee service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ggv-fee.ggv-fee');
