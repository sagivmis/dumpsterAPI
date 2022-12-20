"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Staff = void 0;
const Weapon_1 = require("../Weapon");
class Staff extends Weapon_1.Weapon {
    constructor(name, description, onEquip, onRemove, sideEffect) {
        super(name, description, "staff", onEquip, onRemove, sideEffect);
    }
}
exports.Staff = Staff;
