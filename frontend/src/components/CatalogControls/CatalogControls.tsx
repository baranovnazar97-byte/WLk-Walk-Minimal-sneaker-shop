import './CatalogControls.css';

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
      <div className="filter-buttons">
        <button
          className={
            filter === 'All' ? 'filter-button active' : 'filter-button'
          }
          onClick={() => changeFilter('all')}
        >
          all
        </button>
        {listCategories.map((item, i) => (
          <button
            key={i}
            className={
              filter === item ? 'filter-button active' : 'filter-button'
            }
            onClick={() => changeFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
};

export default CatalogControls;
