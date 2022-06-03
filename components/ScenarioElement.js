AFRAME.registerComponent('scenario-element', {
    schema: {
        sceneNumber: { type: 'number', default: 1 }
    },

    init: function () {
        this.el.addEventListener('playScene', (sceneNumber) => {
        //if (sceneNumber == this.data.sceneNumber) this.el.object3D = true; //clickable dodac?
        //else this.el.object3D = false;
        console.log("scene play");
        this.el.object3D.visible = sceneNumber == this.data.sceneNumber ? true : false;
        });
        this.el.addEventListener('click', (e) => {
        console.log("scene play test");
        });
    },

    update: function() {
        
    }
});