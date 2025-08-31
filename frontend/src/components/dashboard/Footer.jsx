const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 w-full bottom-0">
      <div className="w-4/5 m-auto flex flex-col md:flex-row justify-center items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Chetan Gosavi. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
