import * as React from "react";
import { ViserInputComponent } from "./common";
import { GuiAddImageViewerMessage } from "../WebsocketMessages";

export default function ImageViewerComponent({
  id,
  hint,
  label,
  value,
  disabled,
}: GuiAddImageViewerMessage) {
  // Base64 string data, use for testing
  const data = value;

  return (
    <ViserInputComponent {...{ id, hint, label, disabled }}>
      <div>
        <h1>{label}</h1>
        <img
          src={`data:image/jepg;base64,${data}`}
          alt="Base64 encoded"
          style={{ width: "100%" }}
        />
        <hr />
      </div>
    </ViserInputComponent>
  );
}
