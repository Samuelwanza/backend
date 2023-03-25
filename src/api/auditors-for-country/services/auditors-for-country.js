'use strict';

/**
 * auditors-for-country service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::auditors-for-country.auditors-for-country');
