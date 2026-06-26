import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

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

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
	}

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{ width: "100%", maxWidth: 360 }}
		>
			<Autocomplete
				freeSolo
				options={[]}
				inputValue={value}
				onInputChange={(_event, newValue, reason) => {
					if (reason === "input" || reason === "clear") {
						hasUserTyped.current = true;
						setValue(newValue);
					}
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						size="small"
						placeholder="Search..."
						aria-label="Search for cocktails"
						slotProps={{
							...params.slotProps,
							input: {
								...params.slotProps?.input,
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon fontSize="small" />
									</InputAdornment>
								),
							},
						}}
						sx={{
							"& .MuiOutlinedInput-root": {
								bgcolor: "background.paper",
								borderRadius: 999,
							},
						}}
					/>
				)}
			/>
		</Box>
	);
}
