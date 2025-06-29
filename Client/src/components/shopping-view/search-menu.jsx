
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

function SearchMenu({ className = "" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop/search?keyword=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/shop/search'); // Clear search when empty
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    navigate('/shop/search'); // Clear search
  };

  

  return (
    <form 
      onSubmit={handleSearch} 
      className={`w-full max-w-xl mx-auto ${className}`}
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.02 }}
        whileFocus={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Input
          type="text"
          placeholder="Search for uk-used gadgets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 pr-12 py-6 text-base sm:text-lg placeholder:italic placeholder:text-sm sm:placeholder:text-base border-2 border-gray-200 rounded-full shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
        />

        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-900 h-5 w-5" />
        
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          <Search className="h-5 w-5" />
        </button>
      </motion.div>
    </form>
  );
}

export default SearchMenu;