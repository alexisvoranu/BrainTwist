import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./style.css";
import { Slider, Select, MenuItem, Button } from "@mui/material";

const FILTER_STORAGE_KEY = "sidebarFilters";

const SideBar = ({ isOpen, toggleSidebar, products, setFilteredProducts }) => {
  const sidebarClass = isOpen ? "sidebar open" : "sidebar";
  const location = useLocation();

  const [priceRange, setPriceRange] = useState([0, 314.99]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [selectedPieces, setSelectedPieces] = useState([]);
  const [selectedMagnetStrengths, setSelectedMagnetStrengths] = useState([]);

  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableDifficulties, setAvailableDifficulties] = useState([]);
  const [availablePieces, setAvailablePieces] = useState([]);
  const [availableMagnetStrengths, setAvailableMagnetStrengths] = useState([]);

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem(FILTER_STORAGE_KEY));
    if (savedFilters) {
      setPriceRange(savedFilters.priceRange);
      setSelectedBrands(savedFilters.selectedBrands);
      setSelectedColors(savedFilters.selectedColors);
      setSelectedDifficulties(savedFilters.selectedDifficulties);
      setSelectedPieces(savedFilters.selectedPieces);
      setSelectedMagnetStrengths(savedFilters.selectedMagnetStrengths);
    } else if (products.length > 0) {
      const minPrice = Math.min(...products.map((p) => p.price));
      const maxPrice = Math.max(...products.map((p) => p.price));
      setPriceRange([minPrice, maxPrice]);
    }
  }, [products]);

  useEffect(() => {
    const currentPath = location.pathname;
    const cameFromPuzzleDetails =
      sessionStorage.getItem("cameFromPuzzleDetails") === "true";

    if (!cameFromPuzzleDetails) {
      if (products.length > 0) {
        setPriceRange([0, 314.99]);
      }
    }

    sessionStorage.removeItem("cameFromPuzzleDetails");
  }, [location]);

  useEffect(() => {
    const filters = {
      priceRange,
      selectedBrands,
      selectedColors,
      selectedDifficulties,
      selectedPieces,
      selectedMagnetStrengths,
    };
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filters));
    filterProducts();
  }, [
    priceRange,
    selectedBrands,
    selectedColors,
    selectedDifficulties,
    selectedPieces,
    selectedMagnetStrengths,
    products,
  ]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSelectChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const resetFilters = () => {
    localStorage.removeItem(FILTER_STORAGE_KEY);
    const minPrice = Math.min(...products.map((p) => p.price));
    const maxPrice = Math.max(...products.map((p) => p.price));
    setPriceRange([minPrice, maxPrice]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedDifficulties([]);
    setSelectedPieces([]);
    setSelectedMagnetStrengths([]);
  };

  const filterProducts = () => {
    let filtered = products.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }
    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        selectedColors.includes(product.color)
      );
    }
    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter((product) =>
        selectedDifficulties.includes(product.difficulty)
      );
    }
    if (selectedPieces.length > 0) {
      filtered = filtered.filter((product) =>
        selectedPieces.includes(product.noPieces)
      );
    }
    if (selectedMagnetStrengths.length > 0) {
      filtered = filtered.filter((product) =>
        selectedMagnetStrengths.includes(product.magnetStrength)
      );
    }

    setFilteredProducts(filtered);
    updateAvailableFilters(filtered);
  };

  const updateAvailableFilters = (filteredProducts) => {
    setAvailableBrands([...new Set(filteredProducts.map((p) => p.brand))]);
    setAvailableColors([...new Set(filteredProducts.map((p) => p.color))]);
    setAvailableDifficulties([
      ...new Set(filteredProducts.map((p) => p.difficulty)),
    ]);
    setAvailablePieces([...new Set(filteredProducts.map((p) => p.noPieces))]);
    setAvailableMagnetStrengths([
      ...new Set(filteredProducts.map((p) => p.magnetStrength)),
    ]);
  };

  const isFilterVisible = (filterName) => {
    const urlWords = location.pathname.split("/");

    if (
      filterName === "price" &&
      (urlWords.includes("Metal") || urlWords.includes("Plastic"))
    ) {
      return false;
    }

    if (
      filterName === "brand" &&
      (urlWords.includes("Metal") || urlWords.includes("Plastic"))
    ) {
      return false;
    }

    if (
      filterName === "magnetStrength" &&
      (urlWords.includes("IQ") || urlWords.includes("Jigsaw"))
    ) {
      return false;
    }

    if (
      filterName === "color" &&
      (urlWords.includes("IQ") || urlWords.includes("Jigsaw"))
    ) {
      return false;
    }

    if (
      filterName === "difficulty" &&
      (urlWords.includes("Rubik") || urlWords.includes("Jigsaw"))
    ) {
      return false;
    }

    if (
      filterName === "pieces" &&
      (urlWords.includes("Rubik") || urlWords.includes("Jigsaw"))
    ) {
      return false;
    }

    return true;
  };

  return (
    <div>
      <button
        className={`cssbuttons-io-button ${isOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      >
        Filtre
        <div className="icon">
          {isOpen ? (
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>
          )}
        </div>
      </button>

      <div className={sidebarClass}>
        {isOpen && (
          <div className="p-4 border-r w-64">
            <h2 className="text-lg font-bold mb-4">Filtrează produsele</h2>

            {isFilterVisible("price") && (
              <>
                <h6 className="text-md font-semibold mt-4">Preț</h6>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={Math.min(...products.map((p) => p.price))}
                  max={Math.max(...products.map((p) => p.price))}
                />
                <p className="mt-1 text-sm">
                  Interval: {priceRange[0]} - {priceRange[1]} RON
                </p>
              </>
            )}

            {isFilterVisible("brand") && (
              <>
                <h6 className="text-md font-semibold mt-3">Marcă</h6>
                <Select
                  multiple
                  value={selectedBrands}
                  onChange={handleSelectChange(setSelectedBrands)}
                  className="w-full text-sm"
                  size="small"
                >
                  {availableBrands.map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}

            {isFilterVisible("color") && (
              <>
                <h6 className="text-md font-semibold mt-3">Culoare</h6>
                <Select
                  multiple
                  value={selectedColors}
                  onChange={handleSelectChange(setSelectedColors)}
                  className="w-full text-sm"
                  size="small"
                >
                  {availableColors.map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}

            {isFilterVisible("difficulty") && (
              <>
                <h6 className="text-md font-semibold mt-3">Dificultate</h6>
                <Select
                  multiple
                  value={selectedDifficulties}
                  onChange={handleSelectChange(setSelectedDifficulties)}
                  className="w-full text-sm"
                  size="small"
                >
                  {availableDifficulties.sort().map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}

            {isFilterVisible("pieces") && (
              <>
                <h6 className="text-md font-semibold mt-3">Număr de piese</h6>
                <Select
                  multiple
                  value={selectedPieces}
                  onChange={handleSelectChange(setSelectedPieces)}
                  className="w-full text-sm"
                  size="small"
                >
                  {availablePieces.sort().map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}

            {isFilterVisible("magnetStrength") && (
              <>
                <h6 className="text-md font-semibold mt-3">Putere magneți</h6>
                <Select
                  multiple
                  value={selectedMagnetStrengths}
                  onChange={handleSelectChange(setSelectedMagnetStrengths)}
                  className="w-full text-sm"
                  size="small"
                >
                  {availableMagnetStrengths.sort().map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
            <Button
              className="mt-4"
              style={{ margin: "0px auto", display: "block" }}
              variant="contained"
              onClick={resetFilters}
            >
              Resetează filtrele
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
