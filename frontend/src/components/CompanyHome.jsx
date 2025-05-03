import React from "react";
import styled, { keyframes, css } from "styled-components";

const CompanyHome = () => {
    const row1 = [
        "data:image/png;base64,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",
        "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/b2bd91d7b87b2181ca45.png",
        "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6591cdc0702b32310306.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS63iW-drx9mgYHjGG6LpPRka6417HbE2sFVg&s",
        "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3cd767dea94a85078ca4.png",
        "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/a2b3c3709ffedce2a22a.png",
      ];
    
      const row2 = [
        "data:image/png;base64,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",
        "https://i.ibb.co/TBh51x2/netflix.png",
        "https://i.ibb.co/DKS67bk/samsung.png",
        "https://i.ibb.co/nBcLnt3/spotify.png",
        "https://i.ibb.co/2q0Grhq/pngwing-com-9.png",
        "data:image/jpeg;base64,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WNLnHsAzKDzRTSg1VYtMNoUTmj/yPjYfsudf2JX6qsWhbtGic4f+N8bz9lrrn1IIWi9KmnfE8skY9jhva9pa4doOYXmgL3oKOSolZDCwvke4NY0byTuC84YnPcGMa5znGzWtBJJO4ADMlaN1Patvg5vjtW0eNPbZrN/IsIzH654ngMum4SzV9omzCKBlO2zpDz5n/WkO/wBEbh1BSVEQEREBERAREQEREBERBGdZfzJW/sj/AHVkRa71l/Mlb+yP91ZEQbdg8hv6o/kvRecHkN/VH8l6ICIiAiIgzDr5+fZPMR+4pn4NP4Kt85H7r1DNfPz9J5iP3FM/Bp/BVvnI/degutERAREQEREBERAREQEREBERAREQCq81uaMUk1HJVSU8Zma3KQXa70i0ja77oiCgtBsNiqq1sU7NphIuLubx6WkFap0e0dpaGMClpoortFy1vOOX0nnnHvKIg66FEQcbSPRykroyKqmils02Lm84ZfReOcO4rM2lmCwU9aYoo9lm3a2085dpJKIgvrVpopR01Myohpo2yubnIbudnvs5xJb3WU4REBERAREQEREBERAREQEREHJ0rpmy0E8cgu10Ja4XIuDvFxmqYdoRQW/F/wD9Jv8AciIL7jHNHZ/ov0iICIiAiIgqfWDoxS1WIvlmh2nljRfbkGQaLZNcAu3qtwWCjbOKePYDnNLuc917B1vKJtvREE9REQEREBERAREQEREBERAREQf/2Q==",
      ];

  return (
    <AppContainer>
      <Wrapper>
        <Text>With Great Outcomes.</Text>
        <Note>Our customers have gotten offers from awesome companies.</Note>
        <Marquee>
          <MarqueeGroup>
            {row1.map((el, index) => (
              <ImageGroup key={index}>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup>
          <MarqueeGroup>
            {row1.map((el, index) => (
              <ImageGroup key={index}>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup>
        </Marquee>
        <Marquee>
          <MarqueeGroup2>
            {row2.map((el, index) => (
              <ImageGroup key={index}>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup2>
          <MarqueeGroup2>
            {row2.map((el, index) => (
              <ImageGroup key={index}>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup2>
        </Marquee>
      </Wrapper>
    </AppContainer>
  );
};

export default CompanyHome;

const AppContainer = styled.div`
  width: 100vw;
  margin:100px 0px;
  color: #000000;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Ensures no overflow outside viewport */
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.div`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #02203c;
`;

const Note = styled.div`
  font-size: 18px;
  font-weight: 200;
  margin-bottom: 40px;
  color: #7c8e9a;
`;

const Marquee = styled.div`
  display: flex;
  width: 100%; /* Adjusted to fit the container */
  overflow: hidden;
  user-select: none;
  mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 10%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
  );
`;

const scrollX = keyframes`
  from {
    transform: translateX(0); /* Corrected to ensure smooth scrolling */
  }
  to {
    transform: translateX(-100%);
  }
`;

const common = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
  width: 100%;
  animation: ${scrollX} 30s linear infinite;
`;

const MarqueeGroup = styled.div`
  ${common}
`;

const MarqueeGroup2 = styled.div`
  ${common}
  animation-direction: reverse;
  animation-delay: -3s;
`;

const ImageGroup = styled.div`
  display: grid;
  place-items: center;
  width: clamp(10rem, 1rem + 40vmin, 30rem);
  padding: calc(clamp(10rem, 1rem + 30vmin, 30rem) / 10);

  @media (max-width: 1000px) {
    width: clamp(8rem, 1rem + 30vmin, 25rem); /* Adjust width for 1000px screens */
    padding: 8px; /* Adjust padding */
  }

  @media (max-width: 768px) {
    width: clamp(7rem, 1rem + 20vmin, 20rem); /* Smaller for mobile */
    padding: 5px; /* Reduced padding */
  }
`;

const Image = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  aspect-ratio: 16/9;
  padding: 5px 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  @media (max-width: 1000px) {
    padding: 15px; /* Slightly smaller padding for medium screens */
  }

  @media (max-width: 768px) {
    padding: 10px; /* Reduced padding for mobile */
  }
`;