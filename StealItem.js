//=============================================================================
// StealItem.js
//=============================================================================

/*:
 * @plugindesc Calling will allow you to steal an item from a random enemy in your encounter
 * @author David Gill
 *
 *
 * @help This plugin does not provide plugin commands.
 *
 */

/*:ja
 * TODO
 */

(function() {

  var parameters = PluginManager.parameters('StealItem');
  var _Window_BattleLog_addText = Window_BattleLog.prototype.addText;
  var _Window_Message = Window_Message.prototype;

  var _Game_Interpreter_pluginCommand =
          Game_Interpreter.prototype.pluginCommand;

  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      _Game_Interpreter_pluginCommand.call(this, command, args);

      if (command != 'StealItem')
        return;

      //find selected enemy, doesnt work out of scope :(
      //$gameTroop._enemies[0]._selected;
      var randomEnemyIndex = Math.floor((Math.random() * ($gameTroop._enemies.length)));
      var randomEnemyId = $gameTroop._enemies[randomEnemyIndex]._enemyId;

      var enemyItems = $dataEnemies[randomEnemyId].dropItems;
      var enemyContainedItems = enemyItems.filter(function (el) {
        return el.kind > 0;
      });

      if (enemyContainedItems.length == 0)
      {
        //Message enemy doesnt have anythings
        $gameMessage._texts.push("Does not have anything");
        return;
      }

      var totalEnemyContainedItems = enemyContainedItems.length;
      var selectedItem = Math.floor((Math.random() * (totalEnemyContainedItems)));
      var enemyItem = $dataEnemies[randomEnemyId].dropItems[selectedItem];

      console.log("enemy item is kind " + enemyItem.kind + " with id " + enemyItem.dataId);

      var realItem = Game_Enemy.prototype.itemObject(enemyItem.kind, enemyItem.dataId);

      //see if steal failed
      //find base prob with 180% chance
      var probToSteal = (1 / enemyItem.denominator) * 1.80;

      //TODO: increase by top theifs luck
      // need to get $gameActors which is tough
      /*var realActors = $dataActors.splice(1, $dataActors.length);
      var actorTheif = realActors.filter(function (el) {
        return el.classId == 5;
      });*/

      var stealRole = Math.random();
      if (stealRole > probToSteal){
          $gameMessage._texts.push("Could not steal");
          return;
      }

      $gameParty.gainItem(realItem, 1, false);

      $gameMessage._texts.push("Stole " + realItem.name);
      //Window_Message.prototype.startMessage

      //TODO:test remove from enemys droppedloot
      $dataEnemies[randomEnemyId].dropItems[selectedItem].kind = 0;
    }
})();
