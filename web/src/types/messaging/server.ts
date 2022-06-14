import { StatusBarItemOptions } from "../../modules/statusbar_item";
import { StateData } from "../../utils/state_data";
import { BaseMessage } from "../../services/clients/client.types";

export interface ShowPopup extends BaseMessage {
  popup_id: string;
  title: string;
  content: string;
}

export interface ShowStatusBarItem extends BaseMessage, StatusBarItemOptions {}

export interface HideStatusBarItem extends BaseMessage {
  id: string;
}

export interface StateUpdated {
  state_data: StateData;
}
