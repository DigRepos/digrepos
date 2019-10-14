import * as React from "react"
import Head from "next/head"
import styled from "../interfaces/styled-theme"

type Props = {
  title?: string
}

const HeaderWrapper = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 40px;
  padding: 24px;
  border-bottom: solid;
  border-width: 0.8px;
  border-color: #FFFFFF #FFFFFF #EEEEEE #FFFFFF;
  background-color: #FFFFFF;
  z-index: 100;
`

const NavIcon = styled.div`
  padding: 4px;
  margin-left: 10%;
  font-size: 1.4rem;
  font-family: "Raleway", sans-serif;
`
const Body = styled.div`
  margin-top: 96px;
  display: flex;
  justify-content: center;
`
const BodyContent = styled.div`
  padding: 8px;
  width: 80%;
`

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 24px;
`

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "DigRepos"
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="https://fonts.googleapis.com/css?family=Raleway:300&display=swap"
        rel="stylesheet"
      ></link>
      <link href="https://fonts.googleapis.com/css?family=Roboto:300&display=swap" rel="stylesheet"></link>
    </Head>
    <HeaderWrapper>
      <NavIcon>DigRepos</NavIcon>
    </HeaderWrapper>
    <Body>
      <BodyContent>{children}</BodyContent>
    </Body>
    <Footer>
    </Footer>
  </div>
)

export default Layout
