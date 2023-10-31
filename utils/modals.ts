export function openClearModal(setClearModal: any) {
  setClearModal(true);
}

export function closeClearModal(setClearModal: any) {
  setClearModal(false);
}

export function validateClearModal(setClearModal: any, clearRaid: any) {
  clearRaid();
  setClearModal(false);
  location.reload();
}

export function openInputModal(setInputModal: any) {
  setInputModal(true);
}

export function closeInputModal(setInputModal: any) {
  setInputModal(false);
}

export function handleSavePlayer(
  playerData: any,
  createPlayer: any,
  setInputModal: any
) {
  createPlayer(playerData);
  setInputModal(false); // Call the createPlayer function with the player data
}
