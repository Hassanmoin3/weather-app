import styled from '@emotion/styled';

export const Wrapper = styled.div`
  .location-item {
    padding: 16px;
    margin: 8px 0;
    background-color: #eaedf2;
    border-radius: 5px;
    color: #455a64;
    img {
      background-color: #fff;
      border-radius: 50%;
      height: 5rem; 
      padding: 0.5rem;
      transition: all 0.7s;
      transition-timing-function: cubic-bezier(1, 0.8, 0.5, 1);
    }
    .temp {
      padding-top: 1.5rem;
    }
    .city {
        color: #99abb4;
    }
  }

  .location-item:hover {
    -webkit-transform: translateY(-3px) scale(1.01);
    transform: translateY(-3px) scale(1.01);
    box-shadow: 0px 5px 12px rgba(126,142,177,0.2);
    img {
      transform: rotatey(360deg);
      transition-delay: 0;
      transition: transform 0.7s;
    }
  }
`;
