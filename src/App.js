import { useState } from 'react';
import './App.css'; // Make sure you've created the App.css file and added the styles there

/*
    TO DO:
     - Stats:  Y
        HP
        Mana

     - Misssions?  X

     - Spells Lower Mana  Y

     - Inventory items  Y
        change stats  X

*/

const App = () => {
    const initialStats = {
        hp: 100,
        mana: 100,
    };
    const maxStats = {
        hp: 100,
        mana: 100,
    };

    const [stats, setStats] = useState({ ...initialStats });
    const [mStats, setMaxStats] = useState({ ...maxStats });

    const spells = [
        { name: 'Fireball', spellCost: 10 },
        { name: 'Heal', spellCost: 5 },
        { name: 'Blood Sacr.', spellCost: 10 },
        // Add more spells as needed
    ];

    const castSpell = (spell) => {
        // Logic to cast the selected spell
        console.log(`Casting spell: ${spell.name}`);

        if (spell.name === 'Heal' && stats.hp === mStats.hp) {
            console.log('HP is already at maximum.');
            return; // Prevent casting Heal if HP is already at 100
        }

        if (spell.name === 'Blood Sacr.' && stats.hp < 20) {
            console.log('HP is too low to use this spell.');
            return; // Prevent casting Blood Sacr. if HP is already at 100
        }
        if (spell.name === 'Blood Sacr.' && stats.mana === mStats.mana) {
            console.log('Your mana is already full.');
            return; // Prevent casting Blood Sacr. if HP is already at 100
        }

        if (spell.name === 'Heal') {
            const newHP = Math.min(stats.hp + 15, mStats.hp); // Increase HP by 20 but not beyond 100
            const newMana = Math.max(stats.mana - spell.spellCost, 0); // Deduct spell cost from mana
            setStats({ ...stats, hp: newHP, mana: newMana });
        } else if (spell.name === 'Blood Sacr.') {
            const newHP = Math.max(stats.hp - spell.spellCost, 20); // Lose 10 HP but not beyond 20
            const newMana = Math.min(stats.mana + 20, mStats.mana); // Gain 20 mana, maximum 100

            setStats({ ...stats, hp: newHP, mana: newMana });
        }else {
            // Reducing mana for other spells
            const newMana = Math.max(stats.mana - spell.spellCost, 0); // Deduct spell cost from mana
            setStats({ ...stats, mana: newMana });
        }
    };

    const resetStats = () => {
        // Reset stats to initial values
        setStats({ ...initialStats });
    };

    const mapInfo = [
        { name: 'Area 1' },
        { name: 'Area 2' },
        { name: 'Area 3' },
        { name: 'Area 4' },
        // Add more map information as needed
    ];

    const showInfo = (info) => {
         // Logic to display information about the selected map area
         console.log(`Showing information for area: ${info.name}`);
    };

    const [inventory, setInventory] = useState([]);
    const [backpackItems, setBackpackItems] = useState([
        { name: 'Item 1' },
        { name: 'Item 2' },
        { name: 'Item 3' },
        // Add more initial items in the backpack as needed
    ]);
    const [selectedItem, setSelectedItem] = useState(null);

    const moveItemToInventory = () => {
        if (selectedItem) {
            setInventory([...inventory, selectedItem]);
            setBackpackItems(backpackItems.filter((item) => item !== selectedItem));
            setSelectedItem(null);
        }
    };

    const moveItemToBackpack = () => {
        if (selectedItem) {
            setBackpackItems([...backpackItems, selectedItem]);
            setInventory(inventory.filter((item) => item !== selectedItem));
            setSelectedItem(null);
        }
    };

    return (
        <div className="app">
            <div className="spell-book">
                <h2>Spell Book</h2>
                <div className="spell-list">
                    {spells.map((spell, index) => (
                        <button key={index} onClick={() => castSpell(spell)}>
                            {spell.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="world-map">
                <h2>World Map</h2>
                <div className="map-grid">
                    {mapInfo.map((info, index) => (
                        <div key={index} className="map-area" onClick={() => showInfo(info)}>
                            {info.name}
                        </div>
                    ))}
                </div>
            </div>

            <div className="backpack-box">
                <h2>Backpack</h2>
                <div className="backpack-items">
                    {backpackItems.map((item, index) => (
                        <div
                            key={index}
                            className={`backpack-item ${selectedItem === item ? 'selected' : ''}`}
                            onClick={() => setSelectedItem(item)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
                <div className="backpack-buttons">
                    <button onClick={moveItemToInventory}>Add to Inventory</button>
                </div>
            </div>

            <div className="inventory-management">
                <h2>Inventory</h2>
                <div className="inventory-items">
                    {inventory.map((item, index) => (
                        <div
                            key={index}
                            className={`inventory-item ${selectedItem === item ? 'selected' : ''}`}
                            onClick={() => setSelectedItem(item)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
                <div className="inventory-buttons">
                    <button onClick={moveItemToBackpack}>Remove from Inventory</button>
                </div>
            </div>

            <div className="stats-box">
                <h2>Stats</h2>
                <div>HP: {stats.hp}</div>
                <div>Mana: {stats.mana}</div>
                <button onClick={resetStats}>Reset Stats</button>
            </div>
        </div>
    );
};

export default App;
