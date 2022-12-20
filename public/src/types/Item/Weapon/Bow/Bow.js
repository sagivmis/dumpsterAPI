"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bow = void 0;
const Weapon_1 = require("../Weapon");
class Bow extends Weapon_1.Weapon {
    constructor(name, description, onEquip, onRemove, sideEffect) {
        super(name, description, "bow", onEquip, onRemove, sideEffect);
    }
}
exports.Bow = Bow;
