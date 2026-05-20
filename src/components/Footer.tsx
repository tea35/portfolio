const Footer = () => {
  return (
    <footer className="bg-background border-t border-card py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-foreground/60">
          &copy; {new Date().getFullYear()} My Portfolio. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
