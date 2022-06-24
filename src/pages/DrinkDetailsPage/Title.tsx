interface Props {
  value: string;
}

export function Title({ value }: Props) {
  return <h2 className="text-5xl mb-6">{value}</h2>;
}
