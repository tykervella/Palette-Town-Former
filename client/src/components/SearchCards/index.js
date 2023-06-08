import React, { useState, useEffect } from 'react';

const SearchCards = ({ onSearch }) => {
  const [cardName, setCardName] = useState('');
  const [cardType, setCardType] = useState('0');
  const [cardSubtype, setCardSubtype] = useState('0');
  const [cardColor, setCardColor] = useState('0');

  useEffect(() => {
    const storedCardName = sessionStorage.getItem('cardName');
    if (storedCardName) {
      setCardName(storedCardName);
    }

    const storedCardType = sessionStorage.getItem('cardType');
    if (storedCardType) {
      setCardType(storedCardType);
    }

    const storedCardSubtype = sessionStorage.getItem('cardSubtype');
    if (storedCardSubtype) {
      setCardSubtype(storedCardSubtype);
    }

    const storedCardColor = sessionStorage.getItem('cardColor');
    if (storedCardColor) {
      setCardColor(storedCardColor);
    }
  }, []);

  const handleSearchClick = () => {
    onSearch(cardName, cardType, cardSubtype, cardColor);
  };

  const handleInputChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputName === 'cardName') {
      setCardName(inputValue);
      sessionStorage.setItem('cardName', inputValue);
    } else if (inputName === 'cardType') {
      setCardType(inputValue);
      sessionStorage.setItem('cardType', inputValue);
    } else if (inputName === 'cardSubtype') {
      setCardSubtype(inputValue);
      sessionStorage.setItem('cardSubtype', inputValue);
    } else if (inputName === 'cardColor') {
      setCardColor(inputValue);
      sessionStorage.setItem('cardColor', inputValue);
    }
  };

  const handleRefresh = () => {
    sessionStorage.removeItem('cardName');
    sessionStorage.removeItem('cardType');
    sessionStorage.removeItem('cardSubtype');
    sessionStorage.removeItem('cardColor');
    window.location.reload();
  };

  return (
    <div className="grid grid-cols-12 mt-3">
      {/* Search Bar + Filters */}
      <div className="search-container col-span-6 w-full">
        <input
          id="searchbar"
          className="rounded"
          placeholder="Search for cards..."
          name="cardName"
          value={cardName}
          onChange={handleInputChange}
        />
        <button className="btn text-xs" id="searchbtn" onClick={handleSearchClick}>
          Search
        </button>
      </div>

      {/* Select Type dropdown */}
      <div className="col-span-2" id="selectType">
        <select
          className="w-full text-xs"
          name="cardType"
          value={cardType}
          onChange={handleInputChange}
        >
          <option value="0" className=""></option>
          <option value="pokemon" className="">
            Pokemon
          </option>
          <option value="trainer" className="">
            Trainer
          </option>
          <option value="energy" className="">
            Energy
          </option>
        </select>
      </div>

      {/* Select subtype dropdown */}
      {/* Only shows dropdown menu if type is trainer or pokemon */}
      {["trainer", "pokemon"].includes(cardType) && (
        <div className="col-span-2 w-full" id="selectSubtype">
          <select
            className="w-full text-xs"
            name="cardSubtype"
            value={cardSubtype}
            onChange={handleInputChange}
          >
            <option value="0" className=""></option>

            {/* Render subtype options based on selected card type */}
            {cardType === 'pokemon' && (
              <>
                <option value="BREAK" className="">BREAK</option>
                <option value="Baby" className="">Baby</option>
                <option value="Basic" className="">Basic</option>
                <option value="EX" className="">EX</option>
                <option value="GX" className="">GX</option>
                <option value="LEGEND" className="">LEGEND</option>
                <option value="Level-Up" className="">Level-Up</option>
                <option value="MEGA" className="">MEGA</option>
                <option value="Restored" className="">Restored</option>
                <option value="Single Strike" className="">Single Strike</option>
                <option value="Stage 1" className="">Stage 1</option>
                <option value="Stage 2" className="">Stage 2</option>
                <option value="TAG TEAM" className="">TAG TEAM</option>
                <option value="V" className="">V</option>
                <option value="VMAX" className="">VMAX</option>
              </>
            )}
            {cardType === 'trainer' && (
              <>
                <option value="Item" className="">Item</option>
                <option value="Pokémon Tool" className="">Pokémon Tool</option>
                <option value="Stadium" className="">Stadium</option>
                <option value="Supporter" className="">Supporter</option>
                <option value="Technical Machine" className="">TM</option>
              </>
            )}
          </select>
        </div>
      )}

      {/* Select color dropdown */}
      {cardType === 'pokemon' && (
        <div className="col-span-2 w-full" id="selectColor">
          <select
            className="w-full text-xs"
            name="cardColor"
            value={cardColor}
            onChange={handleInputChange}
          >
            <option value="0" className=""></option>
            <option value="Colorless" className="">Colorless</option>
            <option value="Darkness" className="">Darkness</option>
            <option value="Dragon" className="">Dragon</option>
            <option value="Fairy" className="">Fairy</option>
            <option value="Fighting" className="">Fighting</option>
            <option value="Fire" className="">Fire</option>
            <option value="Grass" className="">Grass</option>
            <option value="Lightning" className="">Lightning</option>
            <option value="Metal" className="">Metal</option>
            <option value="Psychic" className="">Psychic</option>
            <option value="Water" className="">Water</option>
          </select>
        </div>
      )}

      {/* Refresh Button */}
      <div className="col-span-12 flex justify-end">
        <button className="btn text-xs" onClick={handleRefresh}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default SearchCards;
