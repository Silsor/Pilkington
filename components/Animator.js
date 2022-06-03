//----------------------------------------------------------------------------------
//------- ANIMATOR - CONTROL MODEL ANIMATIONS
//----------------------------------------------------------------------------------
  
  AFRAME.registerComponent('animator', {
    schema: {
    playing: {default: false}
    },

    init: function () {
        
        this.animationHandler = 
        function () {
            console.log("animationHandler");
            this.el.setAttribute("animation-mixer", 'timeScale: 1.00');
        }
    },

    update: function () {
        console.log("update");
    }

  });
