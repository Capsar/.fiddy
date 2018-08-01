/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('prototype.creep');
 * mod.thing == 'a thing'; // true
 */
module.exports = function() {
    
    Creep.prototype.getEnergy = function(useRooms, useSources, useContainers, useStorages) {
        if(useContainers && this.memory.targetContainer) {

            let container = Game.getObjectById(this.memory.targetContainer);
            if(container.store.energy > 100) {
                if(this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(container, {visualizePathStyle: {stroke: '#00aaff'}});
                    return;
                }         
            } else {
                this.memory.targetContainer = false;
            }
            
        } else if(useContainers) {
            var containers = this.room.find(FIND_STRUCTURES, {
        	    filter: (structure) =>
        	        (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy > 0) ||
        	        (structure.structureType == STRUCTURE_STORAGE && structure.store.energy > 100 && useStorages)
            });
            console.log(this.name + ", " + containers);
        	if(containers.length) {
        	    let container = containers[0];
        	    let temp = 0;
                for(let id in containers) {
                    let cont = containers[id];
                    if(cont.store.energy >= temp) {
                        container = cont;
                        temp = cont.store.energy;
                    }
                }
                console.log(container);
                this.memory.targetContainer = container.id;
        	} else {
            	var resource = this.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            	if(resource) {
            	    if(this.pickup(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.moveTo(resource, {visualizePathStyle: {stroke: '#00aaff'}});
                        return;
            	    }            
            	}
        	}
    	}

    	if(useSources) {
            let source = this.pos.findClosestByPath(FIND_SOURCES, {
            filter: (source) => source.energy > 0});
            if(source) {
                if(this.harvest(source) == ERR_NOT_IN_RANGE) {
                    this.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else if(useRooms > 0) {
                let sourceFlags = _.filter(Game.flags, (flag) => flag.name.startsWith("source"));
                if(sourceFlags[1].room !== this.room) {
                    this.moveTo(sourceFlags[1]);
                }
    	    }
        }
    };


};
