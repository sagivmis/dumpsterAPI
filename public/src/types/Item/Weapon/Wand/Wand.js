"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wand = void 0;
const Weapon_1 = require("../Weapon");
class Wand extends Weapon_1.Weapon {
    constructor(name, description, onEquip, onRemove, sideEffect) {
        super(name, description, "wand", onEquip, onRemove, sideEffect);
    }
}
exports.Wand = Wand;
