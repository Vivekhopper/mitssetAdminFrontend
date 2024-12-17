import barChartImage from "/assets/images/barchart2.jpg";
import piechart from "/assets/images/pieChart.jpg";
import linechart from "/assets/images/linechart.jpg";
import tableImage from "/assets/images/table.jpg";
import { useNavigate } from "react-router-dom";

const images = [
  { src: barChartImage, alt: "Bar Chart", path: "/bargraph" },
  { src: piechart, alt: "Pie Chart", path: "/piechart" },
  { src: linechart, alt: "Line Chart", path: "/linechart" },
  { src: tableImage, alt: "Table", path: "/results" },
];

function DisplayComponent() {
  const navigate = useNavigate();

  return (
    <>
      <div className="graphsSection">
        {images.map((image, index) => (
          <div key={index} onClick={() => navigate(image.path)}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </>
  );
}

export default DisplayComponent;
