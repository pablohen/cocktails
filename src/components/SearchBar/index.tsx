import { Search } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";

interface Props {
  initialValue?: string;
  onSubmit: (value: string) => void;
}

export function SearchBar({ initialValue = "", onSubmit }: Props) {
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
  }, [debouncedValue, onSubmit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    hasUserTyped.current = true;
    setValue(e.target.value);
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xs px-2 sm:px-0" role="search">
      <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md border-2 border-white/50 py-0.5 pl-2 pr-1 rounded-full shadow-lg hover:shadow-xl focus-within:shadow-xl focus-within:border-white transition-all duration-300">
        <Search className="h-5 w-5 text-primary" aria-hidden="true" />
        <Input
          type="text"
          placeholder="Search..."
          aria-label="Search for cocktails"
          className="border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground/70 py-1.5"
          value={value}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}
