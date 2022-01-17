export function middlewareGlobal (req, res, next) {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.token = req.session.token;
    next();
}

export function checkCsrfError (err, req, res, next) {
    if(err && err.code === 'EBADCSRFTOKEN') {
        return res.render('404');
    }
    next();
};

export function csrfMiddleware (req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
};
