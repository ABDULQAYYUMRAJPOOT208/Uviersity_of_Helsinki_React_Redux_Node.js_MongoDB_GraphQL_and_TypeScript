import React, { useState } from "react";

const Filter = ({ list, setList }) => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);

    // Filter based on the new filter value
    const filteredList = list.filter((item) =>
      item.name.toLowerCase().includes(newFilter.toLowerCase())
    );
    setList(filteredList);
  };

  return (
    <div>
      <label htmlFor="filter">Filter: </label>
      <input
        name="filter"
        type="text"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;
