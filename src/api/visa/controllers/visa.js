'use strict';
var QRCode = require('qrcode');

/**
 *  visa controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::visa.visa', ({strapi}) => ({

    async findOne(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.db.query('api::visa.visa').findOne({
            where: { payment_detail_id: id }
        });
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
    },

    async create(ctx) {

        const payment_detail_id = ctx.request.body.data.payment_detail_id;

        ctx.request.body.data.qr_url = `${process.env.HOST}/visaconfirmation/${payment_detail_id}`;

        const response = await super.create(ctx);
 
      
        return response;
      },
    
    async generateQR(ctx) {


        const { id } = ctx.params;
        const entity = await strapi.db.query('api::visa.visa').findOne({
            where: { payment_detail_id: id }
        });
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        const qr_url = sanitizedEntity.qr_url;

        let qr_code = "";

        var opts = {
            type: 'text'
          }

        QRCode.toString(qr_url, opts, function (err, url) {
            if (err) throw err
            qr_code = url;
          });
        
        return qr_code;
    }
}));
