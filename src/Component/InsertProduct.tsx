import axios from 'axios';
import { useState } from 'react';

export default function InsertProduct() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://fakestoreapi.com/products', {
        title, price, description, category, image
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={submit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
      <input value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" />
      <button type="submit">Submit</button>
    </form>
  );
}