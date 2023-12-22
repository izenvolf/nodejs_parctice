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
                var index = main.main(main.list(results));
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
            var index = main.main(main.detail(results));
            response.writeHead(200);
            response.end(index);
        });  
    }else if(pathname === '/create'){
        var data= '';
        request.on('data', (form) => {
            data = data + form;
        });
        request.on('end', () => {
            var post = qs.parse(data);
            var boNo = 0;
            connection.query(`SELECT MAX(boNo)+1 boNo FROM board`, (error, results, fields) => {
                if(error){
                    console.log(error);
                }
                boNo = results[0].boNo;

                console.log(post);
                connection.query(`
                INSERT INTO board (boNo, boTitle, boContent, boDate, boWriter) 
                VALUES ( ${boNo} , '${post.title}', '${post.content}', SYSDATE(), '${post.writer}' )
                 ` , (error, results, fiedls) => {
                    if(error){
                        console.log(error);
                    }
                    response.writeHead(302, {Location : '/'});
                    response.end();
                });
            });

        });
    }else if(pathname === '/delete'){
        var query = queryData.query;
        var boNo = qs.parse(query).boNo;
        console.log(boNo);
        connection.query(`DELETE FROM board WHERE boNo=${boNo}`, (error, results, fields) => {
            if(error){
                console.log(error);
            }
            response.writeHead(302, {Location : '/'});
            response.end();
        });

    }
});
app.listen(8000);