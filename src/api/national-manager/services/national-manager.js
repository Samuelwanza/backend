'use strict';

/**
 * national-manager service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::national-manager.national-manager');
