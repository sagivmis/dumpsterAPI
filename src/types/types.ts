export type AllItemSlot =
  | "head"
  | "chest"
  | "pants"
  | "boots"
  | "gloves"
  | "necklace"
  | "earrings"
  | "weapon"
  | "shield"
  | "consumable"

export type ArmorType =
  | "head"
  | "chest"
  | "pants"
  | "boots"
  | "gloves"
  | "necklace"
  | "earrings"
  | "shield"
export type WeaponType = "sword" | "bow" | "staff" | "wand"
export type EquippableItemSlot =
  | "head"
  | "chest"
  | "pants"
  | "boots"
  | "gloves"
  | "necklace"
  | "earrings"
  | "weapon"
  | "shield"

export type HeadNames = "Hat" | "Straw Hat" | "Iron Helmet" | "Gold Helmet"
export type ChestNames =
  | "Chest Armor"
  | "Straw Chest Armor"
  | "Iron Chest Armor"
  | "Gold Chest Armor"
export type PantsNames = "Pants" | "Straw Pants" | "Iron Pants" | "Gold Pants"
export type BootsNames = "Boots" | "Straw Boots" | "Iron Boots" | "Gold Boots"
export type GlovesNames =
  | "Gloves"
  | "Straw Gloves"
  | "Iron Gloves"
  | "Gold Gloves"
export type NeckNames = "Necklace" | "Iron Necklace" | "Gold Necklace"
export type EarNames = "Earrings" | "Iron Earrings" | "Gold Earrings"
export type ShieldNames = "Shield" | "Wooden Shield" | "Iron Shield"
export type ConsumableNames =
  | "Health Potion"
  | "Mana Potion"
  | "Apple"
  | "50% EXP BOOST (12hr)"

export type WeaponNames = SwordNames | BowNames | WandNames | StaffNames
export type ArmorNames =
  | HeadNames
  | BootsNames
  | GlovesNames
  | NeckNames
  | EarNames
  | ShieldNames
  | ChestNames
  | PantsNames

export type SwordNames =
  | "Sword"
  | "Wooden Sword"
  | "Iron Sword"
  | "Gold Sword"
  | "Heartstone Sword"
export type BowNames =
  | "Bow"
  | "Wooden Bow"
  | "Iron Bow"
  | "Gold Bow"
  | "Heartstone Bow"
export type WandNames =
  | "Wand"
  | "Wooden Wand"
  | "Iron Wand"
  | "Gold Wand"
  | "Heartstone Wand"
export type StaffNames =
  | "Staff"
  | "Wooden Staff"
  | "Iron Staff"
  | "Gold Staff"
  | "Heartstone Staff"

export type AllItemNames =
  | HeadNames
  | ChestNames
  | PantsNames
  | BootsNames
  | GlovesNames
  | NeckNames
  | EarNames
  | WeaponNames
  | ShieldNames
  | ConsumableNames

export type EquippableNames =
  | HeadNames
  | ChestNames
  | PantsNames
  | BootsNames
  | GlovesNames
  | NeckNames
  | EarNames
  | WeaponNames
  | ShieldNames
