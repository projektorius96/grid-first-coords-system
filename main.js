import { userConfigs, ENUM } from './implementation/index.js';
import { HTMLCanvas } from './src/views/index.js';
import package_json from './package.json' with { type: 'json' };

/**
* @example
* UI_EVENTS.DOMContentLoaded; // 'DOMContentLoaded'
* UI_EVENTS.resize; // 'resize'
* UI_EVENTS.click; // 'click'
*/  
const
    UI_EVENTS = ENUM
    ,
    SHAPE_TYPE = ENUM
    ,
    COLORS = ENUM
    ;

document.addEventListener(UI_EVENTS.DOMContentLoaded, ()=>{

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

        window.on(UI_EVENTS.resize, ()=>{

            HTMLCanvas
                .init({stage})
                    .on((context)=>{

                        // DEV_NOTE # because we mix HTML Canvas (CanvasRenderingContext2D) together with XML SVG, we must do the following check:..
                        if ( context instanceof CanvasRenderingContext2D ) {
                                                                
                                switch (context.canvas.id) {
                
                                    case SHAPE_TYPE.grid :

                                        HTMLCanvas.Views.Grid.draw({
                                            context, 
                                            options: {
                                                ...userConfigs.grid,
                                                /**
                                                 * @override
                                                 */
                                                strokeStyle: COLORS.blue
                                            }}
                                        );

                                    break;

                                }
                        }
                    
                    });
            
        })

        // # This allows to initiate `<canvas>` hosted "bitmap" with internal context without waiting `window.onresize` to be triggered by end-user
        window.dispatchEvent(new Event(UI_EVENTS.resize));

    }

});