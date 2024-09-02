import { memo } from "react";

export const ExternalLink: React.ComponentType<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
> = memo((props) => <a {...props} target="_blank" rel="noopener noreferrer" />);
