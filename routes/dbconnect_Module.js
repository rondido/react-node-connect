const { query } = require("express");
var express = require("express");
var app = express();

// mysql 패키지를 require해 사용 가능하도록 함
const mysql = require("mysql");
app.use(express.json());



//Connection pool 세팅

const pool  = mysql.createPool({
  connectionLimit: 66,
  waitForConnections: true,
  host: "database-1.cnvbo4mek9wf.ap-northeast-2.rds.amazonaws.com",
  port: "3306",
  database: 'react',
  user: "admin",
  password: "wlsgus11",
});




app.post("/", (req, res) => {
  const mybatisMapper = require("mybatis-mapper");
  var param = req.body;

  //mybatis mapper경로 설정
  mybatisMapper.createMapper(['./models/'+param.mapper+'.xml']);
  var time = new Date();
  console.log('## '+time+ ' ##');
  console.log("\n Called Mapper Name  = "+param.mapper);

  var format = { language: 'sql', indent: '  ' };
  //mysql 쿼리 정보 세팅
  var query = mybatisMapper.getStatement(param.mapper, param.mapper_id, param, format);
  console.log("\n========= Node Mybatis Query Log Start =========");
  console.log("* mapper namespce : "+param.mapper+"."+param.mapper_id+" *\n");
  console.log(query+"\n");



  pool.getConnection(function(error,connection){
  connection.query(query, function (error, results) {
    if (error) {
      console.log("db error************* : "+error);
    }
    var time2 = new Date();
    console.log('## '+time2+ ' ##');
    console.log('## RESULT DATA LIST ## : \n', results);
    if(results != undefined){
      string = JSON.stringify(results);
      var json = JSON.parse(string);
      if (req.body.crud == "select") {
        res.send({ json });
      }else{
        res.send("succ");
      }
    }else{
      res.send("error");
    }

    connection.release();
    console.log("========= Node Mybatis Query Log End =========\n");
    });
  })
});

module.exports = app;