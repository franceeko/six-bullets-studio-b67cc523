import samuca from "@/assets/devs/samuca.png.asset.json";
import francez from "@/assets/devs/francez.png.asset.json";
import stray from "@/assets/devs/stray.png.asset.json";
import syntax from "@/assets/devs/syntax.png.asset.json";
import zark from "@/assets/devs/zark.png.asset.json";
import marpuf from "@/assets/devs/marpuf.gif.asset.json";
import thugo from "@/assets/devs/thugo.png.asset.json";

export type Dev = {
  name: string;
  role: string;
  tag: "Founders" | "Management" | "Dev" | "Art" | "Audio";
  color: "wine" | "butter" | "sage" | "blush" | "sky";
  avatar?: string;
};

export const devs: Dev[] = [
  { name: "Francez",  role: "Founder · Project Manager · UI & Game Designer", tag: "Founders",   color: "wine",   avatar: francez.url },
  { name: "Samuca",   role: "Founder · Project Manager · Game Designer",       tag: "Founders",   color: "butter", avatar: samuca.url },
  { name: "Zark",     role: "Sub Owner · GFX Artist",                          tag: "Founders",   color: "blush",  avatar: zark.url },
  { name: "Thugo",    role: "Server Manager",                                  tag: "Management", color: "sage",   avatar: thugo.url },
  { name: "Marpuf",   role: "Community Manager",                               tag: "Management", color: "sky",    avatar: marpuf.url },
  { name: "Yuki",     role: "Lead Dev · Modeler",                              tag: "Dev",        color: "wine" },
  { name: "Stray",    role: "Lead Dev · Modeler & Builder",                    tag: "Dev",        color: "butter", avatar: stray.url },
  { name: "Syntax",   role: "Programmer",                                      tag: "Dev",        color: "sage",   avatar: syntax.url },
  { name: "Drigo",    role: "Programmer",                                      tag: "Dev",        color: "blush" },
  { name: "Thug",     role: "Animator",                                        tag: "Art",        color: "sky" },
  { name: "Whirle",   role: "Animator",                                        tag: "Art",        color: "wine" },
  { name: "Poli",     role: "SFX Artist · Music Composer",                     tag: "Audio",      color: "butter" },
  { name: "Melo",     role: "Builder",                                         tag: "Dev",        color: "sage" },
  { name: "Japa",     role: "Game Designer",                                   tag: "Dev",        color: "blush" },
];
