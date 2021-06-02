const router = require('express').Router();

const apiRoutes = require('./api');
const loginRoutes = require('./login-routes');
const dashboardRoutes = require('./dashboard-routes');

router.use('/api', apiRoutes);
router.use('/', loginRoutes);
router.use('/dashboard', dashboardRoutes)

// router.use((req, res) => {
//     res.send("<h1>Wrong Route!</h2>")
// });

module.exports = router;
