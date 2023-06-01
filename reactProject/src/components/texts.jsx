// Texts.js
import { useState, useEffect } from "react";
import axios from "axios";

function Texts({ removeOneTask, texts }) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    fetchTexts();
  }, []);

  const fetchTexts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/texts");
      setTexts(response.data);
      console.log(texts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    fetchTexts();
    setValue(true);
  };

  const handleDeleteButton = (id) => {
    removeOneTask(id);
  };

  return (
    <div>
      <button onClick={handleButtonClick} className="btnGetir">Görevleri Göster</button>
      {value && (
        <div className="container">
          <div className="card">
            {texts.map((text) => (
              <div key={text.id} className="activeDiv">
                <h2 className="textGörev">{text.id}. Göreviniz</h2>
                <h4 className="textGörevText">Göreviniz: {text.text}</h4>
                <button onClick={() => handleDeleteButton(text.id)} className="btnDeleted">Sil</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Texts;
