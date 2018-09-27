import React, { Component } from 'react';
import styled from 'styled-components';
import ScreenBackground from '../common/ScreenBackground';
import Card from './Card'

const Wrapper = styled(ScreenBackground)`
    flex: 1;
    padding: 40px 0;
`;

class DashboardScreen extends Component {
    render(){
        return (
            <Wrapper 
                colors={['#373468', '#222437']}
                start={{x: 0.0, y: 0.25}} 
                end={{x: 0.5, y: 1.0}}
            >
                <Card />
            </Wrapper>
        )
    }
}

export default DashboardScreen;