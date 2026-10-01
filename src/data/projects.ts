import noirSuite from "@/assets/noir-suite.webp";
import reelsContactSheet from "@/assets/reels-contact-sheet.webp";
import technicalMotion from "@/assets/technical-motion.webp";
import verdantHorizon from "@/assets/verdant-horizon.webp";
import characterArt01 from "@/assets/character-art-01.webp";
import characterArt02 from "@/assets/character-art-02.webp";
import characterArt03 from "@/assets/character-art-03.webp";
import characterArt04 from "@/assets/character-art-04.webp";
import characterArt05 from "@/assets/character-art-05.webp";
import characterArt06 from "@/assets/character-art-06.webp";
import characterArt07 from "@/assets/character-art-07.webp";
import characterArt08 from "@/assets/character-art-08.webp";
import dAndD01 from "@/assets/d-and-d-01.webp";
import dAndD02 from "@/assets/d-and-d-02.webp";
import dAndD03 from "@/assets/d-and-d-03.webp";
import dAndD04 from "@/assets/d-and-d-04.webp";
import logo01 from "@/assets/logo-01.webp";
import logo02 from "@/assets/logo-02.webp";
import logo03 from "@/assets/logo-03.webp";
import logo04 from "@/assets/logo-04.webp";
import banner01 from "@/assets/banner-01.webp";
import banner02 from "@/assets/banner-02.webp";
import banner03 from "@/assets/banner-03.webp";
import banner04 from "@/assets/banner-04.webp";
import overlayPanel01 from "@/assets/overlay-panel-01.webp";
import overlayPanel02 from "@/assets/overlay-panel-02.webp";
import overlayPanel03 from "@/assets/overlay-panel-03.webp";
import overlayPanel04 from "@/assets/overlay-panel-04.webp";
import emote01 from "@/assets/emote-01.webp";
import emote02 from "@/assets/emote-02.webp";
import emote03 from "@/assets/emote-03.webp";
import emote04 from "@/assets/emote-04.webp";
import thumbnail01 from "@/assets/thumbnail-01.webp";
import thumbnail02 from "@/assets/thumbnail-02.webp";
import thumbnail03 from "@/assets/thumbnail-03.webp";
import thumbnail04 from "@/assets/thumbnail-04.webp";
import twoDModel01 from "@/assets/2d-model-01.webp";
import twoDModel02 from "@/assets/2d-model-02.webp";
import twoDModel03 from "@/assets/2d-model-03.webp";
import twoDModel04 from "@/assets/2d-model-04.webp";

export type Project = {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  type: string;
  aspectRatio: "portrait" | "landscape";
  mediaType?: "video" | "image";
  imagePosition?: string | undefined;
  imageFit?: "cover" | "contain";
};

export type PortfolioCollection = {
  number: string;
  title: string;
  note: string;
  projects: Project[];
};

// Replace this demo film with the final hosted portfolio videos.
export const PLACEHOLDER_VIDEO_URL =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm";

const thumbnails = [reelsContactSheet, verdantHorizon, noirSuite, technicalMotion];
const imagePositions = ["left top", "center", "center", "right center"];
const characterArt = [
  characterArt01,
  characterArt02,
  characterArt03,
  characterArt04,
  characterArt05,
  characterArt06,
  characterArt07,
  characterArt08,
];
const dAndDArt = [dAndD01, dAndD02, dAndD03, dAndD04];
const logoArt = [logo01, logo02, logo03, logo04];
const bannerArt = [banner01, banner02, banner03, banner04];
const overlayPanelArt = [overlayPanel01, overlayPanel02, overlayPanel03, overlayPanel04];
const emoteArt = [emote01, emote02, emote03, emote04];
const thumbnailArt = [thumbnail01, thumbnail02, thumbnail03, thumbnail04];
const twoDModelArt = [twoDModel01, twoDModel02, twoDModel03, twoDModel04];

function createProjects(
  category: string,
  label: string,
  aspectRatio: Project["aspectRatio"],
  mediaType: Project["mediaType"] = "video",
): Project[] {
  return Array.from({ length: 4 }, (_, index) => ({
    id: `${category}-${index + 1}`,
    title: `${label} ${String(index + 1).padStart(2, "0")}`,
    thumbnail: thumbnails[index] ?? reelsContactSheet,
    videoUrl: PLACEHOLDER_VIDEO_URL,
    type: label,
    aspectRatio,
    mediaType,
    imagePosition: imagePositions[index],
  }));
}

export const portfolioCollections: PortfolioCollection[] = [
  {
    number: "01",
    title: "Character art",
    note: "Vertical character showcases",
    projects: characterArt.map((thumbnail, index) => ({
      id: `character-art-${index + 1}`,
      title: `Character art ${String(index + 1).padStart(2, "0")}`,
      thumbnail,
      videoUrl: PLACEHOLDER_VIDEO_URL,
      type: "Character art",
      aspectRatio: "portrait",
      mediaType: "image",
      imagePosition: "center",
      imageFit: "contain",
    })),
  },
  {
    number: "02",
    title: "D&D",
    note: "Vertical fantasy showcases",
    projects: dAndDArt.map((thumbnail, index) => ({
      id: `d-and-d-${index + 1}`,
      title: `D&D ${String(index + 1).padStart(2, "0")}`,
      thumbnail,
      videoUrl: PLACEHOLDER_VIDEO_URL,
      type: "D&D",
      aspectRatio: "portrait",
      mediaType: "image",
      imagePosition: "center",
      imageFit: "contain",
    })),
  },
  {
    number: "03",
    title: "Logo",
    note: "Vertical logo showcases",
    projects: logoArt.map((thumbnail, index) => ({
      id: `logo-${index + 1}`,
      title: `Logo ${String(index + 1).padStart(2, "0")}`,
      thumbnail,
      videoUrl: PLACEHOLDER_VIDEO_URL,
      type: "Logo",
      aspectRatio: "portrait",
      mediaType: "image",
      imagePosition: "center",
      imageFit: "contain",
    })),
  },
  {
    number: "04",
    title: "Banner",
    note: "16:9 banner design",
    projects: bannerArt.map((thumbnail, index) => ({
      id: `banner-${index + 1}`,
      title: `Banner ${String(index + 1).padStart(2, "0")}`,
      thumbnail,
      videoUrl: PLACEHOLDER_VIDEO_URL,
      type: "Banner",
      aspectRatio: "landscape",
      mediaType: "image",
      imagePosition: "center",
      imageFit: "contain",
    })),
  },
  {
    number: "05",
    title: "Overlay and Panel",
    note: "16:9 stream design",
    projects: overlayPanelArt.map((thumbnail, index) => ({
      id: `overlay-panel-${index + 1}`,
      title: `Overlay and panel ${String(index + 1).padStart(2, "0")}`,
      thumbnail,
      videoUrl: PLACEHOLDER_VIDEO_URL,
      type: "Overlay and panel",
      aspectRatio: "landscape",
      mediaType: "image",
      imagePosition: "center",
      imageFit: "contain",
    })),
  },
  {
    number: "06",
    title: "Emotes",
    note: "16:9 emote showcases",
    projects: emoteArt.map((thumbnail, index) => ({
      id: `emotes-${index + 1}`,
      title: `Emote ${String(index + 1).padStart(2, "0")}`,
      thumbnail,
      videoUrl: PLACEHOLDER_VIDEO_URL,
      type: "Emote",
      aspectRatio: "landscape",
      mediaType: "image",
      imagePosition: "center",
      imageFit: "contain",
    })),
  },
  {
    number: "07",
    title: "Thumbnail",
    note: "16:9 still artwork",
    projects: thumbnailArt.map((thumbnail, index) => ({
      id: `thumbnail-${index + 1}`,
      title: `Thumbnail ${String(index + 1).padStart(2, "0")}`,
      thumbnail,
      videoUrl: PLACEHOLDER_VIDEO_URL,
      type: "Thumbnail",
      aspectRatio: "landscape",
      mediaType: "image",
      imagePosition: "center",
      imageFit: "contain",
    })),
  },
  {
    number: "08",
    title: "2D model",
    note: "16:9 illustrated work",
    projects: twoDModelArt.map((thumbnail, index) => ({
      id: `2d-model-${index + 1}`,
      title: `2D model ${String(index + 1).padStart(2, "0")}`,
      thumbnail,
      videoUrl: PLACEHOLDER_VIDEO_URL,
      type: "2D model",
      aspectRatio: "landscape",
      mediaType: "image",
      imagePosition: "center",
      imageFit: "contain",
    })),
  },
];

export const projects = portfolioCollections.flatMap((collection) => collection.projects);
