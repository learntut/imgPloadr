var path = require('path'),
routes = require('./routes'),
exphbs = require('express-handlebars'),
express = require('express'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
morgan = require('morgan'),
errorHandler = require('errorhandler');
moment = require('moment');
multer = require('multer');
module.exports = function(app) {
	app.use(morgan('dev'));
	// app.use(bodyParser({
	// 	uploadDir:path.join(__dirname, 'public/upload/temp')
	// }));
	app.use(multer({ dest: path.join(__dirname,'public/upload/temp')}).single('singleInputFileName'));
	app.use(cookieParser('some-secret-value-here'));
	routes(app);

	app.use('/public/', express.static(path.join(__dirname,'../public')));
	app.engine('handlebars', exphbs.create({
	defaultLayout: 'main',
	layoutsDir: app.get('views') + '/layouts',
	partialsDir: [app.get('views') + '/partials'],
	helpers: {
			timeago: function(timestamp) {
			return moment(timestamp).startOf('minute').fromNow();
			}
		}
	}).engine);
	app.set('view engine', 'handlebars');
	if ('development' === app.get('env')) {
		app.use(errorHandler());
	}
	return app;
};