// src/components/EmailButton.js
import React, { useState } from 'react';

const EmailButton = () => {
  const [mailtoLink, setMailtoLink] = useState(null);

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/generate_mailto_link');
      if (response.ok) {
        const data = await response.json();
        setMailtoLink(data.mailto_link);
        window.open(data.mailto_link, '_blank');
      } else {
        alert('Error: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while generating the email link.');
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Send Next Email</button>
    </div>
  );
};

export default EmailButton;
