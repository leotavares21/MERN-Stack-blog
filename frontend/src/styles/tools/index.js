export const sizeWrapper = () => `
  width: 90vw;
  max-width: 1280px;
  padding-top: 120px;

  @media (max-width: 460px){
    padding-top: 80px;
  }
`;

export const sizeWrapperContainer = () => `
  width: 85vw;
  max-width: 1150px;

  @media(max-width: 900px){
    width: 95vw;
    max-width: 1280px;
  }

  @media(max-width: 600px){
    width: 98vw;
  }
`;

export const titleStyle = () => `
  color: var(--secondary);
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: normal;
  border-bottom: 2px solid var(--brand-color);
  padding-bottom: 2px;

  @media(max-width: 800px){
    font-size: 0.8rem;
  }
`;

export const categoryStyle = () => `
  color: var(--brand-color);
  border-bottom: 2px solid var(--secondary);
  text-transform: lowercase;
}
`;
