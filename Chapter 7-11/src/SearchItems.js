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

// In HTML, when a "<form>" element is submitted, it triggers a browser refresh by default. By adding onSubmit={(e) => e.preventDefault(), it prevents this default behavior (allows you to submit manually).
