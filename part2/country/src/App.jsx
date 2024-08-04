import { useEffect, useState } from "react";
import axios from "axios";
import Detail from "./components/Detail";

function App() {
  const [country, setCountry] = useState("");
  const [allCountry, setAllCountry] = useState([]);
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://studies.cs.helsinki.fi/restcountries/api/all"
        );
        setAllCountry(result.data);
      } catch (error) {
        console.error("Custom error", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (country === "") {
      setList([]);
      return;
    }

    const filtered = allCountry.filter((item) => {
      return item.name.common.toLowerCase().includes(country.toLowerCase());
    });

    setList(filtered);
  }, [country, allCountry]);

  return (
    <>
      <label htmlFor="country">Find Countries</label>
      <input
        type="text"
        name="country"
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />
      {list.length > 10 ? (
        <p>Too many results, please refine your search.</p>
      ) : list.length > 1 ? (
        <ul>
          {list.map((item) => (
            <li key={item.cca3}>
              {item.name.common}{" "}
              <button
                onClick={() => {
                  // <Detail name={item.name.common} />;
                  setDetail(item.name.common);
                }}
              >
                Show
              </button>
            </li>
          ))}
        </ul>
      ) : (
        // : list.length === 1 ? (
        //   <>
        //     <Detail name={list[0].name.common} />
        //   </>
        // )
        <>
          <p>No countries found.</p>
        </>
      )}

      {detail && <Detail name={detail} />}
    </>
  );
}

export default App;
