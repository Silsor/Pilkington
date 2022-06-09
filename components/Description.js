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
var showing = false;
var currentSelected;
AFRAME.registerComponent('description', {
    // Allow line component to accept vertices and color.
    schema: {
        color: { default: '#333' },
        name: {default: ''},
        parent: {default: 'camera'},
        info: {}, 
        objectInfo: {}
    },

    init: function(){
    //console.log("init from " + this.el.id);

    createInfoPlane();
    console.log(this.infoPlane);

    function clickHandlerShow (event) {
        console.log("desc clicked");
        //if (showing) hideInfo(currentSelected);
        event.target.setAttribute("description", 'name: '+ event.detail.intersection.object.name)
        showInfo(this);
    }

    this.el.addEventListener('click', clickHandlerShow);

     function showInfo(object)
     {
        if (!showing)
            {
                showing = true;
                //currentSelected = object.data.objectInfo;
                console.log(object.data);
                if (object.data.objectInfo) object.data.objectInfo.object3D.visible = true; 
                if (object.el.sceneEl.is('vr-mode') || object.el.sceneEl.is('ar-mode'))
                {
                    setTimeout(function () {
                    hideInfo(object.data.objectInfo);
                    }, 5000);
                }
                else object.data.objectInfo.classList.add("clickable");
            }
     }

     function hideInfo(infoObj)
        {
            showing = false; 
            infoObj.object3D.visible = false;
            infoObj.classList.remove("clickable");
            console.log("hide1: " +currentSelected.id);
        }

        function createInfoPlane()
        {
            const geometry = new THREE.PlaneGeometry(1.5, 0.08 * match.length);
            const loader = new THREE.TextureLoader();

            const material = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: loader.load('assets/text-bg-texture.png')
            });

            let plane = new THREE.Mesh( geometry, material );

            this.entityEl = document.createElement('a-entity');
            let entityEl = this.entityEl;
            entityEl.setObject3D("desc-"+this.data.name, plane);
            entityEl.object3D.visible = showing ? false : true;
            entityEl.setAttribute('id', 'desc:' + this.data.name);
            entityEl.setAttribute('scale', '0.025, 0.025, 0.025');
            entityEl.setAttribute('material' , {'opacity': 0});
            entityEl.setAttribute('text', {
                value: text,
                color: "#000000",
                align: "center", 
                wrapCount: 26, 
                negate: false,
                font: "https://cdn.glitch.com/d13178b1-0ea9-4338-acf4-7705e127ccde%2FExo-SemiBold-msdf.json?v=1620296905072",
                shader: "msdf"
            });
            entityEl.setAttribute('overlay');
            if (!showing) entityEl.classList.add("clickable");

            material.needsUpdate = true;

            document.querySelector('[camera]').appendChild(entityEl);
            entityEl.object3D.position.set(0, 0.015, -0.05);
         
            this.data.objectInfo = entityEl;
            console.log(this.data.objectInfo);
            if (!(this.el.sceneEl.is('vr-mode') || this.el.sceneEl.is('ar-mode'))){
                this.data.objectInfo.addEventListener('click', clickHandlerHide);}

                this.infoPlane = entityEl;
        }
    },
  
    // Create or update the line geometry.
    update: function(oldData){  
        if(this.data.name != oldData.name && this.data.name != ""){
            
            //console.log("update from " + this.data.name);
            let clearPartName = this.data.name.split("_");
            let partName = clearPartName[0].replaceAll('-', ' ');
            
            // show part name
            let text = `${partName.toUpperCase()}` + "\n" + this.data.info;
            let match = text.match(/.{1,18}/g); //how many lines
            
        }

        function clickHandlerHide (event) {
            console.log(event);
            if (!(event.target.sceneEl.is('vr-mode') || event.target.sceneEl.is('ar-mode'))) hideInfo(event.target);
        }

        function hideInfo(infoObj)
        {
            showing = false; 
            infoObj.object3D.visible = false;
            infoObj.classList.remove("clickable");
            console.log("hide2: " + currentSelected.id);
        }
    }
  });