'use strict'

const http = require('https');
// const HOST = `requestb.in`;
// const PATH = `/wm8697wm`;
const HOST = `sandbox-api-pay.line.me`;
const PATH = `/v2/payments/request`;

let postData = {
    "productName": "n0bitaro",
    "amount": 1,
    "currency": "JPY",
    "confirmUrl": "https://localhost.com",
    "orderId": 1
};

let postDataStr = JSON.stringify(postData);
let options = {
    host: HOST,
    port: 443,
    path: PATH,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-LINE-ChannelId': '1487951524',
        'X-LINE-ChannelSecret': '90f9a130885aa25f87fea738e0b7ec83'
    }
};

// module.exports = () => {

  let req = http.request(options, (res) => {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log('BODY: ' + chunk);
    });
  });
  req.on('error', (e) => {
    console.log('problem with request: ' + e.message);
  });
  req.write(postDataStr);
  req.end();

// }