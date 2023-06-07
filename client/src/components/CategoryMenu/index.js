import React, { useState, useEffect } from 'react';

const CategoryMenu = ({ onSearch }) => {
    const [cardName, setCardName] = useState('');
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

    useEffect(() => {
        const storedCardName = localStorage.getItem('cardName');
        if (storedCardName) {
            setCardName(storedCardName);
        }
    }, []);

    const handleSearchClick = () => {
        onSearch(cardName, selectedTypes, selectedColors);
    };

    const handleInputChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        if (inputName === 'cardName') {
            setCardName(inputValue);
            localStorage.setItem('cardName', inputValue);
        }
    };

    const handleTypeChange = (event) => {
        const typeValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedTypes((prevTypes) => [...prevTypes, typeValue]);
        } else {
            setSelectedTypes((prevTypes) =>
                prevTypes.filter((type) => type !== typeValue)
            );
        }
    };

    const handleColorChange = (event) => {
        const colorValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedColors((prevColors) => [...prevColors, colorValue]);
        } else {
            setSelectedColors((prevColors) =>
                prevColors.filter((color) => color !== colorValue)
            );
        }
    };

    const handleRefresh = () => {
        localStorage.removeItem('cardName');
        setSelectedTypes([]);
        setSelectedColors([]);
        window.location.reload();
    };

    return (
        <div className="grid grid-cols-12 mt-3">
            {/* Search Bar + Filters */}
            <div className="search-container col-span-12 w-full">
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

            {/* Refresh Button */}
            <div className="col-span-12 flex justify-end">
                <button className="btn text-xs" onClick={handleRefresh}>
                    Reset Filters
                </button>
            </div>

            {/* Select Type checkboxes */}
            <div className="col-span-12 w-full">
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="pokemon"
                            checked={selectedTypes.includes('pokemon')}
                            onChange={handleTypeChange}
                        />
                        Pokemon
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="trainer"
                            checked={selectedTypes.includes('trainer')}
                            onChange={handleTypeChange}
                        />
                        Trainer
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="energy"
                            checked={selectedTypes.includes('energy')}
                            onChange={handleTypeChange}
                        />
                        Energy
                    </label>
                </div>
            </div>

            {/* Select Color checkboxes */}
            {selectedTypes.includes('pokemon') && (
                <div className="col-span-12 w-full">
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="Colorless"
                                checked={selectedColors.includes('Colorless')}
                                onChange={handleColorChange}
                            />
                            Colorless
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="Darkness"
                                checked={selectedColors.includes('Darkness')}
                                onChange={handleColorChange}
                            />
                            Darkness
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="Dragon"
                                checked={selectedColors.includes('Dragon')}
                                onChange={handleColorChange}
                            />
                            Dragon
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="Fairy"
                                checked={selectedColors.includes('Fairy')}
                                onChange={handleColorChange}
                            />
                            Fairy
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="Fighting"
                                checked={selectedColors.includes('Fighting')}
                                onChange={handleColorChange}
                            />
                            Fighting
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="Fire"
                                checked={selectedColors.includes('Fire')}
                                onChange={handleColorChange}
                            />
                            Fire
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="Grass"
                                checked={selectedColors.includes('Grass')}
                                onChange={handleColorChange}
                            />
                            Grass
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="Lightning"
                                checked={selectedColors.includes('Lightning')}
                                onChange={handleColorChange}
                            />
                            Lightning
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="Metal"
                                checked={selectedColors.includes('Metal')}
                                onChange={handleColorChange}
                            />
                            Metal
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="Psychic"
                                checked={selectedColors.includes('Psychic')}
                                onChange={handleColorChange}
                            />
                            Psychic
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="Water"
                                checked={selectedColors.includes('Water')}
                                onChange={handleColorChange}
                            />
                            Water
                        </label>
                    </div>
                </div>
            )}
        </div>
    )
};

export default CategoryMenu;