//-------  HIGHLIGHT CLICKED MODEL PART
/*
- Create backup of original material
- Add material with HighlightShader
- Add components: CreateInfo
- Add to scene
*/
AFRAME.registerComponent('pointed-model-part', {
  schema: {
      part: {},
      name: {default: "name"},
      color: {default: new THREE.Color(0xffff00)},
      cameraPos: {default: new THREE.Vector3(0, 0, 0) },
      materialBackup:{}
  },
  // Create or update the line geometry.
  update: function(oldData){
      //console.log("from component: " +this.data.part.name);
      if(this.data.part != oldData.part){
      
      var highlightMaterial = this.data.part.material.clone();
      this.data.materialBackup = this.data.part.material;

      this.data.part.material = highlightMaterial;
      this.data.part.material.color.set(this.data.color);    
      this.data.part.material.emissive.set(this.data.color);
      this.data.part.material.emissiveIntensity = 0.5;
   }
  },

  // // Remove the line geometry.
  remove: function(){
      this.data.part.material = this.data.materialBackup;
  }
});