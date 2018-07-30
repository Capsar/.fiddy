/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.fighter');
 * mod.thing == 'a thing'; // true
 */
 
 var roleTank = {
    run: function(creep) {
         
        if(Game.time % 7 == 0) {
            creep.say('pls hit me');
        }
         
        let target = Game.flags['tank'];
        if(target && creep.room !== target.room) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ff00ff'}});
        } else {
            let closestTower = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                filter: (tower) => tower.structureType == STRUCTURE_TOWER && tower.energy > 0
            });
            if(closestTower) {
                if(creep.attack(closestTower) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTower, {visualizePathStyle: {stroke: '#ff0000'}});
                }
            }
        }
    }
 };

module.exports = roleTank;