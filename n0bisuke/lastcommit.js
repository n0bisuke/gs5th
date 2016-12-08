const fs = require('fs');
const PATH = `./.git/logs/HEAD`;

let content = fs.readFileSync(PATH);
let logs = content.toString().split('\n');
let lastlog = logs[logs.length-2];
let info = lastlog.split(' ');
let author = info[2];
let message = info[6];

console.log(author, message);