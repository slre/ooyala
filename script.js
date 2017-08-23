var playerParam = {
  'autoplay':autoplay,
  'loop':loop,
  onCreate : window.onCreate,
  "debug":true,
  "skin": {
    "config": "//player.ooyala.com/static/v4/production/latest/skin-plugin/skin.json",
    "inline": {
      "startScreen": {"showDescription": false, "playIconStyle": {"color": "blue"}}
    }
  }
};
OO.ready(function() {
  window.pp = OO.Player.create('container', assetId, playerParam);
  if(assetId =='VidW5kYzE6x01G_XexBxLFymIL4IugoG'){
    $(function() {
      $('.innerWrapper.oo-player').addClass('hide');
      $('#container').append('<div class="second-thumbnail">CLICK ME!!!!!!</div>');

      $('.second-thumbnail').click(function(){
        $('.second-thumbnail').hide();
        $('.innerWrapper.oo-player').removeClass('hide');
        window.pp.play();

      });
    });
  }

});

function onCreate(player) {
  player.mb.subscribe("*" , 'container', function(eventName) {
    if (eventName != OO.EVENTS.DOWNLOADING && eventName != OO.EVENTS.PLAYHEAD_TIME_CHANGED){
      $('.bus-message').text(eventName);
    }
  });
  player.mb.subscribe(OO.EVENTS.PLAYED , 'container', function(eventName) {
    $('.innerWrapper').addClass('spin');
  });
}

var volUp = function(){
  var volTmp = parseFloat(window.pp.getVolume());
  var more = (volTmp < 1) ? 0.1 : 0;
  window.pp.setVolume( volTmp + more );
}
var volDn = function(){
  volTmp = parseFloat(window.pp.getVolume());
  var less = (volTmp > 0) ? 0.1 : 0;
  window.pp.setVolume( volTmp - less );
};
function getAssetsInfo(){

  $.ajax({
    url:"https://api.ooyala.com/v2/assets?api_key=1oZmsyOqjaYKkrWrML3znMfNz-LT.6Dqv9",
    method:"GET",
    dataType: 'jsonp'
  }).done(function(data) {
    //  console.log(data);
    parent.location='#openModal';
    window.data = data;

    var html = "";

    for (obj in data.items ){
      console.log(data.items[obj].name);
      html +=
      '<h1>'+data.items[obj].name+'</h1>';
      for( asset in data.items[obj] ){
        html+='<p>'+asset+' : '+data.items[obj][asset]+'</p>';
      }
    }
    $('#assetInfoTarget').html( html );

  });

};
