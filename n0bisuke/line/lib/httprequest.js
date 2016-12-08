'use strict'

const client = require('https');

const LINE_CHANNEL_ID = `1487951524`;
const LINE_CHANNEL_SECRET = `90f9a130885aa25f87fea738e0b7ec83`;
// const HOST = `sandbox-api-pay.line.me`;
const HOST = `api-pay.line.me`;
// const PATH = `/v2/payments/request`;

module.exports = ($requestData, $path, $method = 'POST') => {

    let postDataStr = JSON.stringify($requestData);
    let options = {
        host: HOST,
        port: 443,
        path: $path,
        method: $method,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'X-LINE-ChannelId': LINE_CHANNEL_ID,
            'X-LINE-ChannelSecret': LINE_CHANNEL_SECRET
        }
    };
    
    return new Promise((resolve, reject) => {
        
        // if($method === 'POST'){
            let req = client.request(options, (res) => {
                // console.log('STATUS: ' + res.statusCode);
                // console.log('HEADERS: ' + JSON.stringify(res.headers));
                let body = '';
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    body += chunk;
                });
                res.on('end', () => {
                    let response = JSON.parse(body);
                    resolve(response);
                });
            });
            req.on('error', (e) => {
                reject(e);
            });
            req.write(postDataStr);
            req.end();
        // }else if($method === 'GET'){
        //     client.get(`https://${HOST}/${$path}`, (res) => {
        //         let body = '';
        //         res.setEncoding('utf8');
        //         res.on('data', (chunk) => {
        //             body += chunk;
        //         });
        //         res.on('end', () => {
        //             let response = JSON.parse(body);
        //             resolve(response);
        //         });
        //     }).on('error', (e) => {
        //         reject(e);
        //     });
        // }
    });
}