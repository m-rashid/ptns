import React from 'react';
import { Nav, withRR4 , NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_business } from 'react-icons-kit/md/ic_business';
import Inventory from "./Inventory";
import Login from "./Login";
import Pos from "./Pos";
import Admin from "./Admin";

const SideNav = withRR4();
//specify the base color/background of the parent container if needed
class MySideNav  extends React.Component {
    renderInventory = () => {
        return <div><Inventory/></div>;
    };

    renderPOS = () => {
        return <div>POS</div>;
    };

    render() {
        return (
            <Router>
                <div>
                <div style={{ background: '#2c3e50', color: '#FFF', width: 200 }}>
               
                    <SideNav default='pos' highlightColor='#FFF' highlightBgColor='#449D44'>
                        <Nav id=''>
                            <NavIcon><SvgIcon size={20} icon={ic_aspect_ratio}/></NavIcon>
                            <NavText> Dashboard </NavText>
                        </Nav>
                        <Nav id='pos'>
                            <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                            <NavText>POS</NavText>
                        </Nav>
                        <Nav id='admin'>
                            <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                            <NavText> Admin </NavText>
                        </Nav>
                    </SideNav>
                    </div>
                    <div >
                    <Switch>
                    <Route 
                        exact path="/admin" 
                        render={() => <Admin userData={this.props.userData} />}
                    />
                    <Route path="/pos" exact component={Pos} />
                    <Route path="/" component={Inventory} />
                    </Switch>
                    </div>
                    </div>
                </Router>         
        );
    }
}
export default MySideNav;
/*
const MySideNav = () => {
    return (
    <div style={{height: '100%', background: '#2c3e50', color: '#FFF', width: 200}}> 
        <Router>
            <SideNav highlightColor='#FFF' highlightBgColor='#449D44' defaultSelected='pos'>       
                <Nav id='inventory'>
                    <NavIcon><SvgIcon size={20} icon={ic_aspect_ratio}/></NavIcon>    
                    <NavText>Dashboard</NavText>
                </Nav>
                <Nav id='pos'>
                    <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                    <NavText>POS</NavText>
                </Nav>
                <Nav id=''>
                    <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                    <NavText> Admin </NavText>
                </Nav>
        </SideNav>
        </Router>
    </div>
    )
}
*/