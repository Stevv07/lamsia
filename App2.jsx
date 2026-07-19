import React from 'react';

class CComp extends React.Component {
    constructor() {
        super();
        this.state = { user: 'Steven'}
    }

    changeName = () => {
        const { state } = this;
        if(state.user === "Steven") return this.setState({ user: "Kinara" });
        return this.setState({ user: "Steven" });
    }

    render() {
        return (
            <>
                <h1>User: {this.state.user}</h1>
                <button type="button" onClick={this.changeName}>
                    Change
                </button>
            </>
        )
    }
}

export default CComp;
