module.exports = function(io) {
  let bowshock = require("node-bowshock");
  let rp = require("request-promise");
  io.sockets.on("connection", function(socket) {
    console.log("connected", socket.id);

    socket.on("get apod", date => {
      console.log(date)
      bowshock.apod(date).then(apod => {
        socket.emit("send apod", apod);
      });
    });
    socket.on("get curiosity", date => {
      
      let formatted_date = format_date(date);
      
      bowshock.mars.curiosity(formatted_date).then(rover => {
        socket.emit("send curiosity", rover);
      });
    });

    socket.on("get manifest", rover => {
      console.log(rover)
      if(!rover.sol && !rover.camera){
        bowshock.mars.manifest(rover).then(manifest => {
          console.log(manifest)
          socket.emit("send manifest", manifest);
        });
      }
      if(rover.sol || rover.camera){
        bowshock.mars.manifest(rover).then(photos => {
          console.log(photos)
          socket.emit("send rover by param", photos);
        });
      }

      
    });


    socket.on("get opportunity", date => {
      let formatted_date = format_date(date);
      bowshock.mars.opportunity(formatted_date).then(rover => {
        socket.emit("send opportunity", rover);
      });
    });

    socket.on("get spirit", date => {
      let formatted_date = format_date(date);
      bowshock.mars.spirit(formatted_date).then(rover => {
        socket.emit("send spirit", rover);
      });
    });
    socket.on("get stats", () => {
      bowshock.neows.stats().then(stats => {
        socket.emit("send stats", stats);
      });;
      
    });

    socket.on("get feed", date => {
      console.log(date)
      let formatted_date = format_date(date);
      console.log(formatted_date)
      bowshock.neows.feed(formatted_date).then(feed => {
        socket.emit("send feed", feed);
      });
    });
    socket.on("get next", url => {
      var options = {
        uri: url,
        json: true
      };
      rp(options)
        .then(function(result) {
          socket.emit("send next", result);
        })
        .catch(function(err) {
          console.log(err);
        });
    });

    socket.on("get previous", url => {
      var options = {
        uri: url,
        json: true
      };
      rp(options)
        .then(function(result) {
          socket.emit("send previous", result);
        })
        .catch(function(err) {
          console.log(err);
        });
    });

    socket.on("get eva", () => {
      bowshock.eva().then(eva => {
        socket.emit("recieve eva", eva);
      });
    });

    socket.on("get today", () => {
      bowshock.neows.today().then(today => {
        socket.emit("send today", today);
      });
    });
  });

  function format_date(date) {
    let dateStr = '';
    if(typeof date == Date){
      dateStr = "%4d/%02d/%02d" % (date.getFullYear(), date.getMonth(), date.getDate())
      //dateStr = "{:4d}-{:02d}-{:02d}".format(date.getFullYear(), date.getMonth(), date.getDate() )
      return dateStr;
    }else{
      dateArr = date.split('-');
      console.log(dateArr[0], dateArr[1], dateArr[2])
      dateStr = "%4d/%02d/%02d" % (dateArr[0], dateArr[1], dateArr[2] )
      //dateStr = "{:4d}-{:02d}-{:02d}".format(dateArr[0], dateArr[1], dateArr[2] )
      return dateStr;
    }

  }
};
