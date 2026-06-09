const Footer = () => {
  return (
    <footer className="w-full py-8 border-t border-primary/20">
      <div className="flex justify-center">
        <span className="font-display text-foreground/20 tracking-widest text-sm">
          © {new Date().getFullYear()} tea. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
