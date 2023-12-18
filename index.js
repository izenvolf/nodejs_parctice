const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const mysql = require('mysql');
const main = require('./WEB/main.js');

const connection = mysql.createConnection({  //DB커넥션 생성 
    host : 'localhost',
    user : 'root',
    database : 'board',
    password : 'root'
});

connection.connect(); // DB커넥트


var app = http.createServer(function(request, response){
    var queryData = url.parse(request.url);
    var pathname = queryData.pathname;
    console.log(queryData);
    if(pathname === '/'){
        fs.readFile(`WEB/main.js`, 'utf8', (error, file) => {
            connection.query("SELECT * FROM board", (error, results, fields) => {  // board테이블 기본조회
                if(error){
                    console.log(error);
                }
                //console.log(results);
                var index = main.main(results);
                response.writeHead(200);
                response.end(index)
            });      
    
        });
    }else if(pathname === '/board'){
        var query = queryData.query;  // get방식으로 받아온 값
        var boNo = qs.parse(query).boNo;  // 게시물번호
        connection.query(`SELECT * FROM board WHERE boNo=${boNo}`, (error, results, fields) => {  // board테이블 상세조회
            if(error){
                console.log(error);
            }
            console.log("results : " +results+ "/"+ fields);
            var index = main.detail(results);
            response.writeHead(200);
            response.end(index);
        });  
        
        
    }
});
app.listen(8000);