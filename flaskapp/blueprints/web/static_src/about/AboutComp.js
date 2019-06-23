import React from 'react';

class AboutComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...this.props};
    }
    render () {
        return <div className="card">
            <div className="card-header">
                <h5>About</h5>
            </div>
            <div className="card-body">
                I am web developer. I had planned these few personal pages
                for implement and checking some of my ideas.
                Sometimes i write here short notes about my work and development.
            </div>
        </div>
    }
}
export default AboutComp
