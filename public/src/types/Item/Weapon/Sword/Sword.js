"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sword = void 0;
const Weapon_1 = require("../Weapon");
class Sword extends Weapon_1.Weapon {
    constructor(name, description, onEquip, onRemove, sideEffect) {
        super(name, description, "sword", onEquip, onRemove, sideEffect);
    }
}
exports.Sword = Sword;
