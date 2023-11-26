const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 
const helmet = require('helmet');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const apiDoc = require('./apidocs.json'); 
const compression = require('compression');

const app = express();

app.use(compression({
    level: 6,
    threshold: 0,
    filter: (req, res) => {
        if(req.headers['x-no-compression']){
            return false;
        }

        return compression.filter(req, res);
    }
}));

app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDoc, {
    swaggerOptions: {
        requestInterceptor: (req) => {
            let now = new Date();
            let unixEpochTime = Math.floor(now.getTime() / 1000);

            req.headers['Device-Time'] = unixEpochTime.toString();
            return req;
        }
    }
}));

app.use(helmet());

const route = require('./routes/indexRoute');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', route);

app.use((req, res, next) => {
    const err = new Error('Not found.');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err
        }
    })
});

module.exports = app;