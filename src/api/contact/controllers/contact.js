'use strict';

/**
 *  contact controller
 */

// const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
// module.exports = {
//     /**
//      * create a record
//      * 
//      *  @return{Object}
//      */
   
//     async create (ctx) {
//         let entity;
//         if (ctx.is('multipart')) {
//             const {data, files} = parseMultipartData(ctx);
//             entity = await strapi.services.contact.create(data, {files});

//         } else{
//             entity = await strapi.services.contact.create(ctx.request.body);
//         }

//         return sanitizeEntity(entity, {model: strapi.models.contact})

//     }
// }

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact.contact');
