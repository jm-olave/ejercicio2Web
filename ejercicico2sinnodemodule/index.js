
// jquery cheerio
const cheerio = require('cheerio');
const fs = require('fs');

// iniciar server
const http = require('http');

http
.createServer( async function(req, res){
    if(req.url === '/api/proveedores' )
    {
        const datafrom = await getDataProveedores();
        res.end(datafrom);
        console.log('req',req.url)
    res.writeHead(200,{'Content-Type': 'text/html'});
    }
    else if(req.url === '/api/clientes' ){
        const datafrom = await getDataClientes();
        res.end(datafrom);
        console.log('req',req.url)
    res.writeHead(200,{'Content-Type': 'text/html'});
    }
    console.log('req',req.url)
    res.writeHead(200,{'Content-Type': 'text/html'});
  
})
.listen('8081');
// extraer data 
const axios = require('axios');

const html = fs.readFileSync(__dirname + "/index.html", "utf8");
// console.log(html);

async function getDataProveedores(){
    try{

    
    const resp = await axios.get('https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json');
    console.log(typeof resp.data)
    console.log(resp.data);
    
     const $ = cheerio.load(html.toString()); 
     $('#titulo').html('<h2>Lista de Proveedores</h2>'); 
     for(let i = 0; i < resp.data.length; i++){
        const idproveedor = resp.data[i].idproveedor;
        console.log(idproveedor);
        const nombre = resp.data[i].nombrecompania;
        const contacto = resp.data[i].nombrecontacto;
        $('#output').append( '<tr> <td>' + idproveedor +'</td> ' + '<td>' +nombre + '</td> ' + '<td>' + contacto+'</td> </tr>' );
        // $('#output').append('<td>' +nombre + '</td> ');
        // $('#output').append('<td>' + contacto+'</td> </tr>');
     }
     
    
    return $.html() ;
        }
        catch(Exception){
                console.log(Exception);
        }
}
async function getDataClientes(){
    try{

    
    const resp = await axios.get('https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json');
    console.log(typeof resp.data)
    console.log(resp.data);
    
     const $ = cheerio.load(html.toString()); 
     $('#titulo').html('<h2>Lista de clientes</h2>');
     for(let i = 0; i < resp.data.length; i++){
        const idCliente = resp.data[i].idCliente;
        const nombre = resp.data[i].NombreCompania;
        const contacto = resp.data[i].NombreContacto;
        
        $('#output').append ('<tr> <td>'+ idCliente + '</td>' + '<td>'+ nombre + '</td> ' + ' <td>'+ contacto + '</td> </tr>');
    //     $('#output').append('<td>'+ nombre + '</td> ' );
    //     $('#output').append(' <td>'+ contacto + '</td> </tr>' );
      }
     
    
    return $.html() ;
        }
        catch(Exception){
                console.log(Exception);
        }
}


