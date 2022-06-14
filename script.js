//----------------------------------------------------------------------------------
//--- Hide/show entity in different mode
//----------------------------------------------------------------------------------
AFRAME.registerComponent("hide-in-ar-mode", {
  // Set this object invisible while in AR mode.
    init: function() {
      this.el.sceneEl.addEventListener("enter-vr", ev => {
        this.wasVisible = this.el.getAttribute("visible");
        if (this.el.sceneEl.is("ar-mode")) {
          this.el.setAttribute("visible", false);
        }
      });
      
      this.el.sceneEl.addEventListener("exit-vr", ev => {
                if (this.wasVisible) this.el.setAttribute("visible", true);
              });
    }
  });
  
  //----------------------------------------------------------------------------------
  //--- 
  //----------------------------------------------------------------------------------
  AFRAME.registerComponent("ar-shadows", {
  // Swap an object's material to a transparent shadows-only material while
  // in AR mode. Intended for use with a ground plane. The object is also
  // set visible while in AR mode, this is useful if it's hidden in other
  // modes due to them using a 3D environment.
    schema: {
      opacity: { default: 0.3 }
    },
    init: function() {
      this.el.sceneEl.addEventListener("enter-vr", ev => {
        this.wasVisible = this.el.getAttribute("visible");
        if (this.el.sceneEl.is("ar-mode")) {
          this.savedMaterial = this.el.object3D.children[0].material;
          this.el.object3D.children[0].material = new THREE.ShadowMaterial();
          this.el.object3D.children[0].material.opacity = this.data.opacity;
          this.el.setAttribute("visible", true);
        }
      });
      
      this.el.sceneEl.addEventListener("exit-vr", ev => {
        if (this.savedMaterial) {
          this.el.object3D.children[0].material = this.savedMaterial;
          this.savedMaterial = null;
        }
        
        if (!this.wasVisible) this.el.setAttribute("visible", false);
      });
    }
  });
  //----------------------------------------------------------------------------------
  //--- Setup scene elements in AR/VR mode
  //----------------------------------------------------------------------------------
  AFRAME.registerComponent('ar-mode-setup', {
  // Set camera position while in AR mode.
    init: function (){
      let model = document.getElementById("modelDOM");
      let cursor = document.getElementById("cursor");
      let camera = document.getElementById("camera");
        
      this.el.sceneEl.addEventListener('enter-vr', (ev) => {
        
            console.log("enter vr");
        if (this.el.sceneEl.is('ar-mode'))
            model.setAttribute('position', {x: 0, y: 1, z: -0.5});
        else
            model.setAttribute('position', {x: 0, y: 1.4, z: -0.5});
            camera.removeAttribute('cursor');
            camera.setAttribute('raycaster','enabled: false');
            cursor.setAttribute('cursor', 'fuse: true');
            cursor.setAttribute('cursor','rayOrigin: entity');
            cursor.setAttribute('raycaster','enabled: true');
            cursor.object3D.visible = true;
      });
              
      
      this.el.sceneEl.addEventListener('exit-vr', (ev) => {
        //model.setAttribute('scale', '1 1 1');
        model.object3D.position.set( 0, 0, 0);
        model.setAttribute('position', {x: 0, y: 0, z: 0});
        cursor.removeAttribute('cursor');
        cursor.setAttribute('raycaster','enabled: false');
        camera.setAttribute('cursor', 'fuse: false');
        camera.setAttribute('cursor','rayOrigin: mouse');
        camera.setAttribute('raycaster','enabled: true');
        camera.setAttribute('position', {x: 0.4, y: 0.2, z: 0.6});
        cursor.object3D.visible = false;
      });
    }
  });
  
  //----------------------------------------------------------------------------------
  //--- Make overlay object
  //----------------------------------------------------------------------------------
  AFRAME.registerComponent("overlay", {
    dependencies: ['material'],
    init: function () {
      this.el.sceneEl.renderer.sortObjects = true;
      this.el.object3D.renderOrder = 100;
      this.el.components.material.material.depthTest = false;
    }
  });
  
  //----------------------------------------------------------------------------------
  //--- Events for 2D elements
  //----------------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function(e) {
    /*const toggle = document.getElementById('toggle');

    toggle.addEventListener('click', () =>
      document.getElementById("info").classList.toggle('show-info')
    ); */
    console.log(AFRAME.utils.device.isMobile());
    //if (AFRAME.utils.device.isMobile())
        //document.getElementById("modelDOM").setAttribute('position', {x: 0, y: 1, z: 0});
        document.getElementById("camera").setAttribute('position', {x: 0.4, y: 0.2, z: 0.6});
  });

  var opened = false;
  function animateModel()
  {
        if (!opened)
        {
            opened = true;
            document.getElementById("model-rozkladany").setAttribute("animation-mixer", 'timeScale: 1.0; clip: rozbicie;');
            document.getElementById("szyba-scenariusz1").setAttribute("animation-mixer", 'timeScale: 1.0; clip: rozbicie;');
            document.getElementById("szyba-scenariusz2").setAttribute("animation-mixer", 'timeScale: 1.0; clip: rozbicie;');
            document.getElementById("slonce-animowane").setAttribute("animation-mixer", 'timeScale: 1.0; clip: rozbicie;');
            document.getElementById("strzalka-energia-sloneczna-scenariusz1").setAttribute("animation-mixer", 'timeScale: 1.0; clip: rozbicie;');
            document.getElementById("strzalka-energia-sloneczna-scenariusz2").setAttribute("animation-mixer", 'timeScale: 1.0; clip: rozbicie;');
            document.getElementById("strzalka-energia-cieplna").setAttribute("animation-mixer", 'timeScale: 1.0; clip: rozbicie;');
            document.getElementById("grzejnik").setAttribute("animation-mixer", 'timeScale: 1.0; clip: rozbicie;');
        } else
        {
            opened = false;
            let model = document.getElementById("model-rozkladany");
            let clipName = model.object3D.children[0].animations[1].name;
            console.log(clipName);
            document.getElementById("model-rozkladany").setAttribute("animation-mixer", 'timeScale: 1.0; clip:'+clipName+'');
            document.getElementById("szyba-scenariusz1").setAttribute("animation-mixer", 'timeScale: 1.0; clip:'+clipName+'');
            document.getElementById("szyba-scenariusz2").setAttribute("animation-mixer", 'timeScale: 1.0; clip:'+clipName+'');
            document.getElementById("slonce-animowane").setAttribute("animation-mixer", 'timeScale: 1.0; clip:'+clipName+'');
            document.getElementById("strzalka-energia-sloneczna-scenariusz1").setAttribute("animation-mixer", 'timeScale: 1.0; clip:'+clipName+'');
            document.getElementById("strzalka-energia-sloneczna-scenariusz2").setAttribute("animation-mixer", 'timeScale: 1.0; clip:'+clipName+'');
            document.getElementById("strzalka-energia-cieplna").setAttribute("animation-mixer", 'timeScale: 1.0; clip:'+clipName+'');
            document.getElementById("grzejnik").setAttribute("animation-mixer", 'timeScale: 1.0; clip:'+clipName+'');
        }
  }

  function scenariusz1 ()
  {
        console.log("scenariusz1");
        document.getElementById("strzalka-energia-sloneczna-scenariusz1").setAttribute("visible", 'true');
        document.getElementById("strzalka-energia-sloneczna-scenariusz2").setAttribute("visible", 'false');
        document.getElementById("szyba-scenariusz1").setAttribute("visible", 'true');
        document.getElementById("szyba-scenariusz2").setAttribute("visible", 'false');
  }

  function scenariusz2 ()
  {
        console.log("scenariusz2");
        document.getElementById("strzalka-energia-sloneczna-scenariusz1").setAttribute("visible", 'false');
        document.getElementById("strzalka-energia-sloneczna-scenariusz2").setAttribute("visible", 'true');
        document.getElementById("szyba-scenariusz1").setAttribute("visible", 'false');
        document.getElementById("szyba-scenariusz2").setAttribute("visible", 'true');
  }
  
  