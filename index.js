// CommonJS
const checkDiskSpace = require('check-disk-space').default
const nodemailer = require('nodemailer');
const warning = 160;
// // On Windows
// checkDiskSpace('C:/blabla/bla').then((diskSpace) => {
//     console.log(diskSpace)
//         // {
//         //     diskPath: 'C:',
//         //     free: 12345678,
//         //     size: 98756432
//         // }
//         // Note: `free` and `size` are in bytes
// })
'use strict';

// On Linux or macOS
checkDiskSpace('C:/').then((diskSpace) => {
    console.log(diskSpace)

    var humaner = diskSpace.free * 1e-9
    console.log(humaner.toFixed());

    if (humaner <= warning) {
        // {
        //     diskPath: '/',
        //     free: 12345678,
        //     size: 98756432
        // }
        // Note: `free` and `size` are in bytes

        var os = require("os");
        os.hostname();
        console.log(os.hostname());



        /* eslint no-console: 0 */



        var user = 'portiz@emt.cl';
        var pass = 'emt.2019';
        var host = 'smtp.gmail.com';
        var port = 465;
        var secure = true;


        // Generate SMTP service account from ethereal.email
        nodemailer.createTestAccount((err) => {
            if (err) {
                console.error('Failed to create a testing account');
                console.error(err);
                return process.exit(1);
            }

            console.log('Credentials obtained, sending message...');

            // NB! Store the account object values somewhere if you want
            // to re-use the same account for future mail deliveries

            // Create a SMTP transporter object
            let transporter = nodemailer.createTransport({
                host: host,
                port: port,
                secure: secure,
                auth: {
                    user: user,
                    pass: pass
                },
                logger: true,
                transactionLog: true // include SMTP traffic in the logs
            }, {
                // default message fields

                // sender info
                from: 'SVR INFO <example@nodemailer.com>',
                headers: {
                    'X-Laziness-level': 1000 // just an example header, no need to use this
                }
            });

            // Message object

            let message = {
                // Comma separated list of recipients
                to: 'INFO SVR <portiz@emt.cl>,<darayaas@emt.cl>,<jromero@emt.cl>',

                // Subject of the message
                subject: 'Estado disco duro ✔' + os.hostname(),

                // plaintext body
                text: 'Buenas, el espacio del disco duro de: ' + os.hostname() + ' es de: ' + humaner.toFixed() + 'GB',

                // HTML body
                html: `<p><b>Hola buenas</b> El espacio en el disco duro de ` + os.hostname() + ` es de ` + humaner.toFixed() + `GB <img src="cid:note@example.com"/></p>
        <p>Esta imagen es referencial al plan de acción<br/><img src="cid:nyan@example.com"/></p>`,

                // AMP4EMAIL
                amp: `<!doctype html>
        <html ⚡4email>
          <head>
            <meta charset="utf-8">
            <style amp4email-boilerplate>body{visibility:hidden}</style>
            <script async src="https://cdn.ampproject.org/v0.js"></script>
            <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
          </head>
          <body>
            <p><b>Hello</b> to myself <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
            <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/>
              <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
          </body>
        </html>`,

                // An array of attachments
                attachments: [
                    // String attachment
                    {
                        filename: 'notes.txt',
                        content: 'Buenas, el espacio del disco duro de: ' + os.hostname() + ' es de: ' + humaner.toFixed() + 'GB',
                        contentType: 'text/plain' // optional, would be detected from the filename
                    },

                    // Binary Buffer attachment
                    {
                        filename: 'image.png',
                        content: Buffer.from(
                            'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                            '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                            'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                            'base64'
                        ),

                        cid: 'note@example.com' // should be as unique as possible
                    },

                    // File Stream attachment
                    {
                        filename: 'nyan cat ✔.gif',
                        path: __dirname + '/assets/error-windows.gif',
                        cid: 'nyan@example.com' // should be as unique as possible
                    }
                ],

                list: {
                    // List-Help: <mailto:admin@example.com?subject=help>
                    help: 'admin@example.com?subject=help',

                    // List-Unsubscribe: <http://example.com> (Comment)
                    unsubscribe: [{
                            url: 'http://example.com/unsubscribe',
                            comment: 'A short note about this url'
                        },
                        'unsubscribe@example.com'
                    ],

                    // List-ID: "comment" <example.com>
                    id: {
                        url: 'mylist.example.com',
                        comment: 'This is my awesome list'
                    }
                }
            };

            transporter.sendMail(message, (error, info) => {
                if (error) {
                    console.log('Error occurred');
                    console.log(error.message);
                    return process.exit(1);
                }

                console.log('Message sent successfully!');
                console.log(nodemailer.getTestMessageUrl(info));

                // only needed when using pooled connections
                transporter.close();
            });
        });

    }


})