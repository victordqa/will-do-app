import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 99.9vw;
  background-color: rgba(61, 66, 69, 0.85);
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
