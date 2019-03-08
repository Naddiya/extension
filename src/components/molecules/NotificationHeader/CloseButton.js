import React from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import CloseIcon from '../../atoms/icons/Close';

export default styled(Button).attrs({ children: <CloseIcon /> })`
   margin-left: auto;
   width: 13px;
   height: 13px;
   fill: ${props => props.theme.activeColor};
`;
