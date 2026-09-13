import { CharacterClassName, ClassDetails, FantasyCharacter, CharacterStats } from '../types';

export const CLASSES_DATA: Record<CharacterClassName, ClassDetails> = {
  Mage: {
    name: 'Mage',
    role: 'Arcane Weaver & Spellcaster',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    textColor: 'text-indigo-400',
    borderColor: 'border-indigo-500/30',
    bgGlow: 'from-indigo-500/10 via-purple-500/5 to-transparent',
    description: 'Masters of the raw arcane forces, weaving reality-bending spells from ancient tomes.',
    primaryStat: 'Intelligence',
    iconName: 'Wand2',
    weapons: [
      'Crystalline Spire Staff',
      'Ancient Spell-Forged Orb',
      'Silvered Runestaff & Grimoire',
      'Staff of Temporal Distortion',
    ],
    signatureAbilities: [
      'Arcane Nova',
      'Chrono Shift',
      'Meteor Swarm',
      'Frostfire Cataclysm',
      'Prismatic Barrier',
    ],
  },
  Rogue: {
    name: 'Rogue',
    role: 'Shadow Infiltrator & Assassin',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgGlow: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    description: 'Masters of stealth, silent blades, and precision strikes who strike unseen from shadows.',
    primaryStat: 'Dexterity',
    iconName: 'Footprints',
    weapons: [
      'Dual Venom-Coated Daggers',
      'Shadow-Tempered Stiletto',
      'Recurve Silent Longbow',
      'Concealed Serrated Dirk & Wire',
    ],
    signatureAbilities: [
      'Shadowstep Ambush',
      'Vanish in Mist',
      'Flurry of Blades',
      'Smoke Bomb Escape',
      'Poisoned Execution',
    ],
  },
  Warrior: {
    name: 'Warrior',
    role: 'Frontline Juggernaut & Veteran',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    textColor: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgGlow: 'from-amber-500/10 via-orange-500/5 to-transparent',
    description: 'Relentless combatants forged in battle, wielding heavy steel and unbreakable resolve.',
    primaryStat: 'Strength',
    iconName: 'Shield',
    weapons: [
      'Ancestral Greatsword',
      'Heavy Battleaxe & Oak Tower Shield',
      'Meteorite War Maul',
      'Twin Forged Bastard Swords',
    ],
    signatureAbilities: [
      'Earthshaking Cleave',
      'Unyielding Fortress',
      'Whirlwind Berserk',
      'Battle Cry of Ruin',
      'Titan Stride',
    ],
  },
  Paladin: {
    name: 'Paladin',
    role: 'Holy Crusader & Bulwark',
    badgeColor: 'bg-yellow-500/20 text-yellow-200 border-yellow-500/40',
    textColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
    bgGlow: 'from-yellow-500/10 via-amber-500/5 to-transparent',
    description: 'Sworn protectors guided by divine vows, channeling sacred light into devastating smites.',
    primaryStat: 'Strength',
    iconName: 'Sun',
    weapons: [
      'Sun-Blessing Claymore',
      'Gilded Warhammer & Dawn Shield',
      'Radiant Poleaxe of Judgement',
      'Blessed Broadsword of the Silver Vigil',
    ],
    signatureAbilities: [
      'Holy Wrath Smite',
      'Aura of Sanctity',
      'Lay on Hands',
      'Beacon of Dawn',
      'Radiant Retribution',
    ],
  },
  Ranger: {
    name: 'Ranger',
    role: 'Wilderness Hunter & Scout',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    textColor: 'text-teal-400',
    borderColor: 'border-teal-500/30',
    bgGlow: 'from-teal-500/10 via-emerald-500/5 to-transparent',
    description: 'Deadly marksmen attuned to untamed frontiers, tracking quarry across forgotten lands.',
    primaryStat: 'Dexterity',
    iconName: 'Compass',
    weapons: [
      'Ironwood Composite Bow',
      'Twin Hunting Scimitars',
      'Wind-Carved Heavy Crossbow',
      'Spear of the Timberland Path',
    ],
    signatureAbilities: [
      'Hawkeye Volley',
      'Predator Tracking',
      'Beast Companion Strike',
      'Camouflage Cloak',
      'Bramble Snare Shot',
    ],
  },
  Bard: {
    name: 'Bard',
    role: 'Enchanter & Lorekeeper',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    textColor: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    bgGlow: 'from-purple-500/10 via-pink-500/5 to-transparent',
    description: 'Weavers of song and myth whose performances inspire allies and manipulate minds.',
    primaryStat: 'Charisma',
    iconName: 'Music',
    weapons: [
      'Resonant Silver-Strung Lute',
      'Rapier of Harmonic Cadence',
      'Charmed Flute of Whispers',
      'Gilded Hand-Crossbow & Mandolin',
    ],
    signatureAbilities: [
      'Song of Resurgence',
      'Dissonant Cacophony',
      'Anthem of Bravery',
      'Symphonic Charm',
      'Counterpoint Verse',
    ],
  },
  Cleric: {
    name: 'Cleric',
    role: 'Divine Emissary & Healer',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgGlow: 'from-cyan-500/10 via-sky-500/5 to-transparent',
    description: 'Channels the direct power of celestial deities to mend broken flesh and banish corruption.',
    primaryStat: 'Wisdom',
    iconName: 'HeartHandshake',
    weapons: [
      'Hallowed Iron Flail & Shield',
      'Morningstar of Divine Verdict',
      'Consecrated Scepter of Grace',
      'Silvered Mace of Exorcism',
    ],
    signatureAbilities: [
      'Celestial Restoration',
      'Turn Unholy',
      'Pillar of Guiding Light',
      'Divine Aegis',
      'Sanctuary Wave',
    ],
  },
  Druid: {
    name: 'Druid',
    role: 'Keeper of Primal Balance',
    badgeColor: 'bg-lime-500/20 text-lime-300 border-lime-500/40',
    textColor: 'text-lime-400',
    borderColor: 'border-lime-500/30',
    bgGlow: 'from-lime-500/10 via-emerald-500/5 to-transparent',
    description: 'Guardians of nature who shift shapes into wild beasts and summon storms from the earth.',
    primaryStat: 'Wisdom',
    iconName: 'Trees',
    weapons: [
      'Yew Rootquarterstaff',
      'Sickle of the Harvest Moon',
      'Totemic Ash Greatclub',
      'Living Thorns Scythe',
    ],
    signatureAbilities: [
      'Dire Beasthowl Shape',
      'Call Lightning Storm',
      'Entangling Roots',
      'Barkskin Resilience',
      'Grove Rejuvenation',
    ],
  },
  Warlock: {
    name: 'Warlock',
    role: 'Eldritch Pact-Binder',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
    textColor: 'text-violet-400',
    borderColor: 'border-violet-500/30',
    bgGlow: 'from-violet-500/10 via-fuchsia-500/5 to-transparent',
    description: 'Bound by sinister pacts with otherworldly entities, commanding raw void magic.',
    primaryStat: 'Charisma',
    iconName: 'Eye',
    weapons: [
      'Obsidian Void Dagger',
      'Scythe of the Abyssal Pact',
      'Bone Wand of Whispering Shadows',
      'Chain of Eldritch Binding',
    ],
    signatureAbilities: [
      'Eldritch Blast Volley',
      'Tomb of Levistus',
      'Curse of Agony',
      'Dimensional Rift',
      'Nether Beam',
    ],
  },
  Monk: {
    name: 'Monk',
    role: 'Ascetic Martial Artist',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    textColor: 'text-rose-400',
    borderColor: 'border-rose-500/30',
    bgGlow: 'from-rose-500/10 via-amber-500/5 to-transparent',
    description: 'Spiritual martial artists who harness inner Ki to move like the wind and shatter stone.',
    primaryStat: 'Dexterity',
    iconName: 'Flame',
    weapons: [
      'Iron-Banded Bo Staff',
      'Reinforced Brass Knuckles',
      'Paired Nunchaku of the Crane',
      'Unarmed Astral Ki Fists',
    ],
    signatureAbilities: [
      'Flurry of Blows',
      'Stunning Strike',
      'Patient Defense',
      'Step of the Wind',
      'Quivering Palm',
    ],
  },
};

const FIRST_NAMES = [
  'Aeloria', 'Thorgar', 'Kaelen', 'Morwenna', 'Zephyrus', 'Vespera',
  'Boran', 'Isolde', 'Kieran', 'Vivienne', 'Draven', 'Cedric',
  'Branok', 'Faelar', 'Seraphina', 'Lysander', 'Rowan', 'Gideon',
  'Elira', 'Malakor', 'Jax', 'Rylan', 'Selene', 'Torvald',
  'Cassian', 'Astrid', 'Fenwick', 'Valerius', 'Kaelith', 'Gwyneira',
  'Darian', 'Rhiannon', 'Aldric', 'Sylas', 'Morgana', 'Eryndor',
  'Balthazar', 'Lunara', 'Einar', 'Theron', 'Nyx', 'Vorath',
];

const SURNAMES_PARTS_1 = [
  'Iron', 'Star', 'Shadow', 'Storm', 'Frost', 'Blood', 'Sun',
  'Night', 'Ember', 'Silver', 'Thunder', 'Swift', 'Rune', 'Deep',
  'Raven', 'Hollow', 'Dawn', 'Gold', 'Wild', 'Dusk', 'Void',
  'Ash', 'Oak', 'Wind', 'Fire', 'Stone', 'Mist',
];

const SURNAMES_PARTS_2 = [
  'breaker', 'weaver', 'veil', 'caller', 'peak', 'fang', 'strider',
  'shade', 'fall', 'leaf', 'stride', 'wind', 'vale', 'stone',
  'crest', 'mire', 'seeker', 'fist', 'heart', 'watcher', 'singer',
  'warden', 'forge', 'claw', 'crown', 'helm', 'flame',
];

const EPITHETS = [
  'the Undaunted',
  'the Silent Fang',
  'the Arcane Scholar',
  'the Shield of Dawn',
  'the Wild Warden',
  'the Ironclad',
  'the Starlight Seer',
  'the Cursed Blade',
  'the Whisperer in the Shadows',
  'the Hearthkeeper',
  'the Flamebearer',
  'the Windwalker',
  'the Void Touched',
  'the Relentless',
  'the Spellbreaker',
  'the Stormborn',
  'the Mountain Breaker',
  'the Sunforged',
];

const RACES = [
  'High Elf',
  'Wood Elf',
  'Dark Elf (Drow)',
  'Mountain Dwarf',
  'Iron Dwarf',
  'Highland Human',
  'Imperial Human',
  'Dragonborn (Gold)',
  'Dragonborn (Crimson)',
  'Tiefling',
  'Half-Orc',
  'Halfling',
  'Forest Gnome',
];

const ALIGNMENTS = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
  'Chaotic Neutral',
  'Lawful Evil',
  'Neutral Evil',
  'Chaotic Evil',
];

const LORE_HOOKS = [
  'Exiled from their ancestral citadel after unearthing a forbidden prophecy.',
  'Travels the untamed frontier seeking a relic stolen from the Order of the Crescent.',
  'Possesses an arcane brand that glows brightly whenever ancient magic stirs nearby.',
  'Swore an oath of retribution across the ashes of their fallen guild.',
  'Carries a sealed scroll etched in draconic runes that no mortal eye has deciphered.',
  'Known across taverns for surviving an encounter with a brood of shadow drakes.',
  'Raised by silent mountain hermits to listen to the whispers of passing winds.',
  'Hunts the fugitive cabal responsible for extinguishing the eternal sacred pyre.',
  'A wandering folk hero whose legendary exploits are sung by bards at every crossroads.',
  'Bears the scars of an planar rift that briefly dragged them into the Nether Void.',
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function rollStat(isPrimary: boolean): number {
  // 3d6 with bonus for primary stat
  const roll = Math.floor(Math.random() * 6) + 1 +
               Math.floor(Math.random() * 6) + 1 +
               Math.floor(Math.random() * 6) + 1;
  const stat = isPrimary ? Math.max(14, roll + 3) : roll;
  return Math.min(20, Math.max(8, stat));
}

const CLASS_COMBAT_PROFILES: Record<CharacterClassName, {
  healthBase: [number, number];
  manaBase: [number, number];
  strengthBase: [number, number];
}> = {
  Warrior: { healthBase: [170, 240], manaBase: [40, 80], strengthBase: [78, 99] },
  Paladin: { healthBase: [155, 220], manaBase: [95, 175], strengthBase: [72, 94] },
  Monk: { healthBase: [135, 195], manaBase: [80, 160], strengthBase: [66, 90] },
  Ranger: { healthBase: [125, 185], manaBase: [70, 145], strengthBase: [56, 82] },
  Rogue: { healthBase: [110, 165], manaBase: [60, 130], strengthBase: [52, 78] },
  Cleric: { healthBase: [130, 190], manaBase: [150, 260], strengthBase: [48, 76] },
  Druid: { healthBase: [125, 185], manaBase: [160, 275], strengthBase: [44, 72] },
  Bard: { healthBase: [110, 160], manaBase: [140, 240], strengthBase: [38, 68] },
  Warlock: { healthBase: [105, 160], manaBase: [180, 310], strengthBase: [34, 62] },
  Mage: { healthBase: [85, 140], manaBase: [210, 350], strengthBase: [28, 55] },
};

function rollRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomCharacter(chosenClass?: CharacterClassName): FantasyCharacter {
  const classKeys = Object.keys(CLASSES_DATA) as CharacterClassName[];
  const characterClass = chosenClass || getRandomElement(classKeys);
  const classDetails = CLASSES_DATA[characterClass];

  const firstName = getRandomElement(FIRST_NAMES);
  const useEpithet = Math.random() > 0.4;
  const surname = getRandomElement(SURNAMES_PARTS_1) + getRandomElement(SURNAMES_PARTS_2);
  const epithet = getRandomElement(EPITHETS);
  
  const fullName = useEpithet && Math.random() > 0.5 
    ? `${firstName} ${epithet}` 
    : `${firstName} ${surname}`;

  const race = getRandomElement(RACES);
  const alignment = getRandomElement(ALIGNMENTS);
  const weapon = getRandomElement(classDetails.weapons);
  const specialAbility = getRandomElement(classDetails.signatureAbilities);
  const lore = getRandomElement(LORE_HOOKS);

  const stats: CharacterStats = {
    strength: rollStat(classDetails.primaryStat === 'Strength'),
    dexterity: rollStat(classDetails.primaryStat === 'Dexterity'),
    constitution: rollStat(classDetails.primaryStat === 'Constitution'),
    intelligence: rollStat(classDetails.primaryStat === 'Intelligence'),
    wisdom: rollStat(classDetails.primaryStat === 'Wisdom'),
    charisma: rollStat(classDetails.primaryStat === 'Charisma'),
  };

  const profile = CLASS_COMBAT_PROFILES[characterClass] || {
    healthBase: [100, 200],
    manaBase: [100, 200],
    strengthBase: [40, 80],
  };

  const health = rollRange(profile.healthBase[0], profile.healthBase[1]);
  const mana = rollRange(profile.manaBase[0], profile.manaBase[1]);
  const strength = rollRange(profile.strengthBase[0], profile.strengthBase[1]);

  return {
    id: 'char_' + Math.random().toString(36).substring(2, 9),
    name: fullName,
    characterClass,
    race,
    title: epithet,
    weapon,
    alignment,
    specialAbility,
    health,
    mana,
    strength,
    stats,
    lore,
    level: Math.floor(Math.random() * 5) + 3, // Level 3 to 7
    createdAt: Date.now(),
  };
}

export function generateProceduralBackstory(character: FantasyCharacter): string {
  const { name, characterClass, race, weapon, specialAbility, alignment } = character;

  const originsByClass: Record<CharacterClassName, string[]> = {
    Mage: [
      `Apprenticed in the subterranean observatories of the high spires, ${name} discovered an uncataloged astral rift hidden beneath the ancient library floorboards.`,
      `Before mastering the art of ${specialAbility}, ${name} was a quiet archivist whose mind touched the outer veil during the Great Conjunction.`,
      `Exiled from the Arcane Conclave for translating forbidden scrolls of temporal magic, ${name} took only their ${weapon} into the wilderness.`,
      `Born during a rare alignment of twin moons, ${name}'s blood began humming with raw spellcraft from the moment they first touched an enchanted tome.`
    ],
    Rogue: [
      `Raised in the labyrinthine alleys of the lower docks, ${name} learned early that survival required quiet footsteps and quicker wits.`,
      `Once the trusted scout of a shadowy syndicate, ${name} broke their silence after refusing an order to betray an innocent family.`,
      `Falsely accused of stealing the sovereign's ceremonial ring, ${name} escaped the citadel dungeons using nothing more than a lockpick and their ${weapon}.`,
      `Orphaned in the wake of the guild wars, ${name} honed their ${specialAbility} to become an unseen whisper among the sprawling city slums.`
    ],
    Warrior: [
      `A hardened veteran of the Iron Valley siege, ${name} earned renown by defending an open breach with their ${weapon} until sunrise.`,
      `Born into an honorable vanguard clan, ${name} was cast adrift when their ancestral stronghold fell to treacherous warlords.`,
      `After leading a desperate defense against an invading warband, ${name} retired their battle banners to wander the borders as a free mercenary.`,
      `Forged by harsh winters in the northern peaks, ${name} learned the deadly discipline of ${specialAbility} alongside the legendary mountain guard.`
    ],
    Paladin: [
      `Standing vigil through a perilous seven-day winter storm, ${name} was touched by a blinding celestial radiance that purified their soul.`,
      `Formerly a humble temple acolyte, ${name} took up their ${weapon} after unmasking a cabal of heretics within the sacred council.`,
      `Bound by a sacred vow of dawn, ${name} consecrated their life to eradicating shadowy horrors following the destruction of their holy sanctuary.`,
      `When dark omens fell upon the border provinces, ${name} manifested the righteous power of ${specialAbility} to drive back the creeping night.`
    ],
    Ranger: [
      `Reared by seasoned trackers deep within the primeval canopy, ${name} knows the whispers of every wind and the tracks of every predator.`,
      `When blight swept across their ancestral woodland sanctuary, ${name} took up their ${weapon} to hunt down the vile defilers responsible.`,
      `Living on the edge of civilized frontiers, ${name} mastered ${specialAbility} while guiding stranded travelers through treacherous beast-filled marshes.`,
      `The sole survivor of an expedition into the cursed hollows, ${name} emerged with keen sight and an unbreakable bond with untamed beasts.`
    ],
    Bard: [
      `Trained at the illustrious Conservatory of Lore, ${name} was expelled after performing an enchanted satire that caused the duke's court to weep uncontrollably.`,
      `Wandering from tavern to tavern across distant lands, ${name} bartered songs for ancient secrets and mastered the subtle power of ${specialAbility}.`,
      `Having uncovered a forgotten hero's journal buried beneath an ancient amphitheater, ${name} set out with their ${weapon} to write their own legend.`,
      `Blessed with a voice that can charm dragons and soothe raging tempests, ${name} took to the open road to chronicle the dawn of a new age.`
    ],
    Cleric: [
      `Surviving a near-fatal tempest at sea, ${name} awoke upon the shoreline bathed in a divine glow that healed their mortal wounds.`,
      `Chosen by a high celestial deity during an evening prayer, ${name} was entrusted with a sacred mission to mend the fractured realm.`,
      `When plague struck their home enclave, ${name} miraculously channeled ${specialAbility} through their ${weapon} to cleanse the sick and dying.`,
      `Guided by prophetic dreams of balance and renewal, ${name} departed their monastery to bring solace and righteous protection to the defenseless.`
    ],
    Druid: [
      `Initiated into the Circle of Elders beneath an eternal oak, ${name} can hear the groans of wounded roots and the warnings of circling falcons.`,
      `When poachers and corrupt loggers desecrated their sacred grove, ${name} unleashed the fury of ${specialAbility} to drive them into the abyss.`,
      `Adopted by a great spirit of the wild after being lost as a child, ${name} grew to view the untamed wilderness as their true home and sanctuary.`,
      `Carrying an enchanted branch carved from the World Tree, ${name} walks between civilization and wilderness to preserve the natural equilibrium.`
    ],
    Warlock: [
      `Trapped in an ancient tomb during an arcane dig, ${name} bargained with an enigmatic patron from beyond the stars to preserve their life.`,
      `Seeking retribution against those who slaughtered their bloodline, ${name} swore a dark pact and bound their essence to their ${weapon}.`,
      `Branded with an otherworldly crest that burns when celestial wards weaken, ${name} commands ${specialAbility} at great personal cost.`,
      `Once an ambitious scholar denied tenure at the academy, ${name} unsealed an eldritch grimoire and discovered powers mortals were never meant to wield.`
    ],
    Monk: [
      `Raised in the windswept monasteries perched atop the razor peaks, ${name} spent years perfecting their breath, mind, and physical mastery.`,
      `Having taken a strict vow of inner discipline, ${name} left the high temple when corrupt warlords threatened the peaceful valleys below.`,
      `Through relentless meditation and physical training, ${name} learned to focus their ki into the devastating strike of ${specialAbility}.`,
      `A wandering seeker of supreme enlightenment, ${name} carries their ${weapon} not to wage war, but to maintain balance wherever chaos erupts.`
    ]
  };

  const resolutions: string[] = [
    `Now, they wander the frontier with their ${weapon}, committed to uncovering the forgotten truth behind the realm's dark omens.`,
    `Bound by an unshakeable oath, they now channel ${specialAbility} to forge their own legacy and safeguard those who cannot fight for themselves.`,
    `With their ${weapon} in hand, they journey across forgotten ruins, driven by an unyielding desire to right the wrongs of the past.`,
    `Guided by their ${alignment} principles, they seek out ancient challenges, determined that no shadow shall dim their resolute spirit.`,
    `Now living as a seasoned adventurer, they rely on ${specialAbility} to prevail against impossible odds and seal their name in legend.`,
    `Carrying memories of what was lost, they trek through untamed lands, ready to defend the weak whenever perilous forces threaten the realm.`,
    `Ever vigilant against sudden treachery, they hold fast to their ${weapon}, awaiting the day their true destiny will at last be revealed.`
  ];

  const classList = originsByClass[characterClass] || originsByClass.Warrior;
  const sentence1 = getRandomElement(classList);
  const sentence2 = getRandomElement(resolutions);

  return `${sentence1} ${sentence2}`;
}
