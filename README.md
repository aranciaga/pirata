# pirata
 :ocean: Search torrents in The Pirate Bay

# Usage

```
  var pirata = require('pirata');
  
  pirata.search("something", function(res){
    // Do Something
    // return: [{name: "something, seeds: 123, leechs: 33, magnet: "linkmagnet" }]
  });
```

Also, you can search in a TPB mirror and select categories and pages.

```
  var pirata = require('pirata');
  
  var opts = {
    url: "https://pirateproxy.red/",
    page: 2,
    cat: CATEGORY_CODE // Audio = 100, Video = 200, Apps = 300, Games = 400, Porn = 500
  }
  
  pirata.search("something", opts, function(res){
    // Do Something
    // return: [{name: "something, seeds: 123, leechs: 33, magnet: "linkmagnet" }]
  });
```
