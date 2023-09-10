import styled, { css, keyframes } from 'styled-components';

export const StyledForm = styled.form`
    margin: 0 auto;
    width: 100%;
    min-width: 300px;
    max-width: 540px;
    padding: 1.3rem;
    display: flex;
    flex-direction: column;
    position: relative;
    gap: .2em;
`;

export const StyledInput = styled.input`
    max-width: 100%;
    padding: .7em 1em;
    background: #f9f9fa;
    color: #212529;
    margin-bottom: .5em;
    border-radius: 4px;
    outline: 0;
    border: 1px solid rgba(245, 245, 245, 0.7);
    font-size: 14px;
    transition: all 0.3s ease-out;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
    &:focus,
    &:hover {
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.1);
    }
`;

const jump = keyframes`
    from {
        transform: translateY(0)
    }
    to{
        transform: translateY(-3px)
    }
`;

export const buttonBaseStyles = css`
    max-width: 100%;
    padding: .7em;
    color: rgb(253, 249, 243);
    font-size: 1.05em;
    font-weight: 600;
    background: #0d6efd;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-out;
    &:hover {
      animation: ${jump} 0.2s ease-out forwards;
    }
    &:disabled {
      background: gray;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    };
`;

const colors = {
  primary: '#1C76E2',
  warning: '#E10D30',
  default: '#155EC2',
  success: '#198754',
  info: '#AE1DC5',
}

const hoverColors = {
  primary: '#15447D',
  warning: '#900B21',
  default: '#0C3875',
  success: '#157347',
  info: '#5B0D68',
}

export const StyledButton = styled.button`
  ${buttonBaseStyles};
  background-color: ${({ type }) => colors[type]};
  color: #ffffff;
  border: none;
  &:hover {
    background-color: ${({ type }) => hoverColors[type]};
  }
`;

export const StyledTitle = styled.h2`
    font-weight: bold;
    color: #2a2a29;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-bottom: 20px;
`;

export const StyledWarning = styled.span`
    font-size: 0.9em;
    color: #f03d4e;
`

export const StyledFooter = styled.div`
    margin: 1em 0em;
    text-align: center;
`

export const StyledTable = styled.table`
  border: 1px #a39485 solid;
  font-size: .9em;
  box-shadow: 0 2px 5px rgba(0,0,0,.25);
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
  table-layout: fixed;
  caption-side: top;
  border-collapse: collapse;
  word-wrap: break-word;

th {
  text-align: center;
  font-size: 1.1em;
}
  
thead {
  font-weight: bold;
  color: #fff;
  background: #73685d;
}
  
 td, th {
  padding: .75em .5em;
  vertical-align: middle;
}
  
 td {
  border-bottom: 1px solid rgba(0,0,0,.1);
  background: #fff;
  text-align: center;
  button {
    margin-right: 0.25em;
    word-break: break-all;
    display: inline-block;
    padding: 0.4em 0.6em;
    
    @media (max-width: 480px) {
      margin-right: 0.1em;
      padding: 0.4em;
      font-size: 0.9em;
    }
  }
}

a {
  color: #73685d;
}

`;

export const StyledPagination = styled.div`
    display: flex;
    justify-content: center;
    margin: 5px;
    button {
      background: #73685d;
      &:disabled {
        opacity: 0.7;
      }
      padding: 0.4em 0.6em;
    }
`;

export const StyledSpinner = styled.svg`
  animation: rotate 1s linear infinite;
  width: 2em;
  height: 2em;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export const StyledTagsInput = styled.div`
    border: 1px solid rgba(245, 245, 245, 0.7);
    background: #f9f9fa;
    padding: .5em;
    border-radius: 3px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: .5em;

  .tag-item {
    background-color: rgb(218, 216, 216);
    display: inline-block;
    padding: .5em .75em;
    border-radius: 20px;
  }

  .tag-item .close {
      height: 1em;
      width: 1em;
      background-color: rgb(48, 48, 48);
      color: #fff;
      border-radius: 50%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin-left: .5em;
      font-size: 1em;
      cursor: pointer;
  }

  .tags-input {
      flex-grow: 1;
      padding: .6em 0;
      border: none;
      outline: none;
      font-size: .9em;
  }
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  height: 50%;
  border: none;
  resize: none;
  padding: .7em;
  background: #f9f9fa;
  color: #212529;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  &:focus,
  &:hover {
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;