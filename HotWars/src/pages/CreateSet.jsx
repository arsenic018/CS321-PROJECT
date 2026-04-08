import { useState } from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./CreateSet.css";

const CreateSet = () => {
    const nami = useNavigate();
    const [term, setTerm] = useState("");
    const [definition, setDefinition] = useState("");
    const [cards, setCards] = useState([]);

    const handleAddCard = () => {
        if (term.trim() === "" || definition.trim() === "") return;
        setCards([...cards, { term, definition }]);
        setTerm("");
        setDefinition("");
    };

    return (
        <div className="create-panel">
            <header className="create-header">
                <img src={logo} alt="Logo" className="logo-icon" />
                <h1 className="create-title">HOT WARS!</h1>
                <User className="icon user-icon" size={36} color="#e0e0e0" onClick={() => nami("/Login")} />
            </header>

            <div className="create-body">
                <div className="create-inputs">
                    <div className="create-field">
                        <label className="create-label">Term</label>
                        <input
                            className="create-input"
                            type="text"
                            placeholder="Enter term..."
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                        />
                    </div>
                    <div className="create-field">
                        <label className="create-label">Definition</label>
                        <input
                            className="create-input"
                            type="text"
                            placeholder="Enter definition..."
                            value={definition}
                            onChange={(e) => setDefinition(e.target.value)}
                        />
                    </div>
                </div>

                <div className="create-add-wrapper">
                    <button className="create-add-btn" onClick={handleAddCard}>Add Card</button>
                </div>

                <div className="card-list">
                    {cards.length === 0 ? (
                        <p className="card-list-empty">No cards added yet.</p>
                    ) : (
                        cards.map((card, i) => (
                            <div className="card-row" key={i}>
                                <span className="card-term">{card.term}</span>
                                <span className="card-divider">—</span>
                                <span className="card-definition">{card.definition}</span>
                            </div>
                        ))
                    )}
                </div>

                <div className="create-save-wrapper">
                    <button className="create-save-btn">Save Set</button>
                </div>
            </div>
        </div>
    );
};

export default CreateSet;
