import React, { useState } from 'react';

function SearchCards({ onSearch }) {
  const [cardName, setCardName] = useState('');
  const [cardType, setCardType] = useState('0');
  const [cardSubtype, setCardSubtype] = useState('0');
  const [cardColor, setCardColor] = useState('0');

  const handleSearchClick = () => {
    onSearch(cardName, cardType, cardSubtype, cardColor);
  };

  return (
    <div className="grid grid-cols-12 mt-3 ">
      {/* Search Bar + Filters */}
      <div className="search-container col-span-6 w-full">
        <input
          id="searchbar"
          className="rounded"
          placeholder="Search for cards..."
          value={cardName}
          onChange={e => setCardName(e.target.value)}
        />
        <button className="btn text-xs" id="searchbtn" onClick={handleSearchClick}>
          Search
        </button>
      </div>
      {/* Select Type dropdown */}
      <div className="col-span-2" id="selectType">
        <select
          className="w-full text-xs"
          value={cardType}
          onChange={e => setCardType(e.target.value)}
        >
          <option value="0" className=""></option>
          <option value="pokemon" className="">Pokemon</option>
          <option value="trainer" className="">Trainer</option>
          <option value="energy" className="">Energy</option>
        </select>
      </div>

      {/* Select subtype dropdown */}
      <div className="col-span-2 w-full" id="selectSubtype">
        <select
          className="w-full text-xs"
          value={cardSubtype}
          onChange={e => setCardSubtype(e.target.value)}
        >
          <option value="0" className=""></option>
          <option value="BREAK" className="">BREAK</option>
            <option value="Baby" className="">Baby</option>
            <option value="Basic" className="">Basic</option>
            <option value="EX" className="">EX</option>
            <option value="GX" className="">GX</option>
            <option value="Item" className="">Item</option>
            <option value="LEGEND" className="">LEGEND</option>
            <option value="Level-Up" className="">Level-Up</option>
            <option value="MEGA" className="">MEGA</option>
            <option value="Pokémon Tool" className="">Pokémon Tool</option>
            <option value="Pokémon Tool F" className="">Pokémon Tool F</option>
            <option value="Rapid Strike" className="">Rapid Strike</option>
            <option value="Restored" className="">Restored</option>
            <option value="Single Strike" className="">Single Strike</option>
            <option value="Special" className="">Special</option>
            <option value="Stadium" className="">Stadium</option>
            <option value="Stage 1" className="">Stage 1</option>
            <option value="Stage 2" className="">Stage 2</option>
            <option value="Supporter" className="">Supporter</option>
            <option value="TAG TEAM" className="">TAG TEAM</option>
            <option value="Technical Machine" className="">TM</option>
            <option value="V" className="">V</option>
            <option value="VMAX" className="">VMAX</option>
        </select>
      </div>

      {/* Select color dropdown */}
      <div className="col-span-2 w-full" id="selectColor">
        <select
          className="w-full text-xs"
          value={cardColor}
          onChange={e => setCardColor(e.target.value)}
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
    </div>
  );
}

export default SearchCards;
