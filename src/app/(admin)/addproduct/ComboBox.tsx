import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import { BiCheck, BiChevronDown } from "react-icons/bi";

type Option = {
  label: string;
  value: string;
};

export default function ComboBox({
  options,
  value,
  onChange,
  disabled,
}: {
  options: Option[];
  value: Option | null;
  onChange: (option: Option | null) => void;
  disabled?: boolean;
}) {
  const [query, setQuery] = useState("");
  //   const [selected, setSelected] = useState<Option | null>(null);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  const handleChange = (value: Option) => onChange(value);

  const clearQuery = () => {
    setQuery("");
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <Combobox value={value} onChange={handleChange} onClose={clearQuery}>
      <div className="relative">
        <ComboboxInput
          className={clsx(
            "w-full rounded-md border  py-2 pr-8 pl-3 text-sm/6 ",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          displayValue={(option: Option) => option?.label}
          onChange={handleQueryChange}
          placeholder="Select an option"
          disabled={disabled}
        />
        <ComboboxButton
          className="group absolute inset-y-0 right-0 px-2.5"
          disabled={disabled}
        >
          <BiChevronDown className="size-4  " />
        </ComboboxButton>
      </div>

      <ComboboxOptions
        anchor="bottom"
        transition
        className={clsx(
          "w-[var(--input-width)] rounded-xl bg-white border  p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
          "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
        )}
      >
        {filteredOptions.map((option) => (
          <ComboboxOption
            key={option.value}
            value={option}
            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none bg-white hover:bg-gray-50"
          >
            <BiCheck className="invisible size-4  group-data-[selected]:visible" />
            <div className="text-sm/6 ">{option.label}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
