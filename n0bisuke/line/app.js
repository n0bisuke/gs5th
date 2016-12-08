const uuid = require('node-uuid');
const app = require('express')();
const http = require('http').Server(app);
const PORT = process.env.PORT || 1337;
const httprequest = require('./lib/httprequest');
const DOMAIN = 'http://localhost:1337';

app.get(`/`, (req, res) => {
  let html = `<h1>LINEで決済</h1>
  <a href="/reserve">購入!</a>`;
  res.send(html);
});

//購入
app.get(`/reserve`, (req, res) => {
  let requestData = {
    "productName": "募金します。",
    "amount": 1,
    "currency": "JPY",
    "confirmUrl": `${DOMAIN}/confirm`,
    "orderId": uuid.v1()
  };

  httprequest(requestData,'/v2/payments/request')
  .then((responseData)=>{    
    //成功
    if(responseData.returnCode === `0000`){
      res.redirect(responseData.info.paymentUrl.web);
    }

    //失敗
    else if(responseData.returnCode === `1106`){
      console.log(responseData.returnMessage);
    }

  },(e)=>{console.log(e)});
});

//決済履歴とかをみる[WIP]
app.get(`/showpayments`, (req, res) => {
  // let path = `/v2/payments`;
  // let requestData = {
  //   "orderId": "c961b850-a8f4-11e6-8c61-2b6a304d6e7f"
  // }
  // httprequest(requestData, path, 'GET')
  // .then((responseData)=>{
  //     console.log(responseData);
  //     let html = `決済履歴`;
  //     res.send(html);
  // },(e)=>{console.log(e)});
});

app.get(`/confirm`, (req, res) => {
    let transactionId = req.query.transactionId;
    let requestData = {
      "amount": 1,
      "currency": "JPY"
    };
    let path = `/v2/payments/${transactionId}/confirm`;
  
    httprequest(requestData, path)
    .then((responseData)=>{
      console.log(responseData);
      let html = `ご購入ありがとうございました。<a href="/">戻る</a>`;
      res.send(html);
    },(e)=>{console.log(e)});

});

app.get(`/refund`, (req, res) => {
    let transactionId = "2016111313014907410";
    let path = `/v2/payments/${transactionId}/refund`;
  
    httprequest({}, path)
    .then((responseData)=>{
      console.log(responseData);
      let html = `払い戻し完了`;
      res.send(html);
    },(e)=>{console.log(e)});
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});