var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404", "vulturuscrow"];
var clss = "";

var getInfo = function(){
  for(var i = 0; i < users.length; i++){
    function doIt(channel){
      function makeURL(type, name){
        return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
      };

      $.getJSON(makeURL("streams", channel), function(data){
        var game, status;
        if(data.stream == null){
          game = "Offline";
          status = "offline";
          clss = "offline";
        }
        else if(data.stream == undefined){
          game = "Offline";
          status = "offline";
          clss = "offline";
        }
        else{
          game = data.stream.game;
          status = "online";
          clss="online";
        }
      });

      $.getJSON(makeURL("channels", channel), function(data){
        var avatar = data.logo;
        if(avatar === null || avatar === undefined){
          avatar = "https://i2.wp.com/static.teamtreehouse.com/assets/content/default_avatar-d5ee029fdb4c0604d314eb946dbf8e6a.png?ssl=1";
        }

        var name = data.display_name;
        if(name === null || name === undefined){
          name = channel;
        }

        var description = data.status;
        if(description === null){
          description = "[No description]";
        }
        else if(description === undefined || description == "404"){
          description = "[Account Closed]";
        }

        var href = data.url;

        $("#output").append(
          "<li class='added' id='" + clss + "'>" +
            "<a class='streamLink' href='" + href + "' target='blank'>" +
              "<div class='row'>" +
                "<div class='col-xs-2'>" +
                  "<img class='avatar' src='" + avatar + "' alt='" + name + "'>" +
                "</div>" +
                "<div class='col-xs-3'>" +
                  "<h5><b>" + name + ":</b></h5>" +
                "</div>" +
                "<div class='col-xs-7'" +
                  "<h2>" + description + "</h3>" +
                "</div>" +
              "</div>" +
            "</a>" +
          "</li>"
        );
      });
    }

    doIt(users[i]);
  }
};

$(document).ready(function(){
  getInfo();
});
