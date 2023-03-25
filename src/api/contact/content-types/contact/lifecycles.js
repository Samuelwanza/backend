module.exports = {
    async afterCreate(event){
        const {result} = event;

        try{
            await strapi.plugins['email'].services.email.send({
                to: `${result.email}`,
                from: process.env.SEND_EMAIL_FROM,
                subject: 'Thank You For Reaching Out To Us',
                text: 'Dear ' + `${result.name}` + ',\nWe have received your message and will get back to you shortly!'

            })
        }catch(err){
            console.log(err);
        }

        try{
            await strapi.plugins['email'].services.email.send({
                to: process.env.SEND_EMAIL_TO,
                from: process.env.SEND_EMAIL_FROM,
                subject: 'Message from '+ `${result.name}`,
                text: `${result.message}`

            })
        }catch(err){
            console.log(err);
        }
    }
}
