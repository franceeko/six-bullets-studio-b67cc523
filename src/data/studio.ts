import samuca from "@/assets/devs/samuca.png.asset.json";
import francez from "@/assets/devs/francez.png.asset.json";
import stray from "@/assets/devs/stray.png.asset.json";
import syntax from "@/assets/devs/syntax.png.asset.json";
import zark from "@/assets/devs/zark.png.asset.json";
import marpuf from "@/assets/devs/marpuf.gif.asset.json";
import thugo from "@/assets/devs/thugo.png.asset.json";
import yuki from "@/assets/devs/yuki.png.asset.json";
import drigo from "@/assets/devs/drigo.png.asset.json";
import thug from "@/assets/devs/thug.png.asset.json";
import whirle from "@/assets/devs/whirle.png.asset.json";
import melo from "@/assets/devs/melo.png.asset.json";
import japa from "@/assets/devs/japa.png.asset.json";
import poli from "@/assets/devs/poli.gif.asset.json";

export type Dev = {
  name: string;
  role: string;
  tag: "Founders" | "Management" | "Dev" | "Art" | "Audio";
  color: "wine" | "butter" | "sage" | "blush" | "sky" | "plum" | "teal" | "coral" | "moss" | "amber" | "lilac";
  avatar?: string;
};

export const devs: Dev[] = [
  { name: "Francez",  role: "Founder · Project Manager · UI & Game Designer", tag: "Founders",   color: "wine",   avatar: francez.url },
  { name: "Samuca",   role: "Founder · Project Manager · Game Designer",       tag: "Founders",   color: "amber",  avatar: samuca.url },
  { name: "Zark",     role: "Sub Owner · GFX Artist",                          tag: "Founders",   color: "coral",  avatar: zark.url },
  { name: "Thugo",    role: "Server Manager",                                  tag: "Management", color: "moss",   avatar: thugo.url },
  { name: "Marpuf",   role: "Community Manager",                               tag: "Management", color: "teal",   avatar: marpuf.url },
  { name: "Yuki",     role: "Lead Dev · Modeler",                              tag: "Dev",        color: "plum",   avatar: yuki.url },
  { name: "Stray",    role: "Lead Dev · Modeler & Builder",                    tag: "Dev",        color: "butter", avatar: stray.url },
  { name: "Syntax",   role: "Programmer",                                      tag: "Dev",        color: "sage",   avatar: syntax.url },
  { name: "Drigo",    role: "Programmer",                                      tag: "Dev",        color: "lilac",  avatar: drigo.url },
  { name: "Thug",     role: "Animator",                                        tag: "Art",        color: "sky",    avatar: thug.url },
  { name: "Whirle",   role: "Animator",                                        tag: "Art",        color: "blush",  avatar: whirle.url },
  { name: "Poli",     role: "SFX Artist · Music Composer",                     tag: "Audio",      color: "plum",   avatar: poli.url },
  { name: "Melo",     role: "Builder",                                         tag: "Dev",        color: "teal",   avatar: melo.url },
  { name: "Japa",     role: "Game Designer",                                   tag: "Dev",        color: "coral",  avatar: japa.url },
];
