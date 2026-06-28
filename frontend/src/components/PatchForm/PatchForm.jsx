const PatchForm = ({ patchData, shoeSelect, defForm }) => {
  if (!defForm) return 'Загрузка...';

  return (
    <>
      <h2>Форма редактирования</h2>
      <form
        className="form-patch"
        onSubmit={(event) => patchData(event, shoeSelect)}
      >
        <label htmlFor="brand">Бренд</label>
        <input type="text" name="brand" defaultValue={defForm.brand} />
        <label htmlFor="title">Название</label>
        <input type="text" name="title" defaultValue={defForm.title} />
        <label htmlFor="price">Цена</label>
        <input
          type="number"
          name="price"
          id="price"
          defaultValue={defForm.price}
        />
        <label htmlFor="category">Категория</label>
        <input
          type="text"
          name="category"
          id="category"
          defaultValue={defForm.category}
        />
        <label htmlFor="sizes">Размер</label>
        <input
          type="number"
          name="sizes"
          id="sizes"
          defaultValue={defForm.sizes}
        />
        <label htmlFor="imageUrl">Картинка</label>
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          defaultValue={defForm.imageUrl}
        />
        <button type="submit">Сохранить изменение</button>
      </form>
    </>
  );
};

export default PatchForm;
