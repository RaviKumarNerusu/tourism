function Footer() {
  return (
    <>
      <style>{`
        .footer {
          margin-top: 2rem;
          padding: 1rem;
          text-align: center;
          background: #2c3e50;
          color: #fff;
          font-size: 0.9rem;
        }
      `}</style>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Monastery360 | Preserving Culture & Promoting Tourism</p>
      </footer>
    </>
  );
}

export default Footer;
