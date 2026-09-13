export type CharacterClassName =
  | 'Mage'
  | 'Rogue'
  | 'Warrior'
  | 'Paladin'
  | 'Ranger'
  | 'Bard'
  | 'Cleric'
  | 'Druid'
  | 'Warlock'
  | 'Monk';

export interface ClassDetails {
  name: CharacterClassName;
  role: string;
  badgeColor: string;
  textColor: string;
  borderColor: string;
  bgGlow: string;
  description: string;
  primaryStat: 'Intelligence' | 'Dexterity' | 'Strength' | 'Wisdom' | 'Charisma' | 'Constitution';
  iconName: string;
  weapons: string[];
  signatureAbilities: string[];
}

export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface FantasyCharacter {
  id: string;
  name: string;
  characterClass: CharacterClassName;
  race: string;
  title: string;
  weapon: string;
  alignment: string;
  specialAbility: string;
  health: number;
  mana: number;
  strength: number;
  stats: CharacterStats;
  lore: string;
  backstory?: string;
  level: number;
  createdAt: number;
  portraitUrl?: string;
  portraitSource?: 'gemini' | 'cartoon-engine';
}
