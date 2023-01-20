import express, { ErrorRequestHandler } from "express";
import path from 'path';
import logger from 'morgan';

const app = express();
const port = 1337

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
} as ErrorRequestHandler);

app.get('/', async (req, res) => {
    res.send('OK, this works, right?')
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})

module.exports = app;