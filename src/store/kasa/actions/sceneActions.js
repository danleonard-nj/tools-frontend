import autoBind from 'auto-bind';
import { sortBy } from '../../../api/helpers/apiHelpers';
import SceneApi from '../../../api/kasa/sceneApi';
import { popErrorMessage, popMessage } from '../../alert/alertActions';
import {
  setAllScenes,
  setFilteredScenes,
  setIsNew,
  setSceneCategories,
  setScenes,
  updateSceneStateInternal,
} from '../sceneSlice';

export default class SceneActions {
  constructor() {
    this.sceneApi = new SceneApi();
    autoBind(this);
  }

  createSceneCategory(categoryName) {
    return async (dispatch, getState) => {
      const handleCreateSceneCategoryResult = (status) => {
        if (status !== 200) {
          dispatch(popErrorMessage('Failed to create scene category'));
        }
      };

      const result = this.sceneApi.createSceneCategory({
        scene_category: categoryName,
      });

      handleCreateSceneCategoryResult(result.status);
    };
  }

  updateSceneCategory(sceneId, sceneCategoryId) {
    return async (dispatch, getState) => {
      const handleGetSceneResultMessage = (status) => {
        if (status !== 200) {
          dispatch(
            popErrorMessage(`Failed to fetch scene with the ID '${sceneId}'`)
          );
        }
      };

      // Get the scene to update
      const { data: scene, status: sceneStatus } = await this.sceneApi.getScene(
        sceneId
      );

      // Update the scene category
      handleGetSceneResultMessage(sceneStatus);
      scene.scene_category_id = sceneCategoryId;

      await this.sceneApi.updateScene(scene);

      const { data: scenes, status: scenesStatus } =
        await this.sceneApi.getScenes();

      dispatch(setScenes(scenes));
    };
  }

  getScenes(categoryId) {
    return async (dispatch, getState) => {
      const handleResultMessage = (status) => {
        if (status !== 200) {
          dispatch(popErrorMessage('Failed to fetch scene list'));
        }
      };

      const response = await this.sceneApi.getScenes(categoryId);
      console.log(response);
      handleResultMessage(response?.status);

      // Update scene list state on successful request
      if (response?.status === 200) {
        sortBy(response?.data, 'scene_name');
        dispatch(setScenes(response?.data));
      }
    };
  }

  filterScenesByCategory(categoryId) {
    return async (dispatch, getState) => {
      const state = getState();

      const scenes = state.scene.scenes ?? [];
      console.log('scenes ', scenes);
      const filteredScenes = scenes.filter(
        (x) => x.scene_category_id === categoryId
      );

      dispatch(setFilteredScenes(filteredScenes));
    };
  }

  getCategories() {
    return async (dispatch, getState) => {
      const handleResultMessage = (status) => {
        if (status !== 200) {
          dispatch(popErrorMessage('Failed to fetch scene category list'));
        }
      };

      const response = await this.sceneApi.getSceneCategories();
      handleResultMessage(response?.status);

      // Update scene list state on successful request
      if (response?.status === 200) {
        dispatch(setSceneCategories(response?.data));
      }
    };
  }

  runScene(sceneId, regionId) {
    return async (dispatch, getState) => {
      const handleResultMessage = (status) => {
        dispatch(
          status !== 200
            ? popErrorMessage('Failed to run scene')
            : popMessage('Scene run successfully')
        );
      };

      // Run the selected scene
      const response = await this.sceneApi.runScene(sceneId, regionId);

      // Pop a message on success or failure
      handleResultMessage(response?.status);
    };
  }

  deleteScene(sceneId) {
    return async (dispatch, getState) => {
      // Pop message for success or failure
      const handleResultMessage = (status) => {
        dispatch(
          status !== 200
            ? popErrorMessage('Failed to delete scene')
            : popMessage('Deleted scene successfully')
        );
      };

      // Delete selected scene
      const response = await this.sceneApi.deleteScene(sceneId);

      // Pop message on success or failure
      handleResultMessage(response?.status);

      // Update the scene list if the delete was successful
      if (response?.status === 200) {
        const scenesResponse = await this.sceneApi.getScenes();

        // Pop a message if we fail to fetch a new scene list
        dispatch(
          scenesResponse?.status !== 200
            ? popErrorMessage('Failed to fetch updated schedule list')
            : setScenes(scenesResponse.data)
        );
      }
    };
  }

  saveScene(scene) {
    return async (dispatch, getState) => {
      const state = getState();

      // Compose success or failure result
      const handleResultMessage = (status) => {
        dispatch(
          status !== 200
            ? popErrorMessage('Failed to create or update scene')
            : popMessage('Scene created or updated successfully')
        );
      };

      const handleSceneListUpdate = async (status) => {
        if (status === 200) {
          const scenesResponse = await this.sceneApi.getScenes();

          dispatch(
            scenesResponse?.status !== 200
              ? popErrorMessage('Failed to fetch updated scene list')
              : setScenes(scenesResponse.data)
          );
        }
      };

      const handleInsert = async () => {
        const insertResponse = await this.sceneApi.createScene(scene);
        dispatch(setIsNew(false));

        // Pop a message on success or failure
        handleResultMessage(insertResponse?.status);

        // Update the scene list if the insert was a success
        await handleSceneListUpdate(insertResponse.status);
      };

      const handleUpdate = async () => {
        const updateResult = await this.sceneApi.updateScene(scene);

        // Pop a message on success or failure
        handleResultMessage(updateResult?.status);

        // Update scene list if update was a success
        await handleSceneListUpdate(updateResult?.status);
      };

      // Insert or update the selected scene
      state.scene.isNew ? await handleInsert() : await handleUpdate();
    };
  }

  updateSceneState(func) {
    return async (dispatch, getState) => {
      const state = getState();
      dispatch(updateSceneStateInternal(func(state.scene.scene)));
    };
  }
}

export const {
  updateSceneState,
  saveScene,
  deleteScene,
  runScene,
  getScenes,
  getCategories,
  updateSceneCategory,
  getAllScenes,
  filterScenesByCategory,
  createSceneCategory,
} = new SceneActions();
