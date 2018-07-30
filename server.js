const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url} `;
  console.log(log);
  fs.appendFile('serverlog.txt',log + '\n' , (err) => {
    if(err){
      console.log('unable to append');
    }
  });
  next();
});

// app.use((req,res,next) => {
//     res.render('maintnce.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})



app.get('/', (req,res) => {
  res.render('home.hbs', {
    name:'sijo',
    message:'WELCOME TO OUR WEBSITE & have a nice time ',
    likes : [
      'bike',
      'cars'
    ]
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs',{
    pageTitle: 'Sijo details',

  });
})

app.get('/bad', (req,res) => {
  res.send({
    error : 'unable to find the message'
  });

});

app.get('/maintnce', (req,res) => {
  res.render('maintnce.hbs');
});

app.get('/projects', (req,res) => {
  res.render('projects.hbs', {
    project:'My blog Life'
  });
})


app.listen(port, () => {
  console.log(`the server is running ${port}`);
});
