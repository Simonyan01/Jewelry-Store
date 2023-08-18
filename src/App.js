import { Header } from "./Header/Header";
import { Filter } from "./Filter/Filter";
import { Item } from "./Jewelries/Item";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <section>
        <Filter />
        <Item />
      </section>
    </>
  );
}

export default App;
