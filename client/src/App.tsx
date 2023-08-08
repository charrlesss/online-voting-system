import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql";
import InitializeComponent from "./Component/InitializeComponent";
import "./style/App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <InitializeComponent />
    </ApolloProvider>
  );
}

export default App;
