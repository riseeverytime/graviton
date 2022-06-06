import React from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { panelsState } from "../../utils/state";
import IconButton from "../SidePanel/PanelButton";

const PanelsContainer = styled.div`
  display: flex;
  min-height: 100%;
  background: ${(props) => props.theme.tones.dark1};
  & > .sidebar {
    background: ${(props) => props.theme.tones.dark1};
    & svg {
      --sidebarButtonFill: ${({ theme }) => theme.elements.sidebar.button.fill};
    }
  }
  & > .sidepanel {
    border-left: 1px solid
    ${({ theme }) => theme.elements.sidebar.border.color};
    border-top: 1px solid
      ${({ theme }) => theme.elements.sidepanel.border.color};
    border-bottom: 1px solid
      ${({ theme }) => theme.elements.sidepanel.border.color};
    background: ${(props) => props.theme.tones.dark2};
    width: 100%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`;

/*
 * Sidebar that contains all the loaded panels
 */
function PanelsView() {
  const loadedPanels = useRecoilValue(panelsState);
  const [displayedPanelName, setDisplayedPanelName] = useState("Explorer");

  return (
    <PanelsContainer>
      <div className="sidebar">
        {loadedPanels.map(({ panel }) => {
          const isSelected = panel.name === displayedPanelName;
          const PanelIcon = panel.icon;
          return (
            <IconButton
              key={panel.name}
              onClick={() => setDisplayedPanelName(panel.name)}
              selected={isSelected}
            >
              <PanelIcon />
            </IconButton>
          );
        })}
      </div>
      <div className="sidepanel">
        {loadedPanels.map(({ panel }) => {
          if (panel.name === displayedPanelName) {
            const PanelContainer = panel.container;
            return <PanelContainer key={panel.name} />;
          }
        })}
      </div>
    </PanelsContainer>
  );
}

export default PanelsView;
