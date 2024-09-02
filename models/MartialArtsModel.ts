export enum MartialArtsTables {
  STYLES = "Style",
  RANKS = 'Ranks',
}

export enum MartialArtsStyleFields {
  NAME = "Name",
}

export type MartialArtsStyleData = {
  [MartialArtsStyleFields.NAME]?: string;
};
