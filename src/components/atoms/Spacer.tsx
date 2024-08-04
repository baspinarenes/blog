export const Spacer = ({ height }: SpacerProps) => {
  if (height) {
    return <div style={{ height, width: 1 }} />;
  }

  return <div className="flex-1" />;
};

export type SpacerProps = Readonly<{
  height?: number;
}>;
