export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>&copy; <span data-year>{currentYear}</span> Color Creatives. All rights reserved.</p>
        <p className="footer-credit">Cut, colored &amp; shipped with care.</p>
      </div>
    </footer>
  );
}
