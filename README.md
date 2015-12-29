# stealPlugin
RPGMaker MV plugin to allow a character to steal.  Note this steals items that have been put on the character as 'drops' and will then 'clear' those drops so you dont get two items.

## TODO 
* It steals from random enemy since i have issues getting selected one.
* I'd like to add some random luck multiplier but not yet.

## USAGE
* inlcud js file in your plugins directory
* Create common event "steal" with plugin command "StealItem"
* Create skill that calls common event "steal" you created with previous step.
