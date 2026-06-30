import game1 from "@/assets/game-1.jpg";
import game2 from "@/assets/game-2.jpg";
import game3 from "@/assets/game-3.jpg";

export type Dev = {
  name: string;
  role: string;
  tag: "Founders" | "Management" | "Dev" | "Art" | "Audio";
};

export const devs: Dev[] = [
  { name: "Francez", role: "Founder · Project Manager · UI & Game Designer", tag: "Founders" },
  { name: "Samuca", role: "Founder · Project Manager · Game Designer", tag: "Founders" },
  { name: "Zark", role: "Sub Owner · GFX Artist", tag: "Founders" },
  { name: "Thugo", role: "Server Manager", tag: "Management" },
  { name: "Marpuf", role: "Community Manager", tag: "Management" },
  { name: "Yuki", role: "Lead Dev · Modeler", tag: "Dev" },
  { name: "Stray", role: "Lead Dev · Modeler & Builder", tag: "Dev" },
  { name: "Syntax", role: "Programmer", tag: "Dev" },
  { name: "Squidnoodles", role: "Scripter", tag: "Dev" },
  { name: "Thug", role: "Animator", tag: "Art" },
  { name: "Whirle", role: "Animator", tag: "Art" },
  { name: "Poli", role: "SFX Artist · Music Composer", tag: "Audio" },
  { name: "Melo", role: "Builder", tag: "Dev" },
  { name: "Japa", role: "Game Designer", tag: "Dev" },
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
    title: "Crimson Frontier",
    status: "Em desenvolvimento",
    description: "Western tático multiplayer. Duelos, assaltos e cidades vivas.",
    cover: game1,
    href: "#",
  },
  {
    title: "Neon District",
    status: "Em breve",
    description: "Survival cyberpunk em mundo aberto. Facções, hacking e combate.",
    cover: game2,
    href: "#",
  },
  {
    title: "Vesper Cathedral",
    status: "Lançado",
    description: "Horror gótico cooperativo. Rituais, segredos e escolhas pesadas.",
    cover: game3,
    href: "#",
  },
];
