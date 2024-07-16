import "./Banners.css";

export default function Banners(props) {
  const { banners } = props;
  const mainBanner = banners[0];

  return (
    <main className="banners">
      <div className="banners__main">
        <h1 className="banners__logo">
          {mainBanner.title}
        </h1>
        <h2 className="banners__title banners__title_border">
          {mainBanner.subtitle}
        </h2>
        <div className="banners__text">
          {
            mainBanner.paragraphs.map((text, i) => 
              <p className="banners__paragraph"
                key={`text-main-${i}`}
              >
                {text}
              </p>
            )
          }
        </div>
      </div>
    </main>
  );
}