import  { useEffect, useRef, useState } from "react";
import SortButton from "../SortButton/SortButton";

type SortDropDownProps = {
 
  handleSort?: (key: "price" | "weight") => void;
};

export default function SortDropDown({
  handleSort,
}: SortDropDownProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        isSortOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsSortOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsSortOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isSortOpen]);

  const handleSelectSection = (section: string | null) => {
    handleSort?.(section as "price" | "weight")
    setSelectedSection(section);
    setIsSortOpen(false);
  };
  const list = [
    { key: "price", label: "Price", direction: "asc" },
    { key: "weight", label: "Weight", direction: "asc" },
  ];
  return (
    <div className="block sm:hidden">
      <div className="relative" ref={containerRef}>
        <button
          className="flex w-full sm:w-auto items-center justify-between gap-2 px-4 py-3 sm:py-2 text-sm text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Sort groceries by section"
          aria-expanded={isSortOpen}
          aria-controls="section-Sort"
          aria-haspopup="menu"
          onClick={() => setIsSortOpen(!isSortOpen)}
        >
          Sort By
          <span className="ml-2 text-gray-400" aria-hidden>
            ▾
          </span>
        </button>

        {isSortOpen && (
          <div
            id="section-Sort"
            className="absolute left-0 right-0 sm:right-0 mt-2 sm:mt-2 w-30   bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 transition ease-out"
            role="menu"
            aria-labelledby="grocery-list-title"
          >
            <div className="py-1" role="none">
              {list.map((section) => (
                  <button
                    key={ section.label }
                    className={`w-full text-left px-4 py-3 text-sm text-nowrap ${
                      selectedSection === section.key
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => handleSelectSection(section.key)}
                    role="menuitem"
                  >
                    {section.label}
                  </button>
                 
                ))}
               
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
