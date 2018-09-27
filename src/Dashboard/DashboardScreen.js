import React, { Component } from 'react';
import styled from 'styled-components';
import ScreenBackground from '../Common/ScreenBackground';
import Card from './Card'
import ScreenTitle from '../Common/ScreenTitle';

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
                <ScreenTitle title="Next stuff" />
                <Card />
            </Wrapper>
        )
    }
}

export default DashboardScreen;