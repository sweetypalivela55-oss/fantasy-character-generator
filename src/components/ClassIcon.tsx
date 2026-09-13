import { 
  Wand2, 
  Footprints, 
  Shield, 
  Sun, 
  Compass, 
  Music, 
  HeartHandshake, 
  TreePine, 
  Eye, 
  Flame,
  Swords
} from 'lucide-react';
import { CharacterClassName } from '../types';

interface ClassIconProps {
  className?: string;
  characterClass: CharacterClassName;
}

export function ClassIcon({ characterClass, className = 'w-5 h-5' }: ClassIconProps) {
  switch (characterClass) {
    case 'Mage':
      return <Wand2 className={className} />;
    case 'Rogue':
      return <Footprints className={className} />;
    case 'Warrior':
      return <Shield className={className} />;
    case 'Paladin':
      return <Sun className={className} />;
    case 'Ranger':
      return <Compass className={className} />;
    case 'Bard':
      return <Music className={className} />;
    case 'Cleric':
      return <HeartHandshake className={className} />;
    case 'Druid':
      return <TreePine className={className} />;
    case 'Warlock':
      return <Eye className={className} />;
    case 'Monk':
      return <Flame className={className} />;
    default:
      return <Swords className={className} />;
  }
}
