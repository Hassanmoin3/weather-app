import styled from '@emotion/styled';

export const Wrapper = styled.div`
  .weather-card {
    padding: 10px;
    margin: 8px 0;
    background-color: #eaedf2;
    border-radius: 5px;
    color: #455a64;
    box-shadow: none;
    img {
        height: 3rem;
        width: 3rem;
    }
  }

  .flex-display {
    display: flex;
    align-items: center;
  }

  .icon-style {
    margin-right: 8px;
    margin-top: 1px;
    margin-left: 10px;
  }

  .loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
`;
