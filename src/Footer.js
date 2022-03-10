export default function Footer() {
  const currentYear = new Date().getFullYear();

  return <div className="footer">Developed by Eugene Kasimov. Copyright {currentYear}</div>;
}
