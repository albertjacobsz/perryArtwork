//INIT CONSTS
const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const express = require('express');
const app = express();
app.use(express.static(__dirname+'/public'));
//PREPARING DATA
const data = fs.readFileSync(`${__dirname}/data/data.json`,'utf-8');
const template_overview = fs.readFileSync(`${__dirname}/templates/template-main.html`,'utf-8');
const template_card = fs.readFileSync(`${__dirname}/templates/template-item-card.html`,'utf-8');
const template_product = fs.readFileSync(`${__dirname}/templates/template-item.html`,'utf-8');
const dataObj = JSON.parse(data);
//FUNCT
const replace_main = (temp,product) =>{
    let output = temp.replace(/{%NAME%}/g, product.title);
    output = output.replace(/{%IMG%}/g, product.image);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    //if(!product.new) {output = output.replace(/{%NOT-ORGANIC%}/g, 'not-organic');}
    return output;
}


app.get('/', (req,res) => {
    res.writeHead(200,{
        "Content-type":"text/html"
        });
        const cardsHTML= dataObj.map(el => replace_main(template_card,el)).join('');
        let output = template_overview.replace(/{%ITEMCARD%}|{%ITEMCARD1%}/g,cardsHTML); 
        res.end(output);
});
app.get('/product', (req,res)=> {
    const {query, pathname} = url.parse(req.url,true);
    const product = dataObj[query.id];
    const output = replace_main(template_product,product); 
    res.end(output);
});
var server = app.listen(3000);

/*const server = http.createServer((req,res)=>{

    const {query, pathname} = url.parse(req.url,true);
    if (req.url.match (/.jpg$/)) {
        let jpgPath = req.url;
        console.log (jpgPath)
        let jpgReadStream = fs.createReadStream (jpgPath, 'UTF-8')
        res.statusCode = 200;
        res.setHeader ('Content-Type', 'image/jpg')
        jpgReadStream.pipe (res) 
    }
    if(pathname === '/' || pathname === '/main' || pathname === '/index'){
        res.writeHead(200,{
        "Content-type":"text/html"
        });
        const cardsHTML= dataObj.map(el => replace_main(template_card,el, res)).join('');
        const output = template_overview.replace('{%ITEMCARD%}',cardsHTML); 
        res.end(output);
    }else if(pathname === '/product'){
        const product = dataObj[query.id];
        const output = replace_main(template_product,product,res); 
        res.end(output);
    }else{
        res.end("404 Page not found");
    }

    console.log("listening");
    //res.end(template_overview);
    //TODO CHANGE BACK THE PORT
}).listen(3000);
//process.env.PORT
*/