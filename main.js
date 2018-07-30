const roleBuilder = require('role.builder');
const roleFighter = require('role.fighter');
const roleHarvester = require('role.harvester');
const roleMiner = require('role.miner');
const roleRepairer = require('role.repairer');
const roleUpgrader = require('role.upgrader');
require('prototype.creep')();
require('prototype.tower')();
require('prototype.spawn')();


module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');

    var fighters = _.filter(Game.creeps, (creep) => creep.memory.role == 'fighter');
    

    var total = builders.length+harvesters.length+upgraders.length+repairers.length + miners.length + fighters.length;
    
    let num = Memory.numberOfCreeps;
    
    if(total != num) {
        console.log('Creep number changed from: ' + num + ' to: ' + total);
        Memory.numberOfCreeps = total;
    }
    
    for(let name in Game.spawns) {
        let spawn = Game.spawns[name];
        let roomEnergy = spawn.room.energyAvailable;
        let roomEnergyCap = spawn.room.energyCapacityAvailable;
        let closestHostile = spawn.pos.findClosestByRange(FIND_HOSTILE_CREEPS);


        if(Game.time % 10 == 0) {
            console.log(roomEnergy + ", " + roomEnergyCap);
            console.log('Total: ' + total + ", builders: " + builders.length + ", harvesters: " 
                + harvesters.length + ", upgraders: " + upgraders.length + ", repairers: "
                + repairers.length + ", miners: " + miners.length + ", fighters: " + fighters.length);
        }
        
        if(harvesters.length < 2 && !spawn.spawning && roomEnergy >= 300) {
            let newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName, 
                {memory: {role: 'harvester'}});
        } else 
        if(upgraders.length < 1 && !spawn.spawning && roomEnergy >= 300) {
            let newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            spawn.spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName, 
                {memory: {role: 'upgrader'}});
        } else
        if(builders.length < 2 && !spawn.spawning && roomEnergy >= 500) {
            let newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            spawn.spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role: 'builder'}});
        } else
        if(repairers.length < 1 && !spawn.spawning && roomEnergy >= 400) {
            let newName = 'Repairer' + Game.time;
            console.log('Spawning new repairer: ' + newName);
            spawn.spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role: 'repairer'}});
        } else
        if(miners.length < 2 && !spawn.spawning && roomEnergy >= 600) {
            let newName = 'Miner' + Game.time;
            console.log('Spawning new miner: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], newName, 
                {memory: {role: 'miner'}});
        } else
        if(fighters.length < 2 && (closestHostile || Game.flags['attack']) && !spawn.spawning && roomEnergy >= 800) {
            let newName = 'Helper' + Game.time;
            console.log('Spawning new Helper: ' + newName);
            spawn.spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE], newName, 
                {memory: {role: 'fighter'}});
        }
    
    
        
        if(spawn.spawning) { 
            var spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1, 
                spawn.pos.y, 
                {align: 'left', opacity: 0.8});
        }
    
        var towers = spawn.room.find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers.forEach(tower => tower.loop());

    }
    
        

            
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch(creep.memory.role) {
            case 'harvester': 
                roleHarvester.run(creep);
                break;
            case 'upgrader': 
                roleUpgrader.run(creep);
                break;
            case 'builder': 
                roleBuilder.run(creep);
                break;
            case 'repairer':
                roleRepairer.run(creep);
                break;
            case 'miner':
                roleMiner.run(creep);
                break;
            case 'fighter':
                roleFighter.run(creep);
                break;
        }
    }
}
