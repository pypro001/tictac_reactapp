import React from 'react';

import  './Modal.css';
import Auxilary from '../../../hoc/auxilary.js';
import Backdrop from '../Backdrop/Backdrop.js';

const modal = ( props ) => (
    <Auxilary>
      <Backdrop backdropShow={props.backdropShow}  />
        <div
            className="Modal"
            style={{
                    transform: props.backdropShow ? 'translateY(0)' : 'translateY(-100vh)',
                     opacity: props.backdropShow ? '1' : '0'
                 }}
           >
            {props.children}
        </div>
    </Auxilary>
);

export default modal;