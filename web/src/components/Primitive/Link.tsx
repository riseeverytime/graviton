import { PropsWithChildren } from "react";
import { isTauri } from "../../services/commands";
import styled from "styled-components";
import { SecondaryButton } from "./Button";

const StyledAnchor = styled.a`
  color: ${({ theme }) => theme.elements.link.color};
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.elements.link.hover.color};
  }
`;

function openUrl(url: string) {
  import("@tauri-apps/api").then(({ shell }) => {
    shell.open(url);
  });
}

interface LinkOptions {
  href: string;
  label: string;
  onClick?: () => void;
}

function LinkButton(props: PropsWithChildren<LinkOptions>) {
  return (
    <StyledAnchor {...props}>
      <SecondaryButton>{props.label}</SecondaryButton>
    </StyledAnchor>
  );
}

/*
 * Wrapper for <a>
 * When it runs in Tauri it will use `shell.open` instead of the default behavior
 */
export default function Link(props: LinkOptions) {
  if (isTauri) {
    const href = props.href;
    props = { ...props, href: null } as any;
    return (
      <LinkButton
        {...props}
        onClick={() => {
          openUrl(href);
        }}
      />
    );
  }
  return <LinkButton {...props} />;
}
