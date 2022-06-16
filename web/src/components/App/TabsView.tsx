import { SplitPane } from "react-multi-split-pane";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { openedViewsAndTabs } from "../../utils/state";
import TabsPanel from "../Tabs/TabPanel";

const TabsContainer = styled.div`
  overflow: hidden;
  background: green;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.elements.tab.container.background};
  min-height: 100%;
  width: 100%;
  & .row {
    display: flex;
    flex-direction: row;
  }
  & .column {
    display: flex;
    flex-direction: column;
  }
`;

/*
 * Container that displays all the opened tabs
 */
function TabsView() {
  const tabsPanels = useRecoilValue(openedViewsAndTabs);

  return (
    <TabsContainer>
      <SplitPane
        split="vertical"
        minSize={20}
        className="row"
        defaultSizes={new Array(tabsPanels.length).fill(200)}
      >
        {tabsPanels.map((columns, r) => {
          return (
            <SplitPane
              split="horizontal"
              minSize={20}
              defaultSizes={new Array(columns.length).fill(200)}
              className="colunmn"
              key={`${r}_row`}
            >
              {columns.map((viewPanel, c) => {
                return (
                  <TabsPanel
                    key={`${r}${c}_tabs_panel`}
                    panel={viewPanel}
                    row={r}
                    col={c}
                  />
                );
              })}
            </SplitPane>
          );
        })}
      </SplitPane>
    </TabsContainer>
  );
}

export default TabsView;
