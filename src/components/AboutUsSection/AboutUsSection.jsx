import "./AboutUsSection.css";
import { useEffect } from "react";

export default function AboutUsSection() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "src/components/AboutUsSection/parallaxEffect.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return (
    <>
      <h1>Аренда дома Пермь</h1>
      <p>
        В домике имеется небольшая кухня со всем необходимым, уютная гостиная с
        двумя раскладными диванами и двуспальная кровать на антресоли. Но самое
        главное - у вас будет своя индивидуальная территория, где вы будете
        абсолютно одни! А еще, в шаговой доступности от дома находится
        термальный комплекс «Акватория», где вы сможете посетить сауны, бани и
        теплый бассейн.
      </p>

      <section className="main">
        <div className="wrap wrap--1">
          <div className="container container--1">
            <p>Атмосфера</p>
          </div>
        </div>

        <div className="wrap wrap--2">
          <div className="container container--2">
            <p>Уют</p>
          </div>
        </div>

        <div className="wrap wrap--3">
          <div className="container container--3">
            <p>Спокойствие</p>
          </div>
        </div>
      </section>
    </>
  );
}
