/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('prototype.tower');
 * mod.thing == 'a thing'; // true
 */

module.exports = function() {

StructureTower.prototype.loop = function() {
        let closestDamagedStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) =>
                    (structure.structureType == STRUCTURE_WALL && structure.hits < 101010) ||
                    (structure.structureType == STRUCTURE_ROAD && structure.hits < 4000) ||
                    (structure.structureType == STRUCTURE_CONTAINER && structure.hits < 50000) ||
                    (structure.structureType == STRUCTURE_RAMPART && structure.hits < 101010) ||
                    (structure.structureType == STRUCTURE_STORAGE && structure.hits < 10000)

            });
        let closestHostile = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            this.attack(closestHostile);
        } else if(closestDamagedStructure) {
            this.repair(closestDamagedStructure);
        }
};

};