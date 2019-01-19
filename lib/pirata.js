const cheerio    	 = require('cheerio');
const request    	 = require('request');

const defaultURL 	 = "https://pirateproxy.gdn/";
const requestTimeout = 5000;

const errors	 	 =
{
	REQUEST_ERROR: { code: 'REQUEST_ERROR' },
	PARSER_ERROR:  { code: 'PARSER_ERROR'  }
}

module.exports.categories =
{
	Audio: 100,
	Video: 200,
	Apps:  300,
	Games: 400,
	Porn:  500
}

module.exports.search = function(keyword, config = {}, callback)
{

	const baseURL    = config.url     || defaultURL;
	const timeout    = config.timeout || requestTimeout;
	const page       = config.page    || 0;

	var requestURL   = `${baseURL}/search/${keyword}/${page}/99/0`;

	if(config.cat)
	{
		requestURL+= `/${config.cat}`;
	}

	request.get(requestURL,
	{
		timeout: requestTimeout
	},
	(err, res, body) =>
	{

		if(err || !body)
		{
			return callback(errors.REQUEST_ERROR);
		}

		var $ = cheerio.load(body);
		
		if(!$)
		{
			return callback(errors.PARSER_ERROR);
		}

		var torrents = [];

		$("table[id='searchResult'] tr").each(function(index, el){

			const torrent =
			{
				name:   $(this).find(".detLink").text(),
				seeds: 	parseInt($(this).find("td[align='right']").eq(0).text()),
				leechs: parseInt($(this).find("td[align='right']").eq(1).text()),
				magnet: $(this).find("a[title='Download this torrent using magnet']").attr("href")
			};

			if(torrent.name)
			{
				torrents.push(torrent);
			}

		});

		return callback(null, torrents);

	});

};