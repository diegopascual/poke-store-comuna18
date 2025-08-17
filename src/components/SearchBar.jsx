import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const textTrimmed = searchText.trim();

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchText(value);

    if (value.length === 0) {
      onSearch("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(textTrimmed);
  };

  const handleClear = () => {
    onSearch("");
    setSearchText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8 flex w-full items-start gap-2">
        <div className="w-full space-y-2">
          <Input
            type="text"
            placeholder="Search pokemon..."
            value={searchText}
            onChange={handleChange}
          />
          {!!textTrimmed && (
            <Button type="button" onClick={handleClear}>
              Clear
            </Button>
          )}
        </div>
        <Button type="submit" disabled={!textTrimmed}>
          Search
        </Button>
      </div>
    </form>
  );
};
