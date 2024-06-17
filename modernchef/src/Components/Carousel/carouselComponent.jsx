import Carousel from "react-bootstrap/Carousel";
import "./carouselComponent.css";

function CarouselCopm() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <div className="container">
          <img
            src="https://midianinja.org/wp-content/uploads/2022/09/alimentacao-escolar-merenda-1200x630.jpg"
            alt="Imagem"
          />
        </div>
        <Carousel.Caption>
          <h3>Prato 1</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="container">
          <img
            src="https://opopularpr.com.br/wp-content/uploads/2023/04/Porks-Araucaria-participa-do-1o-Festival-Nacional-de-Comida-de-Boteco-promovido-pela-rede-1200x630.jpg.webp"
            alt="Imagem"
          />
        </div>

        <Carousel.Caption>
          <h3>Prato 2</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="container">
          <img
            src="https://www.unipar.br/media/images/Fbel_alimentacao_1.2e16d0ba.fill-1200x630-c100.jpg"
            alt="Imagem"
          />
        </div>
        <Carousel.Caption>
          <h3>Prato 3</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselCopm;
