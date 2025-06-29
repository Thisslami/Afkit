import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

function AdminProductSearch({ 
  className = "",
  onSearch,
  placeholder = "Search products..."
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // Clear search term and trigger onSearch
  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  // Effect to auto-clear when searchTerm becomes empty
  useEffect(() => {
    if (searchTerm === "") {
      onSearch("");
    }
  }, [searchTerm, onSearch]);

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={`w-full max-w-xl mx-auto ${className}`}
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 pr-12 py-6 text-base sm:text-lg placeholder:italic placeholder:text-sm sm:placeholder:text-base border-2 border-gray-200 rounded-full shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
        />

        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-900 h-5 w-5" />
        
        {/* Clear button - only shows when there's text */}
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </motion.div>
    </form>
  );
}

export default AdminProductSearch;