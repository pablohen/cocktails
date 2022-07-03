interface Props {
  value: string;
}

export function Title({ value }: Props) {
  return (
    <h2 className="text-2xl md:text-5xl text-center md:text-left mb-6">
      {value}
    </h2>
  );
}
