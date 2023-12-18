module.exports = {
    main: (board_list) => {
        var content = '<tr>';
        if(board_list != null){
            for(var i=0; i<board_list.length; i++){ 
                content =content +`
                <td>${board_list[i].boNo}</td>
                <td onClick="location.href='/board?boNo=${board_list[i].boNo}'">${board_list[i].boTitle}</td>
                <td>${board_list[i].boWriter}</td>
                <td>${
                   new Date(board_list[i].boDate).toLocaleDateString()
                }</td>
                `;
            }
        }else{
            content = content + '<td colspan="4">게시물이 존재하지 않습니다.</td>';
        }
        content = content + '</tr>'
        //console.log(content);
        
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>게시판</title>
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
            </style>
        </head>
        <body>
            <table>
                <thead>
                    <tr>
                        <th>게시물번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    ${content}
                </tbody>
            </table>

            <form id="postForm">
                <h2>새 글 작성</h2>
                <label for="title">제목:</label>
                <input type="text" id="title" name="title" required>
                <br>
                <label for="content">내용:</label>
                <textarea id="content" name="content" rows="4" required></textarea>
                <br>
                <label for="author">작성자:</label>
                <input type="text" id="author" name="author" required>
                <br>
                <label for="date">작성일:</label>
                <input type="date" id="date" name="date" required>
                <br>
                <button type="button" onclick="addPost()">글 작성</button>
            </form>

            <script>
                function addPost() {
                    var title = document.getElementById('title').value;
                    var content = document.getElementById('content').value;
                    var author = document.getElementById('author').value;
                    var date = document.getElementById('date').value;

                    if (title && content && author && date) {
                        var table = document.querySelector('table tbody');

                        var newRow = table.insertRow(table.rows.length);
                        var cell1 = newRow.insertCell(0);
                        var cell2 = newRow.insertCell(1);
                        var cell3 = newRow.insertCell(2);
                        var cell4 = newRow.insertCell(3);

                        cell1.textContent = title;
                        cell2.textContent = content;
                        cell3.textContent = author;
                        cell4.textContent = date;

                        // 글 작성 후 입력 필드 초기화
                        document.getElementById('title').value = '';
                        document.getElementById('content').value = '';
                        document.getElementById('author').value = '';
                        document.getElementById('date').value = '';
                    } else {
                        alert('제목, 내용, 작성자, 작성일을 모두 입력하세요.');
                    }
                }
            </script>
        </body>
        </html>
        `;
    },

    detail : (board_content) => {
        var content = '<div>';
        content = content + `${board_content[0].boContent}`;
        content = content + '</div>'

        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>게시판</title>
        </head>
        <body>
            ${content}
        </body>
        </html>
        `;
    }
 
}

