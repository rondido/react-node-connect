var express = require("express");
const app = express();

// app.use();
app.use(express.urlencoded({ extended: true }), express.json());

app.post('/', (req, res, next) => {
    console.log(req.body);
    var type = req.query.type;
    if(type == 'list'){
      //Swtool 리스트 조회
      try {
        
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');
    
        //Mysql 쿼리 호출 정보 입력
        req.body.mapper = 'SwToolsMapper';  //mybatis xml 파일명
        req.body.crud = 'select'; //select, insert, update, delete 중에 입력
        req.body.mapper_id = 'selectSwToolsList';
        
        app.use('/', dbconnect_Module);
        next('route')
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
    }
});

module.exports = app;