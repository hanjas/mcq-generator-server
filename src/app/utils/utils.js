
exports.succReply = (req, data, msg, res) => {
    const url = req.protocol + '://' + req.get('Host') + req.url;
    const params = { body: req.body, params: req.params, headers: req.headers };
    res.status(200).send( { data, msg } );
};
exports.failReply = (req, data, msg, res) => {
    const url = req.protocol + '://' + req.get('Host') + req.url;
    const params = { body: req.body, params: req.params, headers: req.headers };
    res.status(400).send( { data, msg } );
};
exports.forbidReply = (req, data, msg, res) => {
    const url = req.protocol + '://' + req.get('Host') + req.url;
    const params = { body: req.body, params: req.params, headers: req.headers };
    res.status(403).send( { data, msg } );
};
exports.authFailure = (req, data, msg, res) => {
    const url = req.protocol + '://' + req.get('Host') + req.url;
    const params = { body: req.body, params: req.params, headers: req.headers };
    res.status(401).send( { data, msg } );
};

exports.genericCallback = (req, res) => {
    return (err, data, msg) => {
        if (err)
            return exports.failReply(req, err, msg, res);

        return exports.succReply(req, data, msg, res);
    }
};

exports.simplifiedCallback = (fn) => (req, res, nxt) => fn(req, this.genericCallback(req, res), nxt);

exports.checkallkeys = (reqobj, reqkeys) => {
    for (let i in reqkeys)
        if (!(reqkeys[i] in reqobj))
            return [false, reqkeys[i]]; 
    return [true, null];
};

exports.verifyAPIArgs = (reqkeys) => (req, res, next) => {
    let isallkeys = this.checkallkeys(req.body, reqkeys);
    if(!isallkeys[0]){
        this.failReply(req, 'MISSING_API_ARGUMENTS', "key not found : " + isallkeys[1], res);
    } else{
        next();
    }
};