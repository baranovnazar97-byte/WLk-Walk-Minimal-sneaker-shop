interface ICatalogProps {
  filter: string;
  changeFilter: (filter: string) => void;
  listCategories: string[];
}

const CatalogControls = ({
  filter,
  changeFilter,
  listCategories,
}: ICatalogProps) => {
  return (
    <>
      <h2>{filter}</h2>
      <div>
        <button onClick={() => changeFilter('Все')}>Все</button>
        {listCategories.map((item, i) => (
          <button key={i} onClick={() => changeFilter(item)}>
            {item}
          </button>
        ))}
      </div>
    </>
  );
};

export default CatalogControls;
