# pirata
 :ocean: Search torrents in The Pirate Bay

# Usage

```
const pirata = require('pirata');

pirata.search("something", function(err, res)
{
	// res: [{name: "something, seeds: 123, leechs: 33, magnet: "linkmagnet" }]
});
```

Also, you can search in a TPB mirror and select categories and pages.

```
const pirata   = require('pirata');
const category = pirata.categories;

const opts =
{
	url: "https://pirateproxy.red/",
	page: 2, // note: start in 0.
	cat: category.Audio
}

pirata.search("something", opts, function(err, res)
{
	// res: [{name: "something", seeds: 123, leechs: 33, magnet: "linkmagnet" }]
});
```

# Categories

* pirata.categories.Audio
* pirata.categories.Video
* pirata.categories.Games
* pirata.categories.Porn
* pirata.categories.Apps

# Errors

In case of error, pirata return an error object which contains an error code

### Request error (Mirror is down)

```
{
	code: 'REQUEST_ERROR'	
}
```

### Parsing site

```
{
	code: 'PARSER_ERROR'	
}
```