interface Props {
  image: string;
  name: string;
}

export function Thumbnail({ image, name }: Props) {
  return (
    <img
      src={image}
      alt={name}
      className="rounded w-full h-auto max-w-[512px] max-h-[512px]"
    />
  );
}
