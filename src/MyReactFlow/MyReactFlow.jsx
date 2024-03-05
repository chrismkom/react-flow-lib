import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
} from "react-flow-renderer";
import { nodes as initialNodes, edges as initialEdges } from "./elements";
import FlowModal from "./FlowModal";
import { Button } from "@mui/material";

function MyReactFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onConnect = useCallback(
    //useCallback memorizar a função
    (params) =>
      setEdges(
        //Atualizar o estado das arestas
        (edges) =>
          addEdge(
            // Adicionar nova aresta
            {
              ...params,
              type: ConnectionLineType.SmoothStep,
              animated: true,
              style: { stroke: "red" },
            },
            edges
          )
      ),
    [setEdges] //É recriada apenas quando setEdges é alterado
  );

  //Função usada para obter IDs aleatórios.
  const getNodeId = () => Math.random();

  //Esta função adiciona um novo card e ajusta posição em que ele aparecerá na tela.
  const onAdd = useCallback(
    (data) => {
      // Determinar a posição y do novo card.
      const newY = nodes.length * 30;

      // Criar um novo card com um ID único, dados fornecidos e posição ajustada.
      const newNode = {
        id: String(getNodeId()),
        data: { label: data },
        position: {
          x: 20,
          y: newY,
        },
      };

      // Atualizar o estado dos cards adicionando o novo card à lista existente de nós
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, nodes]
  );

  // Exibir o modal.
  function displayCustomNamedNodeModal() {
    setIsModalVisible(true);
  }
  //Cancela a ação no modal.
  function handleCancel() {
    setIsModalVisible(false);
  }
  //Criação de um novo card no modal.
  function handleCreate(data) {
    onAdd(data.nodeName);
    setIsModalVisible(false);
  }

  return (
    <div style={{ height: "100vh", margin: "10px" }}>
      <FlowModal
        isModalVisible={isModalVisible}
        onCancel={handleCancel}
        onCreate={handleCreate}
      />

      <Button
        variant="contained"
        color="success"
        onClick={displayCustomNamedNodeModal}
      >
        NOVO CARD
      </Button>

      <ReactFlow
        nodes={nodes} //Recebe uma array de objetos representando os nós.
        edges={edges} // Recebe uma array de objetos representando as arestas.
        onNodesChange={onNodesChange} //Quando houver alterações nos nós do gráfico de fluxo.
        onEdgesChange={onEdgesChange} // Quando houver alterações nas arestas do gráfico de fluxo.
        onConnect={onConnect} //Quando conectar dois cards no gráfico de fluxo.
        connectionLineType={ConnectionLineType.SmoothStep} //Define o tipo de linha. No caso "Suavizada".
        fitView //Visualização do gráfico de fluxo.
      />
    </div>
  );
}

export default MyReactFlow;
