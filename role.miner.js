/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.miner');
 * mod.thing == 'a thing'; // true
 */
var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(!creep.memory.mining && creep.carry.energy == 0) {
            creep.memory.mining = true;
            creep.say('🔄 mine');
	    }
	    if(creep.memory.mining && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.mining = false;
	        creep.say('store');
	    }
        
	    if(creep.memory.mining ) {
	        creep.getEnergy(0, true, false);
        } else {
            var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.structureType == STRUCTURE_CONTAINER &&
                                            structure.store.energy < structure.storeCapacity
            });
            if(container) {
                if(creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                creep.drop(RESOURCE_ENERGY, creep.storeCapacity);
            }
        }
	}
};

module.exports = roleMiner;