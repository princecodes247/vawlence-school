const Footer = () => (
  <footer className="flex flex-col items-center gap-4 p-4 text-center mt-12 bg-gray-100">
    <a
      href="https://www.github.com/princecodes247"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-primary underline underline-primary"
    >
      Created by PrinceCodes
    </a>
    <a href="https://api.whatsapp.com/send?phone=2349011308292&text=Hi!!!%20I%27m">
      <div className="font-bold text-primary underline underline-primary hover:text-gray-500 cursor-pointer">
        Say hi!
      </div>
    </a>
    {/* <a
      href="https://princecodes-2022.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-primary underline underline-primary"
    >
      Portfolio (under Construction)
    </a> */}
  </footer>
);

export default Footer;
