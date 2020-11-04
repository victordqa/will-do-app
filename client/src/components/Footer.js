import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: rgba(96, 104, 108, 0.85);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

function Footer() {
  let d = new Date();
  let currentYear = d.getFullYear();

  return (
    <FooterContainer>
      All Rights Reserved © {currentYear} WILL DO!
    </FooterContainer>
  );
}

export default Footer;
