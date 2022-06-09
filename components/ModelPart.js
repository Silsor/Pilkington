//------------------
//--- Check which part is pointed
//------------------
let clicked = false;
AFRAME.registerComponent('model-part', {
  init: function () {
    const el = this.el;
    const data = this.data;

    //let clicked = false;

    el.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      let part = null;

      if (e.detail.intersection != null && e.detail.cursorEl != null && clicked == false && !e.detail.intersection.object.name.match('deactive')) {
        clicked = true;
        part = e.detail.intersection.object;

        el.setAttribute("pointed-model-part", "part", part);
       // el.setAttribute("pointed-model-part", "cameraPos", camera.position); //working!!!
        el.setAttribute("part-name", 'name', part.name);
        let info = document.querySelector('#part-name');
        info.object3D.position.set(0, 0.015, -0.05);
        //console.log("info position ModelPart:")
        //console.log(info.object3D.position);
        // WHEN FADE-IN ANIMATION COMPLETES, HIDE LABEL
        setTimeout(function () {
          clicked = false;
          el.removeAttribute('part-name');
          el.removeAttribute("pointed-model-part"); //working!!!
          part = null;
          el.emit('highlightEnd','', false);
          }, 1500);

      }
      else{
        console.log("else");
      }
    });
  }
});
