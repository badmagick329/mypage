import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function FilterBar({
  allTags,
  selectedTags,
  toggleTag,
  tagsAndCount,
  allProjectsCount,
  filteredProjectsCount,
}: {
  allTags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  tagsAndCount: Map<string, number>;
  allProjectsCount: number;
  filteredProjectsCount: number;
}) {
  const [isFilterShowing, setIsFilterShowing] = useState(false);
  const buttonText = isFilterShowing ? "Hide Filter Tags" : "Filter by Tags";
  const resultText =
    filteredProjectsCount < allProjectsCount
      ? `Showing ${filteredProjectsCount} of ${allProjectsCount}`
      : "";

  return (
    <div className="mb-8 flex flex-col items-center gap-2 px-2">
      <div>
        <Button
          variant={"secondary"}
          className="shadow-card hover:bg-background-lighter hover:cursor-pointer"
          onClick={() => setIsFilterShowing((p) => !p)}
        >
          {buttonText}
        </Button>
      </div>
      {isFilterShowing && (
        <div className="border-border flex flex-col items-center gap-2 rounded-md border py-4 sm:max-w-[80%] lg:max-w-[60%]">
          <div className="flex flex-wrap gap-4">
            {allTags.map((tag) => {
              const countText = tagsAndCount.get(tag)
                ? `(${tagsAndCount.get(tag)})`
                : "(0)";
              const isDisabled = Boolean(tagsAndCount.get(tag)) === false;
              const buttonStyling = isDisabled
                ? "bg-background"
                : selectedTags.includes(tag)
                  ? "bg-primary text-primary-foreground shadow-primary hover:cursor-pointer"
                  : "bg-background-light shadow-card hover:bg-background-lighter hover:cursor-pointer";

              return (
                <button
                  key={tag}
                  disabled={isDisabled}
                  onClick={() => toggleTag(tag)}
                  className={`m-1 rounded-full px-3 py-1 text-xs font-semibold sm:text-sm ${buttonStyling}`}
                >
                  {tag} {countText}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {resultText.length > 0 && !isFilterShowing && (
        <div className="mt-2">
          <span className="text-foreground-muted text-xs sm:text-sm">
            {resultText}
          </span>
        </div>
      )}
    </div>
  );
}
