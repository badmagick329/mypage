export default function FilterBar({
  allTags,
  selectedTags,
  toggleTag,
  tagsAndCount,
}: {
  allTags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  tagsAndCount: Map<string, number>;
}) {
  return (
    <div className="border-border mb-8 flex flex-col items-center gap-2 rounded-md border px-2 py-4 sm:max-w-[80%] lg:max-w-[60%]">
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
              className={`m-1 rounded-full px-3 py-1 text-sm font-semibold ${buttonStyling}`}
            >
              {tag} {countText}
            </button>
          );
        })}
      </div>
    </div>
  );
}
