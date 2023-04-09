const fs = require('fs');
const { validateSchema } = require('./middleware/validateSchema');
//const handlerMap = [];
function routes(app) {
    fs.readdir(__dirname+'/schema', (err, files) => {
        files.forEach((schema, index) => {
            const schemaJson = require(`./schema/${schema}`);
            const handler = require(`./controller/${schema.split('.')[0]}`);
            constructRoutesByschema(schemaJson, app, handler);
        })
    })
}

function constructRoutesByschema(schemaJson, app, handler) {
    schemaJson.path.forEach((link)=>{
        if(link.custom_controller) {
            app[link.method.toLowerCase()](`${link.url}`, handler[link.custom_controller] )
        } else if(link.method.toLowerCase() == 'get') {
            app.get(`${link.url}`, handler.get )
        } else {
            app[link.method.toLowerCase()](`${link.url}`, validateSchema(schemaJson), handler[link.method.toLowerCase()] )
        }
    })
}

module.exports = {
    routes
}