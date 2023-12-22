module.exports = {
    main: (content) => {
        return  `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                    form {
                        margin-top: 20px;
                    }    
                    #board_upper {
                        display : flex;
                    }   
                    #board_upper div{
                        padding : 10px;
                        border : 1px solid #ddd;
                        flex : auto;
                    }
                    #board_title{
                        flex : 6 !important;
                    }
                    #board_detail{
                        padding : 50px 50px;
                        border : 1px solid #ddd;
                    }      
                    
                </style> 

                <title>게시판</title>
            </head>
            <body>
                <h2>Nodejs Parctice</h2>
                <div>
                ${content}
                </div>
                
                <form id="postForm" action="/create" method="post" name="writeForm">
                    <h2>새 글 작성</h2>
                    <label for="title">제목:</label>
                    <input type="text" id="title" name="title">
                    <br>
                    <label for="content">내용:</label>
                    <textarea id="content" name="content" rows="4"></textarea>
                    <br>
                    <label for="writer">작성자:</label>
                    <input type="text" id="writer" name="writer" value="testid">
                    <br>
                    <button type="button" onclick="validateForm()">글 작성</button>
                </form>
                <script>
                function validateForm() {
                    var writeForm = document.writeForm;
                    var title = document.getElementById('title').value;
                    var content = document.getElementById('content').value;
                    var writer = document.getElementById('writer').value;

                    if (title && content && writer) {
                        writeForm.submit();
                    } else {
                        alert('제목, 내용, 작성자를 모두 입력하세요.');
                    }
                }
                </script>
            </body>
            </html>
            `;
    },
    /////////////////////////////////////////////////////////////////
    list: (board_list) => {
        var content =`<table>
        <thead>
            <tr>
                <th>제목</th>
                <th>내용</th>
                <th>작성자</th>
                <th>작성일</th>
            </tr>
        </thead>
        <tbody>`;
        if(board_list != null){
            for(var i=0; i<board_list.length; i++){ 
                content =content +`<tr>
                <td>${board_list[i].boNo}</td>
                <td onClick="location.href='/board?boNo=${board_list[i].boNo}'">${board_list[i].boTitle}</td>
                <td>${board_list[i].boWriter}</td>
                <td>${
                   new Date(board_list[i].boDate).toLocaleDateString()
                }</td>
                </tr>`;
            }
            
        }else{
            content = content + '<tr><td colspan="4">게시물이 존재하지 않습니다.</td></tr>';
        }
        content = content + `</tbody></table>`;
        return content;
    },
    ///////////////////////////////////////////////////////////////////
    detail : (board_info) => {
        //------------------------------------------------//
        var board_upper = '<div id="board_upper">';

        var title ='<div id="board_title">';
        title = title + `${board_info[0].boTitle}`;
        title = title + '</div>';
        board_upper = board_upper + title;

        var writer = '<div id="board_writer">';
        writer = writer + `${board_info[0].boWriter}`;
        writer = writer + '</div>';
        board_upper = board_upper + writer;

        var date = '<div id="board_date">';
        date = date + `${new Date(board_info[0].boDate).toLocaleDateString()}`;
        date = date + '</div>';
        board_upper = board_upper + date;
        
        board_upper = board_upper + "</div>";
        
        var content = '<div id="board_detail">';
        var boContent = `${board_info[0].boContent}`.replace(/(?:\r\n|\r|\n)/g, '<br />');
        content = content + boContent;
        content = content + '</div>'


        var btnBack = `<input type="button" value="목록" onclick="location.href='/'" style="float : right">`;
        var btnDelete = `<input type="button" value="삭제" onclick="deleteConfirm(${board_info[0].boNo})" style="float : right">`;
        var detailScript =`
        <script>
        function deleteConfirm(){
            if(window.confirm("이 게시물을 삭제하시겠습니까?")){
                location.href = "/delete?boNo=${board_info[0].boNo}";
            }
        }
        </script>`
        //------------------------------------------------//
        return board_upper + content  + btnDelete + btnBack + detailScript;
    },

 
}

