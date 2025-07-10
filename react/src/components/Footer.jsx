function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} SportsStore. All rights reserved.</p>
        <small>Quality sports equipment for every athlete.</small>
      </div>
    </footer>
  );
}

export default Footer;
