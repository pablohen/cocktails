interface Props {
  value: string;
}

export function Subtitle({ value }: Props) {
  return <h2 className="text-xl md:text-4xl mb-2">{value}</h2>;
}
