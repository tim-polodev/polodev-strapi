export default [
    'strapi::logger',
    'strapi::errors',
    {
        name: 'strapi::security',
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'connect-src': ["'self'", 'https:'],
                    'img-src': [
                        "'self'",
                        'data:',
                        'blob:',
                        'dl.airtable.com',
                        `${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
                        `polodev.com`,
                        `${process.env.CDN_URL}`,
                    ],
                    'media-src': [
                        "'self'",
                        'data:',
                        'blob:',
                        'dl.airtable.com',
                        `${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
                        `polodev.com`,
                        `${process.env.CDN_URL}`,
                    ],
                    upgradeInsecureRequests: null,
                },
            },
        },
    },
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
];
