import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import Certificate from "../../public/certificate.svg";
// import { connect } from "../../utils/connection";

function Comrade() {
  const [comrade, setComrade] = useState({
    status: "",
    from: "",
    to: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isValidID, setIsValidID] = useState(true);
  useEffect(() => {
    console.log("Comrade useEffect");
    // const { id } = router.query;
    // console.log(router);
    const id = window.location.pathname.split("/")[2];
    fetch("/api/comrades/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
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

          setComrade({ ...result, class: comradeClass });
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
        console.error("oops, something went wrong!", error);
        return null;
      });
  };

  return (
    <div className={styles.container}>
      <Layout>
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            please wait...
          </div>
        ) : (
          <section className="w-full">
            {isValidID ? (
              <div className="flex flex-col items-center">
                <h1 className="my-8 text-4xl">Congratulations!!</h1>

                <div className="relative flex flex-col items-center pt-2 Certificate">
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
                </div>
                <div>
                  <button className="px-4 py-2 font-bold text-white bg-black rounded-lg">
                    Download Certificate
                  </button>
                  {/* Share to facebook */}
                  <a
                    href="https://www.facebook.com/sharer/sharer.php?u=https://comrade.app"
                    target="_blank"
                    className="px-4 py-2 font-bold text-white bg-black rounded-lg"
                    rel="noreferrer"
                  >
                    Share to Facebook
                  </a>
                  {/* Share to twitter */}
                  <a
                    href="https://twitter.com/intent/tweet?text=I%20just%20got%20a%20certificate%20from%20Comrade%20app%20and%20I%20am%20a%20"
                    target="_blank"
                    className="px-4 py-2 font-bold text-white bg-black rounded-lg"
                    rel="noreferrer"
                  >
                    Share to Twitter
                  </a>
                  {/* Share to WhatsApp */}
                  <a
                    href="https://api.whatsapp.com/send?text=I%20just%20got%20a%20certificate%20from%20Comrade%20app%20and%20I%20am%20a%20"
                    target="_blank"
                    className="px-4 py-2 font-bold text-white bg-black rounded-lg"
                    rel="noreferrer"
                  >
                    Share to WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <h2 className="">Comrade not found</h2>
            )}
            <button>Enroll here</button>
          </section>
        )}
      </Layout>
    </div>
  );
}

// TODO: Create basic styling
// TODO: Fetch graduates from API

export default Comrade;
