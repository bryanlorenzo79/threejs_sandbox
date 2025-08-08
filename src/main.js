import './main.css';
import { App } from './systems/App.js';
import { Renderer } from './components/Renderer.js';
import { SceneManager } from './components/SceneManager.js';
import { LightManager } from './components/LightManager.js';
import { ModelLoader } from './components/ModelLoader.js';

// Dependency Inversion: We create low-level modules here and pass them to the high-level App
const renderer = new Renderer();
const sceneManager = new SceneManager();
const lightManager = new LightManager();
const modelLoader = new ModelLoader(sceneManager.getScene());

// Dependency Inversion: The App class depends on abstractions (interfaces) rather than concrete implementations.
const app = new App(renderer, sceneManager, lightManager, modelLoader);
app.start();
