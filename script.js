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
 
      let modelDOM = document.getElementById("modelDOM");
      let cursor = document.getElementById("cursor");
      let camera = document.getElementById("camera");
        
      this.el.sceneEl.addEventListener('enter-vr', (ev) => {
        this.el.sceneEl.removeAttribute("cursor");
  
        cursor.setAttribute('visible', true);
        cursor.setAttribute('cursor','fuse: true; fuseTimeout: 1500');
        cursor.setAttribute('animation__click', "property: scale; startEvents: click; easing: easeInOutCubic; dur: 250; from: 0.8 0.8 0.8; to: 1.0 1.0 1.0 ");
        //this.el.emit('click', {}, false);
        cursor.setAttribute('raycaster', "enabled: true");
        //Transformations are applied to entities in this order:
        //modelDOM.object3D.scale.set(0.8, 0.8, 0.8);
        //modelDOM.object3D.rotation.set(0, 30, 0);
        //modelDOM.object3D.position.set(0.5, 0, -1.5);

        document.querySelector('a-sky').setAttribute('visible', true);
  
        if (this.el.sceneEl.is('ar-mode')) {
            document.querySelector('a-sky').setAttribute('visible', false);
        }
      });
              
      
      this.el.sceneEl.addEventListener('exit-vr', (ev) => {
        this.el.sceneEl.setAttribute('cursor', 'rayOrigin', 'mouse');  
        cursor.setAttribute('visible', false);
        cursor.setAttribute('raycaster', "enabled: false");
           
        document.querySelector('a-sky').setAttribute('visible', true);
       
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
  });

  var opened = false;
  function animateModel()
  {
    console.log(document.getElementById("strzalka-energia-cieplna").object3D);
    console.log("animate");
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
  
  