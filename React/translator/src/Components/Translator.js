import React, { useState } from 'react';
import axios from 'axios';
import './Translator.css';

const Translator = () => {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [translation, setTranslation] = useState('');

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
  };

  const handleTranslation = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7186/Translation', {
        Text: text,
        TargetLanguage: targetLanguage
      });

      setTranslation(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const languageOptions = [
    { value: 'en', label: 'Английский' },
    { value: 'es', label: 'Испанский' },
    { value: 'fr', label: 'Французский' },
    { value: 'de', label: 'Немецкий' },
    { value: 'it', label: 'Итальянский' },
    { value: 'ja', label: 'Японский' },
    { value: 'ko', label: 'Корейский' },
    { value: 'pt', label: 'Португальский' },
    { value: 'ru', label: 'Русский' },
    { value: 'zh-Hans', label: 'Китайский (упрощенный)' },
    { value: 'zh-Hant', label: 'Китайский (традиционный)' },
    { value: 'ar', label: 'Арабский' },
    { value: 'hi', label: 'Хинди' },
    { value: 'id', label: 'Индонезийский' },
    { value: 'pl', label: 'Польский' },
    { value: 'sv', label: 'Шведский' },
    { value: 'tr', label: 'Турецкий' },
    { value: 'vi', label: 'Вьетнамский' },
    { value: 'nl', label: 'Голландский' },
    { value: 'fi', label: 'Финский' },
  ];

  return (
    <div className="translator-container">
    <h1 className="translator-title">Переводчик</h1>
    <div className="translator-content">
      <textarea
        className="translator-input"
        placeholder="Введите текст для перевода..."
        value={text}
        onChange={handleInputChange}
      ></textarea>
      <div className="translator-controls">
        <select
          className="translator-language"
          value={targetLanguage}
          onChange={handleLanguageChange}
        >
          {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
        <button className="translator-button" onClick={handleTranslation}>
          Перевести
        </button>
      </div>
      <div className="translator-output">{translation}</div>
    </div>
  </div>
  );
};

export default Translator;
