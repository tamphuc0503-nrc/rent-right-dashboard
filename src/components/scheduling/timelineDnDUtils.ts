
export function setTimelineDragData(
  e: React.DragEvent,
  inspectorIdx: number,
  eventIdx: number
) {
  e.dataTransfer.setData(
    "application/json",
    JSON.stringify({
      fromInspector: inspectorIdx,
      fromEventIdx: eventIdx,
      type: "timeline",
    })
  );
  e.dataTransfer.effectAllowed = "move";
}

export function getTimelineDragEventData(e: React.DragEvent) {
  try {
    return JSON.parse(e.dataTransfer.getData("application/json"));
  } catch {
    return null;
  }
}
