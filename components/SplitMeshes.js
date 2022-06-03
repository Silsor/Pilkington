//----------
//Split different meshes from model to different entities
//----------

AFRAME.registerComponent('split-meshes', {
init: function () {
    console.log("split meshes init");
    const el = this.el;

    el.addEventListener('model-loaded', (e) => {
    const meshObjectsSelected = el.getObject3D('mesh').children;
    //console.log(meshObjectsSelected.length);
    SplitChildren(meshObjectsSelected);
    
    el.parentNode.removeChild(el);
    //el.object3D.position.set(0,1,0);
    });

    function SplitChildren(meshObjectsSelected)
    {
    for (var i = 0; i < meshObjectsSelected.length; i++)
    {
        if (meshObjectsSelected[i].children !== 0)
        {
            SplitChildren(meshObjectsSelected[i].children);
        }
        let entityEl = document.createElement('a-entity');
        
        let mesh = new THREE.Mesh( meshObjectsSelected[i].geometry, meshObjectsSelected[i].material );
        entityEl.setObject3D('mesh', mesh);
        entityEl.setAttribute('id', meshObjectsSelected[i].name);
        var scale = new THREE.Vector3();
        meshObjectsSelected[i].getWorldScale(scale);
        var pos = new THREE.Vector3(0,0,0);
        meshObjectsSelected[i].getWorldPosition(pos);
        var rot = new THREE.Quaternion(0,0,0,1);
        meshObjectsSelected[i].getWorldQuaternion(rot);
        entityEl.getObject3D('mesh').name = meshObjectsSelected[i].name;
        entityEl.object3D.position.set(pos.x, pos.y, pos.z);
        entityEl.object3D.setRotationFromQuaternion(rot);
        entityEl.object3D.scale.set(scale.x, scale.y, scale.z);
        meshObjectsSelected[i].el.parentNode.appendChild(entityEl);
        entityEl.classList.add("clickable");
        entityEl.setAttribute('model-part','');
        if (meshObjectsSelected[i].el.getAttribute('modify-model')) 
            entityEl.setAttribute("modify-model", {envMapImg: '#sky-image', intensityVal: meshObjectsSelected[i].el.getAttribute('modify-model').intensityVal});
            else
            entityEl.setAttribute("modify-model", {envMapImg: '#sky-image'});
        entityEl.object3D.castShadow = true;
        entityEl.object3D.receiveShadow = true;
        //entityEl.castShadow = true;
        //entityEl.receiveShadow = true;
        if (meshObjectsSelected[i].el.getAttribute('reveal-part')) 
            entityEl.setAttribute('reveal-part','');
        //el.sceneEl.append(entityEl);
        //console.log(entityEl.object3D);
    }
    //console.log("split meshes complete");
    }
}
});