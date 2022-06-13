//----------------------------------------------------------------------------------
  //--- Prevent showing only part of model / adding enviroment map
  //----------------------------------------------------------------------------------
  AFRAME.registerComponent('modify-model', {
    schema: {
      envMapImg:  { type: 'map' },
      intensityVal: { type: 'number', default: 0.5}
    },
      init: function () {
        var targetCube = new THREE.WebGLCubeRenderTarget(512);
        var renderer = this.el.sceneEl.renderer;
        var sceneEl = document.querySelector('a-scene');
        // Wait for model to load.
        this.el.addEventListener('model-loaded', () => {     
          // Grab the mesh / scene.
          const obj = this.el.object3D;
          let customIntensity = this.data.intensityVal;
          let texture = new THREE.TextureLoader().load(this.data.envMapImg.currentSrc,
            function() {
              var cubeTex = targetCube.fromEquirectangularTexture(renderer, texture);
              obj.traverse(function(child) {
                  if (child.material && !child.name.match("excluded")) {
                    child.material.envMap = cubeTex.texture;
                    child.material.envMapIntensity = customIntensity;
                    child.material.needsUpdate = true;
                  }   
              });
  
              renderer.toneMapping = THREE.ACESFilmicToneMapping;
              renderer.outputEncoding = THREE.sRGBEncoding;

            });
        })
    }    
  });