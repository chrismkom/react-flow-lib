import React from "react";
import { Button, Modal, TextField } from "@mui/material";

function FlowModal({ isModalVisible, onCancel, onCreate }) {
  const [nodeName, setNodeName] = React.useState("");

  //Responsável por verificar se a variável nodeName não está vazia.
  const handleCreate = () => {
    if (nodeName.trim() !== "") {
      onCreate({ nodeName });
      setNodeName("");
    }
  };

  return (
    <Modal open={isModalVisible} onClose={onCancel}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: 10,
            width: 300,
            borderRadius: 10,
          }}
        >
          <h2 style={{ marginBottom: 0, fontWeight: "bold" }}>Adicionar</h2>
          <TextField
            label="Nome"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <div style={{ marginTop: 10, textAlign: "right" }}>
            <Button
              onClick={onCancel}
              variant="outlined"
              color="error"
              style={{ marginRight: 5 }}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleCreate}>
              Criar
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default FlowModal;
