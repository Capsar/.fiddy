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
        if(creep.memory.delivering && creep.carry.energy == 0) {
            creep.memory.delivering = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.delivering && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.delivering = true;
	        creep.say('Delivering');
	    }
        
	    if(!creep.memory.delivering) {
	        creep.getEnergy(0, false, true, false);
        } else {
            if(creep.room.storage) {
                if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleLorry;