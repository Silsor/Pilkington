//----------------------------------------------------------------------------------
//------- ANIMATOR - CONTROL MODEL ANIMATIONS
//----------------------------------------------------------------------------------
  
  AFRAME.registerComponent('animator', {
    schema: {
    speed: {default: 1}
    },

    init: function () {
        
        this.clock = new THREE.Clock();
        this.el.addEventListener('model-loaded', () => 
        {   
            this.model = this.el.getObject3D('mesh').children[0];
        });
    },

    tick: function () {
        let delta = this.clock.getDelta();
        if (this.model) this.model.rotation.z += this.data.speed * delta
    }

  });
