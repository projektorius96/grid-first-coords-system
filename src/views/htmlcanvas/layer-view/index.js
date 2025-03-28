import setStyling from './index.css.js';

export const layer_view = (new URL(import.meta.url)).pathname.split('/').at(-2);
customElements.define(layer_view, class extends HTMLCanvasElement {
    
    constructor({name, opacity, hidden, isSkewed, overrideContext}){

        if ( setStyling.call( super() , {opacity, hidden} ) ) {

            this.name = name || 'grid';
                this.id = this.name;
            this.isSkewed = isSkewed;
            this.stack = [];

        }

        return this;

    }

    connectedCallback(){

        const
            canvasLayer = this
            ,
            canvasLayerContext = canvasLayer.getContext('2d')
            ;
        
        Object.assign(canvasLayer, Object.freeze({

            add(viewsList = []){

                canvasLayer.stack = [
                    ...viewsList
                ];

                return true;

            }

        }));

        Object.assign(canvasLayerContext, {

            fillStroke() {

                this.fill();
                this.stroke();

                return true;
                
            }

        });   

    }

}, {extends: 'canvas'})