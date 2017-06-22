var path = require('path'),
routes = require('./routes'),
exphbs = require('express-handlebars'),
express = require('express'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
morgan = require('morgan'),
errorHandler = require('errorhandler');
module.exports = function(app) {
	app.use(morgan('dev'));
	app.use(bodyParser({
	uploadDir:path.join(__dirname, 'public/upload/temp')
}));
app.use(cookieParser('some-secret-value-here'));
routes(app);
app.use('/public/', express.static(path.join(__dirname,'../public')));
app.engine('handlebars', exphbs.create({
	defaultLayout: 'main',
	layoutsDir: app.get('views') + '/layouts',
	partialsDir: [app.get('views') + '/partials']
	}).engine);
app.set('view engine', 'handlebars');
if ('development' === app.get('env')) {
		app.use(errorHandler());
	}
	return app;
};