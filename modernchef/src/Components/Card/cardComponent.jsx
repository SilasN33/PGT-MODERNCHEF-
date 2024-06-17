import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import RecipeComponent from "../Recipe/recipeComponent";
import FrutaComponent from "../Fruta/frutaComponent";
import "./cardComponent.css";

function Cards({ recipe, type }) {
  const [show, setShow] = useState(false);
  const [showFruit, setShowFruit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleCloseFruit = () => setShowFruit(false);
  const handleShowFruit = () => setShowFruit(true);

  const renderRecipeCard = () => (
    <div className="recipe-card">
      <Card className="custom-card">
        <div className="row g-0">
          <div className="col-md-4">
            <Card.Img
              variant="top"
              src={require("../Assets/imagem_fundo_login.png")}
              className="card-img-left"
            />
          </div>
          <div className="col-md-8">
            <Card.Body>
              <Card.Title>{recipe.title}</Card.Title>
              <Card.Text>{recipe.description}</Card.Text>
              <div className="card-info">
                <Card.Text>{recipe.serves}</Card.Text>
                <Card.Text>{recipe.time}</Card.Text>
              </div>
              <Button variant="custom" onClick={handleShow}>
                Ver Receita e Nutrientes
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Detalhes da Receita</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <RecipeComponent />
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
        <>
          {renderRecipeCard()}
          {renderRecipeCard()}
          {renderRecipeCard()}
        </>
      ) : (
        renderHighlightCard()
      )}
    </div>
  );
}

export default Cards;
