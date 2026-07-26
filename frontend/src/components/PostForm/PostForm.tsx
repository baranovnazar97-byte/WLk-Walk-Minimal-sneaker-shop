interface PostProp {
  postData: (event: React.FormEvent<HTMLFormElement>) => void;
}

const PostForm = ({ postData }: PostProp) => {
  return (
    <>
      <h2>Форма добавления</h2>
      <form className="form-post" onSubmit={postData}>
        <label htmlFor="brand">Бренд</label>
        <input type="text" name="brand" />
        <label htmlFor="title">Название</label>
        <input type="text" name="title" />
        <label htmlFor="price">Цена</label>
        <input type="number" name="price" id="price" />
        <label htmlFor="category">Категория</label>
        <input type="text" name="category" id="category" />
        <label htmlFor="sizes">Размер</label>
        <input type="number" name="sizes" id="sizes" />
        <label htmlFor="imageUrl">Картинка</label>
        <input type="text" name="imageUrl" id="imageUrl" />
        <button type="submit">Добавить</button>
      </form>
    </>
  );
};

export default PostForm;
