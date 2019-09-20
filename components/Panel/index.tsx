import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faStar, faCodeBranch } from "@fortawesome/free-solid-svg-icons"
import { Owner } from "../../interfaces/index"
import styled from "../../interfaces/styled-theme"

type Props = {
  url: string
  avatarUrl: string
  fullName: string
  description: string
  homepage: string
  owner: Owner
  star: number
  forksCount: number
  watchersCount: number
  topics: string[]
  language: string
  updatedAt: string
}

type UserImageProps = {
  url: string
}

const PanelFrame = styled.div`
  width: auto;
  height: auto;
  padding: 8px;
  box-shadow: 10px 10px 10px 10px rgba(238, 238, 238, 1);
  display: flex;
`
const ImageArea = styled.div`
  margin: 16px 12px;
`
const OwnerImage = styled.img`
  border-radius: 4px;
  width: 72px;
  height: 72px;
  background-image: url(${(props: UserImageProps) => props.url});
  object-fit: cover;
  object-position: 100% 100%;
`

const InfoArea = styled.div`
  margin: 8px;
  padding: 4px;
`
const RepositoryName = styled.div`
  margin: 4px 0px;
  word-wrap: break-word;
  font-weight: bold;
  font-size: 110%;
`
const AnchorLink = styled.a`
  text-decoration: none;
  color: #337AB7;
  :hover {
    color: #8C9EFF;
  }
`

const Description = styled.div`
  　　word-wrap: break-word;
`
const Homepage = styled.div`
  margin: 2px;
`
const Indexes = styled.div`
  margin: 2px;
  padding: 2px;
  display: flex;
`
const IconAndNumber = styled.div`
  margin: 4px;
`

const CounterSpan = styled.span`
  margin-left: 4px;
`
const TopicsArea = styled.div`
  margin: 2px;
  padding: 2px;
  display: flex;
  flex-wrap: wrap;
`
const TopicTag = styled.div`
  border-radius: 8px;
  margin: 2px;
  padding: 4px;
  font-size: 80%;
  background-color: #eeeeee;
`

const Panel: React.FC<Props> = props => {
  const makeTopics = (topics: string[]) => {
    return topics.map((v: string, i: number) => (
      <TopicTag key={i}>{v}</TopicTag>
    ))
  }

  return (
    <PanelFrame>
      <ImageArea>
        <OwnerImage url={props.owner.avatarUrl} />
      </ImageArea>
      <InfoArea>
        <RepositoryName>
          <AnchorLink href={props.url} target={"_blank"}>
            {props.fullName}
          </AnchorLink>
        </RepositoryName>
        {props.description != "" ? (
          <Description>{props.description}</Description>
        ) : (
          "No description"
        )}
        {props.homepage != "" ? (
          <Homepage>
            <AnchorLink href={props.homepage} target={"_blank"}>
              {props.homepage}
            </AnchorLink>
          </Homepage>
        ) : (
          <></>
        )}
        <Indexes>
          <IconAndNumber>
            <FontAwesomeIcon icon={faEye} size={"sm"} />
            <CounterSpan>{props.watchersCount}</CounterSpan>
          </IconAndNumber>
          <IconAndNumber>
            <FontAwesomeIcon icon={faStar} size={"sm"} />
            <CounterSpan>{props.star}</CounterSpan>
          </IconAndNumber>
          <IconAndNumber>
            <FontAwesomeIcon icon={faCodeBranch} size={"sm"} />
            <CounterSpan>{props.forksCount}</CounterSpan>
          </IconAndNumber>
        </Indexes>
        <TopicsArea>{makeTopics(props.topics)}</TopicsArea>
      </InfoArea>
    </PanelFrame>
  )
}

export default Panel