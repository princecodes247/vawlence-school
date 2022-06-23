const Footer = () => (
  <footer className="flex flex-col items-center md:grid md:grid-cols-2 gap-4 p-4 text-center pt-12 bg-gray-100">
    <a
      href="https://www.github.com/princecodes247"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-primary underline underline-primary"
    >
      Created by PrinceCodes
    </a>
    <a
      href="https://www.twitter.com/princecodes247"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-primary underline underline-primary"
    >
      Follow On Twitter
    </a>

    <a
      href="https://chat.whatsapp.com/LXU0SQl0vTX8y3Urw2pQJX"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-primary underline underline-primary"
    >
      Join the Vawulence Nation
    </a>
    {/* <a href="https://api.whatsapp.com/send?phone=2349011308292&text=Hi!!!%20I%27m">
      <div className="font-bold text-primary underline underline-primary hover:text-gray-500 cursor-pointer">
        Say hi!
      </div>
    </a> */}
    <a href="https://instagram.com/astrosoft.io?igshid=YmMyMTA2M2Y=">
      <div className="font-bold text-primary underline underline-primary hover:text-gray-500 cursor-pointer">
        Check out AstroSoft
      </div>
    </a>
  </footer>
);

export default Footer;
