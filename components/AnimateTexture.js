//----------
//Animate texture using its offset
//----------

AFRAME.registerComponent('animate-texture', {
    schema: {
        speed: { type: 'number', default: 0.5 },
        animatedMaterial:{},
        clock:{}
    },

    init: function () {
        //console.log("animate-texture init");
        const el = this.el;
        this.materialList = [];
        this.clock = new THREE.Clock();
        el.addEventListener('model-loaded', (e) => {
            //console.log("model wczytany");
            this.getMaterials(el.object3D);
        });

        this.getMaterials = function getMaterials (model) 
        {
            var modelChildren = model.children;
            for (let i = 0; i<modelChildren.length; i++)
                {   
                    if (modelChildren[i].children.length > 0) 
                    {
                    this.getMaterials(modelChildren[i]);// console.log('glebiej');
                    }
                    //else console.log('stop');
                    if (modelChildren[i].material) 
                    {//console.log('mam'); 
                    this.materialList.push(modelChildren[i].material);
                    }
                    //else console.log('nie mam');
                }
        }
    },

    tick: function() {
        let delta = this.clock.getDelta();
        let speed = this.data.speed;
        this.materialList.forEach(function(item, index, array) {
            //console.log(item);
            var offset = item.map.offset;  
            offset.x -= (delta * speed);
            item.map.offset = offset;
        });
    }
});