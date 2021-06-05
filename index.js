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
const replace_template = (temp,product) =>{
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);

    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic) {output = output.replace(/{%NOT-ORGANIC%}/g, 'not-organic');}
    return output;
}
const server = http.createServer((req,res)=>{
    console.log("listening");
    res.writeHead(200,{
        "Content-type":"text/html"
    });
    res.end(template_overview);
}).listen(3000);