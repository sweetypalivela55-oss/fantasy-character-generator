import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { generateProceduralBackstory } from "./src/data/fantasyData";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Fallback procedural cartoon video game avatar generator in pure SVG
function generateCartoonSvg(name: string, characterClass: string, race: string, seed: string): string {
  const classColors: Record<string, { primary: string; secondary: string; glow: string; accent: string }> = {
    Mage: { primary: "#7c3aed", secondary: "#4c1d95", glow: "#c084fc", accent: "#a855f7" },
    Rogue: { primary: "#10b981", secondary: "#064e3b", glow: "#34d399", accent: "#059669" },
    Warrior: { primary: "#ef4444", secondary: "#7f1d1d", glow: "#f87171", accent: "#dc2626" },
    Paladin: { primary: "#eab308", secondary: "#713f12", glow: "#fde047", accent: "#ca8a04" },
    Ranger: { primary: "#14b8a6", secondary: "#134e4a", glow: "#2dd4bf", accent: "#0d9488" },
    Bard: { primary: "#f43f5e", secondary: "#881337", glow: "#fb7185", accent: "#e11d48" },
    Cleric: { primary: "#06b6d4", secondary: "#164e63", glow: "#22d3ee", accent: "#0891b2" },
    Druid: { primary: "#84cc16", secondary: "#365314", glow: "#a3e635", accent: "#65a30d" },
    Warlock: { primary: "#9333ea", secondary: "#581c87", glow: "#c084fc", accent: "#7e22ce" },
    Monk: { primary: "#f97316", secondary: "#7c2d12", glow: "#fdba74", accent: "#ea580c" },
  };

  const c = classColors[characterClass] || { primary: "#f59e0b", secondary: "#78350f", glow: "#fcd34d", accent: "#d97706" };
  
  // Deterministic values from seed
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);
  const skinTones = ["#ffd5b5", "#f7c29e", "#e0a97b", "#ba7f52", "#8c5630", "#b5c7d3", "#a8c0a8"];
  const skin = skinTones[absHash % skinTones.length];
  const eyeColor = ["#38bdf8", "#4ade80", "#fbbf24", "#f43f5e", "#a855f7"][absHash % 5];
  const hairStyles = [
    '<path d="M 60 110 Q 50 40 100 40 Q 150 40 140 110 Q 100 80 60 110" fill="#292524" />',
    '<path d="M 50 110 C 50 30, 150 30, 150 110 C 130 60, 70 60, 50 110 Z" fill="#78350f" />',
    '<path d="M 60 100 Q 100 30 140 100 Q 120 70 80 70 Z" fill="#eab308" />',
    '<path d="M 55 110 Q 50 50 100 45 Q 150 50 145 110 Q 120 85 100 85 Q 80 85 55 110" fill="#44403c" />',
  ];
  const hair = hairStyles[(absHash >> 2) % hairStyles.length];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${c.glow}" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#090d16" stop-opacity="0.95" />
    </radialGradient>
    <linearGradient id="armorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c.primary}" />
      <stop offset="100%" stop-color="${c.secondary}" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="200" height="200" rx="16" fill="#0b0f19"/>
  <rect width="200" height="200" rx="16" fill="url(#bgGlow)"/>

  <!-- Character Bust Body / Armor -->
  <g filter="url(#shadow)">
    <!-- Shoulders & Torso -->
    <path d="M 30 200 Q 35 150 70 145 L 100 160 L 130 145 Q 165 150 170 200 Z" fill="url(#armorGrad)" stroke="${c.glow}" stroke-width="2"/>
    <!-- Collar / Crest -->
    <polygon points="85,150 100,175 115,150 100,140" fill="${c.accent}" stroke="#f8fafc" stroke-width="1.5" />
    <circle cx="100" cy="155" r="4" fill="#ffffff" />
  </g>

  <!-- Head & Neck -->
  <g filter="url(#shadow)">
    <!-- Neck -->
    <rect x="86" y="120" width="28" height="30" rx="4" fill="${skin}" stroke="#0f172a" stroke-width="1.5" />
    <!-- Ears (Elven if Elf) -->
    ${race.toLowerCase().includes('elf') 
      ? '<polygon points="58,95 40,80 62,110" fill="' + skin + '" stroke="#0f172a" stroke-width="1.5"/>' +
        '<polygon points="142,95 160,80 138,110" fill="' + skin + '" stroke="#0f172a" stroke-width="1.5"/>'
      : '<circle cx="65" cy="102" r="8" fill="' + skin + '" stroke="#0f172a" stroke-width="1.5"/>' +
        '<circle cx="135" cy="102" r="8" fill="' + skin + '" stroke="#0f172a" stroke-width="1.5"/>'
    }
    <!-- Face -->
    <ellipse cx="100" cy="100" rx="36" ry="42" fill="${skin}" stroke="#0f172a" stroke-width="2.5"/>
    
    <!-- Hair Base -->
    ${hair}

    <!-- Eyes (Expressive Cartoon Style) -->
    <ellipse cx="85" cy="98" rx="7" ry="8" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
    <ellipse cx="115" cy="98" rx="7" ry="8" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
    <circle cx="86" cy="98" r="4.5" fill="${eyeColor}"/>
    <circle cx="114" cy="98" r="4.5" fill="${eyeColor}"/>
    <circle cx="84" cy="96" r="1.5" fill="#ffffff"/>
    <circle cx="112" cy="96" r="1.5" fill="#ffffff"/>

    <!-- Eyebrows -->
    <path d="M 77 87 Q 85 84 94 88" stroke="#1e293b" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M 123 87 Q 115 84 106 88" stroke="#1e293b" stroke-width="3" stroke-linecap="round" fill="none"/>

    <!-- Nose -->
    <path d="M 100 102 L 97 110 L 103 110" stroke="#a16207" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

    <!-- Confident Smirk / Smile -->
    <path d="M 91 122 Q 100 128 109 122" stroke="#78350f" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  </g>

  <!-- Class Crest / Aura Sparks -->
  <circle cx="35" cy="40" r="3" fill="${c.glow}" opacity="0.8"/>
  <circle cx="165" cy="45" r="4" fill="${c.glow}" opacity="0.7"/>
  <circle cx="175" cy="85" r="2" fill="#ffffff" opacity="0.9"/>
  <circle cx="25" cy="105" r="2" fill="#ffffff" opacity="0.9"/>

  <!-- Stylized Ornate Frame Border -->
  <rect x="3" y="3" width="194" height="194" rx="14" fill="none" stroke="${c.accent}" stroke-width="2" opacity="0.8"/>
  <rect x="7" y="7" width="186" height="186" rx="10" fill="none" stroke="#fef08a" stroke-width="0.8" opacity="0.4"/>
</svg>`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // API Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Character Portrait Generation Endpoint
  app.post("/api/generate-portrait", async (req, res) => {
    try {
      const { character, variationSeed } = req.body;
      if (!character || !character.name || !character.characterClass) {
        return res.status(400).json({ error: "Character details are required" });
      }

      const seedString = `${character.name}-${character.characterClass}-${character.race}-${variationSeed || 0}`;

      // 1. Try Gemini API first if API key is provided
      const ai = getGenAI();
      if (ai) {
        try {
          const prompt = `A vivid, expressive cartoon and video game concept art portrait of a fantasy character.
Character Name: ${character.name}
Class: ${character.characterClass}
Race: ${character.race}
Armament: ${character.weapon}
Signature Ability: ${character.specialAbility}
Combat Stats: Health ${character.health || 150} HP, Mana ${character.mana || 120} MP, Strength ${character.strength || 65} STR
Lore origin: ${character.lore || 'Heroic adventurer'}
Art Style: Colorful, highly polished 2D/3D cartoon video game character bust portrait. Stylized hero art with bold, dynamic outlines, colorful fantasy lighting, heroic facial expression, detailed class-themed armor/gear, clean vibrant background, square 1:1 format.`;

          const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite-image",
            contents: {
              parts: [{ text: prompt }],
            },
            config: {
              imageConfig: {
                aspectRatio: "1:1",
              },
            },
          });

          const candidates = response.candidates;
          if (candidates && candidates.length > 0 && candidates[0].content?.parts) {
            for (const part of candidates[0].content.parts) {
              if (part.inlineData && part.inlineData.data) {
                const mimeType = part.inlineData.mimeType || "image/png";
                const imageUrl = `data:${mimeType};base64,${part.inlineData.data}`;
                return res.json({
                  imageUrl,
                  source: "gemini",
                  characterId: character.id,
                });
              }
            }
          }
        } catch (geminiError: any) {
          console.warn("Gemini image generation warning:", geminiError?.message || geminiError);
          // Fall through to cartoon generator engine
        }
      }

      // 2. High quality stylized cartoon fantasy portrait engine
      // Try fetching DiceBear Adventurer SVG (cartoon RPG avatars)
      try {
        const dicebearUrl = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seedString)}&backgroundColor=0f172a,1e1b4b,1e293b,172554,052e16,3b0764&skinColor=9e5622,763900,ecad80,f2d3b1&radius=12`;
        const response = await fetch(dicebearUrl, {
          headers: { Accept: "image/svg+xml" },
          signal: AbortSignal.timeout(3000),
        });

        if (response.ok) {
          const svgText = await response.text();
          if (svgText && svgText.includes("<svg")) {
            const base64Svg = Buffer.from(svgText, "utf-8").toString("base64");
            const imageUrl = `data:image/svg+xml;base64,${base64Svg}`;
            return res.json({
              imageUrl,
              source: "cartoon-engine",
              characterId: character.id,
            });
          }
        }
      } catch (fetchErr) {
        // Continue to local procedural SVG
      }

      // 3. Local procedural cartoon SVG (100% offline & zero network dependency)
      const localSvg = generateCartoonSvg(
        character.name,
        character.characterClass,
        character.race,
        seedString
      );
      const base64LocalSvg = Buffer.from(localSvg, "utf-8").toString("base64");
      const imageUrl = `data:image/svg+xml;base64,${base64LocalSvg}`;

      return res.json({
        imageUrl,
        source: "cartoon-engine",
        characterId: character.id,
      });
    } catch (err: any) {
      console.error("Error generating portrait:", err);
      return res.status(500).json({ error: "Failed to generate character portrait", details: err?.message });
    }
  });

  // Character Backstory Generation Endpoint
  app.post("/api/generate-backstory", async (req, res) => {
    try {
      const { character } = req.body;
      if (!character || !character.name || !character.characterClass) {
        return res.status(400).json({ error: "Character details are required" });
      }

      // 1. Try Gemini API first if API key is configured
      const ai = getGenAI();
      if (ai) {
        try {
          const prompt = `Write a unique, compelling origin story of exactly one or two sentences for this fantasy character:
Name: ${character.name}
Class: ${character.characterClass}
Race: ${character.race}
Alignment: ${character.alignment}
Weapon: ${character.weapon}
Signature Ability: ${character.specialAbility}
Vital Stats: Health ${character.health || 150} HP, Mana ${character.mana || 120} MP, Strength ${character.strength || 65} STR
Key Attributes: STR ${character.stats?.strength ?? 10}, DEX ${character.stats?.dexterity ?? 10}, INT ${character.stats?.intelligence ?? 10}, WIS ${character.stats?.wisdom ?? 10}

Rules:
1. Must be strictly 1 or 2 sentences in total.
2. Focus on how their journey began or what pivotal event set them onto their adventurer's path.
3. Keep the tone dramatic, atmospheric, and true to classic fantasy lore.
4. Output ONLY the one or two sentences without any quotation marks, intro, or markdown formatting.`;

          const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: prompt,
            config: {
              temperature: 0.85,
            },
          });

          const text = response.text?.trim().replace(/^["']|["']$/g, '');
          if (text && text.length > 20) {
            return res.json({
              backstory: text,
              source: "gemini",
              characterId: character.id,
            });
          }
        } catch (geminiError: any) {
          console.warn("Gemini backstory generation warning:", geminiError?.message || geminiError);
          // Fall through to procedural generator
        }
      }

      // 2. High quality procedural fantasy backstory generator
      const backstory = generateProceduralBackstory(character);
      return res.json({
        backstory,
        source: "procedural",
        characterId: character.id,
      });
    } catch (err: any) {
      console.error("Error generating backstory:", err);
      return res.status(500).json({ error: "Failed to generate character backstory", details: err?.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
