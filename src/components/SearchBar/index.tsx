import { FormEvent, useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface Props {
  initialValue?: string;
  onSubmit: (value: string) => void;
}

export function SearchBar({ initialValue = '', onSubmit }: Props) {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue] = useDebounce(value, 200);
  const hasUserTyped = useRef(false);
  const prevInitialValue = useRef(initialValue);

  useEffect(() => {
    if (initialValue !== prevInitialValue.current) {
      prevInitialValue.current = initialValue;
      setValue(initialValue);
      hasUserTyped.current = false;
    }
  }, [initialValue]);

  useEffect(() => {
    if (!hasUserTyped.current) {
      return;
    }
    onSubmit(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    hasUserTyped.current = true;
    setValue(e.target.value);
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md px-2 sm:px-0" role="search">
      <div className="flex items-center gap-2 bg-white border p-1.5 sm:p-2 rounded-full shadow-sm focus-within:shadow-md">
        <Search className="h-4 w-4 sm:h-5 sm:w-5 ml-1.5 sm:ml-2 text-gray-500" aria-hidden="true" />
        <Input
          type="text"
          placeholder="search..."
          aria-label="Search for cocktails"
          className="border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base"
          value={value}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}
