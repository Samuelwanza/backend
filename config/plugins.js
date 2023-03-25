module.exports = ({ env }) => ({
    // ...
    email: {
      config: {
        provider: 'sendgrid',
        providerOptions: {
          apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
          defaultFrom: env('SEND_EMAIL_FROM'),
          defaultReplyTo: env('SEND_EMAIL_FROM'),
        },
      },
    },
    // ...

  // ...
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  graphql: {
    config: {
       endpoint: "/graphql",
       shadowCRUD: true,
       playgroundAlways: true,
       depthLimit: 100,
       apolloServer: {
         tracing: false,
         },
       },
    },  
  // ...
});
