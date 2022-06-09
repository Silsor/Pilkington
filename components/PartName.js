//----- SHOW MODEL PART NAME
/*
- Count characters
- Evaluate height of background
- Evaluate position of background
- Add bacground textures, shader or simple color
- Prepapare source name to display
- Add to scene
- Display formated name
- Remove after 2048 ms
*/

AFRAME.registerComponent('part-name', {
    // Allow line component to accept vertices and color.
    schema: {
        color: { default: '#333' },
        name: {default: ''},
        parent: {default: 'camera'}
    },
    init: function(){
    //console.log("init from part name");
    },
  
    // Create or update the line geometry.
    update: function(oldData){  
        if(this.data.name != oldData.name && this.data.name != ""){
      
            let clearPartName = this.data.name.split("_");
            let partName = clearPartName[0].replaceAll('-', ' ');
            
            // show part name
            let text = `${partName.toUpperCase()}`;
            let match = text.match(/.{1,18}/g); //how many lines
            let offsetTXT = match.length==1 ? 0: -0.1*0.25*match.length;
          
            const geometry = new THREE.PlaneGeometry(1, match.length/3);
            const loader = new THREE.TextureLoader();

            const material = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: loader.load('assets/text-bg-texture.png')
            });

            let plane = new THREE.Mesh( geometry, material );

            this.entityEl = document.createElement('a-entity');
            let entityEl = this.entityEl;
            entityEl.setObject3D("part-name", plane);
            
            entityEl.setAttribute('id', 'part-name');
            entityEl.setAttribute('scale', '0.025, 0.025, 0.025');
            entityEl.setAttribute('material' , {'opacity': 0});
            entityEl.setAttribute('text', {
                value: text,
                color: "#000000",
                align: "center", 
                wrapCount: 18, 
                negate: false,
                font: "https://cdn.glitch.com/d13178b1-0ea9-4338-acf4-7705e127ccde%2FExo-SemiBold-msdf.json?v=1620296905072",
                shader: "msdf"
            });
            entityEl.setAttribute('overlay');

            //calculate offset of texture to make decor line the same height            
           // const { material1, geometry1 } = entityEl.getObject3D('mesh');
            material.map.offset.y = (match.length==1) ? 0: -0.1*0.25*match.length;
            material.needsUpdate = true;

            document.querySelector('[camera]').appendChild(entityEl);
            //sceneEl.appendChild(entityEl);
            entityEl.addEventListener('loaded', function() {
                //console.log(entityEl.getAttribute('position'));
                //console.log(entityEl.getAttribute('rotation'));
                
              });
           
            entityEl.setAttribute('animation', {
                property: 'material.opacity',
                from: 0,
                to: 1,
                dur: 250,
                easing: 'easeOutCubic'
            });
        }
    },
  
    // Remove the line geometry.
    remove: function(){
        this.entityEl.setAttribute('animation', {
            to: 0
        });
        this.entityEl.parentNode.removeChild(this.entityEl);  
     }
  });