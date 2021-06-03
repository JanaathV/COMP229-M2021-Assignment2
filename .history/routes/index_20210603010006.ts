import express from 'express';
const router = express.Router();
export default router;

/* GET home page. */
router.get('/', function(req, res, next) 
{
  res.render('index', { title: 'Home', page: 'home' });
});
/* GET home page. */

router.get('/home', function(req, res, next) 
{
  res.render('index', { title: 'Home', page: 'home' });
});
/* GET About page. */

router.get('/about', function(req, res, next) 
{
  res.render('index', { title: 'About Me', page: 'about' });
});
/* GET Projects page. */

router.get('/projects', function(req, res, next) 
{
  res.render('index', { title: 'My Projects', page: 'projects' });
});
/* GET Services page. */

router.get('/services', function(req, res, next) 
{
  res.render('index', { title: 'My Services' , page: 'services' });
});
/* GET Contact page. */

router.get('/contact', function(req, res, next) 
{
  res.render('index', { title: 'Contact Me', page: 'contact' });
});

//module.exports = router;
