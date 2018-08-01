/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.repair');
 * mod.thing == 'a thing'; // true
 */
const roleBuilder = require('role.builder');

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
    
    	if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
    	}
    	if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
    	    creep.memory.repairing = true;
    	    creep.say('🚧 repair');
    	}
    	
    	if(!creep.memory.repairing) {
    	    creep.getEnergy(0, false, true, true);
    	} else {
            let damaged = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) =>
                    (structure.structureType == STRUCTURE_WALL && structure.hits < 101010) ||
                    (structure.structureType == STRUCTURE_ROAD && structure.hits < 4000) ||
                    (structure.structureType == STRUCTURE_CONTAINER && structure.hits < 50000) ||
                    (structure.structureType == STRUCTURE_RAMPART && structure.hits < 50000) ||
                    (structure.structureType == STRUCTURE_STORAGE && structure.hits < 10000)
            });
            if(damaged) {
    	        if(creep.repair(damaged) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(damaged, {visualizePathStyle: {stroke: '#ff00ff'}});
                }
            } else {
                roleBuilder.run(creep);
            }
        }
    }
};

module.exports = roleRepairer;