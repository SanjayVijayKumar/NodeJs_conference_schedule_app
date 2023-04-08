function get(req, res) {
    res.writeHeader(200, {'Content-Type': 'text/http'});
    res.end('test success');
}

function post(req, res) {
    res.send('post success').status(201).end();
}

module.exports = {
    get,
    post
}