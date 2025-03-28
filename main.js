import { userConfigs, ENUMS } from './implementation/index.js';
import { HTMLCanvas } from './src/views/index.js';
import package_json from './package.json' with { type: 'json' };

/**
* @example
* EVENTS.DOMContentLoaded; // 'DOMContentLoaded'
* EVENTS.resize; // 'resize'
* EVENTS.click; // 'click'
*/  
let EVENTS = ENUMS;

document.addEventListener(EVENTS.DOMContentLoaded, ()=>{

    document.title = package_json.name;

    document.body.appendChild(
        new HTMLCanvas.ViewGroup.Stage({
            ...userConfigs.stage
        })
    );

    document.body.children.stage?.add([
        new HTMLCanvas.ViewGroup.Layer({
            ...userConfigs.grid
        })
    ])
        
    if ( HTMLCanvas.init({stage}) ) {

        window.on(EVENTS.resize, ()=>{

            HTMLCanvas
                .init({stage})
                    .on((context)=>{

                        /**
                         * > README: herein our `stage` exposes `stage.grid.GRIDCELL_DIM` - that's a central value (multiplicand) for any view (a.k.a. shape) to be multiplied by to be responsive, and also by moving such shape around grid-first coordinate system
                         */
                        let README;

                        if ( context instanceof CanvasRenderingContext2D ) {
                                                                
                                switch (context.canvas.name) {
                
                                    case stage.layers.grid.name :

                                        HTMLCanvas.Views.Grid.draw({
                                            context, 
                                            options: {
                                                ...userConfigs.grid
                                            }}
                                        );

                                    break;

                                }
                        }
                    
                    });
            
        })

        // # This allows to initiate `<canvas>` hosted "bitmap" with internal context without waiting `window.onresize` to be triggered by end-user
        window.dispatchEvent(new Event(EVENTS.resize));

    }

});