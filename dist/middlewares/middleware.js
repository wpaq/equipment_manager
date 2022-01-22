"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function middlewareGlobal (req, res, next) {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.token = req.session.token;
    next();
} exports.middlewareGlobal = middlewareGlobal;

 function checkCsrfError (err, req, res, next) {
    if(err && err.code === 'EBADCSRFTOKEN') {
        return res.render('404');
    }
    next();
} exports.checkCsrfError = checkCsrfError;;

 function csrfMiddleware (req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
} exports.csrfMiddleware = csrfMiddleware;;
