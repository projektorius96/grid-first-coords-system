export const
    ENUM =
        new Proxy(Object.create(null), {
            get(nil, key) {
                return (`${key}`);
            }
        })
    ; 

/**
* @example
* COLORS.red; // 'red'
* COLORS.green; // 'green'
* COLORS.blue; // 'blue'
*/    
let COLORS = ENUM;

export 
    const
        userConfigs = {
            stage : {
                /* id: 'stage',  */// (default)
                container: document.body,
                scale: 30,
            }
            ,
            grid : {
                id: 'grid',// (default)
                hidden: !true,
                dotted: !true,
                lineWidth: 0.1, /* <=: for colours like 'magenta', use partial value to allow reader's eye to be easier to adapt... */
                strokeStyle: COLORS.magenta,
                opacity: 1 /* values := [0..1] */
            }
        }
        ;