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
	        if(creep.memory.source) {
    	        let source = Game.getObjectById(creep.memory.source);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
	        } else {
        	    creep.getEnergy(0, true, false);
	        }
        } else {
            var containers = creep.pos.findInRange(FIND_STRUCTURES,4, {
                    filter: (structure) => structure.structureType == STRUCTURE_CONTAINER &&
                                            structure.store.energy < structure.storeCapacity
            });
            if(containers.length) {
                let container = containers[0];
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