const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const flash = require('connect-flash');
const csurf = require('csurf');

const DSN = require('./keys/keys');

const cabinetRoutes = require('./routes/cabinet');
const ratingRoutes = require('./routes/rating');
const authenticationRoutes = require('./routes/authentication');

const userMiddleware = require('./middleware/user');
const varMiddleware = require('./middleware/vars');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');


const PORT = process.env.PORT || 3000;

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: require('./utils/hbs-helpers')
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));

// Настройка хранения сессии в БД
var sessionStore = new MySQLStore({
    host: DSN.HOST_NAME,
    user: DSN.USER_NAME,
    password: DSN.PASSWORD,
    database: DSN.DATABASE_NAME
});
// Регистрация сессии
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));
app.use(csurf());
app.use(flash());
// Подключаем переменные для объекта response
app.use(varMiddleware);
app.use(userMiddleware);
app.use(authMiddleware);



app.use('/', cabinetRoutes);
app.use('/rating', ratingRoutes);
app.use('/', authenticationRoutes);
// app.use('/courses', coursesRoutes)
// app.use('/card', cardRoutes)
// app.use('/orders', ordersRoutes)
// app.use('/auth', authRoutes)

app.use(errorHandler);

function start() {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}\n\n`)
        })
    } catch (e) {
        console.log(e)
    }
}

start();