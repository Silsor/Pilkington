//----------------------------------------------------------------------------------
  //--- Prevent showing only part of model / adding enviroment map
  //----------------------------------------------------------------------------------
  AFRAME.registerComponent('flash', {
    
      init: function () {
        this.material = null;
        this.el.addEventListener('model-loaded', () => {     
          // Grab the mesh / scene.
          const obj = this.el.object3D;
          let temp = this;
              obj.traverse(function(child) {
                  if (child.material && !child.name.match("excluded")) {
                    temp.material = (child.material);
                  }   
              });
        });

        this.el.addEventListener('mouseenter', ()=>{
        this.material.opacity = 0.25;
        this.material.color = new THREE.Color(0,1,1);
        this.material.transparent = false;
        this.material.needsUpdate = true;
        });

        this.el.addEventListener('mouseleave', ()=>{
        this.material.transparent = true;
        this.material.needsUpdate = true;
        });
    }    
  });