import game1 from "@/assets/game-1.jpg";

export type Dev = {
  name: string;
  role: string;
  tag: "Founders" | "Management" | "Dev" | "Art" | "Audio";
  color: "wine" | "butter" | "sage" | "blush" | "sky";
};

export const devs: Dev[] = [
  { name: "Francez", role: "Founder · Project Manager · UI & Game Designer", tag: "Founders", color: "wine" },
  { name: "Samuca", role: "Founder · Project Manager · Game Designer", tag: "Founders", color: "butter" },
  { name: "Zark", role: "Sub Owner · GFX Artist", tag: "Founders", color: "blush" },
  { name: "Thugo", role: "Server Manager", tag: "Management", color: "sage" },
  { name: "Marpuf", role: "Community Manager", tag: "Management", color: "sky" },
  { name: "Yuki", role: "Lead Dev · Modeler", tag: "Dev", color: "wine" },
  { name: "Stray", role: "Lead Dev · Modeler & Builder", tag: "Dev", color: "butter" },
  { name: "Syntax", role: "Programmer", tag: "Dev", color: "sage" },
  { name: "Squidnoodles", role: "Scripter", tag: "Dev", color: "blush" },
  { name: "Thug", role: "Animator", tag: "Art", color: "sky" },
  { name: "Whirle", role: "Animator", tag: "Art", color: "wine" },
  { name: "Poli", role: "SFX Artist · Music Composer", tag: "Audio", color: "butter" },
  { name: "Melo", role: "Builder", tag: "Dev", color: "sage" },
  { name: "Japa", role: "Game Designer", tag: "Dev", color: "blush" },
];

export type Game = {
  title: string;
  status: "Em desenvolvimento" | "Lançado" | "Em breve";
  description: string;
  cover: string;
  href: string;
};

export const games: Game[] = [
  {
    title: "Happy Town",
    status: "Em desenvolvimento",
    description:
      "Horror psicológico cooperativo numa cidade pacata que esconde algo profundamente errado. Inspirado em Silent Hill, The Mimic e The Mystery of Duvall Drive.",
    cover: game1,
    href: "#",
  },
];
