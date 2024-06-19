import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import FrutaComponent from "../Fruta/frutaComponent";
import "./cardComponent.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Cards({ recipe, type }) {
  const [show, setShow] = useState(false);
  const [showFruit, setShowFruit] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleCloseFruit = () => setShowFruit(false);
  const handleShowFruit = () => setShowFruit(true);

  const toggleLike = () => setLiked(!liked);

  const renderRecipeCard = () => (
    <div className="recipe-card">
      <Card className="custom-card">
        <div className="row g-0">
          <div className="col-md-4">
            <Card.Img
              variant="top"
              src={`data:image/jpeg;base64,${recipe.imagem.data}`}
              className="card-img-left"
            />
          </div>
          <div className="col-md-8">
            <Card.Body>
              <Card.Title className="card-title">{recipe.nome}</Card.Title>
              <div className="recipe-info">
                <div>
                  <strong>{recipe.calorias}</strong>
                  <p>Calorias</p>
                </div>
                <div>
                  <strong>{recipe.porcoes}</strong>
                  <p>Porções</p>
                </div>
                <div>
                  <strong>{recipe.tipo}</strong>
                  <p>Tipo</p>
                </div>
              </div>
              <div className="button-container">
                <Button variant="custom" onClick={handleShow}>
                  Ver Receita e Nutrientes
                </Button>
              </div>
              <div className="like-container" onClick={toggleLike}>
                <i className={`fas ${liked ? 'fa-heart like-icon' : 'fa-heart unliked-icon'}`}></i>
              </div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Detalhes da Receita</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5>Ingredientes:</h5>
                  <ul>
                    {recipe.ingredientes.map((ingrediente, index) => (
                      <li key={index}>{ingrediente.nome} - {ingrediente.quantidade}</li>
                    ))}
                  </ul>
                  <h5>Modo de Preparo:</h5>
                  <ol>
                    {recipe.modo_preparo.map((passo, index) => (
                      <li key={index}>{passo}</li>
                    ))}
                  </ol>
                  <h5>Nutrientes:</h5>
                  <p>Calorias: {recipe.calorias}</p>
                  {/* Adicione mais informações nutricionais aqui se necessário */}
                </Modal.Body>
              </Modal>
            </Card.Body>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderHighlightCard = () => (
    <div className="highlight-card">
      <Card className="bg-none custom-highlight-card">
        <Card.Img src={require("../Assets/laranja.jpg")} />
        <Card.Body className="card-overlay">
          <Card.Title>Fruta do Dia</Card.Title>
          <Card.Text>-</Card.Text>
          <Button
            variant="custom"
            className="highlight-button"
            onClick={handleShowFruit}
          >
            Ver Benefícios
          </Button>
          <Modal show={showFruit} onHide={handleCloseFruit}>
            <Modal.Header closeButton>
              <Modal.Title>Detalhes da Fruta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FrutaComponent />
            </Modal.Body>
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <div className="card-container">
      {type === "recipe" ? (
        renderRecipeCard()
      ) : (
        renderHighlightCard()
      )}
    </div>
  );
}

export default Cards;