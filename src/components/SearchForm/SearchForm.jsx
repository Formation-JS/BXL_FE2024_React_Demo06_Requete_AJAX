import { useState } from "react";
import { useId } from "react";

const SearchForm = ({ onSearch, labelContent }) => {

    //! Id d'accessibilité du formulaire
    const formId = useId();

    //! State du contenu du formulaire
    const [query, setQuery] = useState('');

    //! Gestion de la validation du formulaire
    const handleQuerySubmit = (event) => {

        // Déactivation du comportement par default
        event.preventDefault();

        // Envoye des données (state) vers le composant parent
        // La fonction "trim" supprimer les espaces avant et arpès le contenu
        onSearch(query.trim());

        // Réinitialiser le formulaire
        setQuery('');

    }

    //! Rendu
    return (
        <form onSubmit={handleQuerySubmit}>
            {labelContent && (
                // Label conditionnel : La balise est affiché au besoin
                <label htmlFor={formId}>{labelContent} : </label>
            )}
            {/* Résumé du binding
                - value={...}    : State -> Input (Si le state est modifier, l'input aussi)
                - onChange={...} : Input -> State (Modifie le state en fct de l'input)
            */}
            <input id={formId} type="text"
                value={query} onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">🔍</button>
        </form>
    )
};

export default SearchForm;