const SearchItems = ({ searchItems, setSearchItems }) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <input
        id="search"
        type="text"
        role="searchbox"
        placeholder="Search Items here"
        value={searchItems}
        onChange={(e) => setSearchItems(e.target.value)}
      />
    </form>
  );
};

export default SearchItems;
