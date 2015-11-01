
var request = require('request');
var cheerio = require('cheerio');

var url = 'https://www.npmjs.com/package/q';

request(url, function(error, response, html){
  if(!error){
    // request ile çağırdığımız urlden gelen html datayı '$' olarak yeniden tanımlıyoruz.
    var $ = cheerio.load(html);

    // Çıktı için json objesi oluşturuyorum
    var json = {};

    $('.package-name').filter(function(){
      json.title = $(this).text().trim()
    });

    $('.package-description').filter(function(){
      json.desc = $(this).text().trim()
    });

    $('.box li').eq(2).filter(function(){
      json.repo = $(this).text().trim()
    });

    $('.collaborators').next().next().filter(function(){
        json.stats = $(this).children().eq(2).text().replace(/\s+/g, ' ').trim();
    });

    console.log(JSON.stringify(json, null, 4));

  }
});
