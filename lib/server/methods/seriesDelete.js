Meteor.methods({
  seriesDelete: function(tvdb){
    try {
      check(Sonarr.url, String);
      check(Sonarr.port, Number);
      check(Sonarr.api, String);
      check(tvdb, Number);
    } catch (e) {
      console.log("Sonarr Series Delete -> " + e.message);
      return false;
    }

    try {
      var allShows = HTTP.call("GET", Sonarr.url + ":" + Sonarr.port + "/api/series/", {headers: {"X-Api-Key":Sonarr.api}, timeout: 2000} );
    } catch (e) {
      console.log("Sonarr Series Delete -> " + e.message);
      return false;
    }

    var sonarrId = 0;

    _.each(allShows.data, function (show) {
      if (show.tvdbId === tvdb) {
        sonarrId = show.id;
      }
    });


    if (sonarrId !== 0) {
      try {
        var response = HTTP.call("DELETE", Sonarr.url + ":" + Sonarr.port + "/api/series/" + sonarrId, {headers: {"X-Api-Key":Sonarr.api}, timeout: 2000} );
      } catch (e) {
        console.log("Sonarr Series Delete -> " + e.message);
        return false;
      }
    }    
 
    var status = (response) ? true : false;

    return status;
  }
});