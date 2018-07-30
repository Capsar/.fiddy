/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.lorry');
 * mod.thing == 'a thing'; // true
 */

var roleLorry = {

    /** @param {Creep} creep **/
    run: function(creep) {
        let pickupPoints = _filter(Game.flags, (flag) => flag.name.startsWith('PickupPoint'));
        
        
        if(creep.memory.delivering && creep.carry.energy == 0) {
            creep.memory.delivering = false;
            creep.say('🔄 pickup');
	    }
	    if(!creep.memory.delivering && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.delivering = true;
	        creep.say('Deliver');
	    }
        
	    if(!creep.memory.delivering) {
	        let target = Game.flags[creep.memory.pickupPoint].;
	        if(target.room !== creep.room) {
	            creep.moveTo(target);
	        } else
	            creep.getEnergy(1, false, true);
        } else {
            let homeFlag = Game.flags['Home'].name;
            if(homeFlag.room !== creep.room) {
                creep.moveTo(homeFlag{visualizePathStyle: {stroke: '#00ff00'}});
            } else {
                let targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER && structure.energy < structure.energyCapacity;
                        }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
	}
};

module.exports = roleLorry;