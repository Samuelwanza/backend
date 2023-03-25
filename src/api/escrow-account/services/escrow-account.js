'use strict';

/**
 * escrow-account service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::escrow-account.escrow-account');
