export interface AirtableImage {
  url: string;
  width: string;
  height: string;
}

export interface AirtableImageEntry extends Pick<AirtableImage, "url"> {
  id: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    small: AirtableImage;
    large: AirtableImage;
    full: AirtableImage;
  };
}
