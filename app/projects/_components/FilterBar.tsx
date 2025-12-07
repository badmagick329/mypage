export default function FilterBar({
  allTags,
  selectedTags,
  toggleTag,
}: {
  allTags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
}) {
  return (
    <div className="border-border mb-8 flex flex-col items-center gap-2 rounded-md border px-2 py-4 sm:max-w-[80%] lg:max-w-[60%]">
      <div className="flex flex-wrap gap-4">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`m-1 rounded-full px-3 py-1 text-sm font-semibold hover:cursor-pointer ${
              selectedTags.includes(tag)
                ? "bg-primary text-primary-foreground shadow-primary"
                : "bg-background-light shadow-card hover:bg-background-lighter"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
