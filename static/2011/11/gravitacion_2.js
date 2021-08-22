/*
DRK Gravitación -- JS
Copyright (C) 2011 Leandro Fernandez

Visit https://www.drk.com.ar/
Buenos Aires, Argentina

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var renderer;
var camera;
var scene;
var edad = 0;
var particles = new Array();
var materials = new Array();
var geometries = new Array();
var particleSystems = new Array();

var G = 6.67428;
var particleCount = 400;
var WIDTH = 600, HEIGHT = 420;
var VIEW_ANGLE = 45, ASPECT = WIDTH / HEIGHT, NEAR = 0.1, FAR = 10000;
var random_v0 = true;

jQuery(document).ready(function($) {
    var $container = $('#container');
    
    $('#zoomIn').click(function () {
        camera.position.z -= 10;
    });
    $('#zoomOut').click(function () {
        camera.position.z += 10;
    });
    
    // @see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback, /* DOMElement */ element){
          window.setTimeout(callback, 1000 / 60);
        };
    })();
    
    // create a WebGL renderer, camera and a scene
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene = new THREE.Scene();
    
    // the camera starts at 0,0,0 so pull it back
    camera.position.z = 300;
    
    // start the renderer - set the clear colour
    // to a full black
    renderer.setClearColor(new THREE.Color(0, 1));
    renderer.setSize(WIDTH, HEIGHT);
    
    // attach the render-supplied DOM element
    $container.append(renderer.domElement);
    
    materials.push(new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 20,
        map: THREE.ImageUtils.loadTexture(
          "/2011/11/sun.png"
          ),
        blending: THREE.AdditiveBlending,
        transparent: true
    }));
    geometries.push(new THREE.Geometry());

    materials.push(new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 20,
        map: THREE.ImageUtils.loadTexture(
          "/2011/11/particle_1.png"
          ),
        blending: THREE.AdditiveBlending,
        transparent: true
    }));
    geometries.push(new THREE.Geometry());

    materials.push(new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 20,
        map: THREE.ImageUtils.loadTexture(
          "/2011/11/particle_2.png"
          ),
        blending: THREE.AdditiveBlending,
        transparent: true
    }));
    geometries.push(new THREE.Geometry());

    materials.push(new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 20,
        map: THREE.ImageUtils.loadTexture(
          "/2011/11/particle_3.png"
          ),
        blending: THREE.AdditiveBlending,
        transparent: true
    }));
    geometries.push(new THREE.Geometry());

    materials.push(new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 20,
        map: THREE.ImageUtils.loadTexture(
          "/2011/11/particle_4.png"
          ),
        blending: THREE.AdditiveBlending,
        transparent: true
    }));
    geometries.push(new THREE.Geometry());

    materials.push(new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 20,
        map: THREE.ImageUtils.loadTexture(
          "/2011/11/particle_5.png"
          ),
        blending: THREE.AdditiveBlending,
        transparent: true
    }));
    geometries.push(new THREE.Geometry());
    
    // now create the individual particles
    var particle;
    for(var p = 0; p < particleCount; p++) {
      
      // La partícula 0 es el sol
      if (p == 0) {
        particle = new THREE.Vertex(
          new THREE.Vector3(0, 0, 0)
        ); 
        particle.velocity = new THREE.Vector3(0, 0, 0);
        particle.mass = 50000;
        geometries[0].vertices.push(particle);
        particleSystems.push(new THREE.ParticleSystem(
          geometries[0],
          materials[0]));
        
      }
      else {
        particle = new THREE.Vertex(
          new THREE.Vector3(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 500 - 250)
        ); 
        if (random_v0) {
          particle.velocity = new THREE.Vector3(
            Math.random()*20-10, // x
            Math.random()*20-10, // y: start with random vel
            Math.random()*5-2.5);// z
        }
        else {
          particle.velocity = new THREE.Vector3(
            0,  // x
            0,  // y: start with random vel
            0); // z
        }
        particle.mass = Math.random()*1000+1;
        geometries[p%5+1].vertices.push(particle);
      }
      
      // add it to the geometry
      particles.push(particle);
    }
    
    particleSystems.push(new THREE.ParticleSystem(
      geometries[1],
      materials[1]));
    particleSystems.push(new THREE.ParticleSystem(
      geometries[2],
      materials[2]));
    particleSystems.push(new THREE.ParticleSystem(
      geometries[3],
      materials[3]));
    particleSystems.push(new THREE.ParticleSystem(
      geometries[4],
      materials[4]));
    particleSystems.push(new THREE.ParticleSystem(
      geometries[5],
      materials[5]));
    
    // add it to the scene
    scene.add(camera);
    scene.add(particleSystems[0]);
    scene.add(particleSystems[1]);
    scene.add(particleSystems[2]);
    scene.add(particleSystems[3]);
    scene.add(particleSystems[4]);
    scene.add(particleSystems[5]);
    
    requestAnimFrame(update);
});

function update() {
  var pCount = particleCount;
  while(pCount--) {
    // get the particle
    var particle = particles[pCount];
    
    var nextC;
    for(nextC = pCount - 1; nextC >=0; --nextC) {
      var next = particles[nextC];
      if (next) {
        var f = G * particle.mass * next.mass / particle.position.distanceToSquared(next.position);
        var a = new THREE.Vector3(particle.position.x - next.position.x,
          particle.position.y - next.position.y, 
          particle.position.z - next.position.z);
        a = a.normalize();
        a = a.multiplyScalar(f/50000);
        particle.velocity.subSelf(a);
        next.velocity.addSelf(a);
      }
    }
    
    // and the position
    if (pCount)
      particle.position.addSelf(particle.velocity);
  }
  
  particleSystems[0].geometry.__dirtyVertices = true;
  particleSystems[1].geometry.__dirtyVertices = true;
  particleSystems[2].geometry.__dirtyVertices = true;
  particleSystems[3].geometry.__dirtyVertices = true;
  particleSystems[4].geometry.__dirtyVertices = true;
  particleSystems[5].geometry.__dirtyVertices = true;
  
  renderer.render(scene, camera);
  
  jQuery("#txtEdad").text(edad++);
  
  // set up the next call
  requestAnimFrame(update);
}

