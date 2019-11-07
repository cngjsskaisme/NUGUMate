
/*
 * 설정. 에러 처리 포함
 */
require('dotenv').config(); 

module.exports = {
	server_port: 3000,
	db_url: process.env.db_url,
	db_schemas: [
                       
        ],
	route_info: [
                {file:'./test', path:'/test', method:'test', type:'get'}
],      
};  

