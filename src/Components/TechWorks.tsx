import { useEffect } from "react";
import "./CSS/TechWorks.css";

const TechWorks = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container12">
      <h1 style={{ textAlign: "center" }}>
        მიმდინარეობს ტექნიკური სამუშაოები...
      </h1>
      <div className="subcontainer">
        <div className="techCircle1">
          <div className="techCircle2"></div>
        </div>
      </div>
    </div>
  );
};

export default TechWorks;
