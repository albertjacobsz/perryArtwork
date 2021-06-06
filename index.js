//INIT CONSTS
const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
//PREPARING DATA
const data = fs.readFileSync(`${__dirname}/data/data.json`,'utf-8');
const template_overview = fs.readFileSync(`${__dirname}/templates/template-main.html`,'utf-8');
const template_card = fs.readFileSync(`${__dirname}/templates/template-item-card.html`,'utf-8');
const template_product = fs.readFileSync(`${__dirname}/templates/template-item.html`,'utf-8');
const dataObj = JSON.parse(data);
//FUNCT
const replace_main = (temp,product) =>{
    let output = temp.replace(/{%NAME%}/g, product.title);
    //output = output.replace(/{%IMG%}/g, `http://localhost:3000${product.image}`);

   // output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    console.log(output);
    //if(!product.new) {output = output.replace(/{%NOT-ORGANIC%}/g, 'not-organic');}
    return output;
}
const server = http.createServer((req,res)=>{

    const {query, pathname} = url.parse(req.url,true);

    if(pathname === '/' || pathname === '/main' || pathname === '/index'){
        res.writeHead(200,{
            "Content-type":"text/html"
        });
        const cardsHTML= dataObj.map(el => replace_main(template_card,el)).join('');
        const output = template_overview.replace('{%ITEMCARD%}',cardsHTML); 
        res.end(output);
    }
    console.log("listening");
    
    //res.end(template_overview);
    //TODO CHANGE BACK THE PORT
}).listen(process.env.PORT);
//process.env.PORT