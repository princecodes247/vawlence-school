import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import Certificate from "../../public/certificate.svg";
import { FaWhatsapp, FaFacebook, FaTwitter, FaDownload } from "react-icons/fa";
// import { connect } from "../../utils/connection";

const certificateLoader = () => {
  return ``;
};
function Comrade() {
  const [comrade, setComrade] = useState({
    status: "",
    from: "",
    to: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isValidID, setIsValidID] = useState(true);
  useEffect(() => {
    // console.log("Comrade useEffect");
    // const { id } = router.query;
    // // console.log(router);
    const id = window.location.pathname.split("/")[2];
    fetch("/api/comrades/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // // console.log(result);
        if (result) {
          let comradeClass =
            result.gpa >= 4.5
              ? "First-Class"
              : result.gpa >= 3.5
              ? "Upper-Class"
              : result.gpa >= 2.5
              ? "Lower-Class"
              : result.gpa >= 1.5
              ? "Pass"
              : "Peace";

          setComrade({
            ...result.comrade,
            class: comradeClass,
            certificate: result.certificate,
          });
          // console.log(result);
          // setComrade({ class: comradeClass, certificate: result.certificate });
          setIsValidID(true);
        } else {
          // return router.push("/"+id);
          setIsValidID(false);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getCertificate = (node) => {
    domtoimage
      .toPng(node)
      .then(function (dataUrl) {
        return dataUrl;
      })
      .catch(function (error) {
        // console.error("oops, something went wrong!", error);
        return null;
      });
  };

  return (
    <div className={styles.container}>
      <Layout>
        {isLoading ? (
          <div className="flex items-center w-full justify-center h-screen">
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 border-t border-black rounded-full animate-spin"></div>
              <p className="text-xl">Please wait...</p>
            </div>
          </div>
        ) : (
          <section className="w-full">
            {isValidID ? (
              <div className="flex flex-col items-center">
                <h1 className="my-8 text-4xl">Congratulations!!</h1>

                {/* <div className="relative flex flex-col items-center pt-2 Certificate">
                  <Image src={Certificate} alt="certificate" />
                  <h2 className="absolute text-2xl top-24 font-header">
                    {comrade.name}
                  </h2>
                  <p className="absolute text-3xl top-48 font-header">
                    {comrade.department}
                  </p>
                  <p className="absolute text-sm text-gray-600 top-56">
                    ({comrade.class})
                  </p>
                </div> */}

                <div className="flex flex-col items-center relative w-4/5 mb-12">
                  <Image
                    src={comrade.certificate}
                    // layout="fill"
                    width={1000}
                    height={600}
                    alt="certificate"
                  />
                  <p className="my-5 font-bold">Your CGPA: {comrade.gpa}</p>
                </div>
                <div className="grid gap-5 grid-cols-2">
                  <a
                    href={comrade.certificate}
                    download={`comrade_${comrade.tag}.png`}
                    className="px-4 gap-6 py-2 font-bold text-white flex items-center justify-center text-center hover:brightness-90 bg-primary rounded-lg"
                  >
                    <FaDownload size="20px" />
                    Download Certificate
                  </a>
                  {/* Share to facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://vawlence-school.vercel.app/comrade/${comrade.tag}`}
                    target="_blank"
                    className="px-4 gap-6 flex items-center justify-start text-center py-2 font-bold text-white bg-blue-700 text-center hover:brightness-90 rounded-lg"
                    rel="noreferrer"
                  >
                    <FaFacebook size="20px" />
                    Share to Facebook
                  </a>
                  {/* Share to twitter */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=I%20just%20got%20a%20certificate%20of%20vawulence%20from%20the%20International%20University%20of%20Vawulence.%20Check%20it%20out%20https://vawlence-school.vercel.app/comrade/${comrade.tag}`}
                    target="_blank"
                    className="px-4 gap-6 flex items-center justify-start text-center py-2 font-bold text-white bg-blue-400 text-center hover:brightness-90 rounded-lg"
                    rel="noreferrer"
                  >
                    <FaTwitter size="20px" />
                    Share to Twitter
                  </a>
                  {/* Share to WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=I%20just%20got%20a%20certificate%20of%20vawulence%20from%20the%20International%20University%20of%20Vawulence.%20Check%20it%20out%20https://vawlence-school.vercel.app/comrade/${comrade.tag}`}
                    target="_blank"
                    className="px-4 gap-6 flex items-center justify-start text-center py-2 font-bold text-white bg-green-400 text-center hover:brightness-90 rounded-lg"
                    rel="noreferrer"
                  >
                    <FaWhatsapp size="20px" />
                    Share to WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <h2 className="">Comrade not found</h2>
            )}
            <div className="w-full flex items-center justify-center mt-12">
              <Link href="/getCertified">
                <a className="px-4 py-2 font-bold text-white text-center hover:brightness-90 bg-primary rounded-lg">
                  Enroll here
                </a>
              </Link>
            </div>
          </section>
        )}
      </Layout>
    </div>
  );
}

// TODO: Create basic styling
// TODO: Fetch graduates from API

export default Comrade;
