import { useState } from "react";
import { Terminal } from "xterm";
import { Tab } from "../../modules/tab";
import { clientState } from "../../state/state";
import "xterm/css/xterm.css";
import { FitAddon } from "xterm-addon-fit";
import { getRecoil } from "recoil-nexus";
import { TerminalTabContainer } from "../../components/Terminal/TerminalContainer";

export interface TerminalData {
  terminal?: Terminal;
  id?: string;
  fit?: FitAddon;
}

class TerminalTab extends Tab {
  public data: TerminalData = {};

  constructor() {
    super("Terminal");
  }

  public container({ tab }: { tab: Tab }) {
    const terminalTab = tab as unknown as TerminalTab;
    const [data, setData] = useState<TerminalData>(terminalTab.data);
    return (
      <TerminalTabContainer
        {...data}
        saveTerminal={(
          data: TerminalData,
        ) => {
          terminalTab.data = data;
          setData(data);
        }}
      />
    );
  }

  public close(): void {
    if (this.data.id) {
      getRecoil(clientState).close_terminal_shell(this.data.id);
    }
  }
}

export default TerminalTab;
