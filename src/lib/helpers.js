const path = require("path");
const helpers = {};

helpers.icon=(data)=>{
    const ext = path.extname(data);
    var item
    
    switch (ext) {
        case '.pdf':
            item = '1';
            break;
        case '.docx':
            item = '2'
        break;
        default:
            item = icon+data;
            break;
    }
    return item;
}
module.exports = helpers;