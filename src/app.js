/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vibe = require('ui/vibe');
var ajax = require('ajax');
var Vector2 = require('vector2');
var md5 = require("./md5.js");
var RememberTheMilk = require('./rtm.js');

var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  body: 'Press any button.'
});
console.log('starting app...');
var rtm = new RememberTheMilk(api_key, api_secret, 'delete', 'json', md5);
rtm.get('rtm.tasks.getList', {list_id: '22088288', filter: 'status:incomplete'}, function(resp){
  //console.log(JSON.stringify(resp, null, 2));
  var i, tasks;

  tasks = resp.rsp.tasks.list[0].taskseries;
  for (i = 0; i < resp.rsp.tasks.list[0].taskseries.length; i++) {
    var task = resp.rsp.tasks.list[0].taskseries[i];
    console.log(task.name + ' (id: ' + task.id + ')');
  }
});
console.log('Lists:');
rtm.get('rtm.lists.getList', function(resp){
  var i, list;

  for (i = 0; i < resp.rsp.lists.list.length; i++) {
    list = resp.rsp.lists.list[i];
    console.log(list.name + ' (id: ' + list.id + ')');
  }

});
main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
  
  ajax({ url: 'http://www.reddit.com/r/apphookup/new.json?sort=new&limit=3', 
        type: 'json',
        headers: {'User-Agent': 'my.pebble.app.com r/bpugh'}
       },
  function(data) {
    console.log(JSON.stringify(data));
    
    console.log('Received data.');
    Vibe.vibrate('short');

    //main.body("Press select to browse.\n\nShake to refresh.");
  },  // End of success callback

  function(error) {
    console.log('Error receiving reddit data.');
    console.log(JSON.stringify(error));
    //main.body("Could not download posts.\n\nShake to try refreshing again.");
  }   // End of error callback
);
  
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
