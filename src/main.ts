import { collectTokens } from "./collectTokens";
import { UIMessage } from "./shared/types";

figma.showUI(__html__, { width: 400, height: 300 });

// Сообщения из UI
figma.ui.onmessage = async (msg: UIMessage) => {
  if (msg.type === "export-tokens") {
    await collectTokens();
  }
};
