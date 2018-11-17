// Setting elements
var es = {}; // Elements array
['output',
  'input'
].forEach(function(element, index, array) {
  es[element] = document.getElementById(element);
})

// Style stuff
input.onfocus = function() {
  input.classList.add("in");
  input.classList.remove("out");
}
input.onblur = function() {
  input.classList.remove("in");
  input.classList.add("out");
}

// Algolia login
var client = algoliasearch("KC17SSROI6", "6fabfd6313a9783bf11ce9005ceadfc3");
var index = client.initIndex('getstarted_actors');

// Search
es['input'].onkeyup = function() {
  if (es['input'].value.length) {
    index.search(es['input'].value, function searchDone(err, content) {
      if (err) {
        console.error(err);
        return;
      }

      if(content && content.hits.length) {
        var list = content.hits.map(function(e,i,a) {
           return "<li>" + e._highlightResult.name.value + '</i>' + '</li>';
        }).join('');
        es['output'].innerHTML = "<h5><b>Completed in " + content.processingTimeMS + "ms</b></h5><ul>" + list + '</ul>';
      } else {
        es['output'].innerHTML = "<h5><b>No matches found</b></h5>";
      }
    })
  } else {
    es['output'].innerHTML = "";
  }
}
