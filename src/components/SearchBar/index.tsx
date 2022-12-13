import { FormEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";

interface Props {
  onSubmit: (value: string) => void;
}

export function SearchBar({ onSubmit }: Props) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(value);
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="flex items-center bg-white dark:bg-gray-800 border dark:border-gray-900 p-2 rounded-full shadow-sm text-gray-500 focus-within:text-gray-800 dark:focus-within:text-gray-200 focus-within:shadow-md">
        <FiSearch className="h-6" />
        <input
          type="search"
          placeholder="search..."
          className="w-full bg-transparent outline-none px-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </form>
  );
}
