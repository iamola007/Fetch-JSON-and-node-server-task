const http = require('http');
const fs = require ('fs');

// Fetch JSON placeholder task
let url = "http://jsonplaceholder.typicode.com/posts";

http.get(url,(res) => {
    let body = " "

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            fs.mkdir('result', function(){
                fs.writeFile('./result/posts.txt',JSON.stringify(json), (err) => {
                    if(err) throw err
                });
        });
        
        } catch (error) {
            console.error(error.message);
        };
    });
}).on("error",(error) => {
    console.error(error.message);
});

// create a simple server task
const server = http.createServer (function(req,res){
    res.writeHead (200);
    res.end ('Hello World!');
}
)
server.listen(8080, function(){
    console.log ('server is running')
});
