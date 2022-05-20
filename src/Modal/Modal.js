import React from "react";
import './Modal.css'

 export default class Modal extends React.Component {
     state = {
         isOpen: false
     }
     render() {
         return(
             <React.Fragment>
                 <button onClick={() => this.setState({isOpen: true})}>
                    {/* Открываем модальное окно */}
                     Open modal</button>

                 {this.state.isOpen && (
                 <div className="modal">
                    <div className="modal-body">
                        <h1>Modal title</h1>
                        <p>Hi!</p>
                        <button onClick={() => this.setState({isOpen: false})}>
                    {/* Закрываем модальное окно */}

                        Close modal
                        </button>
                    </div>
                 </div>
                 )}
             </React.Fragment>
         )
     }
 }