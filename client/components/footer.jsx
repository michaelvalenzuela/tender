import React from 'react';

export default function Footer(props) {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p className="text-center">Copyright ⓒ {year} Michael Valenzuela</p>
    </footer>
  );
}
