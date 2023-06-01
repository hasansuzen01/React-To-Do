import { useState } from 'react';
import './App.css';
import axios from 'axios';
import Texts from './components/texts';

function App() {
  const [text, setText] = useState('');
  const [texts, setTexts] = useState([]);

  const sendData = async (data) => {
    try {
      await axios.post('http://localhost:3000/texts', { text: data });
      console.log('Veri başarıyla gönderildi.');
      setText('');
      fetchTexts();
    } catch (error) {
      console.error('Veri gönderimi sırasında hata oluştu:', error);
    }
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendData(text);
  };

  const handleDeleteButton = (id) => {
    deleteTask(id);
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/texts/${id}`);
      console.log('Görev başarıyla silindi.');
      fetchTexts();
    } catch (error) {
      console.error('Görev silme sırasında hata oluştu:', error);
    }
  };

  const fetchTexts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/texts');
      setTexts(response.data);
      console.log(texts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="formDiv">
        <h2>Görev Ekle</h2>
        <textarea value={text} onChange={handleChange} rows={4} cols={50} />
        <button type="submit" className="btnSubmit">
          Gönder
        </button>
      </form>
      <div>
        <Texts texts={texts} removeOneTask={handleDeleteButton} />
      </div>
    </div>
  );
}

export default App;
