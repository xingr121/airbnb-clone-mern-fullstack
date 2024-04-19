import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Chat from "../components/chat/Chat";

function UserMessage() {
  return (
    <>
      <div>
        <Chat className="mt-4" />
      </div>
    </>
  );
}

export default UserMessage;
