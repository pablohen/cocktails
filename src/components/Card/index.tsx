interface Props {
  id: string;
  name: string;
  image: string;
  onClick: (id: string) => void;
}

export function Card({ id, name, image, onClick }: Props) {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="transition-all duration-400 ease-in-out hover:-translate-y-2 bg-gray-500 rounded relative"
      style={{
        background: `url('${image}')`,
        width: "256px",
        height: "256px",
        backgroundSize: "contain",
      }}
    >
      <div className="bg-black opacity-80 px-4 py-2 absolute bottom-0 right-0 rounded-tl rounded-br">
        <span className="text-white font-bold">{name}</span>
      </div>
    </button>
  );
}
