const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials/');

/** Set View Engine to Handlebars */
app.set('view engine', 'hbs');

/** Register Middleware */
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `Time: ${now}, Request Method: ${req.method}, URL: ${req.url}`;

    // console.log(`Time: ${now}, Request Method: ${req.method}, URL: ${req.url}`);
    console.log(log);
    /** 
     * Deprecated as of Node 7, due to lack of callback for error warning
     * (node:7712) [DEP0013] DeprecationWarning: Calling an asynchronous function without callback is deprecated.
     * (node:7812) [DEP0013] DeprecationWarning: Calling an asynchronous function without callback is deprecated.
     */
    // fs.appendFile('server.log', log + '\n');

    /** For use with Node > v.7, with callback for error */
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to file');
        }
    });

    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance');
// });


app.use(express.static(__dirname + '/public'));
/** End of Register Middleware */

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express App</h1>');
    res.render('home', {
        pageTitle: 'Home',
        // currentYear: getCurrentYear,
        welcomeMessage: 'Welcome to my Express App'
    });
});

app.get('/json', (req, res) => {
    res.send({
        name: 'Dustin',
        age: 29,
        hobbies: [
            'Coding',
            'Skateboarding'
        ],
        pets: [
            'Brutus',
            'Rusty'
        ]
    }); 
});

app.get('/about', (req, res) => {
    // res.send('About Page');
    res.render('about', {
        pageTitle: 'About',
        // currentYear: getCurrentYear
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request.'
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
