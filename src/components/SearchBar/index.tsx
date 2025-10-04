import { FormEvent, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Input } from "@/components/ui/input";

interface Props {
  onSubmit: (value: string) => void;
}

export function SearchBar({ onSubmit }: Props) {
  const [value, setValue] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(value);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex items-center gap-2 bg-white border p-2 rounded-full shadow-sm focus-within:shadow-md">
        <FiSearch className="h-5 w-5 ml-2 text-gray-500" />
        <Input
          type="text"
          placeholder="search..."
          className="border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </form>
  );
}
