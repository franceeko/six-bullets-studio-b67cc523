/**
 * Central asset registry.
 * Every binary lives on the Lovable CDN; these modules are the pointers.
 * Import from "@/assets" — never reach into the pointer files directly.
 */
import drigo from "@/assets/devs/drigo.png.asset.json";
import francez from "@/assets/devs/francez.png.asset.json";
import japa from "@/assets/devs/japa.png.asset.json";
import marpuf from "@/assets/devs/marpuf.gif.asset.json";
import melo from "@/assets/devs/melo.png.asset.json";
import poli from "@/assets/devs/poli.gif.asset.json";
import samuca from "@/assets/devs/samuca.png.asset.json";
import stray from "@/assets/devs/stray.png.asset.json";
import syntax from "@/assets/devs/syntax.png.asset.json";
import thug from "@/assets/devs/thug.png.asset.json";
import thugo from "@/assets/devs/thugo.png.asset.json";
import whirle from "@/assets/devs/whirle.png.asset.json";
import yuki from "@/assets/devs/yuki.png.asset.json";
import zark from "@/assets/devs/zark.png.asset.json";
import happyTownBanner from "@/assets/happy-town-banner.png.asset.json";

type AssetPointer = { url: string };

const url = (asset: AssetPointer): string => asset.url;

export const images = {
  happyTownBanner: url(happyTownBanner),
} as const;

export const devAvatars = {
  drigo: url(drigo),
  francez: url(francez),
  japa: url(japa),
  marpuf: url(marpuf),
  melo: url(melo),
  poli: url(poli),
  samuca: url(samuca),
  stray: url(stray),
  syntax: url(syntax),
  thug: url(thug),
  thugo: url(thugo),
  whirle: url(whirle),
  yuki: url(yuki),
  zark: url(zark),
} as const;

export type DevAvatarKey = keyof typeof devAvatars;
