var cheerio    = require('cheerio');
var request    = require('request');
var defaultURL = "https://thepiratebay.org";

module.exports = 
{
    
    search: function(keyword, cfg, cb)
    {

        var baseURL = cfg.url || defaultURL;
        var reqURL  = baseURL + "/search/" + keyword + "/" + cfg.page || 0 + "/99/0";

        if (cfg.cat) reqURL = reqURL + "/" + cfg.cat 

        var cb      = cb || cfg;

        request(reqURL, function(err, res, body){

            if(err || !body){
                return cb("Error at fetching TPB");
            }

            var $ = cheerio.load(body);
            
            if(!$){
                return cb("Error at loading TPB");
            }

            var torrents = [];

            $("table[id='searchResult'] tr").each(function(index, el){

                var torrent    = {};
                torrent.name   = $(this).find(".detLink").text();
                torrent.seeds  = $(this).find("td[align='right']").eq(0).text();
                torrent.leechs = $(this).find("td[align='right']").eq(1).text();
                torrent.magnet = $(this).find("a[title='Download this torrent using magnet']").attr("href");
            
                if( torrent.name != "" )
                    torrents.push(torrent);    
            
            });

            return cb(null, torrents);

        });

    }


};
