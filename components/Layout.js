import React from 'react';

export default (props) => {
    return (
        <div>
            <div>Header</div>
            {props.children}
            <div>Footer</div>
        </div>

    );
};