import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { models } from "./models";
import men from "../Icons/men.png";
import women from "../Icons/women.png";
import "./header.css"

export const Header = () => {
    return (
        <>
            <header className="app-header">
                <input type="search" className="search" placeholder="Поиск" />
                <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
            </header>
            <section className="models">
                <div className="gender">
                    <img src={women} alt="women" />
                    <img src={men} alt="men" />
                </div>
                {models.map((model) => (
                    <button key={model.id} className="model-example">
                        <img src={model.img} alt="jewelry" /><br />
                        {model.name}
                    </button>
                ))}
                <button className="plus">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </section>
        </>
    )
}

